import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useFetchData } from "./useFetchData";
import { useQueryClient } from "@tanstack/react-query";
import lodash from "lodash";
import { cleanup } from "@/helpers/utils/cleanupObj"; 
import { bus } from "@/helpers/services/bus";

interface Props {
  url: string;
  filter?: string;
  limit: number;
  array?: any;
  name: string; // required for stable query key
  search?: string;
  paramsObj?: any;
}

function useInfiniteScroller(props: Props) {
  const {
    url,
    filter = "id",
    limit,
    array,
    name,
    search,
    paramsObj = {},
  } = props;

  const [size, setSize] = useState(limit);
  const [inView, setInView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  const intObserver = useRef<IntersectionObserver | null>(null);
  const queryClient = useQueryClient();

  // stable base key
  const baseKey = useMemo(() => [name], [name]);

  // cleaned params
  const cleanedParams = useMemo(
    () => cleanup({ ...paramsObj, search }),
    [paramsObj, search]
  );

  const queryKey = useMemo(
    () => [name, size, cleanedParams],
    [name, size, cleanedParams]
  );

  const { data, isLoading, isError, refetch, isFetching } = useFetchData<any>({
    queryKey,
    endpoint: url,
    params: { size, ...cleanedParams },
  });

  // Intersection observer
  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          setInView(true);
        } else {
          setInView(false);
        }
      });

      if (node) intObserver.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  // Increase size when sentinel enters view
  useEffect(() => {
    if (inView && hasNextPage) {
      setSize((prev) => prev + limit);
      refetch();
    }
  }, [inView, hasNextPage, limit]);

  // Merge and dedupe results
  useEffect(() => {
    const dataContent = array ? data : data?.content || [];

    if (dataContent?.length > 0) {
      const mergedData = size !== limit ? [...results, ...dataContent] : dataContent;
      const uniqueData = lodash.uniqBy(mergedData, filter);
      setResults(uniqueData);

      const noMoreData = array ? data?.length < size : data?.last !== true;
      setHasNextPage(noMoreData);

      if (size === limit) window.scrollTo(0, 0);
    }
  }, [data, size, filter, array, isFetching]);

  // Manage loading vs refetching
  useEffect(() => {
    setLoading(results.length === 0 && isLoading);
    setRefetching(results.length > 0 && isLoading);
  }, [isLoading, results]);

  // ✅ Listen for global REFRESH events
  useEffect(() => {
    const handler = (target: string) => {
      if (target === name) {
        setSize(limit);   // reset pagination
        refetch();        // force refetch
      }
    };

    bus.on("REFRESH", handler);
    return () => {
      bus.off("REFRESH", handler);
    };
  }, [name, limit, refetch]);

  return {
    data,
    isLoading: loading,
    results,
    ref,
    isError,
    isRefetching: refetching,
    // expose local refetch too
    refetch,
    queryKey: baseKey,
  };
}

export default useInfiniteScroller;

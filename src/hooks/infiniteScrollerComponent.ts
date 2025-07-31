import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useFetchData } from './useFetchData';
import lodash from 'lodash';
import { cleanup } from '@/helpers/utils/cleanupObj';

interface Props {
  url: string;
  filter?: string;
  limit: number;
  newdata?: any;
  array?: any;
  name?: any;
  search?: string;
  refetchInterval?: number;
  paramsObj?: any;
}

function useInfiniteScroller(props: Props) {
  const {
    url,
    filter = 'id',
    limit,
    array,
    name,
    search,
    paramsObj = {},
  } = props;

  const [size, setSize] = useState(limit);
  const [inView, setInView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refecthing, setRefecthing] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  const intObserver = useRef<IntersectionObserver | null>(null);

  const cleanedParams = useMemo(() => cleanup({ ...paramsObj, search }), [paramsObj, search]);

  const queryKey = useMemo(
    () => (name ? [name, url, cleanedParams, size+"", search] : [url, cleanedParams, size+"", search]),
    [name, url, cleanedParams, size, search]
  );

  const { data, isLoading, isError, refetch } = useFetchData<any>({
    queryKey,
    endpoint: url,
    params: {
      size,
      ...cleanedParams,
    },
  });

  const ref = useCallback((node: HTMLElement | null) => {
    if (isLoading) return;

    console.log(hasNextPage);


    if (intObserver.current) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        setInView(true);
      } else {
        setInView(false);
      }
    });

    if (node) intObserver.current.observe(node);
  }, [isLoading, hasNextPage]);

  useEffect(() => {
    if (inView && hasNextPage) {

      console.log("working");


      setSize(prev => prev + limit);
      refetch()
    }
  }, [inView, hasNextPage, limit]);

  useEffect(() => {
 
    const dataContent = array ? data : data?.content || [];

    if (dataContent?.length > 0) {

      const mergedData = size !== limit ? [...results, ...dataContent] : dataContent;

      const uniqueData = lodash.uniqBy(mergedData, filter);
      setResults(uniqueData);

      const noMoreData = array
        ? data?.length < size
        : data?.last !== true;

      setHasNextPage(noMoreData);

      // Optional: Scroll on load
      if (size === limit) {
        window.scrollTo(0, 0);
      }
    }
  }, [data, size, filter, array]);

  useEffect(()=> {
    if(results.length === 0 && isLoading){
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [isLoading])

  useEffect(()=> {
    if(results.length > 0 && isLoading){
      setRefecthing(true)
    } else {
      setRefecthing(false)
    }
  }, [isLoading])

  return {
    data,
    isLoading: loading,
    results,
    ref,
    isError,
    isRefetching: refecthing,
    refetch,
  };
}

export default useInfiniteScroller;

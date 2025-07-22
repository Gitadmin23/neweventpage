import React from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import lodash from 'lodash';
import { cleanup } from '@/helpers/utils/cleanupObj';
import httpService from '@/helpers/services/httpService';

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
    refetchInterval,
    paramsObj = {},
  } = props;

  const [size, setSize] = React.useState(limit);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  // const [data, setData] = React.useState({} as any);
  const [results, setResults] = React.useState([] as any);
  const intObserver = React.useRef<IntersectionObserver | null>(null);

  const getParamsDependencies = React.useMemo(() => {
    const cleanedParams = cleanup({...paramsObj, search: search});
    return Object.keys(cleanedParams).length ? Object.values(cleanedParams) : [];
  }, [paramsObj]);

  const queryKey = React.useMemo(
    () => (name ? [name, url, ...getParamsDependencies] : [url, ...getParamsDependencies]),
    [name, url, getParamsDependencies ?? null]
  );

  // const queryClient = useQueryClient();

  const { mutate: fetchData, isPending: isLoading, data, isError } = useMutation({
    mutationKey: queryKey,
    mutationFn: () =>
      httpService.get(url, {
        params: {
          size,
          ...paramsObj,
        },
      }),
    onError: (error: AxiosError) => {
      console.error('Error fetching data:', error);
    },
    onSuccess: (response: any) => {
      try {
        const dataContent = array ? response?.data : response?.data?.content;
        const mergedData = size !== limit ? [...results, ...dataContent] : dataContent;
        const uniqueData = lodash.uniqBy(mergedData, filter);
        setResults(uniqueData);

        const lastPageFlag = array ? response?.data?.length < size : response?.data?.last === false;
        setHasNextPage(lastPageFlag);

        window.scrollTo(0, window.innerHeight);
      } catch (e) {
        console.error('Error in onSuccess handler:', e);
      }
    },
  });


  // const { status, error, isFetching, isLoading, isError, refetch } = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: async (): Promise<Array<string>> => {
  //     const response = await httpService.get(url, {
  //       params: {
  //         size,
  //         ...paramsObj,
  //       },
  //     })
  //     return viewData(response)
  //   },
  // })

  // const viewData = (response: any) => {

  //   setData(response)
  //   const dataContent = array ? response?.data : response?.data?.content;
  //   const mergedData = size !== limit ? [...results, ...dataContent] : dataContent;
  //   const uniqueData = lodash.uniqBy(mergedData, filter);
  //   setResults(uniqueData);

  //   const lastPageFlag = array ? response?.data?.length < size : response?.data?.last === false;
  //   setHasNextPage(lastPageFlag);

  //   window.scrollTo(0, window.innerHeight);

  //   return response?.data?.content
  // }

  const ref = React.useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          setSize((prev) => prev + limit);
          fetchData(); 
        }
      });

      if (node) intObserver.current.observe(node);
    },
    [isLoading, hasNextPage, limit, fetchData]
  );

  React.useEffect(() => {
    fetchData();
  }, [url, size, search, ...getParamsDependencies]);

  return {
    data,
    isLoading,
    results,
    ref,
    isError, 
    refetch: fetchData,
  };
}

export default useInfiniteScroller;

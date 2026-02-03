"use client"
import { Provider } from '@/components/ui/provider'; 
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query'; 

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode,
}

export default function Providers({
  children,
}: Props) {

  return (
      <QueryClientProvider client={queryClient}>
        <Provider> 
          {children} 
        </Provider>
      </QueryClientProvider> 
  )
}
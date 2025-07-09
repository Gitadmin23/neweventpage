'use client'
 
import { Provider } from '@/components/ui/provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode, 
}

export function Providers({
  children, 
}: Props) { 

    return (
    <QueryClientProvider client={queryClient}> 
        <Provider>
            {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */} 
              {children} 
        </Provider> 
    </QueryClientProvider>
  )
}
"use client";

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { cache } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {

    const getQueryClient = cache(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 10,
                retry: 1,
                refetchOnWindowFocus: true,
                refetchOnReconnect: 'always',

            },
            mutations: {
                retry: 1
            }
        }
    }))

    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
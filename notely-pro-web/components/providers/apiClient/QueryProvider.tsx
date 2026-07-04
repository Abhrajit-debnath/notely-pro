"use client";

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { cache } from 'react';





export default function QueryProvider({ children }: { children: React.ReactNode }) {

    const getQueryClient = cache(() => new QueryClient())

    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
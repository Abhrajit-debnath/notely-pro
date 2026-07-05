'use client';

import { Box, Flex } from "@mantine/core";
import AuthProvider from "@/components/providers/auth/AuthProvider";
import AppSidebar from "@/components/dashboard/AppSidebar";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {

    return (
        <Flex className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
            {/* Sidebar Panel */}
            <AppSidebar />
            {/* Main Workspace Frame */}
            <Box component="main" className="flex-1 flex flex-col h-screen overflow-hidden">
                {children}
            </Box>
        </Flex>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </AuthProvider>
    );
}
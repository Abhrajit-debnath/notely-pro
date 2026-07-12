"use client"

import { Box, Flex, Text, Avatar, Button, NavLink, Divider, Group, ActionIcon, ScrollArea, Tooltip, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from '@mantine/hooks';
import {
    IconNotes,
    IconUsers,
    IconTrash,
    IconSettings,
    IconPlus,
    IconFolder,
    IconFolderPlus,
    IconLogout,
    IconChevronLeft,
    IconChevronRight,
    IconSun,
    IconMoon
} from "@tabler/icons-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { deleteCookie } from "cookies-next";
import { apiClient } from "@/app/apiClient/axiosClient";
import { notify } from "@/notifications/config/notification.config";

const folders = [
    { name: "Projects", count: 4, color: "blue" },
    { name: "Personal", count: 2, color: "teal" },
    { name: "Meetings", count: 7, color: "grape" },
];

export default function AppSidebar() {
    const router = useRouter();
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    };

    const handleLogout = async () => {
        const notifyId = notify.loading("Logging Out", "Please wait while we log you out...");
         await new Promise((resolve) => setTimeout(resolve, 4000));
        try {
            await apiClient.post("/api/auth/logout");
            notify.update(notifyId, "Logged Out", "You have been logged out successfully.", "green");
           
        } catch (error) {
            console.error("Backend logout failed:", error);
            notify.update(notifyId, "Logout Failed", "An error occurred while logging out.", "red");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        await signOut({ callbackUrl: "/login" });
    };

    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    return (
        <Box
            component="aside"
            className={`border-r  border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between transition-all duration-400 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            <Box>
                {/* Logo / Brand Header */}
                <Flex align="center" justify={collapsed ? "center" : "space-between"} className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800/80">

                    <Group gap="xs" wrap="nowrap" className={`${collapsed ? "hidden" : "flex"} cursor-pointer `}>
                        <Box className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${collapsed ? "w-0 opacity-0" : "w-6 opacity-100"
                            }`}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-[var(--mantine-color-notely-6)] dark:text-[var(--mantine-color-notely-4)]"
                            >
                                <path
                                    d="M12 2L13.8 8.2L20.1 7.2L15.3 11.5L19.5 16.3L13.3 14.5L12 22L10.7 14.5L4.5 16.3L8.7 11.5L3.9 7.2L10.2 8.2L12 2Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </Box>
                        <Text
                            fw={800}
                            className={`tracking-tight text-neutral-900 dark:text-neutral-50 font-sans transition-all duration-300 overflow-hidden whitespace-nowrap ${collapsed ? "w-0 opacity-0" : "w-28 opacity-100"
                                }`}
                        >
                            Notely Pro
                        </Text>

                    </Group>

                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={() => setCollapsed(!collapsed)}
                        className="rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                        {collapsed ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
                    </ActionIcon>


                </Flex>

                {/* User Account Info */}
                <Box className="p-4">
                    <Flex align="center" justify={collapsed ? "center" : "flex-start"} gap="sm">
                        <Avatar
                            src={null}
                            alt="User Avatar"
                            radius="xl"
                            color="notely"
                            className="cursor-pointer border border-neutral-200 dark:border-neutral-800 shadow-sm"
                        >
                            JD
                        </Avatar>
                        <Box
                            className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${collapsed ? "w-0 opacity-0 ml-0" : "w-40 opacity-100 ml-2"
                                }`}
                        >
                            <Text size="xs" fw={700} className="text-neutral-900 dark:text-neutral-100">
                                John Doe
                            </Text>
                            <Text size="10px" className="text-neutral-400">
                                john.doe@example.com
                            </Text>
                        </Box>
                    </Flex>
                </Box>

                <Divider className="border-neutral-100 dark:border-neutral-800/80 mx-4" />

                {/* Create Button */}
                <Box className="p-4">
                    {collapsed ? (
                        <Tooltip label="New Note" position="right" withArrow>
                            <ActionIcon
                                variant="filled"
                                bg={"notely.6"}
                                size="lg"
                                className="bg-indigo-600 hover:bg-indigo-700 w-full rounded-xl shadow-md"
                            >
                                <IconPlus size={20} />
                            </ActionIcon>
                        </Tooltip>
                    ) : (
                        <Button
                            bg={"notely.6"}
                            variant="filled"
                            leftSection={<IconPlus size={18} />}
                            className="bg-indigo-600 hover:bg-indigo-700 w-full rounded-xl shadow-md font-sans text-sm font-semibold"
                        >
                            Create Note
                        </Button>
                    )}
                </Box>

                {/* Main Navigation Links */}
                <Box className="px-2 space-y-1">
                    <NavLink
                        component={Link}
                        href="/notes"
                        active={pathname.startsWith("/notes")}
                        label={
                            <Box className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${collapsed ? "w-0 opacity-0" : "w-40 opacity-100"
                                }`}>
                                All Notes
                            </Box>
                        }
                        leftSection={<IconNotes size={20} />}
                        color="notely"
                        className="rounded-xl py-2.5 transition-colors"
                        classNames={{
                            root: pathname.startsWith("/notes")
                                ? "font-semibold"
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/40",
                            label: "font-sans font-medium text-sm"
                        }}
                    />
                    <NavLink
                        component={Link}
                        href="/shared"
                        active={pathname === "/shared"}
                        label={
                            <Box className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${collapsed ? "w-0 opacity-0" : "w-40 opacity-100"
                                }`}>
                                Shared with me
                            </Box>
                        }
                        leftSection={<IconUsers size={20} />}
                        color="notely"
                        className="rounded-xl py-2.5 transition-colors"
                        classNames={{
                            root: pathname === "/shared"
                                ? "font-semibold"
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/40",
                            label: "font-sans font-medium text-sm"
                        }}
                    />
                    <NavLink
                        component={Link}
                        href="/trash"
                        active={pathname === "/trash"}
                        label={
                            <Box className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${collapsed ? "w-0 opacity-0" : "w-40 opacity-100"
                                }`}>
                                Trash
                            </Box>
                        }
                        leftSection={<IconTrash size={20} />}
                        color="notely"
                        className="rounded-xl py-2.5 transition-colors"
                        classNames={{
                            root: pathname === "/trash"
                                ? "font-semibold"
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/40",
                            label: "font-sans font-medium text-sm"
                        }}
                    />
                </Box>

                <Box
                    className={`mt-6 px-4 transition-all duration-300 overflow-hidden ${collapsed ? "h-0 opacity-0 pointer-events-none" : "h-[220px] opacity-100"
                        }`}
                >
                    <Group justify="space-between" className="mb-2">
                        <Text size="11px" fw={800} className="text-neutral-400 dark:text-neutral-600 uppercase tracking-wider font-sans">
                            Folders
                        </Text>
                        <ActionIcon variant="subtle" color="gray" size="xs" className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                            <IconFolderPlus size={14} />
                        </ActionIcon>
                    </Group>

                    {/* Folders List */}
                    <ScrollArea h={180} scrollbarSize={4}>
                        <Box className="space-y-0.5">
                            {folders.map((folder) => (
                                <Group
                                    key={folder.name}
                                    justify="space-between"
                                    className="px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/40 cursor-pointer group/folder"
                                >
                                    <Group gap="xs">
                                        <IconFolder size={16} className={`text-${folder.color}-500`} />
                                        <Text size="xs" className="font-sans font-semibold text-neutral-700 dark:text-neutral-300">
                                            {folder.name}
                                        </Text>
                                    </Group>
                                    <Box className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] font-bold text-neutral-500 group-hover/folder:bg-neutral-200 dark:group-hover/folder:bg-neutral-700">
                                        {folder.count}
                                    </Box>
                                </Group>
                            ))}
                        </Box>
                    </ScrollArea>
                </Box>
            </Box>

            {/* Sidebar Footer */}
            <Box className="p-4 space-y-2">
                <Divider className="border-neutral-100 dark:border-neutral-800/80 mb-2" />

                {/* Settings Nav Link */}
                <NavLink
                    component={Link}
                    href="/settings"
                    active={pathname === "/settings"}
                    label={
                        <Box className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${collapsed ? "w-0 opacity-0" : "w-40 opacity-100"
                            }`}>
                            Settings
                        </Box>
                    }
                    leftSection={<IconSettings size={20} />}
                    color="notely"
                    className="rounded-xl py-2.5 transition-colors"
                    classNames={{
                        root: pathname === "/settings"
                            ? "font-semibold"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/40",
                        label: "font-sans font-medium text-sm"
                    }}
                />

                {/* Theme & Logout Buttons */}
                <Flex align="center" justify={collapsed ? "center" : "space-between"} gap="xs" direction={collapsed ? "column" : "row"}>
                    <ActionIcon
                        variant="default"
                        size="lg"
                        onClick={toggleColorScheme}
                        className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        aria-label="Toggle theme"
                    >
                        {computedColorScheme === "dark" ? <IconSun size={18} className="text-amber-400" /> : <IconMoon size={18} className="text-indigo-900" />}
                    </ActionIcon>

                    {collapsed ? (
                        <Tooltip label="Logout" position="right" withArrow>
                            <ActionIcon
                                variant="subtle"
                                color="red"
                                size="lg"
                                onClick={handleLogout}
                                className="rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                                <IconLogout size={20} />
                            </ActionIcon>
                        </Tooltip>
                    ) : (
                        <Button
                            variant="subtle"
                            color="red"
                            onClick={handleLogout}
                            leftSection={<IconLogout size={16} />}
                            className="rounded-xl font-sans text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                            Logout
                        </Button>
                    )}
                </Flex>
            </Box>
        </Box>
    )
}
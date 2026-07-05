"use client"

import { TextInput, PasswordInput, Button, Divider, Anchor, Text, Title, Stack, Box, Group, UnstyledButton, Flex, Center } from "@mantine/core";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
    return <Stack gap="lg" className="w-full">
        {/* Logo  */}
        {/* <Box className="flex justify-start">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-indigo-600 dark:text-indigo-400"
            >
                <path
                    d="M12 2L13.8 8.2L20.1 7.2L15.3 11.5L19.5 16.3L13.3 14.5L12 22L10.7 14.5L4.5 16.3L8.7 11.5L3.9 7.2L10.2 8.2L12 2Z"
                    fill="currentColor"
                />
            </svg>

            <Flex
                direction="row"
                align="center"
                gap={5}
                justify="center"
            >
                <Text size="lg">Notely</Text>
                <Center component="span" c="notely.5" className="text-lg" fw={700}>Pro</Center>
            </Flex>
        </Box> */}

        {/* Heading Block */}
        <Stack gap={6}>
            <Title order={2} className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-sans">
                Create an account
            </Title>
            <Text size="xs" className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans font-medium">
                Access your tasks, notes, and projects anytime, anywhere - and keep everything flowing in one place.
            </Text>
        </Stack>

        {/* Main Form Fields */}
        <Stack gap="md" component="form" onSubmit={(e) => e.preventDefault()}>
            <TextInput
                label="Your email"
                placeholder="name@example.com"
                required
                size="sm"
                radius="md"
                className="font-sans"
                classNames={{
                    label: "font-semibold text-xs text-neutral-700 dark:text-neutral-300 mb-1.5",
                    input: "bg-neutral-50 dark:bg-neutral-950 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 border-neutral-200 dark:border-neutral-800 transition-colors"
                }}
            />

            <PasswordInput
                label="Password"
                placeholder="Enter Password"
                required
                size="sm"
                radius="md"
                className="font-sans"
                classNames={{
                    label: "font-semibold text-xs text-neutral-700 dark:text-neutral-300 mb-1.5",
                    input: "bg-neutral-50 dark:bg-neutral-950 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 border-neutral-200 dark:border-neutral-800 transition-colors",
                    innerInput: "bg-transparent border-0"
                }}
            />

            <Button
                type="submit"
                size="md"
                radius="md"
                className="bg-indigo-600 hover:bg-indigo-700 font-semibold text-sm shadow-md transition-all mt-2"
            >
                Get Started
            </Button>
        </Stack>

        {/* Divider */}
        <Divider
            label="or continue with"
            labelPosition="center"
            classNames={{
                label: "text-[10px] font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-widest bg-white dark:bg-neutral-900 px-3",
                root: "border-neutral-200 dark:border-neutral-800"
            }}
        />

        {/* Social login buttons */}
        <Group grow gap="xs">
            {/* GitHub Button */}
            <UnstyledButton
                onClick={() => signIn("github")}
                className="h-10 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-center rounded-lg transition-colors bg-neutral-50/50 dark:bg-neutral-950/20"
                aria-label="Register with GitHub"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-neutral-900 dark:text-neutral-100">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            </UnstyledButton>

            {/* Google Button */}
            <UnstyledButton
                onClick={() => signIn("google")}
                className="h-10 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-center rounded-lg transition-colors bg-neutral-50/50 dark:bg-neutral-950/20"
                aria-label="Register with Google"
            >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.37 3.65 1.48 7.5l3.87 3C6.27 7.54 8.91 5.04 12 5.04z" />
                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.67-5.02 3.67-8.64z" />
                    <path fill="#FBBC05" d="M5.35 10.5c-.24-.72-.37-1.49-.37-2.3c0-.81.13-1.58.37-2.3L1.48 2.9C.54 4.79 0 6.94 0 9.2c0 2.26.54 4.41 1.48 6.3l3.87-3z" />
                    <path fill="#34A853" d="M12 18.96c-3.09 0-5.73-2.5-6.65-5.96l-3.87 3C3.37 19.85 7.35 22.5 12 22.5c2.93 0 5.61-1.04 7.64-2.82l-3.76-2.91c-1.03.69-2.35 1.19-3.88 1.19z" />
                </svg>
            </UnstyledButton>

            {/* Facebook Button */}
            {/* <UnstyledButton
                className="h-10 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-center rounded-lg transition-colors bg-neutral-50/50 dark:bg-neutral-950/20"
                aria-label="Register with Facebook"
            >
                <svg viewBox="0 0 24 24" fill="#1877F2" className="w-5 h-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            </UnstyledButton> */}
        </Group>

        {/* Footer Navigation */}
        <Text size="xs" className="text-center font-medium text-neutral-500 dark:text-neutral-400 font-sans mt-2">
            Already have an account ? {" "}
            <Anchor component={Link} href="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Sign in
            </Anchor>
        </Text>
    </Stack>
}
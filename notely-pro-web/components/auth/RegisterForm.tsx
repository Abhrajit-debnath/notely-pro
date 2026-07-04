import { TextInput, PasswordInput, Button, Divider, Anchor, Text, Title, Stack, Box, Group, UnstyledButton, Flex, Center } from "@mantine/core";
import Link from "next/link";

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
            {/* Behance Button */}
            <UnstyledButton
                className="h-10 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-center rounded-lg transition-colors bg-neutral-50/50 dark:bg-neutral-950/20"
                aria-label="Register with Behance"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-indigo-700 dark:text-indigo-400">
                    <path d="M8.22 5.25c.6 0 1.16.08 1.66.25.5.17.91.43 1.25.77.34.34.6.76.77 1.26.17.5.25 1.09.25 1.75 0 .82-.17 1.5-.52 2.05-.35.55-.84.97-1.47 1.26.83.27 1.46.73 1.89 1.39.43.66.65 1.48.65 2.47 0 .66-.09 1.27-.27 1.83-.18.56-.47 1.03-.86 1.41-.39.38-.89.67-1.5.87-.61.2-1.34.3-2.18.3H1.5V5.25h6.72zm5.7 3.32h7.32V7.12h-7.32v1.45zm1.53 5.48c0 .88.22 1.58.67 2.11.45.53 1.08.79 1.89.79.43 0 .82-.08 1.17-.23.35-.15.65-.38.89-.68.24-.3.41-.66.52-1.08.11-.42.16-.9.16-1.42h-5.3zm3.76-4.57c-.77 0-1.39.23-1.85.7-.46.47-.7 1.14-.72 2.02h5.11c0-.85-.21-1.51-.64-1.99-.43-.48-1.07-.73-1.9-.73zM5.13 8.3v3.42h2.58c.7 0 1.21-.13 1.53-.38.32-.25.48-.68.48-1.28 0-.6-.16-1.04-.48-1.31-.32-.27-.85-.41-1.57-.41H5.13zm0 6.47v4.06h2.86c.74 0 1.3-.15 1.66-.46.36-.31.54-.78.54-1.41 0-.66-.18-1.15-.54-1.48-.36-.33-.94-.49-1.74-.49H5.13z" />
                </svg>
            </UnstyledButton>

            {/* Google Button */}
            <UnstyledButton
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
            <UnstyledButton
                className="h-10 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-center rounded-lg transition-colors bg-neutral-50/50 dark:bg-neutral-950/20"
                aria-label="Register with Facebook"
            >
                <svg viewBox="0 0 24 24" fill="#1877F2" className="w-5 h-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            </UnstyledButton>
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
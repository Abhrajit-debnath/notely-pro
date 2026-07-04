import BackgroundEffect from "@/components/auth/effects/BackgroundEffect";
import LogoTextEffect from "@/components/auth/effects/LogoEffect";
import { Paper, Box, Text, Title, Flex } from "@mantine/core";

export default function AuthLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <Box className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4 md:p-6 transition-colors duration-300">
            <Paper
                shadow="xl"
                radius="lg"
                withBorder
                className="w-full max-w-240 min-h-150 flex overflow-hidden bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 transition-colors duration-300"
            >
                {/* Left Side: Gradient Visuals (Hidden on small mobile screens) */}
                <Box className="hidden md:flex w-1/2 relative overflow-hidden flex-col justify-between p-10 select-none">
                    {/* The animated strands canvas */}
                    <BackgroundEffect />


                    {/* Dark overlay for text readability */}
                    <Box
                        className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent pointer-events-none"
                        style={{ zIndex: 1 }}
                    />

                    {/* Logo */}
                    <Box className="relative" style={{ zIndex: 10 }}>
                        <Flex align="center" gap={5}>

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-white filter drop-shadow-md"
                            >
                                <path
                                    d="M12 2L13.8 8.2L20.1 7.2L15.3 11.5L19.5 16.3L13.3 14.5L12 22L10.7 14.5L4.5 16.3L8.7 11.5L3.9 7.2L10.2 8.2L12 2Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <LogoTextEffect />
                        </Flex>
                    </Box>

                    {/* Left text panel */}
                    <Box className="relative text-white max-w-85 drop-shadow-md" style={{ zIndex: 10 }}>
                        <Text size="sm" className="opacity-90 font-medium mb-1">
                            You can easily
                        </Text>
                        <Title order={2} className="text-2xl font-bold leading-tight font-sans tracking-tight">
                            Get access to your personal hub for clarity and productivity.
                        </Title>
                    </Box>
                </Box>

                {/* Right Side: Form Content (Full-width on mobile) */}
                <Box className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-white dark:bg-neutral-900 transition-colors duration-300">
                    <Box className="w-full max-w-90">
                        {children}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
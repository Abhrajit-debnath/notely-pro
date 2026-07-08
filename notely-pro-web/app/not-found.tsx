import { Anchor } from "@mantine/core";
import Link from "next/link";
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-8">The page you are looking for does not exist.</p>
            <Anchor c="#ffff" href="/" bg="notely.6" bdrs={"md"} px={10} py={8}>
                Go to Home
            </Anchor>

        </div>
    );
}
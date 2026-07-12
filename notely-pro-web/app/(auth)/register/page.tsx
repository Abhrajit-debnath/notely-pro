import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
    title: 'Register - Notely Pro',
    description: 'Create a new Notely Pro account to access your notes and collaborate with others.',
}

export default function RegisterPage() {
    return <RegisterForm />;
}
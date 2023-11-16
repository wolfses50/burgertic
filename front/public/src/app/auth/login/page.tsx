'use client';

import Link from 'next/link';
import { Form } from '../../../components/auth/Form';
import useAuth from '~/hooks/useAuth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const { user, login } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        console.log(`Login with email: ${email} and password: ${password}`);
        const result = await login(email, password);
        if (result instanceof Error) {
            setError(result.message);
        } else {
            setError(null);
            router.push('/');
        }
    };

    if (user.id !== -1) router.push('/');

    return (
        <>
            {error && (
                <p className="bg-red-200 border-2 border-red-400 rounded-lg p-2 text-red-700">
                    {error}
                </p>
            )}
            <Form title="Login" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 text-lg">
                    <label htmlFor="email">Email</label>
                    <input
                        tabIndex={0}
                        className="border border-gray-400 rounded-lg p-3"
                        type="email"
                        name="email"
                        id="email"
                    />
                </div>
                <div className="flex flex-col gap-2 text-lg">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        className="border border-gray-400 rounded-lg p-3"
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
                <button className="bg-primary p-3 text-white text-xl mt-3 rounded-lg hover:bg-hover active:bg-active">
                    Ingresar
                </button>
                <div className="flex items-center gap-2 mt-2 justify-center">
                    <p>¿No tenés cuenta?</p>{' '}
                    <Link
                        href="/auth/register"
                        className="text-primary underline"
                    >
                        Registrarse
                    </Link>
                </div>
            </Form>
        </>
    );
};

export default Login;

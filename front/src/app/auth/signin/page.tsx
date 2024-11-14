"use client";
import { Loading } from '@/app/components/svg/Loading';
import { AuthContext } from '@/app/context/auth';
import { isEmail } from '@/app/utils/validations';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

type FormData = {
    email   : string,
    password: string,
};

export default function SignIn() {
    const router = useRouter();
    const { loginUser, user, isLoggedIn } = useContext( AuthContext );
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ isFetching, setIsFetching ] = useState<boolean>(false);
    const [ showError, setShowError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string|''>();
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    useEffect(() => {
        if (isLoggedIn && user) {
            router.push('/');
        } else setIsLoading(false)
    }, [ isLoggedIn, user ])

    const onLoginUser = async( { email, password }: FormData ) => {
        setIsFetching(true);
        const { hasError, message } = await loginUser( email, password );
        if(hasError) {
            setShowError(true)
            setErrorMessage(message);
            setIsFetching(false)
            setTimeout(() => setShowError(false), 5000 )
            return;
        }
    }
    if(isLoading) return <Loading height='100px' width='100px' />
    else return (
        <div className='h-full flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-semibold my-2'>Login</h1>
            <div className='w-[300px] h-auto border-2 border-zinc-500 rounded-md p-4'>
                <form onSubmit={handleSubmit(onLoginUser)} className="space-y-4">
                    <div>
                        {showError && (
                            <p className='p-2 my-2 rounded-md bg-red-600 text-cyan-50'>{ errorMessage }</p>
                        )}
                        <label htmlFor="email" className="block text-sm font-medium leading-6 dark:text-white text-black">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                autoComplete="email"
                                className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-transparent dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                { ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: isEmail
                                })}
                            />
                            {errors.email && <p className='text-sm pt-2 text-red-400'>{errors.email.message}</p>}                            
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 dark:text-white text-black">
                                Contraseña
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type='password'
                                autoComplete="current-password"
                                className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-transparent dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                            />
                            {errors.password && <p className='text-sm pt-2 text-red-400'>{errors.password.message}</p>}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link href="/auth/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                ¿Aún no tienes una cuenta?
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button
                            disabled={ isFetching }
                            className="disabled:opacity-70 w-full h-10 content-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {
                                isFetching ? (
                                    <div className='flex justify-center'>
                                        <Loading width='30px' height='30px' />
                                    </div>
                                ) : (
                                    <>Iniciando sessión</>
                                )
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

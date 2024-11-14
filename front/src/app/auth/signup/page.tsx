"use client";
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { isEmail } from '../../utils/validations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/app/context/auth';
import { Loading } from '@/app/components/svg/Loading';
type FormData = {
    name    : string;
    email   : string;
    password: string;
};
export default function SignUp() {
    const router = useRouter();
    const { user, isLoggedIn, registerUser } = useContext( AuthContext );
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ isFetching, setIsFetching ] = useState(false);
    const [ showError, setShowError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string|''>();
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    useEffect(() => {
        if (isLoggedIn && user) {
            router.push('/');
        } else setIsLoading(false)
    }, [ isLoggedIn, user ])

    const onRegisterForm = async( form: FormData ) => {
        setIsFetching(true);
        const { hasError, message } = await registerUser( form.name, form.email, form.password );
        if(hasError) {
            setIsFetching(false)
            setShowError(true)
            setErrorMessage(message);
            setTimeout(() => setShowError(false), 5000 )
            return;
        }
    }
    if(isLoading) return <Loading height='100px' width='100px' />
    else return (
        <div className='h-full flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-semibold my-2'>Registro</h1>
            <div className='w-[300px] h-auto border-2 border-zinc-500 rounded-md p-4'>
                <form className='space-y-2' onSubmit={ handleSubmit(onRegisterForm) }>
                    <div>
                        {showError && (
                            <p className='p-2 my-2 rounded-md bg-red-600 text-cyan-50'>{ errorMessage }</p>
                        )}
                        <label htmlFor="email" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                            Nombre completo
                        </label>
                        <div className="mt-2">
                            <input
                                id="fullName"
                                type="text"
                                required
                                autoComplete="fullName"
                                className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-transparent dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                { ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                            />
                            {errors.name && <p className='text-sm pt-2 text-red-400'>{errors.name.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
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
                        <label htmlFor="password" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                            Contraseña
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                autoComplete="current-password"
                                type="password"
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
                        <div className="text-sm my-2">
                            <Link href='/auth/signin' className="font-semibold text-indigo-600 hover:text-indigo-500">
                                ¿Ya tienes cuenta?
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button
                            disabled={ isFetching }
                            className="disabled:opacity-70 w-full content-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {
                                isFetching ? (
                                    <div className='flex justify-center'>
                                        <Loading width='30px' height='30px' />
                                    </div>
                                ) : (
                                    <>Registrarme</>
                                )
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

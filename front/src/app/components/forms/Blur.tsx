import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Loading } from '../svg/Loading';
import axiosInstance from '@/app/api/axiosInstance';

interface FormData {
  image: FileList;
  blur: number;
}

const Blur: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ isFetching, setIsFetching ] = useState(false);
    const [ showError, setShowError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string|''>();
    const [ urlImage, setUrlImage ] = useState<string>()

    const onSubmit: SubmitHandler<FormData> = async(data) => {
        setIsFetching(true);
        const formData = new FormData();
        formData.append('image', data.image[0]);
        formData.append('blur', data.blur.toString());
        try {
            const { data } = await axiosInstance.post('/images/blur', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUrlImage(data.url);
            setIsFetching(false);
        } catch (error:any) {
            setShowError(true)
            if(error.status === 401) {
                localStorage.removeItem('token');
                setErrorMessage(error.response.data.message);
                setTimeout(() => setShowError(false), 3000 )
                window.location.reload();
                return;
            }
            setErrorMessage(error.response.data.message);
            setTimeout(() => setShowError(false), 5000 )
            setIsFetching(false);
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {showError && (
                        <p className='p-2 my-2 rounded-md bg-red-600 text-cyan-50'>{ errorMessage }</p>
                    )}
                    <label 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                        Upload file
                    </label>
                    <input 
                        id="file_input" 
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                        accept=".jpg, .jpeg, .png"
                        type="file"
                        {...register('image', {
                        required: 'La imagen es requerida',
                        validate: {
                            onlyOneFile: (files) => files?.length === 1 || 'Solo puedes cargar una imagen',
                            isValidFormat: (files) =>
                            files?.[0]?.type === 'image/jpeg' || files?.[0]?.type === 'image/png' || 'Solo se permiten imágenes JPG o PNG'
                        }
                        })}
                    />
                    
                    
                    {errors.image && <p className='text-sm pt-2 text-red-400'>{errors.image.message}</p>}
                </div>

                <div>
                    <label>Blur (Desenfoque):</label>
                    <input
                        className='block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-transparent dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        type="number"
                        {...register('blur', {
                            required: 'El valor de blur es requerido',
                            min: { value: 0, message: 'El valor debe ser mayor o igual a 0' },
                            max: { value: 100, message: 'El valor debe ser menor o igual a 100' },
                        })}
                    />
                    {errors.blur && <p className='text-sm pt-2 text-red-400'>{errors.blur.message}</p>}
                </div>

                <button
                    disabled={ isFetching }
                    className="mt-5 disabled:opacity-70 w-full content-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                        {
                            isFetching ? (
                                <div className='flex justify-center'>
                                    <Loading width='30px' height='30px' />
                                </div>
                            ) : (
                                <>Modificar</>
                            )
                        }
                </button>
            </form>
            <div className='flex flex-col'>
                <h2 className='text-sm font-semibold text-white'>Resultado:</h2>
                {
                    urlImage &&
                    <img 
                        className='fadeIn rounded-lg w-full h-40 object-cover'
                        src={urlImage}
                        alt="Mod" 
                    />
                }
            </div>
        </div>
    );
};

export default Blur;

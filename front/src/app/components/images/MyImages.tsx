import axiosInstance from '@/app/api/axiosInstance'
import React, { useEffect, useState } from 'react'
import { Loading } from '../svg/Loading';

interface Images { 
    id: string
    url: string
}

export const MyImages = () => {
    const [images, setImages] = useState<Images[]>([])
    const [ showError, setShowError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string|''>();
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    useEffect(() => {
        async function fetchImages() {
            try {
                const { data } = await axiosInstance.get('/images')
                setImages(data.images)
            } catch (error:any) {
                if(error.status === 401) {
                    localStorage.removeItem('token');
                    setErrorMessage(error.response.data.message);
                    setTimeout(() => setShowError(false), 3000 )
                    window.location.reload();
                    return;
                }
            }
        }
        fetchImages()
        setIsLoading(false)
    }, [])
 
  if (isLoading) return <Loading width='40px' height='40px' />
  return (
    <div className='grid md:grid-cols-3 grid-cols-2'>
        {showError && (
            <p className='p-2 my-2 rounded-md bg-red-600 text-cyan-50'>{ errorMessage }</p>
        )}
        {
            images.length > 0 ? images.map((image, index) => (
                <div key={index} className='p-2'>
                    <img
                        className='fadeIn rounded-lg w-full h-40 object-cover'
                        src={image.url} 
                        alt={image.id} 
                    />
                </div>
            )) : <>No se encontraron imagenes</>
        }
    </div>
  )
}

"use client";
import { AuthContext } from "./context/auth";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "./components/svg/Loading";
import Blur from "./components/forms/Blur";
import Resize from "./components/forms/Resize";
import GreyScale from "./components/forms/GreyScale";
import { MyImages } from "./components/images/MyImages";
import { AllImages } from "./components/images/AllImages";

export default function Home() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useContext( AuthContext );
  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [ currentOption, setCurrentOption ] = useState<number>(3)

  useEffect(() => {
    if (!user || !isLoggedIn) {
      localStorage.removeItem('token');
      router.push('/auth/signin');
    } else setIsLoading(false)
  }, [user, router, isLoggedIn]);

  if(isLoading) return <Loading width="100px" height="100px" />
  else return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 p-4 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-semibold"> Hola { user?.name }</h1>
        {/* Opciones */}
        <div className="flex flex-col">
          <button onClick={() => setCurrentOption(1)}>
            <p className={`py-2 underline text-start hover:text-indigo-500 ${ currentOption === 1 ? 'text-indigo-500' : ''}`}>Ver todas las imagenes modificadas</p>
          </button>
          <button onClick={() => setCurrentOption(2)}>
            <p className={`py-2 underline text-start hover:text-indigo-500 ${ currentOption === 2 ? 'text-indigo-500' : ''}`}>Ver mis imagenes modificadas</p>
          </button>
          <button onClick={() => setCurrentOption(3)}>
            <p className={`py-2 underline text-start hover:text-indigo-500 ${ currentOption === 3 ? 'text-indigo-500' : ''}`}>Funcionalidades</p>
          </button>
          <button 
            className="py-2 underline text-start hover:text-indigo-500"
            onClick={logout}> Cerrar session </button>
        </div>
        {/* End Opciones */}

        {/* Switch options */}
        <div>
          {(() => {
            switch (currentOption) {
              case 1:
                return <AllImages />;
              case 2:
                return <MyImages />;
              case 3:
                return <>
                {/* Funcionalidades */}
                <div className="gap-2 flex flex-wrap">
                  <button 
                    className={`w-36 rounded-lg font-semibold border-2 border-indigo-600 p-2 hover:bg-indigo-500 ${ currentForm === 1 ? 'bg-indigo-950' : 'bg-transparent' }`}
                    onClick={() => setCurrentForm(1)}>Blur</button>
                  <button 
                    className={`w-36 rounded-lg font-semibold border-2 border-indigo-600 p-2 hover:bg-indigo-500 ${ currentForm === 2 ? 'bg-indigo-950' : 'bg-transparent' }`}
                    onClick={() => setCurrentForm(2)}>Resize</button>
                  <button 
                    className={`w-36 rounded-lg font-semibold border-2 border-indigo-600 p-2 hover:bg-indigo-500 ${ currentForm === 3 ? 'bg-indigo-950' : 'bg-transparent' }`}
                    onClick={() => setCurrentForm(3)}>GrayScale</button>
                </div>
                {/* End Funcionalidades */}
                <div style={{ marginTop: '20px' }}>
                  {(() => {
                    switch (currentForm) {
                      case 1:
                        return <Blur />;
                      case 2:
                        return <Resize />;
                      case 3:
                        return <GreyScale />;
                      default:
                        return <p>Selecciona un formulario</p>;
                    }
                  })()}
                  </div>
                </>
              default:
                return <p>Selecciona un formulario</p>;
            }
          })()}
        </div>
      </main>
    </div>
  );
}

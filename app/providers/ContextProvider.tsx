"use client";
import React, { useEffect, useState } from 'react'
import { GlobalContextProvider } from '../context/GlobalContextProvider';
import { Toaster } from 'react-hot-toast';

interface Props {
    children: React.ReactNode;
}

function ContextProvider({children}: Props) {

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 250)
    }, []);

    if(!isReady){
        return (
            <div className="w-full h-full flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

  return (
    <GlobalContextProvider>
        <Toaster />
        {children}
    </GlobalContextProvider>
  )
}

export default ContextProvider
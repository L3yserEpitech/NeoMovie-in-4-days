"use client"

import NavbarComponents from '@/components/navBar/navBar';
import { useMediaContext } from '@/context/mediaprovider';
import CircularProgress from '@mui/material/CircularProgress';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const { requestSuccess } = useMediaContext();
  
    return (
      <>
        {
        requestSuccess ? (
          <>
            <NavbarComponents />
            {children}
          </>
        ) : <div className="w-screen h-screen flex justify-center items-center">
            <CircularProgress />
        </div>
        }
      </>
    );
  }
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface FormData {
  email: string;
  prenom: string;
  nom: string;
  abonnement: string;
  connected: boolean;
  request: boolean;
  isSessionId: number;
}

interface DataContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [isData, setIsData] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    prenom: "",
    nom: "",
    abonnement: "",
    connected: false,
    request: false,
    isSessionId: 0,
  });

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await fetch('/api/user-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const status = response.status;
        if (status === 200) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            email: data.user.email,
            prenom: data.user.prenom,
            nom: data.user.nom,
            abonnement: data.user.abonnement,
            connected: true,
            request: true,
          }));
          setIsData(true);
          return;
        }
        if (status !== 200) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            request: true,
          }));
          return;
        }
      } catch (error) {
        console.log('Error request authentification : ', error);
      }
    };

    handleData();
  }, []);

  useEffect(() => {
    const verifySessionId = async () => {
      try {
        const response = await fetch('/api/valide-sessionid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await response.json();
        const status = response.status;
        if (status === 401) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            isSessionId: 2,
          }));
          return;
        } else if (status === 200) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            isSessionId: 1,
          }));
        }
      } catch (error) {
        console.log('Error request authentification : ', error);
      }
    };

    if (isData) {
      verifySessionId();
    }
  }, [isData]);

  return (
    <DataContext.Provider value={{ formData, setFormData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useMyContext doit être utilisé dans un DataProvider");
  }

  return context;
};

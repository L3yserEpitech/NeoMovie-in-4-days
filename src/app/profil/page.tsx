"use client"
import "./page.css"
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useMyContext } from "@/context/dataprovider";
import { Spacer } from "@nextui-org/spacer";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function Profil() {

  const { formData, setFormData } = useMyContext();

  const [wichProfil, setWichProfil] = useState('general')
  const [newNom, setNewNom] = useState(formData.nom)
  const [newPrenom, setNewPrenom] = useState(formData.prenom)
  const [newEmail, setNewEmail] = useState(formData.email)
  const [invalidNom, setInvalidNom] = useState(false)
  const [invalidPrenom, setInvalidPrenom] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [successNom, setSuccessNom] = useState(false)
  const [successPrenom, setSuccessPrenom] = useState(false)
  const [successEmail, setSuccessEmail] = useState(false)
  const [errorNom, setErrorNom] = useState("")

  useEffect(() => {
    if (!formData.connected) {
      router.push("/login")
    }
  })

  const router = useRouter()

  const updateNom = async () => {
    if (newNom.length <= 0) {
      setErrorNom('Veuillez enregistrer un nom valide')
      setInvalidNom(true)
      return
    }

    try {
      const response = await fetch('/api/update-nom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({newNom})
      });
      await response.json();
      const status = response.status
      if (status === 200) {
        setFormData({
          ...formData,
          nom : newNom
        })
        setSuccessNom(true)
        return
      }
      if (status !== 200) {
        setErrorNom('Un probleme est survenu')
        return
      }
    } catch (error) {
        console.log('Error request update nom : ', error);
    }
  }

  const updatePrenom = async () => {
    if (newPrenom.length <= 0) {
      setInvalidPrenom(true)
      setErrorNom('Veuillez enregistrer un prenom valide')
      return
    }

    try {
      const response = await fetch('/api/update-prenom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({newPrenom})
      });
      await response.json();
      const status = response.status
      if (status === 200) {
        setFormData({
          ...formData,
          prenom : newPrenom
        })
        setSuccessPrenom(true)
        return
      }
      if (status !== 200) {
        setErrorNom('Un probleme est survenu')
        return
      }
    } catch (error) {
        console.log('Error request update nom : ', error);
    }
  }

  const updateEmail = async () => {
    if (newEmail.length <= 0) {
      setInvalidEmail(true)
      setErrorNom('Veuillez enregistrer un email valide')
      return
    }

    try {
      const response = await fetch('/api/update-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({newEmail})
      });
      await response.json();
      const status = response.status
      if (status === 200) {
        setFormData({
          ...formData,
          email : newEmail
        })
        setSuccessEmail(true)
        return
      }
      if (status !== 200) {
        setErrorNom('Un probleme est survenu')
        return
      }
    } catch (error) {
        console.log('Error request update nom : ', error);
    }
  }

  return (
    <div className="flex mt-20 profilPageContainer">
      <div className="navProfil flex justify-center profilNav">
        <section className="gap-3 flex flex-col text-left">
          <h1 className="font-semibold text-4xl">Profil</h1>
          <Spacer y={2}/>
          <p className="linkProfil text-neutral-200 cursor-pointer" onClick={() => setWichProfil("general")}>General</p>
          <p className="linkProfil text-neutral-200 cursor-pointer" onClick={() => setWichProfil("abonnement")}>Abonnement</p>
        </section>
      </div>
      <section className="profilContainer pl-20 pr-20">
        {
          wichProfil === 'general' ?
            <>
              <div className="bg-black rounded rounded-lg p-10 border border-neutral-900">
                <h1 className="font-semibold text-2xl">Nom</h1>
                <Spacer y={6}/>
                <Input size="sm" 
                  type="text" 
                  label="Votre Nom" 
                  isInvalid={invalidNom}
                  errorMessage={errorNom}
                  onValueChange={setNewNom}
                  value={newNom}
                  description={successNom ? "Votre nom a bien été mis à jour." : null}
                />
                <Spacer y={4}/>
                <Divider orientation="horizontal"></Divider>
                <Spacer y={4}/>
                <Button color="primary" variant="shadow" className="dark:text-white text-black" radius="sm" onClick={updateNom}>
                  Sauvegarder
                </Button>
              </div>
              <Spacer y={8}></Spacer>
              <div className="bg-black rounded rounded-lg p-10 border border-neutral-900">
                <h1 className="font-semibold text-2xl">Prénom</h1>
                <Spacer y={6}/>
                <Input size="sm" 
                  type="text" 
                  label="Votre Prenom"
                  value={newPrenom}
                  onValueChange={setNewPrenom}
                  description={successPrenom ? "Votre prenom a bien été mis à jour." : null}
                  isInvalid={invalidPrenom}
                />
                <Spacer y={4}/>
                <Divider orientation="horizontal"></Divider>
                <Spacer y={4}/>
                <Button color="primary" variant="shadow" className="dark:text-white text-black" radius="sm" onClick={updatePrenom}>
                  Sauvegarder
                </Button>
              </div>
              <Spacer y={8}></Spacer>
              <div className="bg-black rounded rounded-lg p-10 border border-neutral-900">
                <h1 className="font-semibold text-2xl">Email</h1>
                <Spacer y={6}/>
                <Input size="sm" 
                  type="text"
                  label="Votre Email" 
                  onValueChange={setNewEmail}
                  value={newEmail}
                  description={successEmail ? "Votre email a bien été mis à jour." : null}
                  isInvalid={invalidEmail}
                />
                <Spacer y={4}/>
                <Divider orientation="horizontal"></Divider>
                <Spacer y={4}/>
                <Button color="primary" variant="shadow" className="dark:text-white text-black" radius="sm" onClick={updateEmail}>
                  Sauvegarder
                </Button>
              </div>
            </>
          :
          <div className="bg-black rounded rounded-lg p-10 border border-neutral-900">
            <h1 className="font-semibold text-2xl">Abonnement</h1>
            <Spacer y={6}/>
            <Input size="sm"
              readOnly
              type="text" 
              label="Votre Abonnement" 
              value={formData.abonnement}
            />
            <Spacer y={4}/>
            <Divider orientation="horizontal"></Divider>
            <Spacer y={4}/>
            <Button color="primary" variant="shadow" className="dark:text-white text-black" radius="sm" onClick={() => router.push("/abonnement")}>
              Changer d&apos;abonnement
            </Button>
          </div>
        }
      </section>
    </div>
  )
}

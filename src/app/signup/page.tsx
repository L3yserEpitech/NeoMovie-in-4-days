"use client"

import "./page.css"
import React, { useState } from "react";
import { Marquee3D } from "@/components/imageRoller/imageRoller"
import {Input, Spacer, Button, Checkbox, Link} from "@nextui-org/react";

import {EyeFilledIcon} from "./EyeFilledIcon.jsx";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon.jsx";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/context/dataprovider";

export default function Signup() {

  const { formData, setFormData } = useMyContext();

  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [invalidPrenom, setInvalidPrenom] = useState<boolean>(false);
  const [invalidNom, setInvalidNom] = useState<boolean>(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("")
  const [nom, setNom] = useState("")

  const resetForm = () => {
    setPassword("")
    setEmail("")
    setPrenom("")
    setNom("")
  }

  const handleSignup = async () => {

    if (email.length <= 0) {
      setInvalidEmail(true)
      return
    }
    if (password.length <= 0) {
      setInvalidPassword(true)
      return
    }
    if (nom.length <= 0) {
      setInvalidNom(true)
      return
    }
    if (prenom.length <= 0) {
      setInvalidPrenom(true)
      return
    }
    
    try {
      const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, prenom, nom, isRemember })
      });
      const data = await response.json();
      const status = response.status
      if (status === 409) {
        resetForm()
        setInvalidEmail(true)
        return
      }
      if (status === 200) {
        setFormData({
          ...formData,
          email: email,
          prenom: prenom,
          nom: nom,
          abonnement: "free",
          connected: true,
        })
        router.push("/")
      }
    } catch (error) {
        console.log('Error request authentification : ', error);
    }
  }

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="loginContainer">
        <div className="loginFormContainer">
            <div className="loginForm flex w-full h-full justify-center items-center">
              <div className=" rounded-lg m-10 pl-7 pr-7 pt-10 pb-10 borderLoginForm">
                <h1 className="text-2xl font-semibold">Sign Up</h1>
                <Spacer y={2} />
                <h2 className="text-neutral-400">Entrez vos informations pour créer un compte</h2>
                <Spacer y={8} />
                <div className="flex">
                  <Input size="sm" 
                    type="text" 
                    label="Nom" 
                    isInvalid={invalidNom}
                    errorMessage="Veuillez entrer votre nom"
                    onValueChange={setNom}
                    value={nom}
                  />
                  <Spacer x={3} />
                  <Input 
                    size="sm" 
                    type="text" 
                    label="Prénom" 
                    isInvalid={invalidPrenom} 
                    errorMessage="Veuillez entrer votre prenom" 
                    onValueChange={setPrenom} 
                    value={prenom}
                  />
                </div>
                <Spacer y={4} />
                <Input size="sm" 
                  type="email" 
                  label="Email" 
                  isInvalid={invalidEmail} 
                  errorMessage="Veuillez entrer un e-mail valide" 
                  onValueChange={setEmail} 
                  value={email}
                />
                <Spacer y={1} />
                <Input 
                  size="sm"
                  type={isVisible ? "text" : "password"}
                  label="password"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  onValueChange={setPassword} 
                  value={password}
                  isInvalid={invalidPassword}
                  errorMessage="Veuillez entrer un mot de passe valide"
                />
                <Checkbox defaultSelected={false} size="sm" onValueChange={setIsRemember}>Remember me</Checkbox>
                <Spacer y={7} />
                <Button color="primary" variant="shadow" className="w-full dark:text-white text-black" radius="sm" onClick={handleSignup}>
                  Créer un compte
                </Button>
                <Spacer y={4} />
                <p className="text-xs text-neutral-400 w-full text-center">
                  Vous avez déjà un compte ?
                  <Link href="#" underline="always" className="text-xs ml-1" onClick={() => router.push("/login")}>Login</Link>
                </p>
              </div>
            </div>
        </div>
        <div className="imageRollerContainer">
            <Marquee3D></Marquee3D>
        </div>
    </div>
  )
}

"use client"
import "./page.css"
import React, { useState } from "react";

import { Marquee3D } from "@/components/imageRoller/imageRoller"
import {Input, Spacer, Button, Checkbox, Link} from "@nextui-org/react";

import {EyeFilledIcon} from "./EyeFilledIcon.jsx";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon.jsx";
import { useRouter } from "next/navigation";

import { useMyContext } from "@/context/dataprovider";

export default function Login() {

  const { formData, setFormData } = useMyContext();

  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const resetForm = () => {
    setPassword("")
    setEmail("")
  }

  const handleLogin = async () => {
    if (email.length <= 0) {
      setInvalidEmail(true)
      return
    }
    if (password.length <= 0) {
      setInvalidPassword(true)
      return
    }
    
    try {
      const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, isRemember })
      });
      const data = await response.json();
      const status = response.status
      if (status === 404) {
        resetForm()
        setInvalidEmail(true)
        return
      }
      if (status === 401) {
        resetForm()
        setInvalidPassword(true)
        return
      }
      if (status === 200) {
        setFormData({
          ...formData,
          email: data.user.email,
          prenom: data.user.prenom,
          nom: data.user.nom,
          abonnement: data.user.abonnement,
          connected: true,
        })
        router.push("/")
      }
    } catch (error) {
        console.log('Error request authentification : ', error);
    }
  }

  return (
    <div className="loginContainer">
        <div className="loginFormContainer">
            <div className="loginForm flex w-full h-full justify-center items-center">
              <div className=" rounded-lg m-10 pl-7 pr-7 pt-10 pb-10 borderLoginForm">
                <h1 className="text-2xl font-semibold">Login</h1>
                <Spacer y={2} />
                <h2 className="text-neutral-400">Entrez votre e-mail pour vous connecter</h2>
                <Spacer y={8} />
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
                <Button color="primary" variant="shadow" className="w-full dark:text-white text-black" radius="sm" onClick={handleLogin}>
                  Login
                </Button>
                <Spacer y={4} />
                <p className="text-xs text-neutral-400 w-full text-center">
                  Vous n&apos;avez pas de compte ? 
                  <Link href="#" underline="always" className="text-xs ml-1" onClick={() => router.push("/signup")}>Sign Up</Link>
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

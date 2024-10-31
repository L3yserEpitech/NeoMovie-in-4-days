"use client"
import "./page.css"
import React, { useState } from "react";
import { Shield, Laptop, Disc3, Gem, Router } from 'lucide-react';

import { Marquee3D } from "@/components/imageRoller/imageRoller"
import {Input, Spacer, Button, Checkbox, Link, Tabs, Tab} from "@nextui-org/react";

import { useMyContext as useDataContext } from '@/context/dataprovider';
import { useRouter } from "next/navigation";
import {DateInput} from "@nextui-org/date-input";
import {CalendarDate} from "@internationalized/date";

export default function Abonnement() {

    const { formData, setFormData } = useDataContext();

    const router = useRouter()

    const [tabs, setTabs] = useState<any>(null)
    const [payement, setPayement] = useState(false)
    const [planSelected, setPlanSelected] = useState("")
    const [planPrix, setPlanPrix] = useState("")
    const [planEcran, setPlanEcran] = useState("")
    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [codeCarte, setCodeCarte] = useState("")
    const [codeCVV, setCodeCVV] = useState("")

    const [prenomError, setPrenomError] = useState(false)
    const [nomError, setNomError] = useState(false)
    const [codeCarteError, setCodeCarteError] = useState(false)
    const [codeCVVError, setCodeCVVError] = useState(false)


    


    const PayementModal = (key : string, abonnement: string, prix : string, ecran: string) => {
        if (!formData.connected) {
            router.push("/login")
            return
        }
        setPayement(true)
        setPlanSelected(abonnement)
        setPlanPrix(prix)
        setPlanEcran(ecran)
    }

    const submitPayement = async (abonnement: string) => {
        if (nom.length <= 0) {
            setNomError(true)
        }
        if (prenom.length <= 0) {
            setPrenomError(true)
        }
        if (codeCarte.length <= 0) {
            setCodeCarteError(true)
        }
        if (codeCVV.length <= 0) {
            setCodeCVVError(true)
        }

        try {
            const response = await fetch('/api/new-abonnement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ abonnement })
            });
            const status = response.status
            if (status === 404) {
                window.location.reload()
            }
            if (status === 200) {
                setFormData({
                    ...formData,
                    abonnement: abonnement,
                })
                router.push("/")
            }
        } catch (error) {
            console.log('Error request authentification : ', error);
        }
    }

    return (
        <div className="flex container h-[calc(100vh-65px)] w-screen justify-center items-center">
            {
                !payement ?
                    <div className="flex flex-col">
                    <div  className="flex justify-center">
                        <Tabs color="default" aria-label="Tabs colors" radius="full" variant="light" className="text-white" onSelectionChange={(key: React.Key) => setTabs(key)}>
                            <Tab key="mensuel" title="Mensuel"/>
                            <Tab key="annuel" title="Annuel"/>
                        </Tabs>
                    </div>
                    <Spacer y={10}/>
                    <div className="flex justify-center overflow-y-auto">
                        {
                            tabs === "mensuel" ?
                            <div className="flex priceContainer overflow-y-auto">
                                <div className="flex flex-col max-w-[300px] w-[300px] h-[400px] ml-5 mr-5 mt-10 bg-neutral-900 bg-opacity-80 border border-neutral-800 rounded-2xl p-10">
                                    <div className="flex justify-between">
                                        <Shield />
                                    </div>
                                    <Spacer y={4}/>
                                    <h3 className="font-semibold text-md">Personnel</h3>
                                    <Spacer y={2}/>
                                    <p className="text-xs text-neutral-500">Pour les individus qui souhaitent connecter leurs appareils personnels en toute sécurité, gratuitement.</p>
                                    <Spacer y={7}/>
                                    <h2 className="text-2xl font-semibold text-primary">Free</h2>
                                    <Spacer y={12}/>
                                    <div className="flex items-center gap-3">
                                        <Laptop size={15}/>
                                        <p className="text-xs">1 ecran</p>
                                    </div>
                                    <Spacer y={7}/>
                                    <Button color="danger" variant="shadow" onClick={() => PayementModal("free", "Free", "free", "1 ecran")} isDisabled={formData.abonnement === "free"}>
                                        {formData.abonnement === "free" ?
                                            <p className="text-white">Abonnement actuel</p>
                                        :
                                            <p className="text-white">S'abonner maintenant</p>
                                        }
                                    </Button>
                                </div>
                                <div className="flex flex-col max-w-[300px] w-[300px] h-[400px] ml-5 mr-5 mt-10 bg-neutral-900 bg-opacity-80 border border-neutral-800 rounded-2xl p-10">
                                    <div className="flex justify-between">
                                        <Disc3 />
                                    </div>
                                    <Spacer y={4}/>
                                    <h3 className="font-semibold text-md">Starter</h3>
                                    <Spacer y={2}/>
                                    <p className="text-xs text-neutral-500">Pour les individus qui souhaitent connecter leurs appareils personnels en toute sécurité, gratuitement.</p>
                                    <Spacer y={7}/>
                                    <h2 className="text-2xl font-semibold text-primary flex items-end gap-3">$2.99<p className="text-white text-xs">/mois</p></h2>
                                    <Spacer y={12}/>
                                    <div className="flex items-center gap-3">
                                        <Laptop size={15}/>
                                        <p className="text-xs">3 ecran</p>
                                    </div>
                                    <Spacer y={7}/>
                                    <Button color="danger" variant="shadow" onClick={() => PayementModal("starter", "Starter", "$2.99", "3 ecrans")} isDisabled={formData.abonnement === "starter"}>
                                        {formData.abonnement === "starter" ?
                                            <p className="text-white">Abonnement actuel</p>
                                        :
                                            <p className="text-white">S'abonner maintenant</p>
                                        }
                                    </Button>
                                </div>
                                <div className="flex flex-col max-w-[300px] w-[300px] h-[400px] ml-5 mr-5 mt-10 bg-neutral-900 bg-opacity-80 border border-neutral-800 rounded-2xl p-10">
                                    <div className="flex justify-between">
                                        <Gem />
                                    </div>
                                    <Spacer y={4}/>
                                    <h3 className="font-semibold text-md">Premium</h3>
                                    <Spacer y={2}/>
                                    <p className="text-xs text-neutral-500">Pour les individus qui souhaitent connecter leurs appareils personnels en toute sécurité, gratuitement.</p>
                                    <Spacer y={7}/>
                                    <h2 className="text-2xl font-semibold text-primary flex items-end gap-3">$6.99<p className="text-white text-xs">/mois</p></h2>
                                    <Spacer y={12}/>
                                    <div className="flex items-center gap-3">
                                        <Laptop size={15}/>
                                        <p className="text-xs">10 ecran</p>
                                    </div>
                                    <Spacer y={7}/>
                                    <Button color="danger" variant="shadow" onClick={() => PayementModal("premium", "Premium", "$6.99", "10 ecrans")} isDisabled={formData.abonnement === "premium"}>
                                        {formData.abonnement === "premium" ?
                                            <p className="text-white">Abonnement actuel</p>
                                        :
                                            <p className="text-white">S'abonner maintenant</p>
                                        }
                                    </Button>
                                </div>
                            </div>
                            :
                            <div className="flex priceContainer overflow-y-auto">
                                <div className="flex flex-col max-w-[300px] w-[300px] h-[400px] ml-5 mr-5 mt-10 bg-neutral-900 bg-opacity-80 border border-neutral-800 rounded-2xl p-10">
                                    <div className="flex justify-between">
                                        <Shield />
                                    </div>
                                    <Spacer y={4}/>
                                    <h3 className="font-semibold text-md">Personnel</h3>
                                    <Spacer y={2}/>
                                    <p className="text-xs text-neutral-500">Pour les individus qui souhaitent connecter leurs appareils personnels en toute sécurité, gratuitement.</p>
                                    <Spacer y={7}/>
                                    <h2 className="text-2xl font-semibold text-primary">Free</h2>
                                    <Spacer y={12}/>
                                    <div className="flex items-center gap-3">
                                        <Laptop size={15}/>
                                        <p className="text-xs">1 ecran</p>
                                    </div>
                                    <Spacer y={7}/>
                                    <Button color="danger" variant="shadow" onClick={() => PayementModal("free", "Free", "free", "1 ecran")} isDisabled={formData.abonnement === "free"}>
                                        {formData.abonnement === "free" ?
                                            <p className="text-white">Abonnement actuel</p>
                                        :
                                            <p className="text-white">S'abonner maintenant</p>
                                        }
                                    </Button>
                                </div>
                                <div className="flex flex-col max-w-[300px] w-[300px] h-[400px] ml-5 mr-5 mt-10 bg-neutral-900 bg-opacity-80 border border-neutral-800 rounded-2xl p-10">
                                    <div className="flex justify-between">
                                        <Disc3 />
                                    </div>
                                    <Spacer y={4}/>
                                    <h3 className="font-semibold text-md">Starter</h3>
                                    <Spacer y={2}/>
                                    <p className="text-xs text-neutral-500">Pour les individus qui souhaitent connecter leurs appareils personnels en toute sécurité, gratuitement.</p>
                                    <Spacer y={7}/>
                                    <h2 className="text-2xl font-semibold text-primary flex items-end gap-3">$1.99<p className="text-white text-xs">/mois</p></h2>
                                    <Spacer y={12}/>
                                    <div className="flex items-center gap-3">
                                        <Laptop size={15}/>
                                        <p className="text-xs">3 ecran</p>
                                    </div>
                                    <Spacer y={7}/>
                                    <Button color="danger" variant="shadow" onClick={() => PayementModal("starter", "Starter", "$1.99", "3 ecrans")} isDisabled={formData.abonnement === "starter"}>
                                        {formData.abonnement === "starter" ?
                                            <p className="text-white">Abonnement actuel</p>
                                        :
                                            <p className="text-white">S'abonner maintenant</p>
                                        }
                                    </Button>
                                </div>
                                <div className="flex flex-col max-w-[300px] w-[300px] h-[400px] ml-5 mr-5 mt-10 bg-neutral-900 bg-opacity-80 border border-neutral-800 rounded-2xl p-10">
                                    <div className="flex justify-between">
                                        <Gem />
                                    </div>
                                    <Spacer y={4}/>
                                    <h3 className="font-semibold text-md">Premium</h3>
                                    <Spacer y={2}/>
                                    <p className="text-xs text-neutral-500">Pour les individus qui souhaitent connecter leurs appareils personnels en toute sécurité, gratuitement.</p>
                                    <Spacer y={7}/>
                                    <h2 className="text-2xl font-semibold text-primary flex items-end gap-3">$3.99<p className="text-white text-xs">/mois</p></h2>
                                    <Spacer y={12}/>
                                    <div className="flex items-center gap-3">
                                        <Laptop size={15}/>
                                        <p className="text-xs">10 ecran</p>
                                    </div>
                                    <Spacer y={7}/>
                                    <Button color="danger" variant="shadow" onClick={() => PayementModal("premium", "Premium", "$3.99", "10 ecrans")} isDisabled={formData.abonnement === "premium"}>
                                        {formData.abonnement === "premium" ?
                                            <p className="text-white">Abonnement actuel</p>
                                        :
                                            <p className="text-white">S'abonner maintenant</p>
                                        }
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            :
                <div className="loginContainer">
                    <div className="loginFormContainer">
                        <div className="loginForm flex w-full h-full justify-center items-center">
                            <div className=" rounded-lg m-10 pl-7 pr-7 pt-10 pb-10 borderLoginForm">
                                <h1 className="text-2xl font-semibold">{planSelected}</h1>
                                <Spacer y={2} />
                                <h2 className="text-neutral-400 max-w-[300px]">Finalise ton paiement en renseignant les informations suivantes :</h2>
                                <Spacer y={8} />
                                <div className="flex gap-4">
                                    <Input size="sm"
                                        type="text" 
                                        label="Nom" 
                                        required
                                        errorMessage="Veuillez entrer un nom valide"
                                        isInvalid={nomError}
                                        onValueChange={setNom} 
                                    />
                                    <Input size="sm"
                                        type="text" 
                                        label="Prenom" 
                                        errorMessage="Veuillez entrer un prenom valide"
                                        required
                                        isInvalid={prenomError}
                                        onValueChange={setPrenom} 
                                    />
                                </div>
                                <Spacer y={1} />
                                <Input size="sm"
                                    required
                                    type="text" 
                                    label="Numero de carte" 
                                    errorMessage="Veuillez entrer un numero de carte valide"
                                    isInvalid={codeCarteError}
                                    onValueChange={setCodeCarte} 
                                />
                                <Spacer y={1} />
                                <div className="flex gap-4 flex-wrap md:flex-nowrap">
                                    <DateInput label={"Birth date"}  size="sm" placeholderValue={new CalendarDate(2023, 11, 6)} className="max-w-sm" />
                                    <Input size="sm"
                                        type="text" 
                                        label="CVV" 
                                        errorMessage="Veuillez entrer un numero de CVV valide"
                                        required
                                        isInvalid={codeCVVError}
                                        onValueChange={setCodeCVV} 
                                    />
                                </div>
                                <Spacer y={4} />
                                <div className="flex items-center gap-3">
                                    <Laptop size={15}/>
                                    <p className="text-xs">{planEcran}</p>
                                </div>
                                <Spacer y={7} />
                                <Button color="primary" variant="shadow" className="w-full dark:text-white text-black" radius="sm" onClick={() => submitPayement(planSelected.toLowerCase())}>
                                    {planPrix}
                                </Button>
                                <Spacer y={4} />
                            </div>
                        </div>
                    </div>
                    <div className="imageRollerContainer">
                        <Marquee3D></Marquee3D>
                    </div>
                </div>
            }
        </div>
    )
}

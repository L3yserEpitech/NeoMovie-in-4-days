"use client"

import "@/app/globals.css"

import React from "react";
import { useRouter } from "next/navigation";
import {
  Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, 
  NavbarMenu, NavbarContent, NavbarItem, Link, Button, DropdownItem, 
  DropdownTrigger, Dropdown, DropdownMenu, Avatar, 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  CircularProgress, Skeleton
} from "@nextui-org/react";
import { useMyContext } from "@/context/dataprovider";

export default function NavbarComponents() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { formData, setFormData } = useMyContext();

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const router = useRouter()

  const menuItems = [
    "Accueil",
    "Films",
    "Séries",
    "Profil",
    "Abonnement",
  ];

  const handleLogOut = async () => {
    console.log("e[knaein aenhiapoha")
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email : formData.email })
    });
    if (response.status === 401) {
      window.location.reload()
    }
    if (response.status === 200) {
      setFormData({
        ...formData,
        email: "",
        prenom: "",
        nom: "",
        abonnement: "",
        connected: false,
      })
      router.push("/")
    }
  }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="max-w-full"
      isBlurred={true}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">NEOMOVIE</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit mr-10">NEOMOVIE</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#" onClick={() => router.push("/")}>
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link  href="#" aria-current="page" onClick={() => router.push("/films")}>
            Films
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link  href="#" aria-current="page" onClick={() => router.push("/series")}>
            Séries
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" onClick={() => router.push("/profil")}>
            Profil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" onClick={() => router.push("/abonnement")}>
            Abonnement
          </Link>
        </NavbarItem>
      </NavbarContent>

      {
        formData.request ? (
          formData.connected ? (
            <NavbarContent as="div" justify="end">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?img=33"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem className="h-14 gap-2">
                    <p className="font-semibold">Connecté en tant que</p>
                    <p className="font-semibold">{formData.email}</p>
                  </DropdownItem>
                  <DropdownItem key="settings" onClick={() => router.push("/profil")}>Mon profil</DropdownItem>
                  <DropdownItem key="help_and_feedback">Aide & Retour</DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={onOpen}>
                    Se déconnecter
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          ) : (
            <NavbarContent justify="end">
              <NavbarItem className="hidden lg:flex">
                <Link href="#" onClick={() => router.push("/login")}>Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color="primary" className="text-white" href="#" variant="solid" onClick={() => router.push("/signup")}>
                  Sign Up
                </Button>
              </NavbarItem>
            </NavbarContent>
          )
        ) : (
          null
        )
      }

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                item === "Accueil" ? "foreground" :
                item === "Films" ? "primary" :
                item === "Séries" ? "primary" :
                item === "Profil" ? "foreground" :
                item === "Abonnement" ? "warning" :
                "foreground"
              }
              href="#"
              size="lg"
              onClick={() => {
                setIsMenuOpen(false)
                const path = 
                  item === "Accueil" ? "/" :
                  item === "Films" ? "/films" :
                  item === "Séries" ? "/series" :
                  item === "Profil" ? "/profil" :
                  item === "Abonnement" ? "/abonnement" :
                  "/";
                  
                router.push(path);

              }}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Êtes-vous sûr de vous déconnecter ?</ModalHeader>
              <ModalBody>
                <Button color="danger" variant="light" onPress={onClose} onClick={handleLogOut}>
                  Se déconnecter
                </Button>
                <Button color="primary" onPress={onClose}>
                  Annuler
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Navbar>
  );
}

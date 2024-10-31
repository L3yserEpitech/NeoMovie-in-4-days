"use client"
import "./page.css"
import React, { useState, useEffect } from "react";
import { Shield, Laptop, Disc3, Gem, Router } from 'lucide-react';

import { Marquee3D } from "@/components/imageRoller/imageRoller"
import {Input, Spacer, Button, Checkbox, Link, Tabs, Tab} from "@nextui-org/react";

import { useMyContext as useDataContext } from '@/context/dataprovider';
import { useRouter } from "next/navigation";
import {DateInput} from "@nextui-org/date-input";
import {CalendarDate} from "@internationalized/date";

import { useMediaContext } from '@/context/mediaprovider';
import { ScrollShadow } from "@nextui-org/react";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/pagination";
import { Divider } from "@nextui-org/divider";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Films() {

    const { formData, setFormData } = useDataContext();
    const router = useRouter()

    const MovieCategories = () => {

      const selectedMedia = (
        title: string, 
        overview: string, 
        release_date: string, 
        vote_average: number, 
        backdrop_path: string, 
        poster_path: string
      ) => {
        setMediaSelected((prevState) => ({
          ...prevState,
          title: title,
          overview: overview,
          release_date: release_date,
          vote_average: vote_average,
          backdrop_path: backdrop_path,
          poster_path: poster_path,
          isSelected: true,
        }));
        window.location.hash = '#top-of-page';
      };

    const { tvShowTriByGenre } = useMediaContext();
    
    useEffect(() => {
        if (tvShowTriByGenre && Object.keys(tvShowTriByGenre).length > 0) {
            const firstCategory = Object.keys(tvShowTriByGenre)[0];
            const firstMovie = tvShowTriByGenre[firstCategory][0];

            if (firstMovie) {
                setMediaSelected((prevState) => ({
                    ...prevState,
                    title: firstMovie?.title,
                    overview: firstMovie?.overview,
                    release_date: firstMovie?.release_date,
                    vote_average: firstMovie?.vote_average,
                    backdrop_path: firstMovie?.backdrop_path,
                    poster_path: firstMovie?.poster_path,
                    isSelected: true,
                }))
            }
        }
    }, [tvShowTriByGenre]);

      // Vérifie que tvShowTriByGenre existe et qu'il n'est pas nul
      if (!tvShowTriByGenre || Object.keys(tvShowTriByGenre).length === 0) {
        return <p>Loading...</p>; // Affiche un message de chargement ou un autre contenu temporaire
      }

      const [mediaSelected, setMediaSelected] = useState({
        title: "",
        overview: "",
        release_date: "",
        vote_average: 0,
        backdrop_path: "",
        poster_path: "",
        isSelected: false,
      });
    
      return (
        <>
            {
                mediaSelected.isSelected ? (
                <div className="image-container flex flex-col fade-in" id="top-of-page">
                    <img
                    src={`https://image.tmdb.org/t/p/original/${mediaSelected.backdrop_path}`}
                    alt="Image"
                    className="fade-image"
                    />
                    <div className="overlay-text">
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${mediaSelected.poster_path}`}
                            alt="Image"
                            className="h-[220px] rounded-md pl-[85px]"
                        />
                        <div className="flex flex-col text-left ml-6 max-w-[700px]">
                            <h1 className="text-3xl font-semibold">{mediaSelected.title}</h1>
                            <Spacer y={2} />
                                <p className="text-neutral-200">{mediaSelected.overview}</p>
                            <Spacer y={2} />
                            <p className="flex gap-1">
                                Note :<span className="text-primary font-bold">{mediaSelected.vote_average}</span>/ 10
                            </p>
                            <Spacer y={1} />
                            <p className="flex gap-1">
                                Réalisé le :<p className="text-primary">{mediaSelected.release_date}</p>
                            </p>
                        </div>
                    </div>
                </div>
                ) : null
            }
            {
                Object.keys(tvShowTriByGenre).map((category) => {
                    const moviesInCategory = tvShowTriByGenre[category];
                    
                    // Vérifier si la catégorie contient des films ou séries
                    if (moviesInCategory.length === 0) {
                    return null; // Ne pas afficher cette catégorie si elle est vide
                    }

                    return (
                        <div key={category} className="mt-10 flex flex-col items-center">
                            {/* Afficher le nom de la catégorie */}
                            <h2 className="font-semibold text-2xl text-left w-full pl-[85px]">{category}</h2>
                            <Spacer y={3} />
                            <Carousel className="w-full max-w-carousel">
                            <CarouselContent className="-ml-1">
                                {moviesInCategory.map((movie: any, index: number) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-1 flex-1 min-w-[120px] md:min-w-[200px] lg:min-w-[220px] xl:min-w-[160px] max-w-[300px]"
                                >
                                    <div className="p-1 justify-center flex h-[220px] cursor-pointer"
                                    onClick={() => selectedMedia(movie?.title || movie?.name, movie?.overview, movie?.release_date || movie?.first_air_date, movie?.vote_average, movie?.backdrop_path, movie?.poster_path)}
                                    >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={movie.title || "Image du film"}
                                    />
                                    </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                            </Carousel>
                        </div>
                        );
                    })
                }

        </>
      );
    };

    return (
        <div className="w-full">
            <div className="flex-grow overflow-y-none">
                <MovieCategories />
            </div>
        </div>
    )
}

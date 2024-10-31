"use client";

import React, { useEffect, useState } from 'react';
import { useMyContext as useDataContext } from '@/context/dataprovider';
import { useMediaContext } from '@/context/mediaprovider';
import { ScrollShadow } from "@nextui-org/react";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/pagination";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Spacer } from "@nextui-org/spacer";
import { Divider } from "@nextui-org/divider";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const { formData, setFormData } = useDataContext();
  const { popularMovie, popularTV, movieNowPlaying, allMovieTri } = useMediaContext();
  const [popTabs, setPopTabs] = useState<string | any>("films");

  const [mediaSelected, setMediaSelected] = useState({
    title: "",
    overview: "",
    release_date: "",
    vote_average: 0,
    backdrop_path: "",
    poster_path: "",
    isSelected: false,
  });

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

  useEffect(() => {
    if (!mediaSelected.isSelected && Array.isArray(movieNowPlaying) && movieNowPlaying.length > 0) {
      setMediaSelected((prevState) => ({
        ...prevState,
        title: movieNowPlaying[0]?.title,
        overview: movieNowPlaying[0]?.overview,
        release_date: movieNowPlaying[0]?.release_date,
        vote_average: movieNowPlaying[0]?.vote_average,
        backdrop_path: movieNowPlaying[0]?.backdrop_path,
        poster_path: movieNowPlaying[0]?.poster_path,
        isSelected: true,
      }));
    }
  }, [movieNowPlaying]);

  const CarouselActualMovie = () => {
    return (
      <Carousel className="w-full max-w-carousel">
        <CarouselContent className="-ml-1">
          {Array.from({ length: movieNowPlaying?.length || 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 flex-1 min-w-[160px] md:min-w-[160px] lg:min-w-[160px] xl:min-w-[160px] max-w-[300px]"
            >
              {movieNowPlaying && movieNowPlaying.length > 0 ? (
                <div 
                  className="p-1 justify-center flex h-[220px] max-w-[156px] w-[156px] cursor-pointer" 
                  onClick={() => selectedMedia(movieNowPlaying[index]?.title, movieNowPlaying[index]?.overview, movieNowPlaying[index]?.release_date, movieNowPlaying[index]?.vote_average, movieNowPlaying[index]?.backdrop_path, movieNowPlaying[index]?.poster_path)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movieNowPlaying[index]?.poster_path}`}
                    alt=""
                  />
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  };
  
  const PopularMovieContainer = () => {
    return (
      <>
        {popularMovie ? (
          <ul>
            {popularMovie.map((movie: any,) => (
              <li
                className="h-[120px] flex cursor-pointer hover:bg-neutral-900 rounded-md transition-all duration-200 ease mb-4"
                key={movie.id}
              >
                <img
                  className="max-w-[80px] max-h-[120px] rounded-md"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="img movie"
                />
                <div className="flex flex-col ml-3 justify-end pb-3 pr-3"
                  onClick={() => selectedMedia(movie.title, movie?.overview, movie?.release_date, movie?.vote_average, movie?.backdrop_path, movie?.poster_path)}
                >
                  <h2 className="font-semibold text-sm">{movie.title}</h2>
                  <Spacer y={3} />
                  <p className="text-xs text-neutral-300">{movie.release_date}</p>
                  <Spacer y={1} />
                  <p className="text-xs font-semibold flex gap-1">
                    Note :<span className="text-primary font-bold">{movie.vote_average}</span>/ 10
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
  };

  const PopularTVContainer = () => {
    return (
      <>
        {popularTV ? (
          <ul>
            {popularTV.map((tv: any) => (
              <li
                className="h-[120px] flex cursor-pointer hover:bg-neutral-900 rounded-md transition-all duration-200 ease mb-4"
                key={tv.id}
              >
                <img
                  className="max-w-[80px] max-h-[120px] rounded-md"
                  src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                  alt="img tv"
                />
                <div className="flex flex-col ml-3 justify-end pb-3 pr-3"
                onClick={() => selectedMedia(tv.name, tv?.overview, tv?.first_air_date, tv?.vote_average, tv?.backdrop_path, tv?.poster_path)}>
                  <h2 className="font-semibold text-sm">{tv.name}</h2>
                  <Spacer y={3} />
                  <p className="text-xs text-neutral-300">{tv.first_air_date}</p>
                  <Spacer y={1} />
                  <p className="text-xs font-semibold flex gap-1">
                    Note :<span className="text-primary font-bold">{tv.vote_average}</span>/ 10
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
  };

  const MovieCategories = () => {
    const { allMovieTri } = useMediaContext();
  
    // Vérifie que allMovieTri existe et qu'il n'est pas nul
    if (!allMovieTri || Object.keys(allMovieTri).length === 0) {
      return <p>Loading...</p>; // Affiche un message de chargement ou un autre contenu temporaire
    }
  
    return (
      <>
        {Object.keys(allMovieTri).map((category) => (
          <div key={category} className="mt-10 flex flex-col items-center">
            {/* Afficher le nom de la catégorie */}
            <h2 className="font-semibold text-2xl text-left w-full pl-[85px]">{category}</h2>
            <Spacer y={3} />
  
            {/* Afficher un carousel pour chaque catégorie */}
            <Carousel className="w-full max-w-carousel">
              <CarouselContent className="-ml-1">
                {allMovieTri[category].map((movie: any, index: number) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 flex-1 min-w-[160px] md:min-w-[160px] lg:min-w-[160px] xl:min-w-[160px] max-w-[300px]"
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
        ))}
      </>
    );
  };

  return (
    <div className="flex container">
      <div className="popularContainer flex flex-col h-screen max-h-[calc(100vh-65px)] overflow-y-none">
        <div className="popContainer h-screen max-h-[calc(100vh-150px)] m-10 p-7 pt-10 rounded-lg bg-opacity-50 flex flex-col">
          <h1 className="font-semibold text-3xl ml-3">Populaires</h1>
          <Spacer y={5} />
          <Tabs
            size="md"
            aria-label="Tabs sizes"
            variant="underlined"
            fullWidth
            color="primary"
          >
            <Tab key="films" title="Films" />
            <Tab key="series" title="Series" />
          </Tabs>
          <Spacer y={5} />
          <div className="overflow-y-auto">
            {popTabs === "series" ? <PopularTVContainer /> : <PopularMovieContainer />}
          </div>
        </div>
      </div>
      <div className="mediaContainer overflow-y-auto max-h-[calc(100vh-65px)] overflow-y-none">
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
              <div className="textContainer flex flex-col text-left ml-6 max-w-[700px]">
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
      <div className="allMedia flex flex-col overflow-y-auto">
        <div className="mt-10 flex flex-col items-center">
          <h2 className="font-semibold text-2xl text-left w-full pl-[85px]">
            Actuellement au Cinema
          </h2>
          <Spacer y={3} />
          <CarouselActualMovie />
        </div>
        <div className="flex-grow overflow-y-hidden">
          <MovieCategories />
        </div>
      </div>
      </div>
    </div>
  );
}

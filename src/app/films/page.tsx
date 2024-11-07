"use client";
/* eslint-disable @next/next/no-img-element */
import "./page.css";
import React, { useState } from "react";
import { Spacer } from "@nextui-org/react";
import { useMediaContext } from "@/context/mediaprovider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Movie {
  title?: string;
  name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
}

export default function Films() {
  const MovieCategories = () => {
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
      window.location.hash = "#top-of-page";
    };

    const { movieTriByGenre } = useMediaContext();

    if (!movieTriByGenre || Object.keys(movieTriByGenre).length === 0) {
      return <p>Loading...</p>;
    }

    return (
      <>
        {mediaSelected.isSelected ? (
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
        ) : null}
        {Object.keys(movieTriByGenre).map((category) => {
          const moviesInCategory = movieTriByGenre[category] as Movie[];

          if (moviesInCategory.length === 0) {
            return null;
          }

          return (
            <div key={category} className="mt-10 flex flex-col items-center">
              <h2 className="font-semibold text-2xl text-left w-full pl-[85px]">{category}</h2>
              <Spacer y={3} />
              <Carousel className="w-full max-w-carousel">
                <CarouselContent className="-ml-1">
                  {moviesInCategory.map((movie, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 flex-1 min-w-[120px] md:min-w-[200px] lg:min-w-[220px] xl:min-w-[160px] max-w-[300px]"
                    >
                      <div
                        className="p-1 justify-center flex h-[220px] cursor-pointer"
                        onClick={() =>
                          selectedMedia(
                            movie.title || movie.name || "",
                            movie.overview,
                            movie.release_date || movie.first_air_date || "",
                            movie.vote_average,
                            movie.backdrop_path,
                            movie.poster_path
                          )
                        }
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
        })}
      </>
    );
  };

  return (
    <div className="w-full">
      <div className="flex-grow overflow-y-none">
        <MovieCategories />
      </div>
    </div>
  );
}

"use client";

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMyContext } from '@/context/dataprovider';

// Créer le contexte pour stocker les données des films et séries populaires
const MediaContext = createContext<any | undefined>(undefined);

interface MediaData {
  popularMovie: any;
  popularTV: any;
  movieNowPlaying : any;
  allMovie: any;
  allMovieTri: any;
  requestSuccess: any;
  movieTriByGenre: any;
  tvShowTriByGenre: any;
}

interface MediaProviderProps {
  children: React.ReactNode;
}

const genresList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

// Exporter le MediaProvider
export const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
  const router = useRouter();
  const { formData } = useMyContext(); // Si vous avez besoin des données du DataProvider

  // Utiliser useState pour stocker les données des films et séries populaires
  const [mediaData, setMediaData] = useState<MediaData>({
    popularMovie: null,
    popularTV: null,
    movieNowPlaying: null,
    allMovie: null,
    allMovieTri: null,
    requestSuccess: null,
    movieTriByGenre: null,
    tvShowTriByGenre: null,
  });

  // Utiliser useEffect pour récupérer les films populaires à partir de l'API
  useEffect(() => {
    const allRequest = async () => {
      const getPopularMovieList = async () => {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGE3NGZkY2E0MjBjYjdkMDAxZDhhOGNmZTU2NWI4MiIsIm5iZiI6MTcyOTI0MzY5My4zODMyMjMsInN1YiI6IjY3MGU0Y2Y5YjE1ZDk3YjFhOTNkODI1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._LbjCEP9sCsKOw3TRqU0VNFk5AUe4pBvXzKj4leyOoc`,
          },
        };
  
        try {
          const response = await fetch(url, options);
          const data = await response.json();
  
          // Utilisation de prevState pour mettre à jour popularMovie
          setMediaData((prevState) => ({
            ...prevState,
            popularMovie: data.results,
          }));
        } catch (error) {
          console.error('Error fetching movie data:', error);
        }
      };
  
      const getPopularTVList = async () => {
        const url = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGE3NGZkY2E0MjBjYjdkMDAxZDhhOGNmZTU2NWI4MiIsIm5iZiI6MTcyOTI0MzY5My4zODMyMjMsInN1YiI6IjY3MGU0Y2Y5YjE1ZDk3YjFhOTNkODI1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._LbjCEP9sCsKOw3TRqU0VNFk5AUe4pBvXzKj4leyOoc`,
          },
        };
        try {
          const response = await fetch(url, options);
          const data = await response.json();
  
          // Utilisation de prevState pour mettre à jour popularTV
          setMediaData((prevState) => ({
            ...prevState,
            popularTV: data.results,
          }));
        } catch (error) {
          console.error('Error fetching TV data:', error);
        }
      };
  
      const getMovieNowPlaying = async () => {
        const allMovies: any[] = []; // Tableau pour stocker tous les résultats
      
        // Boucle sur 5 pages
        for (let page = 1; page <= 3; page++) {
          const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGE3NGZkY2E0MjBjYjdkMDAxZDhhOGNmZTU2NWI4MiIsIm5iZiI6MTcyOTI0MzY5My4zODMyMjMsInN1YiI6IjY3MGU0Y2Y5YjE1ZDk3YjFhOTNkODI1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._LbjCEP9sCsKOw3TRqU0VNFk5AUe4pBvXzKj4leyOoc`,
            }
          };
      
          try {
            const response = await fetch(url, options);
            const data = await response.json();
      
            // Ajout des résultats de chaque page dans le tableau global
            allMovies.push(...data.results);
          } catch (error) {
            console.error('Error fetching movies on page ' + page, error);
          }
        }
      
        // Après la boucle, on met à jour l'état avec tous les films récupérés
        setMediaData((prevState) => ({
          ...prevState,
          movieNowPlaying: allMovies,
        }));
      };
  
      const getAllMedia = async () => {
        const allMovies: any[] = []; // Tableau pour stocker tous les films
        const allTVShows: any[] = []; // Tableau pour stocker toutes les séries
        const allMovieTri: { [key: string]: any[] } = {}; // Pour stocker les films et séries triés par genre
        const movieTriByGenre: { [key: string]: any[] } = {}; // Pour stocker uniquement les films triés par genre
        const tvShowTriByGenre: { [key: string]: any[] } = {}; // Pour stocker uniquement les séries triées par genre
      
        // Initialiser chaque genre dans les objets allMovieTri, movieTriByGenre et tvShowTriByGenre
        genresList.forEach((genre) => {
          allMovieTri[genre.name] = [];
          movieTriByGenre[genre.name] = [];
          tvShowTriByGenre[genre.name] = [];
        });
      
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGE3NGZkY2E0MjBjYjdkMDAxZDhhOGNmZTU2NWI4MiIsIm5iZiI6MTcyOTI0MzY5My4zODMyMjMsInN1YiI6IjY3MGU0Y2Y5YjE1ZDk3YjFhOTNkODI1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._LbjCEP9sCsKOw3TRqU0VNFk5AUe4pBvXzKj4leyOoc`
          }
        };
      
        // Fonction pour récupérer les films populaires
        const fetchMovies = async () => {
          for (let page = 1; page <= 7; page++) {
            const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
            try {
              const response = await fetch(url, options);
              const data = await response.json();
      
              // Ajout des résultats de chaque page dans le tableau global des films
              allMovies.push(...data.results);
      
              // Trier chaque film par genre
              data.results.forEach((movie: any) => {
                movie.genre_ids.forEach((genreId: number) => {
                  const genre = genresList.find((g) => g.id === genreId);
                  if (genre) {
                    // Ajouter le film dans le tableau commun et le tableau de films par genre
                    allMovieTri[genre.name].push(movie); // Ajout dans le tableau commun
                    movieTriByGenre[genre.name].push(movie); // Ajout uniquement dans le tableau des films
                  }
                });
              });
            } catch (error) {
              console.error('Error fetching movies on page ' + page, error);
            }
          }
        };
      
        // Fonction pour récupérer les séries populaires
        const fetchTVShows = async () => {
          for (let page = 1; page <= 7; page++) {
            const url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;
            try {
              const response = await fetch(url, options);
              const data = await response.json();
      
              // Ajout des résultats de chaque page dans le tableau global des séries
              allTVShows.push(...data.results);
      
              // Trier chaque série par genre
              data.results.forEach((tvShow: any) => {
                tvShow.genre_ids.forEach((genreId: number) => {
                  const genre = genresList.find((g) => g.id === genreId);
                  if (genre) {
                    // Ajouter la série dans le tableau commun et le tableau de séries par genre
                    allMovieTri[genre.name].push(tvShow); // Ajout dans le tableau commun
                    tvShowTriByGenre[genre.name].push(tvShow); // Ajout uniquement dans le tableau des séries
                  }
                });
              });
            } catch (error) {
              console.error('Error fetching TV shows on page ' + page, error);
            }
          }
        };
      
        // Attendre que les films et les séries soient récupérés
        await Promise.all([fetchMovies(), fetchTVShows()]);
      
        // Après la récupération, on met à jour l'état avec les films, les séries et les genres triés
        setMediaData((prevState) => ({
          ...prevState,
          allMovie: allMovies,
          allTVShows: allTVShows,
          allMovieTri: allMovieTri, // Ajouter les films et séries triés par genre dans l'état commun
          movieTriByGenre: movieTriByGenre, // Ajouter uniquement les films triés par genre
          tvShowTriByGenre: tvShowTriByGenre, // Ajouter uniquement les séries triées par genre
        }));
      
      };

      getPopularTVList()
      getPopularMovieList()
      getMovieNowPlaying()
      getAllMedia()
      await Promise.all([getPopularTVList(), getPopularMovieList(), getPopularMovieList(), getAllMedia()]);
      setMediaData((prevState) => ({
        ...prevState,
        requestSuccess: true,
      }));
    }

    allRequest()
  }, []);

  return (
    <MediaContext.Provider value={mediaData}>
      {children}
    </MediaContext.Provider>
  );
};

// Custom hook pour utiliser le contexte
export const useMediaContext = () => {
  const context = useContext(MediaContext);

  if (!context) {
    throw new Error("useMediaContext doit être utilisé dans un MediaProvider");
  }

  return context;
};

"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
}

interface TVShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
}

interface MediaData {
  popularMovie: Movie[] | null;
  popularTV: TVShow[] | null;
  movieNowPlaying: Movie[] | null;
  allMovie: Movie[] | null;
  allTVShows: TVShow[] | null;
  allMovieTri: { [key: string]: (Movie | TVShow)[] } | null;
  requestSuccess: boolean | null;
  movieTriByGenre: { [key: string]: Movie[] } | null;
  tvShowTriByGenre: { [key: string]: TVShow[] } | null;
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

const MediaContext = createContext<MediaData | undefined>(undefined);

export const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {

  const [mediaData, setMediaData] = useState<MediaData>({
    popularMovie: null,
    popularTV: null,
    movieNowPlaying: null,
    allMovie: null,
    allTVShows: null,
    allMovieTri: null,
    requestSuccess: null,
    movieTriByGenre: null,
    tvShowTriByGenre: null,
  });

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
          setMediaData((prevState) => ({
            ...prevState,
            popularTV: data.results,
          }));
        } catch (error) {
          console.error('Error fetching TV data:', error);
        }
      };

      const getMovieNowPlaying = async () => {
        const allMovies: Movie[] = [];

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
            allMovies.push(...data.results);
          } catch (error) {
            console.error('Error fetching movies on page ' + page, error);
          }
        }

        setMediaData((prevState) => ({
          ...prevState,
          movieNowPlaying: allMovies,
        }));
      };

      const getAllMedia = async () => {
        const allMovies: Movie[] = [];
        const allTVShows: TVShow[] = [];
        const allMovieTri: { [key: string]: (Movie | TVShow)[] } = {};
        const movieTriByGenre: { [key: string]: Movie[] } = {};
        const tvShowTriByGenre: { [key: string]: TVShow[] } = {};

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

        const fetchMovies = async () => {
          for (let page = 1; page <= 7; page++) {
            const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
            try {
              const response = await fetch(url, options);
              const data = await response.json();
              allMovies.push(...data.results);
              data.results.forEach((movie: Movie) => {
                movie.genre_ids.forEach((genreId: number) => {
                  const genre = genresList.find((g) => g.id === genreId);
                  if (genre) {
                    allMovieTri[genre.name].push(movie);
                    movieTriByGenre[genre.name].push(movie);
                  }
                });
              });
            } catch (error) {
              console.error('Error fetching movies on page ' + page, error);
            }
          }
        };

        const fetchTVShows = async () => {
          for (let page = 1; page <= 7; page++) {
            const url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;
            try {
              const response = await fetch(url, options);
              const data = await response.json();
              allTVShows.push(...data.results);
              data.results.forEach((tvShow: TVShow) => {
                tvShow.genre_ids.forEach((genreId: number) => {
                  const genre = genresList.find((g) => g.id === genreId);
                  if (genre) {
                    allMovieTri[genre.name].push(tvShow);
                    tvShowTriByGenre[genre.name].push(tvShow);
                  }
                });
              });
            } catch (error) {
              console.error('Error fetching TV shows on page ' + page, error);
            }
          }
        };

        await Promise.all([fetchMovies(), fetchTVShows()]);
        setMediaData((prevState) => ({
          ...prevState,
          allMovie: allMovies,
          allTVShows: allTVShows,
          allMovieTri: allMovieTri,
          movieTriByGenre: movieTriByGenre,
          tvShowTriByGenre: tvShowTriByGenre,
        }));
      };

      await Promise.all([getPopularMovieList(), getPopularTVList(), getMovieNowPlaying(), getAllMedia()]);
      setMediaData((prevState) => ({
        ...prevState,
        requestSuccess: true,
      }));
    };

    allRequest();
  }, []);

  return (
    <MediaContext.Provider value={mediaData}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => {
  const context = useContext(MediaContext);

  if (!context) {
    throw new Error("useMediaContext doit être utilisé dans un MediaProvider");
  }

  return context;
};

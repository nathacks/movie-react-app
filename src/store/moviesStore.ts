import { create } from 'zustand';
import { MoviePage } from '../models/movie.model';
import { MAX_MOVIES } from '../utils/movie-dimensions.ts';

interface MoviesStoreSlice {
    moviePages: MoviePage[];
    setMoviePages: (newPage: MoviePage) => void;
    clearMoviePages: () => void;
}

export const useMoviesStore = create<MoviesStoreSlice>((set, get) => ({
    moviePages: [],

    setMoviePages: (newPage) => {
        const existingPages = get().moviePages;
        const existingMovies = existingPages.flatMap((page) => page.results);

        const totalMovies = existingMovies.length + newPage.results.length;

        if (totalMovies > MAX_MOVIES) {
            const remainingSpace = MAX_MOVIES - existingMovies.length;
            newPage.results = newPage.results.slice(0, remainingSpace);
        }

        const existingMovieIds = new Set(existingMovies.map((movie) => movie.id));
        const filteredResults = newPage.results.filter((movie) => !existingMovieIds.has(movie.id));

        if (filteredResults.length === 0) return;

        const filteredPage = { ...newPage, results: filteredResults };

        const updatedPages = [...existingPages, filteredPage];

        set({ moviePages: updatedPages });
    },

    clearMoviePages: () => {
        set({ moviePages: [] });
    },
}));

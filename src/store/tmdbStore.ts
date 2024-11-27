import { create } from 'zustand';
import { Genre, Page } from '../models/tmdb.model.ts';
import { MAX_MOVIES } from '../utils/movie-dimensions.ts';

interface MoviesStoreSlice {
    pages: Page[];
    setMoviePages: (newMoviePage: Page) => void;
    clearPages: () => void;
    genresMovie: Genre[]
    setGenresMovie: (genresMovie: Genre[]) => void;
    replaceAllPages: (moviePage: Page) => void;
}

export const useTmdbStore = create<MoviesStoreSlice>((set, get) => ({
    pages: [],
    genresMovie: [],

    setGenresMovie: (genresMovie) => {
        set({ genresMovie })
    },

    setMoviePages: (newPage) => {
        const existingPages = get().pages;
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

        set({ pages: updatedPages });
    },

    replaceAllPages: (moviePage) => {
        set({ pages: [moviePage] });
    },

    clearPages: () => {
        set({ pages: [] });
    },
}));

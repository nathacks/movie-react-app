import { create } from 'zustand';
import { MoviePage } from '../models/movie.model';

interface MoviesStoreSlice {
    moviePages: MoviePage[];
    setMoviePages: (newPage: MoviePage) => void;
    clearMoviePages: () => void;
}

export const useMoviesStore = create<MoviesStoreSlice>((set, get) => ({
    moviePages: [],

    setMoviePages: (newPage) => {
        const existingPages = get().moviePages;

        const pageExists = existingPages.some((page) => page.page === newPage.page);

        if (!pageExists) {
            const updatedPages = [...existingPages, newPage];
            if (updatedPages.length > 3) {
                updatedPages.shift();
            }
            set({ moviePages: updatedPages });
        }
    },

    clearMoviePages: () => {
        set({ moviePages: [] });
    },
}));

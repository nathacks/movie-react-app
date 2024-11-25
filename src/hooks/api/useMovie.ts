import { DrinoInstance } from 'drino';
import { MovieResponse } from '../../models/movie.model';
import { useDrino } from './common/drino.hook.ts';

const genres: Record<number, string> = {
    12: 'Adventure',
    14: 'Fantasy',
    16: 'Animation',
    18: 'Drama',
    27: 'Horror',
    28: 'Action',
    35: 'Comedy',
    36: 'History',
    37: 'Western',
    53: 'Thriller',
    80: 'Crime',
    99: 'Documentary',
    878: 'Science Fiction',
    9648: 'Mystery',
    10402: 'Music',
    10749: 'Romance',
    10751: 'Family',
    10752: 'War',
    10770: 'TV Movie',
};

export function useMovie() {
    const client: DrinoInstance = useDrino();


    return {
        getMovies: () => client.get<MovieResponse>(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc`),
        getGenres: () => client.get(`https://api.themoviedb.org/3/genre/movie/list`)
    };
}

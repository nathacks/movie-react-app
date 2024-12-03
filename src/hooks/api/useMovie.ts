import { DrinoInstance } from 'drino';
import { GenresResponse, Page } from '../../models/tmdb.model.ts';
import { useDrino } from './common/drino.hook.ts';

export function useMovie() {
    const client: DrinoInstance = useDrino();

    return {
        getMovies: (numberPage: number, categorieId: string) => client.get<Page>(`https://api.themoviedb.org/3/movie/${categorieId}?page=${numberPage}`),
        getGenres: () => client.get<GenresResponse>(`https://api.themoviedb.org/3/genre/movie/list`),
        getDetailsMovie: (movie_id: number) => client.get<any>(`https://api.themoviedb.org/3/movie/${movie_id}`),
        getSearchMovies: (numberPage: number, query?: string) => client.get<Page>(`https://api.themoviedb.org/3/search/movie?page=${numberPage}&query=${query}`)
    };
}

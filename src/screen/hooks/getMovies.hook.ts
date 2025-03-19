import { useMovie } from '../../hooks/api/useMovie.ts';
import { useTmdbStore } from '../../store/tmdbStore.ts';
import { isOnlySpaces } from '../../utils/isEmptyInput.ts';

interface GetMoviesPage {
    pageNumber: number
    requiresClearPage?: boolean
    search?: string
}


export function getMoviesAction() {
    const { getMovies, getSearchMovies } = useMovie();
    const { setMoviePages, categorieId, replaceAllPages } = useTmdbStore();

    const getMoviesPage = ({ pageNumber, requiresClearPage }: GetMoviesPage) => {
        getMovies(pageNumber, categorieId).consume({
            result: (moviesRes) => {
                if (requiresClearPage) {
                    replaceAllPages(moviesRes)
                } else {
                    setMoviePages(moviesRes);
                }
            },
        });
    };

    const getMovieWithQueryPage = ({ pageNumber, requiresClearPage, search }: GetMoviesPage) => {
        if (!isOnlySpaces(search!)) {
            getSearchMovies(pageNumber, search).consume({
                result: (moviesRes) => {
                    if (requiresClearPage) {
                        replaceAllPages(moviesRes)
                    } else {
                        setMoviePages(moviesRes);
                    }
                },
            });
        }
    }

    return {
        getMoviesPage,
        getMovieWithQueryPage
    }
}

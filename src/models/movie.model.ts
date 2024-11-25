export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieResponse {
    page?: number;
    results: Movie[];
}

export interface MovieFormatted {
    key: string;
    title: string;
    poster: string;
    backdrop: string;
    rating: number;
    description: string;
    releaseDate: string;
    genres: string[];
}

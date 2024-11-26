import { Text } from 'react-native';
import { MOVIE_SIZE, NO_MOVIE_SIZE } from '../../utils/movie-dimensions.ts';
import Animated, { SharedValue } from 'react-native-reanimated';
import { Rating } from './Rating.tsx';
import { Movies } from '../../models/movie.model.ts';
import { getImagePath } from '../../utils/url-image.ts';
import { movieItemAnimated } from '../../hooks/animated/movieItem.animated.ts';

interface MovieItemProps {
    movie: Movies
    index: number
    scrollX: SharedValue<number>;
    moviesLengthMax: number;
}

export function MovieItem({ movie, index, scrollX, moviesLengthMax }: MovieItemProps) {
    const { animatedMovieText, animatedMoviePosition } = movieItemAnimated(index, scrollX)

    return (
        <Animated.View
            className={'p-5 bg-sand-1 rounded-t-3xl gap-5 mt-24'}
            style={[{
                marginLeft: index === 0 ? NO_MOVIE_SIZE : 0,
                marginRight: index === moviesLengthMax ? NO_MOVIE_SIZE : 0,
                width: MOVIE_SIZE,
            }, animatedMoviePosition]}>
            <Animated.Image
                source={{ uri: getImagePath(movie.poster_path) }}
                className={'rounded-2xl w-full object-cover'}
                style={[{
                    height: MOVIE_SIZE * 1.2,
                }]}
            />
            <Animated.View className={'items-center gap-3'} style={animatedMovieText}>
                <Text className={'text-center font-semibold text-2xl'}>{movie.title}</Text>
                <Rating rating={movie.vote_average}/>
                {/*<Genres genres={item.genres} />*/}
                <Text numberOfLines={5}>{movie.overview}</Text>
            </Animated.View>
        </Animated.View>
    )
}

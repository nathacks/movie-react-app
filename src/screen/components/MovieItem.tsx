import { Pressable, Text, View } from 'react-native';
import { MOVIE_SIZE, NO_MOVIE_SIZE } from '../../utils/movie-dimensions.ts';
import Animated, { SharedValue } from 'react-native-reanimated';
import { Movie } from '../../models/tmdb.model.ts';
import { movieItemAnimated } from '../../hooks/animated/movieItem.animated.ts';
import { StyleShadow } from '../../constants/shadow.ts';
import FastImage from 'react-native-fast-image';
import { getImagePath } from '../../utils/url-image.ts';
import { Rating } from './Rating.tsx';
import { Genres } from './Genres.tsx';
import { useTmdbStore } from '../../store/tmdbStore.ts';
import { memo } from 'react';

interface MovieItemProps {
    movie: Movie
    index: number
    scrollX: SharedValue<number>;
    moviesLengthMax: number;
}

const backgroundPlacement: Record<number, string> = {
    0: 'bg-amber-4',
    1: 'bg-gray-5',
    2: 'bg-bronze-7',
};

export const MovieItem = memo(({ movie, index, scrollX, moviesLengthMax }: MovieItemProps) => {
        const { animatedMovieText, animatedMoviePosition } = movieItemAnimated(index, scrollX);
        const { setShowDetailId, showDetailId } = useTmdbStore()

        const isMovieId = showDetailId === movie.id

        const handlePress = () => {
            setShowDetailId(isMovieId ? null : movie.id)
        };

        return (
            <Animated.View className={'flex-1 pt-36'} style={{
                width: MOVIE_SIZE,
                marginLeft: index === 0 ? NO_MOVIE_SIZE : 0,
                marginRight: index === moviesLengthMax ? NO_MOVIE_SIZE : 0,
            }}>
                <Animated.ScrollView
                    scrollEnabled={isMovieId}
                    showsVerticalScrollIndicator={false}
                    className={'rounded-t-3xl'}
                    style={[animatedMoviePosition]}
                >
                    <Pressable
                        onPress={handlePress}
                        className={'p-5 pb-0 bg-sand-1 rounded-t-3xl gap-5'}
                    >
                        <View
                            className={`absolute size-12 ${backgroundPlacement[index] ?? 'bg-sand-1'} rounded-full justify-center items-center z-10`}
                            style={StyleShadow['2']}
                        >
                            <Text className={'font-bold'}>{index + 1}</Text>
                        </View>
                        <FastImage
                            style={[{
                                height: MOVIE_SIZE * 1.2,
                                borderRadius: 16,
                            }]}
                            source={{
                                uri: getImagePath(movie.poster_path),
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Animated.View className={'flex-col items-center gap-3'} style={animatedMovieText}>
                            <Text className={'text-center font-semibold text-2xl'}>{movie.title}</Text>
                            <Rating rating={movie.vote_average} />
                            <Genres genreIds={movie.genre_ids} />
                            <Text numberOfLines={5}>{movie.overview}</Text>
                        </Animated.View>
                    </Pressable>
                </Animated.ScrollView>
            </Animated.View>
        )
    }, (prevProps, nextProps) =>
        prevProps.movie.id === nextProps.movie.id &&
        prevProps.index === nextProps.index &&
        prevProps.scrollX.value === nextProps.scrollX.value &&
        prevProps.moviesLengthMax === nextProps.moviesLengthMax
);

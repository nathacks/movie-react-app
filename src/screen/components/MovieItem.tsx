import { Dimensions, Pressable, Text, View } from 'react-native';
import { MOVIE_SIZE, NO_MOVIE_SIZE } from '../../utils/movie-dimensions.ts';
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Movie } from '../../models/tmdb.model.ts';
import { movieItemAnimated } from '../../hooks/animated/movieItem.animated.ts';
import { memo, useState } from 'react';
import { StyleShadow } from '../../constants/shadow.ts';
import FastImage from 'react-native-fast-image';
import { getImagePath } from '../../utils/url-image.ts';
import { Rating } from './Rating.tsx';
import { useMovie } from '../../hooks/api/useMovie.ts';
import { Genres } from './Genres.tsx';

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

const { width, height } = Dimensions.get('window')


export const MovieItem = memo(({ movie, index, scrollX, moviesLengthMax }: MovieItemProps) => {
        const { animatedMovieText, animatedMoviePosition } = movieItemAnimated(index, scrollX);
        const [showDetail, setShowDetail] = useState(false);
        const { getDetailsMovie } = useMovie();

        // SharedValue pour animer la disposition
        const titleLayout = useSharedValue(0); // 0: column, 1: row

        const animatedTitleStyle = useAnimatedStyle(() => ({
            flexDirection: titleLayout.value === 0 ? 'column' : 'row',
            alignItems: titleLayout.value === 0 ? 'center' : 'flex-start',
        }));

        const handlePress = () => {
            console.log('aze')
            titleLayout.value = withTiming(titleLayout.value === 0 ? 1 : 0, { duration: 500 });
        };

        return (
            <View className={'flex-1 pt-36'} style={{
                width: MOVIE_SIZE,
                marginLeft: index === 0 ? NO_MOVIE_SIZE : 0,
                marginRight: index === moviesLengthMax ? NO_MOVIE_SIZE : 0,
            }}>
                <Animated.ScrollView
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
                            {/* Animation pour le titre */}
                            <Animated.View style={[animatedTitleStyle]}>
                                <Text className={'text-center font-semibold text-2xl'}>{movie.title}</Text>
                            </Animated.View>
                            <Rating rating={movie.vote_average} />
                            <Genres genreIds={movie.genre_ids} />
                            <Text numberOfLines={5}>{movie.overview}</Text>
                        </Animated.View>
                    </Pressable>
                </Animated.ScrollView>
            </View>
        );
    }, (prevProps, nextProps) =>
        prevProps.movie.id === nextProps.movie.id &&
        prevProps.index === nextProps.index &&
        prevProps.scrollX.value === nextProps.scrollX.value &&
        prevProps.moviesLengthMax === nextProps.moviesLengthMax
);

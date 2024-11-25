import { Platform, SafeAreaView, View } from 'react-native';
import { useEffect, useState } from 'react';
import { MovieResponse } from '../models/movie.model.ts';
import { useMovie } from '../hooks/api/useMovie.ts';
import { GAP, GAP_ITEM } from '../utils/movie-dimensions.ts';
import Animated, { useAnimatedScrollHandler, useSharedValue, } from 'react-native-reanimated';
import { MovieItem } from './components/MovieItem.tsx';
import { Backdrop } from './components/Backdrop.tsx';
import { LanguageButton } from './components/LanguageButton.tsx';

export function Main() {
    const [movies, setMovies] = useState<MovieResponse>({ results: [] });
    const scrollX = useSharedValue(0);

    const { getMovies } = useMovie();

    useEffect(() => {
        getMovies().consume({
            result: (movies) => {
                setMovies(movies);
            },
        })
    }, []);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    return (
        <View className={'flex-1 bg-sand-1'}>
            <Backdrop movies={movies.results} scrollX={scrollX} />
            <LanguageButton />
            <SafeAreaView className={'flex-1'}>
                <Animated.FlatList
                    showsHorizontalScrollIndicator={false}
                    data={movies.results}
                    keyExtractor={item => `${item.id}.movie`}
                    horizontal
                    contentContainerStyle={{
                        gap: GAP
                    }}
                    decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                    renderToHardwareTextureAndroid
                    snapToInterval={GAP_ITEM}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    renderItem={({ item, index }) => <MovieItem item={item} index={index} scrollX={scrollX}
                                                                moviesLengthMax={movies.results.length - 1} />}
                />
            </SafeAreaView>
        </View>
    );
}

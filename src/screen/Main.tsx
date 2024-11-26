import { Platform, View } from 'react-native';
import { useEffect } from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { MoviePage } from '../models/movie.model';
import { useMovie } from '../hooks/api/useMovie';
import { GAP, GAP_ITEM } from '../utils/movie-dimensions';
import { MovieItem } from './components/MovieItem';
import { Backdrop } from './components/Backdrop';
import { Header } from './components/Header';
import { useLanguageStore } from '../store/languageStore';
import { useMoviesStore } from '../store/moviesStore';

export function Main() {
    const { moviePages, setMoviePages } = useMoviesStore();
    const { selectedLocale } = useLanguageStore();
    const scrollX = useSharedValue(0);
    const { getMovies } = useMovie();

    const getMoviesPage = (pageNumber: number) => {
        getMovies(pageNumber).consume({
            result: (moviesResponse: MoviePage) => {
                setMoviePages(moviesResponse);
            },
        });
    };

    useEffect(() => {
        getMoviesPage(1);
    }, [selectedLocale]);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
        const lastIndex = moviesFlat.length - 1;
        const secondToLastIndex = lastIndex - 2;

        if (viewableItems.some((item: any) => item.index === secondToLastIndex)) {
            const nextPage = moviePages[moviePages.length - 1]?.page + 1;
            if (!moviePages.some((page) => page.page === nextPage)) {
                getMoviesPage(nextPage);
            }
        }
    };

    const moviesFlat = moviePages.flatMap((page) => page.results);

    return (
        <View className={'flex-1 bg-sand-1'}>
            <Backdrop movies={moviesFlat} scrollX={scrollX}/>
            <Header/>
            <Animated.FlatList
                data={moviePages.flatMap((page) => page.results)}
                keyExtractor={(item) => `${item.id}.movies`}
                horizontal
                contentContainerStyle={{ gap: GAP }}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                renderToHardwareTextureAndroid
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                snapToInterval={GAP_ITEM}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                renderItem={({ item: movie, index }) => (
                    <MovieItem
                        movie={movie}
                        index={index}
                        scrollX={scrollX}
                        moviesLengthMax={moviePages.flatMap((page) => page.results).length - 1}
                    />
                )}
            />

        </View>
    );
}

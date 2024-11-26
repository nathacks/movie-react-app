import { Platform, View } from 'react-native';
import { useCallback, useEffect } from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Movies } from '../models/movie.model';
import { useMovie } from '../hooks/api/useMovie';
import { GAP, GAP_ITEM, MAX_MOVIES, MOVIE_SIZE } from '../utils/movie-dimensions';
import { MovieItem } from './components/MovieItem';
import { Header } from './components/Header';
import { useLanguageStore } from '../store/languageStore';
import { useMoviesStore } from '../store/moviesStore';
import { ListRenderItem, ViewToken } from '@react-native/virtualized-lists/Lists/VirtualizedList';
import { Backdrop } from './components/Backdrop.tsx';

export function Main() {
    const { moviePages, setMoviePages } = useMoviesStore();
    const { selectedLocale } = useLanguageStore();
    const scrollX = useSharedValue(0);
    const { getMovies } = useMovie();

    const moviesFlat = moviePages.flatMap((page) => page.results);

    const getMoviesPage = (pageNumber: number) => {
        getMovies(pageNumber).consume({
            result: (moviesResponse) => {
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

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<ViewToken<Movies>> }) => {
        const currentIndex = viewableItems[0]?.index || 0;
        const moviesFlatCount = moviesFlat.length;

        const numberMovieBeforeTriger = 5

        const nextPage = moviePages.length + 1;

        if (currentIndex >= moviesFlat.length - numberMovieBeforeTriger && nextPage && moviesFlatCount < MAX_MOVIES) {
            getMoviesPage(nextPage);
        }
    };

    const renderItem: ListRenderItem<Movies> = useCallback(({ item: movie, index }) => (
        <MovieItem
            movie={movie}
            index={index}
            scrollX={scrollX}
            moviesLengthMax={moviesFlat.length - 1}
        />
    ), [moviesFlat]);

    return (
        <View className={'flex-1 bg-sand-1'}>
            <Backdrop movies={moviesFlat} scrollX={scrollX} />
            <Header />
            <Animated.FlatList
                data={moviesFlat}
                keyExtractor={(item) => `${item.id}.movies`}
                horizontal
                contentContainerStyle={{ gap: GAP }}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                snapToInterval={GAP_ITEM}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={10}
                removeClippedSubviews
                getItemLayout={(_, index) => ({
                    length: MOVIE_SIZE,
                    offset: GAP_ITEM * index,
                    index,
                })}
                onViewableItemsChanged={onViewableItemsChanged}
                renderItem={renderItem}
            />
        </View>
    );
}

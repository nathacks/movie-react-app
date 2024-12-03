import { Platform, View, ViewToken } from 'react-native';
import { useCallback, useEffect } from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Movie } from '../models/tmdb.model.ts';
import { GAP, GAP_ITEM, MAX_MOVIES, MOVIE_SIZE } from '../utils/movie-dimensions';
import { MovieItem } from './components/MovieItem';
import { useTmdbStore } from '../store/tmdbStore.ts';
import { ListRenderItem } from '@react-native/virtualized-lists/Lists/VirtualizedList';
import { Backdrop } from './components/Backdrop.tsx';
import { getMoviesAction } from './hooks/getMovies.hook.ts';
import { useMovie } from '../hooks/api/useMovie.ts';
import { useSearchBarStore } from '../store/searchBarStore.ts';

export function Main() {
    const { pages, categorieId, setGenresMovie } = useTmdbStore();
    const { getMoviesPage, getMovieWithQueryPage } = getMoviesAction()
    const { getGenres } = useMovie();
    const { isSearchEnabled } = useSearchBarStore()

    const scrollX = useSharedValue(0);
    const moviesFlat = pages.flatMap((page) => page.results);


    useEffect(() => {
        getMoviesPage({ pageNumber: 1, requiresClearPage: true });
    }, [categorieId]);

    useEffect(() => {
        getGenres().consume({
            result: ({ genres }) => setGenresMovie(genres)
        })
    }, []);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<ViewToken<Movie>> }) => {
        const currentIndex = viewableItems[0]?.index || 0;
        const moviesFlatCount = moviesFlat.length;

        const numberMovieBeforeTriger = 1

        const nextPage = pages.length + 1;

        if (currentIndex >= moviesFlat.length - numberMovieBeforeTriger && nextPage && moviesFlatCount < MAX_MOVIES) {
            if (isSearchEnabled) {
                getMovieWithQueryPage({ pageNumber: nextPage });
            } else {
                getMoviesPage({ pageNumber: nextPage });
            }
        }
    };

    const renderItem: ListRenderItem<Movie> = useCallback(({ item: movie, index }) => (
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
            <Animated.FlatList
                className={'flex-1'}
                data={moviesFlat}
                keyExtractor={(item) => `${item.id}.movies`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: GAP, paddingTop: 112 }}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                snapToInterval={GAP_ITEM}
                onScroll={scrollHandler}
                renderToHardwareTextureAndroid
                scrollEventThrottle={16}
                initialNumToRender={3}
                maxToRenderPerBatch={5}
                windowSize={10}
                removeClippedSubviews
                getItemLayout={(_, index) => ({
                    length: MOVIE_SIZE,
                    offset: GAP_ITEM * index,
                    index,
                })}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100, // L'élément doit être 100 % visible
                }}
                renderItem={renderItem}
            />
        </View>
    );
}

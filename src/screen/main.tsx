import { Animated, Image, Platform, SafeAreaView, Text, View, } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { MovieFormatted } from '../models/movie.model.ts'
import { Rating } from './components/Rating.tsx'
import { Genres } from './components/Genres.tsx'
import { useMovie } from '../hooks/api/useMovie.ts';
import { EMPTY_ITEM_SIZE, ITEM_SIZE, SPACING } from '../utils/movie-dimensions.ts';

export function Main() {
    const [movies, setMovies] = useState<MovieFormatted[]>([])
    const scrollX = useRef(new Animated.Value(0)).current

    const { getMovies } = useMovie()

    useEffect(() => {
        if (movies.length === 0) {
            getMovies().consume({
                result: ({ movies, page }) => {
                    setMovies(movies)
                },
            })
        }
    }, [movies])

    return (
        <View className={'flex-1'}>
            {/*<Backdrop movies={movies} scrollX={scrollX}/>*/}
            <SafeAreaView className={'flex-1'}>
                <Animated.FlatList
                    showsHorizontalScrollIndicator={false}
                    data={movies}
                    keyExtractor={item => item.key}
                    horizontal
                    decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                    renderToHardwareTextureAndroid
                    snapToInterval={ITEM_SIZE}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false },
                    )}
                    scrollEventThrottle={16}
                    renderItem={({ item, index }) => {
                        if (!item.poster) {
                            return <View style={{ width: EMPTY_ITEM_SIZE }}/>
                        }

                        const inputRange = [
                            (index - 2) * ITEM_SIZE,
                            (index - 1) * ITEM_SIZE,
                            index * ITEM_SIZE,
                        ]

                        const translateY = scrollX.interpolate({
                            inputRange,
                            outputRange: [0, -50, 0],
                            extrapolate: 'clamp',
                        })

                        return (
                            <View style={{ width: ITEM_SIZE }} className={'pt-14'}>
                                <Animated.View
                                    style={{
                                        marginHorizontal: SPACING,
                                        padding: SPACING * 1.5,
                                        alignItems: 'center',
                                        transform: [{ translateY }],
                                        backgroundColor: 'white',
                                        borderRadius: 34,
                                    }}>
                                    <Image
                                        source={{ uri: item.poster }}
                                        style={{
                                            width: '100%',
                                            height: ITEM_SIZE * 1.2,
                                            resizeMode: 'cover',
                                            borderRadius: 24,
                                            margin: 0,
                                            marginBottom: 10,
                                        }}
                                    />
                                    <Text style={{ fontSize: 24 }} numberOfLines={1}>
                                        {item.title}
                                    </Text>
                                    <Rating rating={item.rating}/>
                                    <Genres genres={item.genres}/>
                                    <Text style={{ fontSize: 12 }} numberOfLines={3}>
                                        {item.description}
                                    </Text>
                                </Animated.View>
                            </View>
                        )
                    }}
                />
            </SafeAreaView>
        </View>
    )
}

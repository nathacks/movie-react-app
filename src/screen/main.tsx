import { Animated, Dimensions, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, View, } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { MovieFormatted } from '../models/movie.model.ts'
import { Rating } from './components/Rating.tsx'
import { Genres } from './components/Genres.tsx'
import { useMovie } from '../hooks/api/useMovie.ts';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window')

const SPACING = 10
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2
const BACKDROP_HEIGHT = height * 0.4

const Backdrop = ({
                      movies,
                      scrollX,
                  }: {
    movies: MovieFormatted[];
    scrollX: Animated.Value;
}) => {
    return (
        <View style={{ width, position: 'absolute', height: BACKDROP_HEIGHT }}>
            <FlatList
                data={movies.reverse()}
                keyExtractor={item => item.key + '-backdrop'}
                removeClippedSubviews={false}
                contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
                renderItem={({ item, index }) => {
                    if (!item.backdrop) {
                        return null
                    }
                    const translateX = scrollX.interpolate({
                        inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
                        outputRange: [0, width],
                        // extrapolate: 'clamp'
                    })
                    return (
                        <Animated.View
                            removeClippedSubviews={false}
                            style={{
                                position: 'absolute',
                                width: translateX,
                                height,
                                overflow: 'hidden',
                            }}>
                            <Image
                                source={{ uri: item.backdrop }}
                                style={{
                                    width,
                                    height: BACKDROP_HEIGHT,
                                    position: 'absolute',
                                }}
                            />
                        </Animated.View>
                    )
                }}
            />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'white']}
                style={{
                    height: BACKDROP_HEIGHT,
                    width,
                    position: 'absolute',
                    bottom: 0,
                }}
            />
        </View>
    )
}

export function Main() {
    const [movies, setMovies] = useState<MovieFormatted[]>([])
    const scrollX = useRef(new Animated.Value(0)).current

    const { getMovies } = useMovie()

    useEffect(() => {
        if (movies.length === 0) {
            getMovies().consume({
                result: ({ movies, page }) => {
                    setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }])
                },
            })
        }
    }, [movies])

    return (
        <View style={[styles.container, StyleSheet.absoluteFill]}>
            <Backdrop movies={movies} scrollX={scrollX}/>
            <SafeAreaView style={{ flex: 1 }}>
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
                            <View style={{ width: ITEM_SIZE, paddingTop: 56 }}>
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
                                        style={styles.posterImage}
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

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    posterImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
})

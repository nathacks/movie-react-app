import { Animated, Dimensions, FlatList, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MovieFormatted } from '../../models/movie.model.ts';
import { BACKDROP_HEIGHT, ITEM_SIZE } from '../../utils/movie-dimensions.ts';

const { width, height } = Dimensions.get('window')

export function Backdrop({
                             movies,
                             scrollX,
                         }: {
    movies: MovieFormatted[];
    scrollX: Animated.Value;
}) {
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
    );
}

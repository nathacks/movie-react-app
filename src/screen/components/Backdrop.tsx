import { Dimensions, FlatList, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MovieFormatted } from '../../models/movie.model.ts';
import { BACKDROP_HEIGHT, GAP_ITEM } from '../../utils/movie-dimensions.ts';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window')

export function Backdrop({
                             movies,
                             scrollX,
                         }: {
    movies: MovieFormatted[];
    scrollX: SharedValue<number>;
}) {

    const BackdropItem = ({ item, index }: { item: MovieFormatted, index: number }) => {
        if (!item.backdrop) {
            return null;
        }

        const animatedStyle = useAnimatedStyle(() => {
            const inputRange = [
                (index - 1) * GAP_ITEM,
                index * GAP_ITEM,
                (index + 1) * GAP_ITEM,
            ];

            const opacity = interpolate(
                scrollX.value,
                inputRange,
                [0, 1, 0]
            );

            return {
                opacity,
            };
        });

        return (
            <Animated.View
                className={'absolute'}
                style={[
                    animatedStyle,
                    {
                        height,
                        width,
                    },
                ]}
            >
                <Image
                    className={'absolute'}
                    source={{ uri: item.backdrop }}
                    style={{
                        width,
                        height: BACKDROP_HEIGHT,
                    }}
                />
            </Animated.View>
        );
    }

    return (
        <View className={'absolute w-full h-full'} style={{ width, height: BACKDROP_HEIGHT }}>
            <FlatList
                className={'flex-1'}
                data={movies.reverse()}
                keyExtractor={item => item.key + '-backdrop'}
                removeClippedSubviews={false}
                contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
                renderItem={({ item, index }) => {
                    return <BackdropItem item={item} index={index}/>
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

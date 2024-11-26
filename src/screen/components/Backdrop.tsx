import { Dimensions, FlatList, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Movies } from '../../models/movie.model.ts';
import { GAP_ITEM, HEIGHT_BACKDROP } from '../../utils/movie-dimensions.ts';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { getBackdropPath } from '../../utils/url-image.ts';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window')

export function Backdrop({
                             movies,
                             scrollX,
                         }: {
    movies: Movies[];
    scrollX: SharedValue<number>;
}) {

    const BackdropItem = ({ item, index }: { item: Movies, index: number }) => {
        if (!item.backdrop_path) {
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
                <FastImage
                    style={[{
                        height: HEIGHT_BACKDROP,
                    }]}
                    source={{
                        uri: getBackdropPath(item.backdrop_path),
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </Animated.View>
        );
    }

    return (
        <View className={'absolute w-full h-full'} style={{ width, height: HEIGHT_BACKDROP }}>
            <FlatList
                data={movies}
                keyExtractor={item => `${item.id}.backdrop`}
                removeClippedSubviews={false}
                contentContainerStyle={{ width, height: HEIGHT_BACKDROP }}
                renderItem={({ item, index }) => {
                    return <BackdropItem item={item} index={index} />
                }}
            />
            <LinearGradient
                colors={['transparent', 'rgb(253, 253, 252)']}
                start={{ x: 0, y: .1 }} end={{ x: 0, y: .9 }}
                style={{
                    position: 'absolute',
                    height: HEIGHT_BACKDROP,
                    width,
                }}
            />
        </View>
    );
}

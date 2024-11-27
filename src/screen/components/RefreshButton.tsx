import { Pressable } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { useMovie } from '../../hooks/api/useMovie.ts';
import { useTmdbStore } from '../../store/tmdbStore.ts';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SEACHBAR_HEIGHT, SEACHBAR_WIDTH } from '../../utils/searchBar-dimensions.ts';

const AnimatedRefreshCw = Animated.createAnimatedComponent(RefreshCw)

export function RefreshButton() {
    const { replaceAllPages } = useTmdbStore();
    const { getMovies } = useMovie();

    const rotation = useSharedValue(0);

    const handleRefresh = () => {
        rotation.value = withTiming(rotation.value + 360, { duration: 1000 });

        getMovies(1).consume({
            result: (moviesRes) => {
                replaceAllPages(moviesRes)
            }
        })
    }

    const animatedIconRotation = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
        <Pressable onPress={handleRefresh} className={'items-center justify-center rounded-full bg-sand-1'}
                   style={{ width: SEACHBAR_WIDTH, height: SEACHBAR_HEIGHT }}>
            <AnimatedRefreshCw style={animatedIconRotation} color={'black'} />
        </Pressable>
    )
}

import { SEACHBAR_WIDTH, SEARCHBAR_GAP } from '../../utils/searchBar-dimensions.ts';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { useSearchBarStore } from '../../store/searchBarStore.ts';

const { width: screenWidth } = Dimensions.get('window');

export function searchBarAnimated() {
    const { setSearchIsEnabled } = useSearchBarStore();

    const widthInitiale = screenWidth - (SEACHBAR_WIDTH * 2) - (SEARCHBAR_GAP * 3)
    const animatedWidthValue = useSharedValue(widthInitiale);

    const animatedStyleWidth = useAnimatedStyle(() => {
        return {
            width: withSpring(animatedWidthValue.value, {
                duration: 1000,
            })
        }
    })

    const openSearchBar = () => {
        animatedWidthValue.value = screenWidth - SEARCHBAR_GAP;
        setSearchIsEnabled(true);
    }

    const closeSearchBar = () => {
        animatedWidthValue.value = widthInitiale
        setSearchIsEnabled(false);
    }

    return {
        animatedStyleWidth, openSearchBar, closeSearchBar,
    }

}

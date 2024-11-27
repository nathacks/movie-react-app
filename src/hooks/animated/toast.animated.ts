import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SEACHBAR_WIDTH, SEARCHBAR_GAP } from '../../utils/searchBar-dimensions.ts';
import { useToastStore } from '../../store/toastStore.ts';
import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export function toastAnimated() {
    const { toast, closeToast } = useToastStore();

    const widthInitiale = screenWidth - (SEACHBAR_WIDTH * 2) - (SEARCHBAR_GAP * 3)

    const animatedWidthValue = useSharedValue(widthInitiale);
    const animatedOpacityChildrenValue = useSharedValue(1);
    const animatedOpacityToastValue = useSharedValue(0);


    useEffect(() => {
        if (toast?.message) {
            const timeout = setTimeout(() => closeToast(), toast?.duration ?? 2000);
            return () => clearTimeout(timeout);
        }
    }, [toast?.message]);

    const animatedStyleWidth = useAnimatedStyle(() => {
        if (toast) {
            animatedWidthValue.value = screenWidth - SEARCHBAR_GAP;
        } else {
            animatedWidthValue.value = widthInitiale
        }

        return {
            width: withSpring(animatedWidthValue.value, {
                duration: 1000,
            })
        }
    })

    const animatedOpacityChildren = useAnimatedStyle(() => {
        animatedOpacityChildrenValue.value = withTiming(toast ? 0 : 1, { duration: toast ? 400 : 200 })

        return {
            opacity: animatedOpacityChildrenValue.value
        }
    })

    const animatedOpacityToast = useAnimatedStyle(() => {
        animatedOpacityChildrenValue.value = withTiming(toast ? 1 : 0, { duration: toast ? 200 : 400 })

        return {
            opacity: animatedOpacityToastValue.value
        }
    })

    return {
        animatedOpacityChildren, animatedOpacityToast, animatedStyleWidth
    }
}

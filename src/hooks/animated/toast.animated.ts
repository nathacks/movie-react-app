import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useToastStore } from '../../store/toastStore.ts';
import { Keyboard } from 'react-native';


export function toastAnimated() {
    const { toast, closeToast } = useToastStore();

    const animatedOpacityChildrenValue = useSharedValue(1);
    const animatedOpacityToastValue = useSharedValue(0);

    useEffect(() => {
        if (toast?.message) {
            Keyboard.dismiss()
            const timeout = setTimeout(() => closeToast(), toast?.duration ?? 2000);
            return () => clearTimeout(timeout);
        }
    }, [toast?.message]);

    const animatedOpacityChildren = useAnimatedStyle(() => {
        animatedOpacityChildrenValue.value = withTiming(toast ? 0 : 1, { duration: toast ? 400 : 200 })

        return {
            opacity: animatedOpacityChildrenValue.value,
        }
    })

    const animatedOpacityToast = useAnimatedStyle(() => {
        animatedOpacityToastValue.value = withTiming(toast ? 1 : 0, { duration: toast ? 200 : 400 })

        return {
            opacity: animatedOpacityToastValue.value,
        }
    })

    return {
        animatedOpacityChildren, animatedOpacityToast
    }
}

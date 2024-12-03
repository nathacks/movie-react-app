import React from 'react';
import { Dimensions, Keyboard, Pressable } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSearchBarStore } from '../../../store/searchBarStore.ts';
import Animated, { useAnimatedProps, useSharedValue, withTiming, } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export function BackgroundBlur() {
    const { top } = useSafeAreaInsets();
    const { isSearchEnabled, setSearchIsEnabled } = useSearchBarStore();
    const blurAmount = useSharedValue(0);

    const animatedBlurStyle = useAnimatedProps(() => {
        if (isSearchEnabled) blurAmount.value = withTiming(30, { duration: 250 })
        else blurAmount.value = withTiming(0)

        return {
            blurAmount: Math.round(blurAmount.value)
        }
    });

    if (!isSearchEnabled) return null;

    return (
        <Pressable
            onPress={() => {
                Keyboard.dismiss();
                setSearchIsEnabled(false);
            }}
            style={{
                position: 'absolute',
                width,
                height,
                top: -top,
            }}
        >
            <AnimatedBlurView
                animatedProps={animatedBlurStyle}
                style={[{ flex: 1 }]}
                blurType="light"
            />
        </Pressable>
    );
}

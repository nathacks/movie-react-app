import { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SEACHBAR_HEIGHT, SEACHBAR_WIDTH } from '../../utils/searchBar-dimensions.ts';
import { Dispatch, ReactNode, RefObject, SetStateAction, useCallback } from 'react';
import { View } from 'react-native';
import { GAP_ITEM_CATEGORIE, PADDING_CATEGORIE } from '../../utils/categorie-dimensions.ts';


export function categorieAnimated(
    dropdownButton: RefObject<View>,
    sections: {
        title: string
        icon: ReactNode
    }[],
    setShowModal: Dispatch<SetStateAction<boolean>>) {

    const topPosition = useSharedValue(0);
    const leftPosition = useSharedValue(0);

    const animatedModalHeight = useSharedValue(SEACHBAR_HEIGHT);
    const animatedModalWidth = useSharedValue(SEACHBAR_WIDTH);
    const animatedIcon = useSharedValue(1);
    const animatedSection = useSharedValue(0);

    const openDropdown = useCallback(() => {
        dropdownButton.current?.measure((_fx, _fy, _w, h, px, py) => {
            topPosition.value = py;
            leftPosition.value = px;

            setShowModal(true)

            animatedIcon.value = 0
            animatedSection.value = withTiming(1);
            animatedModalHeight.value = withSpring(
                sections.length * 25 + // Hauteur de chaque section
                (sections.length - 1) * GAP_ITEM_CATEGORIE + // Gap entre les sections
                PADDING_CATEGORIE * 2 // Padding haut et bas
            );
            animatedModalWidth.value = withSpring(300 - (px * 2));
        });
    }, []);

    const closeDropdown = useCallback(() => {
        animatedIcon.value = withTiming(1);
        animatedSection.value = withTiming(0);
        animatedModalHeight.value = withTiming(SEACHBAR_HEIGHT, { duration: 350 });
        animatedModalWidth.value = withTiming(SEACHBAR_WIDTH, { duration: 350 }, () => {
            runOnJS(setShowModal)(false)
        });
    }, []);

    const animatedStyleSection = useAnimatedStyle(() => ({
        opacity: animatedSection.value,
    }));

    const animatedStyleIcon = useAnimatedStyle(() => ({
        opacity: animatedIcon.value,
    }));

    const animatedStyleContainer = useAnimatedStyle(() => ({
        height: animatedModalHeight.value,
        width: animatedModalWidth.value,
        transform: [
            { translateX: leftPosition.value },
            { translateY: topPosition.value },
        ],
    }));


    return {
        animatedStyleContainer, animatedStyleIcon, animatedStyleSection, closeDropdown, openDropdown
    }
}

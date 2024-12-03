import {Dimensions} from 'react-native'
import {SEACHBAR_WIDTH, SEARCHBAR_GAP} from '../../../utils/searchBar-dimensions.ts'
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import {PropsWithChildren} from 'react'
import {useToastStore} from '../../../store/toastStore.ts'
import {useSearchBarStore} from '../../../store/searchBarStore.ts'

const {width: screenWidth} = Dimensions.get('window')


export function AnimatedBar({children}: PropsWithChildren) {
    const {toast} = useToastStore()
    const {isSearchEnabled} = useSearchBarStore()

    const isResizeBar = toast || isSearchEnabled

    const widthInitiale = screenWidth - (SEACHBAR_WIDTH * 2) - (SEARCHBAR_GAP * 3)
    const animatedWidthValue = useSharedValue(widthInitiale)

    const animatedStyleWidth = useAnimatedStyle(() => {
        if (isResizeBar) {
            animatedWidthValue.value = screenWidth - SEARCHBAR_GAP
        } else {
            animatedWidthValue.value = widthInitiale
        }

        return {
            width: withSpring(animatedWidthValue.value, {
                duration: 1000,
            }),
        }
    })


    return (
        <Animated.View
            className={'flex-row rounded-full'}
            style={[
                animatedStyleWidth,
            ]}>
            {children}
        </Animated.View>
    )
}

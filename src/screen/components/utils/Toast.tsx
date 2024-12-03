import { useToastStore } from '../../../store/toastStore.ts';
import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { SEACHBAR_HEIGHT } from '../../../utils/searchBar-dimensions.ts';
import { CircleCheck } from 'lucide-react-native';
import { toastAnimated } from '../../../hooks/animated/toast.animated.ts';


export function Toast({ children }: PropsWithChildren) {
    const { toast } = useToastStore();
    const { animatedOpacityChildren, animatedOpacityToast } = toastAnimated()

    return (
        <>
            <Animated.View
                className={'absolute flex-row w-full gap-2.5 items-center px-3 rounded-full border-2 border-grass-6 bg-grass-4 p-3 z-50'}
                style={[animatedOpacityToast, { height: SEACHBAR_HEIGHT }]}>
                <CircleCheck color={'rgb(42, 126, 59)'} />
                <Text className={'text-base text-grass-11 flex-1'}>{toast?.message}</Text>
            </Animated.View>
            <Animated.View className={`flex-1`}
                           style={[animatedOpacityChildren]}>
                {children}
            </Animated.View>
        </>
    );
}

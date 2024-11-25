import * as React from 'react';
import { Text, View } from 'react-native';

export function Genres({ genres }: { genres: string[] }) {
    return (
        <View className={'flex-row flex-wrap items-center justify-center gap-2'}>
            {genres.map((genre, index) => {
                return (
                    <View className={'border border-gray-9 rounded-full px-2'} key={index}>
                        <Text className={'text-xs text-gray-11'}>{genre}</Text>
                    </View>
                );
            })}
        </View>
    );
}

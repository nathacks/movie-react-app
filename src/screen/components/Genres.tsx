import * as React from 'react';
import { Text, View } from 'react-native';
import { useTmdbStore } from '../../store/tmdbStore.ts';

export function Genres({ genreIds }: { genreIds: number[] }) {
    const { genresMovie } = useTmdbStore()

    const genreNames = genreIds.map(id => {
        const genre = genresMovie.find((s) => s.id === id);
        return genre ? genre.name : null;
    });
    
    return (
        <View className={'flex-row flex-wrap items-center justify-center gap-2'}>
            {genreNames.map((genre, index) => {
                return (
                    <View className={'border border-gray-9 rounded-full px-2'} key={index}>
                        <Text className={'text-xs text-gray-11'}>{genre}</Text>
                    </View>
                );
            })}
        </View>
    );
}

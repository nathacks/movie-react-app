import * as React from 'react';
import { Text, View } from 'react-native';
import { Star } from 'lucide-react-native';

export function Rating({ rating }: { rating: number }) {
    const filledStars = Math.floor(rating / 2);
    const maxStars = Array(5 - filledStars).fill('staro');
    const r = [...Array(filledStars).fill('star'), ...maxStars];

    const formatNumber = (number: number) => {
        const integerPart = Math.trunc(number)
        const decimalPart = Math.trunc((number - integerPart) * 10) / 10
        return integerPart + decimalPart
    }

    return (
        <View className={'flex-row gap-2'}>
            <Text>{formatNumber(rating)}</Text>
            <View className={'flex-row'}>
                {r.map((type, index) => {
                    return <Star size={16} key={index} color={'orange'} fill={type === 'star' ? 'orange' : 'white'}/>
                })}
            </View>
        </View>
    );
}

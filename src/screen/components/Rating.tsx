import React from 'react';
import { Text, View } from 'react-native';
import { Star } from 'lucide-react-native';

type RatingProps = {
    rating: number;
};

export function Rating({ rating }: RatingProps) {
    const filledStars = Math.round(rating / 2);
    const emptyStars = 5 - filledStars;

    const formatNumber = (value: number) => value.toFixed(1);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text>{formatNumber(rating)}</Text>
            <View style={{ flexDirection: 'row' }}>
                {Array.from({ length: filledStars }, (_, index) => (
                    <Star key={`filled-${index}`} size={16} color="orange" fill="orange" />
                ))}
                {Array.from({ length: emptyStars }, (_, index) => (
                    <Star key={`empty-${index}`} size={16} color="orange" fill="white" />
                ))}
            </View>
        </View>
    );
}

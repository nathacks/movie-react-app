import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function Rating({rating}: {rating: number}) {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill('staro');
  const r = [...Array(filledStars).fill('star'), ...maxStars];

  return (
    <View style={styles.rating}>
      <Text style={styles.ratingNumber}>{rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumber: {marginRight: 4, fontFamily: 'Menlo', fontSize: 14},
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
});

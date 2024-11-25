import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window')

export const GAP = 28
export const MOVIE_SIZE = Platform.OS === 'ios' ? width * 0.65 : width * 0.68
export const NO_MOVIE_SIZE = (width - MOVIE_SIZE) / 2
export const HEIGHT_BACKDROP = height * 0.6
export const GAP_ITEM = MOVIE_SIZE + GAP

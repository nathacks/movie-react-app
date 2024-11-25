import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window')

export const GAP = 28
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74
export const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2
export const BACKDROP_HEIGHT = height * 0.6
export const GAP_ITEM = ITEM_SIZE + GAP

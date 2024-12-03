import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategorieButton } from './CategorieButton.tsx';
import { StyleShadow } from '../../constants/shadow.ts';
import { RefreshButton } from './RefreshButton.tsx';
import { SEARCHBAR_GAP } from '../../utils/searchBar-dimensions.ts';
import { SearchBar } from './SearchBar.tsx';


export function Header() {
    const { top } = useSafeAreaInsets()

    return (
        <View className={'absolute z-50 justify-center flex-row w-full'}
              style={[StyleShadow['3'], {
                  marginTop: top,
                  gap: SEARCHBAR_GAP,
              }]}>
            {/*<BackgroundBlur />*/}
            <CategorieButton />
            <SearchBar />
            <RefreshButton />
        </View>
    )
}

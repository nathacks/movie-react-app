import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategorieButton } from './CategorieButton.tsx';
import { StyleShadow } from '../../constants/shadow.ts';
import { RefreshButton } from './RefreshButton.tsx';
import { Toast } from './utils/Toast.tsx';
import { SEACHBAR_HEIGHT, SEARCHBAR_GAP } from '../../utils/searchBar-dimensions.ts';
import { SearchBar } from './SearchBar.tsx';

export function Header() {
    const { top } = useSafeAreaInsets()

    return (
        <View className={'w-full z-50 justify-center flex-row'}
              style={[StyleShadow['3'], { marginTop: top, height: SEACHBAR_HEIGHT, gap: SEARCHBAR_GAP }]}>
            <CategorieButton />
            <Toast>
                <SearchBar />
            </Toast>
            <RefreshButton />
        </View>
    )
}

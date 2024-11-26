import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategorieButton } from './CategorieButton.tsx';
import { SearchBar } from './SearchBar.tsx';
import { StyleShadow } from '../../constants/shadow.ts';

export function Header() {
    const { top } = useSafeAreaInsets()

    return (
        <View className={'flex-row h-12 gap-5 mx-5'} style={[StyleShadow['3'], { marginTop: top }]}>
            <CategorieButton />
            <SearchBar />
        </View>
    )
}

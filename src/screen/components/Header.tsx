import { View } from 'react-native';
import { LanguageButton } from './LanguageButton.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategorieButton } from './CategorieButton.tsx';
import { SearchBar } from './SearchBar.tsx';
import { StyleShadow } from '../../constants/shadow.ts';

export function Header() {
    const { top } = useSafeAreaInsets()

    return (
        <View className={'flex-row mx-3 h-12 justify-between'} style={[StyleShadow['3'], { marginTop: top }]}>
            <CategorieButton/>
            <SearchBar/>
            <LanguageButton/>
        </View>
    )
}

import { Pressable, Text } from 'react-native';
import { languages, useLanguageStore } from '../../store/languageStore.ts';


export function LanguageButton() {
    const { selectedLanguage, setLanguage } = useLanguageStore();

    const changeLanguage = async () => {
        const languageKeys = Object.keys(languages);
        const currentLanguageIndex = languageKeys.indexOf(selectedLanguage);
        const nextLanguageIndex = (currentLanguageIndex + 1) % languageKeys.length;
        const newLanguage = languageKeys[nextLanguageIndex];

        await setLanguage(languages[newLanguage]);
    };

    return (
        <Pressable onPress={changeLanguage} className={'items-center justify-center w-12 rounded-full bg-sand-1'}>
            <Text className={'font-semibold'}>{selectedLanguage.toUpperCase()}</Text>
        </Pressable>
    );
}

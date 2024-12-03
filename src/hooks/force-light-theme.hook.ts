import { useEffect } from 'react';
import { Appearance } from 'react-native';

export function forceLightTheme() {
    useEffect(() => {
        Appearance.setColorScheme('light');
    }, []);
}

import { View } from 'react-native';
import { List } from 'lucide-react-native';
import { SEACHBAR_HEIGHT, SEACHBAR_WIDTH } from '../../utils/searchBar-dimensions.ts';

export function CategorieButton() {
    return (
        <View className={'items-center justify-center rounded-full bg-sand-1'}
              style={{ width: SEACHBAR_WIDTH, height: SEACHBAR_HEIGHT }}>
            <List color={'black'} />
        </View>
    )
}

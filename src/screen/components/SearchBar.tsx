import { Search } from 'lucide-react-native';
import { TextInput, View } from 'react-native';
import { SEACHBAR_HEIGHT } from '../../utils/searchBar-dimensions.ts';

export function SearchBar() {
    return (
        <View
            className={'flex-row flex-1 gap-2.5 items-center px-3 rounded-full bg-sand-1'}
            style={{ height: SEACHBAR_HEIGHT }}>
            <Search color={'rgb(33, 32, 28)'} />
            <TextInput
                className={'flex-1 h-full'}
                onChangeText={(e) => {
                    console.log(e)
                }}
                placeholder="Search..."
            />
        </View>
    )
}

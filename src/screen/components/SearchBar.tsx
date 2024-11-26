import { Text, View } from 'react-native';
import { Search } from 'lucide-react-native';

export function SearchBar() {
    return (
        <View className={'flex-1 flex-row gap-2.5 items-center px-3 mx-10 rounded-full bg-sand-1'}>
            <Search color={"rgb(33, 32, 28)"}/>
            <Text className={"text-sand-11"}>Search...</Text>
        </View>
    )
}

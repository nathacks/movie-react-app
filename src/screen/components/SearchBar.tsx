import React, { useRef, useState } from 'react';
import { Keyboard, Pressable, TextInput, View } from 'react-native';
import { useSearchBarStore } from '../../store/searchBarStore';
import { SEACHBAR_HEIGHT, SEACHBAR_WIDTH } from '../../utils/searchBar-dimensions.ts';
import { Search, X } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { isOnlySpaces } from '../../utils/isEmptyInput.ts';
import { getMoviesAction } from '../hooks/getMovies.hook.ts';
import Animated from 'react-native-reanimated';
import { searchBarAnimated } from '../../hooks/animated/searchBar.animated.ts';

export function SearchBar() {
    const { isSearchEnabled, setSearchIsEnabled, setQuery } = useSearchBarStore();
    const { getMoviesPage, getMovieWithQueryPage } = getMoviesAction();
    const { openSearchBar, closeSearchBar, animatedStyleWidth } = searchBarAnimated();

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const prevSearchRef = useRef<string>('');
    const [isPressablePressed, setIsPressablePressed] = useState(false);

    const { control, reset, getValues } = useForm({
        defaultValues: {
            search: ''
        }
    });

    const handleSearch = (search: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            if (!isOnlySpaces(search)) {
                getMovieWithQueryPage({ pageNumber: 1, requiresClearPage: true, search });
            } else {
                getMoviesPage({ pageNumber: 1, requiresClearPage: true });
            }
            prevSearchRef.current = search;
        }, 500);
    };

    const handleClose = () => {
        closeSearchBar();
        if (getValues('search') !== prevSearchRef.current) {
            getMoviesPage({ pageNumber: 1, requiresClearPage: true });
        }
    };

    const handlePressablePress = () => {
        setIsPressablePressed(true);
        Keyboard.dismiss();
        reset();
        handleClose();
    };

    const handleBlur = (e: any) => {
        if (isOnlySpaces(e.nativeEvent.text) && !isPressablePressed) {
            handleClose();
        }
    };

    return (
        <Animated.View
            className={'flex-row rounded-full'}
            style={[
                animatedStyleWidth,
            ]}>
            <View className="flex-1">
                <View className="flex-row flex-1 w-full gap-2">
                    <View
                        className="flex-1 flex-row gap-2.5 items-center px-3 rounded-full bg-sand-1"
                        style={{ height: SEACHBAR_HEIGHT }}>
                        <Search color={'rgb(33, 32, 28)'} />
                        <Controller
                            name="search"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="flex-1 h-full"
                                    value={value}
                                    onChangeText={(text) => {
                                        onChange(text);
                                        handleSearch(text);
                                    }}
                                    onFocus={openSearchBar}
                                    onBlur={handleBlur}
                                    clearButtonMode="always"
                                    placeholder="Search..."
                                    placeholderTextColor={'rgb(99, 99, 94)'}
                                />
                            )}
                        />
                    </View>
                    {isSearchEnabled ? (
                        <Pressable
                            onPress={handlePressablePress}
                            className="items-center justify-center rounded-full bg-sand-1 z-10"
                            style={{ width: SEACHBAR_WIDTH, height: SEACHBAR_HEIGHT }}>
                            <X color={'black'} />
                        </Pressable>
                    ) : null}

                </View>
            </View>
        </Animated.View>
    );
}

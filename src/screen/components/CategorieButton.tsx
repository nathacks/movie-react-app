import { Modal, Pressable, Text, TouchableWithoutFeedback, View, } from 'react-native';
import { Clapperboard, Clock, MoveUpRight, Star } from 'lucide-react-native';
import { ReactNode, useRef, useState, } from 'react';
import Animated from 'react-native-reanimated';
import { SEACHBAR_HEIGHT, SEACHBAR_WIDTH } from '../../utils/searchBar-dimensions.ts';
import { StyleShadow } from '../../constants/shadow.ts';
import { categorieAnimated } from '../../hooks/animated/categorie.animated.ts';
import { GAP_ITEM_CATEGORIE, PADDING_CATEGORIE } from '../../utils/categorie-dimensions.ts';
import { CategorieType, useTmdbStore } from '../../store/tmdbStore.ts';


interface CategorieProps {
    id: CategorieType
    title: string
    icon: ReactNode
}

export function CategorieButton() {
    const dropdownButton = useRef<View>(null);
    const [showModal, setShowModal] = useState(false);

    const { categorieId, changeCategorieId } = useTmdbStore()

    const categories: CategorieProps[] = [
        { id: 'now_playing', title: 'Actuellement au cinéma', icon: <Clapperboard /> },
        { id: 'popular', title: 'Populaire', icon: <Star /> },
        { id: 'top_rated', title: 'Mieux notée', icon: <MoveUpRight /> },
        { id: 'upcoming', title: 'À venir', icon: <Clock /> }
    ];

    const currentCategorieIcon = categories.find((categorie) => categorie.id === categorieId)

    const {
        closeDropdown,
        openDropdown,
        animatedStyleContainer,
        animatedStyleSection,
        animatedStyleIcon
    } = categorieAnimated(dropdownButton, categories, setShowModal)

    return (
        <View>
            <Pressable
                onPress={openDropdown}
                ref={dropdownButton}
                className={'items-center justify-center bg-sand-1 rounded-3xl z-10'}
                style={{ width: SEACHBAR_WIDTH, height: SEACHBAR_HEIGHT }}
            >
                {currentCategorieIcon?.icon}
            </Pressable>
            <Modal visible={showModal} transparent>
                <TouchableWithoutFeedback onPress={closeDropdown}>
                    <View className={'flex-1'}>
                        <Animated.View
                            className={'bg-sand-1 gap-2 rounded-3xl'}
                            style={[StyleShadow['2'], animatedStyleContainer]}
                        >
                            <View className={'flex-1 overflow-hidden'}>
                                <Animated.View className={'flex-1 justify-between'} style={[animatedStyleSection, {
                                    padding: PADDING_CATEGORIE
                                }]}>
                                    {categories.map(({ title, icon, id }, index) => (
                                        <Pressable className={'flex-row items-center gap-2'}
                                                   style={{ paddingVertical: GAP_ITEM_CATEGORIE / categories.length }}
                                                   key={index}
                                                   onPress={() => {
                                                       if (categorieId !== id) changeCategorieId(id)
                                                       closeDropdown()
                                                   }}
                                        >
                                            {icon}
                                            <Text
                                                numberOfLines={1}
                                                className={'text-lg font-semibold'}>
                                                {title}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </Animated.View>
                                <Animated.View
                                    style={[animatedStyleIcon]}
                                    className={'absolute justify-center items-center w-full h-full'}
                                >
                                    {currentCategorieIcon?.icon}
                                </Animated.View>
                            </View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

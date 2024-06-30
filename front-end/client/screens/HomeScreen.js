import Categories from '../components/categories'
import FeatureRow from '../components/featuredRow'
import { View, Text, SafeAreaView, StatusBar, TextInput, ScrollView } from 'react-native'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import * as Icon from "react-native-feather";
import { featured } from '../constants';

export default function HomeScreen() {
    const [featuredCategories, setFeaturedCategories] = useState([]);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    useEffect(() => {
        // Usar os dados locais do arquivo constants.js
        setFeaturedCategories(featured);
    }, []);

    return (
        <SafeAreaView className="bg-white">
            <StatusBar barStyle="dark-content" />

            {/* search bar */}
            <View className="flex-row items-center space-x-2 px-4 pb-2 mt-3">
                <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
                    <Icon.Search height="25" width="25" stroke="gray" />
                    <TextInput placeholder='Procure por um restaurante' className="ml-2 flex-1" keyboardType='default' />
                </View>
            </View>

            {/* main */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50
                }}
            >

                {/* categories */}
                <Categories />

                {/* featured */}
                <View className="mt-5">
                    {
                        featuredCategories?.map(category => {
                            return (
                                <FeatureRow
                                    key={category.id}
                                    id={category.id}
                                    title={category.title}
                                    restaurants={category.restaurants}
                                    description={category.description}
                                    vertical={true}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

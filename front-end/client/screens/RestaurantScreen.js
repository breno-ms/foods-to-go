import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DishRow from '../components/dishRow';
import BasketIcon from '../components/basketIcon';
import { useDispatch, useSelector } from 'react-redux';
import { selectResturant, setResturant } from '../slices/resturantSlice';
import { emptyBasket } from '../slices/basketSlice';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';

export default function ResturantScreen() {
    const navigation = useNavigation();
    const resturant = useSelector(selectResturant);
    const dispatch = useDispatch();

    const { params: { id, title, imgUrl, rating, type, address, description, dishes, lng, lat } } = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    useEffect(() => {
        if (resturant?.id !== id) {
            dispatch(emptyBasket());
            dispatch(setResturant({
                id,
                title,
                imgUrl,
                rating,
                type,
                address,
                description,
                dishes,
                lng,
                lat
            }));
        }
    }, [dispatch, id, resturant]);

    return (
        <>
            <BasketIcon />
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: String(imgUrl) }} />
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.details}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.ratingContainer}>
                            <View style={styles.rating}>
                                <Image source={require('../assets/images/fullStar.png')} style={styles.star} />
                                <Text style={styles.ratingText}>
                                    <Text style={styles.ratingValue}>{rating}</Text>
                                    <Text style={styles.ratingReviews}> (4.6k reviews)</Text> · <Text style={styles.type}>{type}</Text>
                                </Text>
                            </View>
                            <View style={styles.addressContainer}>
                                <Icon.MapPin color="gray" width={15} height={15} />
                                <Text style={styles.address}> Nearby · {address}</Text>
                            </View>
                        </View>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                </View>
                <View style={styles.menuContainer}>
                    <Text style={styles.menuTitle}>Menu</Text>
                    {dishes.map(dish => (
                        <DishRow key={dish.id} id={dish.id} name={dish.name} description={dish.description} price={dish.price} image={dish.image} />
                    ))}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative'
    },
    image: {
        width: '100%',
        height: 288
    },
    backButton: {
        position: 'absolute',
        top: 56,
        left: 16,
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    detailsContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -24,
        paddingTop: 24
    },
    details: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16
    },
    star: {
        width: 16,
        height: 16
    },
    ratingText: {
        fontSize: 12,
        marginLeft: 4
    },
    ratingValue: {
        color: '#228B22'
    },
    ratingReviews: {
        color: '#4a4a4a'
    },
    type: {
        fontWeight: 'bold',
        color: '#4a4a4a'
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    address: {
        fontSize: 12,
        color: '#4a4a4a',
        marginLeft: 4
    },
    description: {
        color: '#7d7d7d',
        marginTop: 8
    },
    menuContainer: {
        paddingBottom: 144,
        backgroundColor: 'white'
    },
    menuTitle: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

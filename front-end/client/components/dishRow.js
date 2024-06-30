import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';
import { selectBasketItemsById } from '../selectors'; // Ajuste a importação para não ser duplicada
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";

export default function DishRow({ name, description, id, price, image }) {
    const dispatch = useDispatch();
    const basketItems = useSelector(state => selectBasketItemsById(state, id));

    const handleIncrease = () => {
        dispatch(addToBasket({ id, name, price, image, description }));
    };

    const handleDecrease = () => {
        if (basketItems.length > 0) {
            dispatch(removeFromBasket({ id }));
        }
    };

    return (
        <View style={styles.row}>
            <Image style={styles.image} source={typeof image === 'number' ? image : { uri: String(image) }} />
            <View style={styles.details}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <View style={styles.priceSection}>
                    <Text style={styles.price}>${price}</Text>
                    <View style={styles.controls}>
                        <TouchableOpacity 
                            onPress={handleDecrease} 
                            disabled={!basketItems.length} 
                            style={[styles.button, { backgroundColor: themeColors.bgColor(1) }]}>
                            <Icon.Minus strokeWidth={2} height={20} width={20} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{basketItems.length}</Text>
                        <TouchableOpacity 
                            onPress={handleIncrease} 
                            style={[styles.button, { backgroundColor: themeColors.bgColor(1) }]}>
                            <Icon.Plus strokeWidth={2} height={20} width={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: 6,
        marginHorizontal: 8
    },
    image: {
        borderRadius: 30,
        height: 100,
        width: 100
    },
    details: {
        flex: 1,
        paddingLeft: 12,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    description: {
        color: '#4a4a4a'
    },
    priceSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8
    },
    price: {
        color: '#4a4a4a',
        fontSize: 18,
        fontWeight: 'bold'
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        padding: 6,
        borderRadius: 25
    },
    quantity: {
        paddingHorizontal: 12,
        fontSize: 16
    }
});

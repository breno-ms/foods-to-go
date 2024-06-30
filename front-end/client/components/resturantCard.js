import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RestaurantCard({ id, imgUrl, title, rating, type, address, description, dishes, lng, lat, style }) {
  
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => {
      navigation.navigate('Restaurant', {
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
      });
    }}>
      <View style={[styles.card, style]}>
        <Image
          source={imgUrl}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.ratingContainer}>
            <Image source={require('../assets/images/fullStar.png')} style={styles.icon} />
            <Text style={styles.rating}>·{rating}</Text>
            <Text style={styles.type}>·{type}</Text>
          </View>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    height: 16,
    width: 16,
  },
  rating: {
    color: 'gray',
    fontSize: 14,
  },
  type: {
    color: 'gray',
    fontSize: 14,
    marginLeft: 5,
  },
  address: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
  },
  description: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
  },
});

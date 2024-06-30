import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import RestaurantCard from './resturantCard';

export default function FeatureRow({ id, title, description, restaurants }) {
  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="text-gray-500 text-xs">
            {description}
          </Text>
        </View>
      </View>
      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        className="overflow-visible py-5"
      >
        {
          restaurants.map(restaurant => {
            return (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                imgUrl={restaurant.image}
                title={restaurant.name}
                rating={restaurant.stars}
                type={restaurant.category}
                address={restaurant.address}
                description={restaurant.description}
                dishes={restaurant.dishes}
                lng={restaurant.lng}
                lat={restaurant.lat}
                style={{ width: '90%' }}
              />
            )
          })
        }
      </ScrollView>
    </View>
  );
}

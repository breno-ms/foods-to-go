import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RestaurantScreen from './screens/RestaurantScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MenuTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'RestaurantScreen') {
          iconName = focused ? 'restaurant' : 'restaurant-outline';
        } else if (route.name === 'CartScreen') {
          iconName = focused ? 'cart' : 'cart-outline';
        } else if (route.name === 'PreparingOrderScreen') {
          iconName = focused ? 'clipboard' : 'clipboard-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="RestaurantScreen" component={HomeScreen} />
    <Tab.Screen name="CartScreen" component={CartScreen} />
    <Tab.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} />
  </Tab.Navigator>
);

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Home" component={MenuTabs} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="Cart" options={{ presentation: 'modal' }} component={CartScreen} />
        <Stack.Screen name="PreparingOrder" options={{ presentation: 'fullScreenModal' }} component={PreparingOrderScreen} />
        <Stack.Screen name="Delivery" options={{ presentation: 'fullScreenModal' }} component={DeliveryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

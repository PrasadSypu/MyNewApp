import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import Category from '../screens/Category';
import Curate from '../screens/Curate';
import Sale from '../screens/Sale';
import More from '../screens/More';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: {
    active: require('../assets/icons/home_active.png'),
    inactive: require('../assets/icons/home_inactive.png'),
  },
  Category: {
    active: require('../assets/icons/category_active.png'),
    inactive: require('../assets/icons/category_inactive.png'),
  },
  Curate: {
    active: require('../assets/icons/curate.png'),
    inactive: require('../assets/icons/curate.png'),
  },
  Sale: {
    active: require('../assets/icons/sale_active.png'),
    inactive: require('../assets/icons/sale_inactive.png'),
  },
  More: {
    active: require('../assets/icons/more_active.png'),
    inactive: require('../assets/icons/more_inactive.png'),
  },
};

function TabBarIcon({ routeName, focused }) {
  const icon = focused
    ? TAB_ICONS[routeName].active
    : TAB_ICONS[routeName].inactive;

  return (
    <Image
      source={icon}
      style={{
        width: 24,
        height: 24,
        resizeMode: 'contain',
      }}
    />
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon routeName={route.name} focused={focused} />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Curate" component={Curate} />
      <Tab.Screen name="Sale" component={Sale} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
}

export default BottomTabs;

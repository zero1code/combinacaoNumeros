import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';

const Home = createStackNavigator();

const HomeRoutes: React.FC = () => (
  <Home.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Home.Screen name="home" component={Dashboard} />
  </Home.Navigator>
);

export default HomeRoutes;

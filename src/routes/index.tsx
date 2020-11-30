import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import SavedCombinations from '../pages/SavedCombinations';
import CombinationsList from '../pages/CombinationsList';

const Home = createStackNavigator();

const HomeRoutes: React.FC = () => (
  <Home.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Home.Screen name="home" component={Dashboard} />
    <Home.Screen name="savedCombinations" component={SavedCombinations} />
    <Home.Screen name="combinationsList" component={CombinationsList} />
  </Home.Navigator>
);

export default HomeRoutes;

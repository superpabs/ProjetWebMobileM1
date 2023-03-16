import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from '../screen/home'
import Favorites from '../screen/favorites'
import Watchlist from '../screen/watchlist'
import styled from 'styled-components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Routes = () => {
    return (
        <GlobalSafeArea>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Tab.Screen name="Recherche" component={Home} />
                    <Tab.Screen name="Favoris" component={Favorites} />
                    <Tab.Screen name="Watchlist" component={Watchlist} />
                </Tab.Navigator>
            </NavigationContainer>
        </GlobalSafeArea>
    )
}

const GlobalSafeArea = styled.SafeAreaView`
    flex: 1;
`;

export default Routes;
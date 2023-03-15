import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from '../screen/home'
import Favorites from '../screen/favorites'
import styled from 'styled-components'

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <GlobalSafeArea>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='Favorites' component={Favorites} />
                </Stack.Navigator>
            </NavigationContainer>
        </GlobalSafeArea>
    )
}

const GlobalSafeArea = styled.SafeAreaView`
    flex: 1;
`;

export default Routes;
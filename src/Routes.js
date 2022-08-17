import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Favourite from './Favourite';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{
            headerShown: false,
            title: 'Login',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#485199',
            },
            gestureDirection: 'horizontal-inverted',
          }}
        />
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{
            title: 'Home',
            gestureDirection: 'horizontal-inverted',
          }}
        />
        <Stack.Screen
          name={'Signup'}
          component={Signup}
          options={{
            title: 'Signup',
            gestureDirection: 'horizontal-inverted',
          }}
        />
        <Stack.Screen
          name={'Favourite'}
          component={Favourite}
          options={{
            title: 'Favourite Products',
            gestureDirection: 'horizontal-inverted',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

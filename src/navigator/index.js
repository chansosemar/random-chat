import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, ChatRoom} from '../pages';

const Stack = createStackNavigator();

const AppStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="Chat"
					component={ChatRoom}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;

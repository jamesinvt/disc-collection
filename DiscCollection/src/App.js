import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CollectionScreen from './screens/Collection';
import {Button, Modal, Pressable, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WishList from './screens/Wishlist/widget';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Record from './screens/Record';
import SearchScreen from './screens/Search/widget';
import ModalOptions from './components/ModalOptions/widget';

const WishlistStack = createNativeStackNavigator();

function WishlistStackScreen() {
  return (
    <WishlistStack.Navigator>
      <WishlistStack.Screen name="WishList" component={WishList} />
      <WishlistStack.Screen name="Record" component={Record} />
    </WishlistStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ModalScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        opacity: 1,
        backgroundColor: 'red',
      }}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="BYE" />
    </View>
  );
};

const Root = ({navigation}) => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Group>
        <Tab.Screen name="CollectionScreen" component={CollectionScreen} />
        <Tab.Screen name="Wishlist" component={WishlistStackScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Group>
      <Tab.Group
        screenOptions={{presentation: 'transparentModal'}}
        cardStyle={{backgroundColor: 'transparent'}}>
        <Tab.Screen
          name="Scan"
          component={ModalScreen}
          options={{presentation: 'transparentModal'}}
          listeners={({navigation}) => ({
            tabPress: e => {
              // Prevent default action
              e.preventDefault();
              navigation.navigate('ModalScreen');
            },
          })}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

const App = ({navigation}) => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Root" component={Root} />
      <Stack.Screen
        name="ModalScreen"
        component={ModalOptions}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          cardOverlayEnabled: false,
        }}
        cardStyle={{backgroundColor: 'transparent'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

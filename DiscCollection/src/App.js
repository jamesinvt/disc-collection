import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CollectionStackScreen from './screens/Collection';
import {Button, Modal, Pressable, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WishlistStackScreen from './screens/Wishlist/widget';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import GlobalCollectionScreen from './components/GlobalCollection';
import Record from './screens/Record';
import SearchStackScreen from './screens/Search/widget';
import ModalOptions from './components/ModalOptions/widget';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const SearchStack = createNativeStackNavigator();

// function SearchStackScreen({navigation, route}) {

//   return (
//     <SearchStack.Navigator>
//       <SearchStack.Screen name="SearchResults" component={SearchResults} />
//       <SearchStack.Screen name="Record" component={Record} />
//     </SearchStack.Navigator>
//   );
// }

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
    <Tab.Navigator screenOptions={{headerShown: false, tabBarInactiveTintColor: 'dimgray',tabBarLabelStyle: {
      fontSize: 12,
      },}}>
      <Tab.Group>
        <Tab.Screen
          name="CollectionScreen"
          component={CollectionStackScreen}
          options={{
            tabBarLabel: 'Collection',
            tabBarIcon: () => (
              <MaterialCommunityIcons name="disc-player" color="black" size={23} />
            ),
          }}
        />
        <Tab.Screen name="Wishlist" component={WishlistStackScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="favorite-outline" color="black" size={23} />
          ),
        }} />
        <Tab.Screen name="SearchScreen" component={SearchStackScreen} 
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: () => (
            <MaterialIcons name="search" color="black" size={23} />
          ),
        }}/>
      </Tab.Group>
      <Tab.Group
        screenOptions={{presentation: 'transparentModal'}}
        cardStyle={{backgroundColor: 'transparent'}}>
        <Tab.Screen
          name="Scan"
          component={ModalScreen}
          options={{
            tabBarLabel: 'Scan',          
            tabBarIcon: () => (
              <MaterialCommunityIcons name="barcode-scan" color="black" size={30} />
            ),
          }}
          listeners={({navigation}) => ({
            tabPress: e => {
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

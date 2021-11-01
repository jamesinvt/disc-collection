import React, {useState} from 'react';
import ListItem from '../../components/ListItem';
import testData from '../../../tests/vinyls.json';
import styles from './styles';

import {Pressable, SafeAreaView, FlatList} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Search = ({navigation}) => {
  const [data, setData] = useState(testData);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === data ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === data ? 'white' : 'black';

    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Record', {
            screen: 'Record',
            data: item,
          })
        }>
        <ListItem
          item={item}
          backgroundColor={{backgroundColor}}
          textColor={{color}}
        />
      </Pressable>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        data={testData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
const HomeStack = createNativeStackNavigator();

function SearchScreen({navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group>
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}
export default SearchScreen;

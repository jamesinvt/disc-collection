import React, {useEffect, useState} from 'react';
import ListItem from '../../components/ListItem';
import testData from '../../../tests/vinyls.json';
import singlevinyl from '../../../tests/singlevinyl.json';
import styles from './styles';

import {Pressable, SafeAreaView, FlatList, Button, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Record from '../Record';
import * as ImagePicker from 'react-native-image-picker';
import useStore from '../../hooks/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const STORAGE_KEY = '@collection';

const Collection = ({navigation}) => {
  const [data, setData] = useState({});
  const {storeData, clearStorage} = useStore(STORAGE_KEY);
  const {getItem} = useAsyncStorage(STORAGE_KEY);
  const isFocused = useIsFocused();
  const fetchCollection = async () => {
    const item = await getItem();
    if(!item) {
      setData(testData);
      return;
    }
    setData(JSON.parse(item));
  };
  useEffect(() => {
    if (!isFocused) {
      return;
    }
    console.log('rendering collection');
    fetchCollection();
  }, [isFocused]);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === data ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === data ? 'white' : 'black';

    return (
      <Pressable onPress={() => navigation.navigate('Record', {data: item})}>
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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};
const HomeStack = createNativeStackNavigator();

function CollectionScreen({navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Collection" component={Collection} />
      <HomeStack.Screen name="Record" component={Record} />
    </HomeStack.Navigator>
  );
}

export default CollectionScreen;

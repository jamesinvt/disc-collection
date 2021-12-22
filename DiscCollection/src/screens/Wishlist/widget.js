import React, {useState, useEffect} from 'react';
import ListItem from '../../components/ListItem';
import styles from './styles';
import useStore from '../../hooks/useStore';
import {Pressable, SafeAreaView, FlatList} from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import testVinyls from '../../../tests/vinyls.json';
import {useIsFocused} from '@react-navigation/native';

const STORAGE_KEY = '@wishlist';
const WishList = ({navigation}) => {
  const isFocused = useIsFocused();
  const {getItem} = useAsyncStorage(STORAGE_KEY);
  const [data, setData] = useState([]);
  const fetchWishlist = async () => {
    const item = await getItem();
    setData(JSON.parse(item));
  };

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    console.log('rendering wishlist');
    fetchWishlist();
  }, [isFocused]);

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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default WishList;

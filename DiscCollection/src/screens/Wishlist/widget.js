import React, {useState} from 'react';
import ListItem from '../../components/ListItem';
import styles from './styles';

import {Pressable, SafeAreaView, FlatList} from 'react-native';

const WishList = ({navigation}) => {
  const [data, setData] = useState({});

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
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default WishList;

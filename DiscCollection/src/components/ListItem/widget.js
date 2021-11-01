import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';

const ListItem = ({item}) => (
  <View style={styles.container}>
    <Image
      style={styles.logo}
      source={{
        uri: item.thumb,
      }}
    />
    <View style={styles.details}>
      <Text>{item.title}</Text>
      <Text>{item.artists_sort}</Text>
      <Text>{item.formats[0].descriptions.join(', ')}</Text>
      {item.formats[0].text && <Text>{item.formats[0].text}</Text>}
      <Text>{item.year}</Text>
    </View>
  </View>
);
export default ListItem;

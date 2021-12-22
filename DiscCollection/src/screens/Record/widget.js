import * as React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import styles from './styles';
import useStore from '../../hooks/useStore';
import testVinyl from '../../../tests/singlevinyl.json';
const COLLECTION_STORAGE_KEY = '@collection';
const WISHLIST_STORAGE_KEY = '@wishlist';

const Record = ({navigation, route}) => {
  // const {saveData: saveToCollection, storeData} = useStore(WISHLIST_STORAGE_KEY);
  // const {saveData: saveToWishlist} = useStore(WISHLIST_STORAGE_KEY);
  const {getItem: getWishlist, setItem: addToWishlist} =
    useAsyncStorage(WISHLIST_STORAGE_KEY);
  const {getItem: getCollection, setItem: addToCollection } = useAsyncStorage(COLLECTION_STORAGE_KEY);

  const onAddWishlistButtonPress = async () => {
    const wishlist = await getWishlist();
    if (wishlist) {
      console.log('yes');
      const newJsonValue = [...JSON.parse(wishlist), route.params.data];
      await addToWishlist(JSON.stringify(newJsonValue));
    } else {
      console.log('no');
      await addToWishlist(JSON.stringify([route.params.data]));
    }
  };

  const onAddToCollectionButtonPress = async () => {
    const wishlist = await getCollection();
    if (wishlist) {
      console.log('yes');
      const newJsonValue = [...JSON.parse(wishlist), route.params.data];
      await addToCollection(JSON.stringify(newJsonValue));
    } else {
      console.log('no');
      await addToCollection(JSON.stringify([route.params.data]));
    }
  };

  return (
    <View>
      <Image
        style={styles.logo}
        source={{
          uri: route.params.data.images[0].uri,
        }}
      />
      <View style={styles.actionBar}>
        <Pressable onPress={onAddWishlistButtonPress}>
          <Text style={styles.actionItem}>Add To Wishlist</Text>
        </Pressable>
        <Pressable onPress={onAddToCollectionButtonPress}>
          <Text style={styles.actionItem}>Add to Collection</Text>
        </Pressable>
      </View>
      <View>
        <Text>{route.params.data.title}</Text>
        <Text>{route.params.data.artists_sort}</Text>
        {route.params.data.formats[0].text &&
          ((
            <Text>{route.params.data.formats[0].descriptions.join(', ')}</Text>
          ),
          (<Text>{route.params.data.formats[0].text}</Text>))}
        <Text>{route.params.data.year}</Text>
      </View>
      <View>
        <Text>Tracklist</Text>
        {route.params.data.tracklist.map((item, index) => (
          <Text key={index}>{item.title}</Text>
        ))}
      </View>
      <View>
        <Text>Notes</Text>
        <Text>{route.params.data.notes}</Text>
      </View>
    </View>
  );
};

export default Record;

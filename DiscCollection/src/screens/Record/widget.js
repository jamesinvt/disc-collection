import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable, SafeAreaView, ScrollView} from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import styles from './styles';
import useStore from '../../hooks/useStore';
import testVinyl from '../../../tests/singlevinyl.json';
const COLLECTION_STORAGE_KEY = '@collection';
const WISHLIST_STORAGE_KEY = '@wishlist';

const Record = ({navigation, route}) => {
  const [album, setAlbum] = useState(null);
  useEffect(() => {
    if (!route.params?.data) {
      return;
    }
    const fetchAlbum = async () => {
      //fetch album info using id
      try {
        console.log('fetch');
        // `http://10.0.0.53:5000/getAlbum/${route.params.data}`

        const request = await fetch(`http://10.0.0.53:5000/getAlbum/${route.params.data}`);
        const requestJson = await request.json();
        if (!requestJson) {
          return;
        }
        setAlbum(requestJson);
      } catch (error) {
        console.log(`Error fetching album: ${error}`);
      }
    };
    fetchAlbum();
  }, [route]);
  const {getItem: getWishlist, setItem: addToWishlist} =
    useAsyncStorage(WISHLIST_STORAGE_KEY);
  const {getItem: getCollection, setItem: addToCollection} = useAsyncStorage(
    COLLECTION_STORAGE_KEY,
  );

  const onAddWishlistButtonPress = async () => {
    const wishlist = await getWishlist();
    if (wishlist) {
      console.log('yes');
      const newJsonValue = [...JSON.parse(wishlist), album];
      await addToWishlist(JSON.stringify(newJsonValue));
    } else {
      console.log('no');
      await addToWishlist(JSON.stringify([album]));
    }
  };

  const onAddToCollectionButtonPress = async () => {
    const wishlist = await getCollection();
    if (wishlist) {
      console.log('yes');
      const newJsonValue = [...JSON.parse(wishlist), album];
      await addToCollection(JSON.stringify(newJsonValue));
    } else {
      console.log('no');
      await addToCollection(JSON.stringify([album]));
    }
  };

  return (
    album && (
      <SafeAreaView>
      <ScrollView>
        <Image
          style={styles.logo}
          source={{
            uri: album.images[0].uri,
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
          <Text>Release Details</Text>
          <Text>{album.title}</Text>
          <Text>{album.artists_sort}</Text>
          {album.formats[0].text &&
            ((<Text>{album.formats[0].descriptions.join(', ')}</Text>),
            (<Text>{album.formats[0].text}</Text>))}
          <Text>{album.year}</Text>
          <Text>__________</Text>
        </View>
        <View>
          <Text>Tracklist</Text>
          {album.tracklist &&
            album.tracklist.map((item, index) => (
              <Text key={index}>{item.title}</Text>
            ))}
        <Text>__________</Text>
        </View>
        <View>
          <Text>Notes</Text>
          <Text>{album.notes}</Text>
        </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
};

export default Record;

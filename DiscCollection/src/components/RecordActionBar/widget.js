import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const RecordActionBar = props => {
  return (
    <View style={styles.actionBar}>
      <MaterialIcons.Button
        name="playlist-add"
        color="black"
        onPress={props.onAddToCollectionButtonPress}
        style={styles.actionButton}>
        <Text>Add to Collection</Text>
      </MaterialIcons.Button>
      <MaterialIcons.Button
        name="favorite-outline"
        color="black"
        onPress={props.onAddWishlistButtonPress}
        style={styles.actionButton}>
        <Text>Add to Wishlist</Text>
      </MaterialIcons.Button>
    </View>
  );
};

export default RecordActionBar;

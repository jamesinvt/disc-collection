import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import styles from './styles';

const ListItem = ({searchTerm, setSearchTerm}) => (
  <View style={styles.container}>
    <TextInput
      placeholder={'Search...'}
      value={searchTerm}
      onChangeText={setSearchTerm}
    />
  </View>
);

export default ListItem;

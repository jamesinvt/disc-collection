import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const ListItem = ({searchTerm, setSearchTerm}) => (
  <View style={styles.container}>
    <TextInput
      placeholder={'Search...'}
      value={searchTerm}
      onChangeText={setSearchTerm}
      style={styles.searchInput}
    />
    <MaterialIcons name="search" color="white" style={styles.searchButton} size={25}/>
  </View>
);

export default ListItem;

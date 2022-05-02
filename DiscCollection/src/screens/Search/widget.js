import React, { useState, useEffect } from 'react';
import styles from './styles';
import { SafeAreaView, Text, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Record from '../Record';
import SearchResults from '../../components/SearchResults/widget';
import useDebounce from '../../hooks/useDebounce';

const Search = ({ navigation, route }) => {
  const [searchTerm, setSearchTerm] = useState(route.params?.searchTerm);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    try {
      if (route.params?.searchTerm) {
        console.log('change searchTerm debounce')
        setSearchTerm(route.params.searchTerm);
      }
    } catch (error) {
      console.log(`Error with search ${error}`);
    }
  }, [route.params?.searchTerm]);

  return (
    <SafeAreaView>
      <TextInput value={searchTerm} onChangeText={setSearchTerm} />
      <SearchResults searchTerm={debouncedSearchTerm} />
    </SafeAreaView>
  );
};

const SearchStack = createNativeStackNavigator();

function SearchStackScreen({ navigation }) {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} />
    </SearchStack.Navigator>
  );
}

export default SearchStackScreen;

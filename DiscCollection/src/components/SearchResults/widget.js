import React, {useState, useEffect} from 'react';
import ListItem from '../ListItem';
import testData from '../../../tests/singlevinyl.json';
import styles from './styles';
import Record from '../../screens/Record';
import {Pressable, SafeAreaView, FlatList, View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchResults = ({searchTerm}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigation = useNavigation();
  useEffect(() => {
    console.log('search changes')
    if (!searchTerm) {
      setData([]);
      setCurrentPage(0);
      return;
    }
    const doSearch = async () => {
      try {
        console.log('do search')
        if (!searchTerm) {
          console.log('no search')
          return;
        }
        const request = await fetch(
          `http://10.0.0.53:5000/search?page=${currentPage}&searchTerm=${searchTerm}`,
        );
        console.log('tesf')
        const requestJson = await request.json();
        setData(requestJson);
        setCurrentPage(requestJson.pagination.page)
      } catch (error) {
        console.log(`Error fetching album: ${error}`);
      }
    };
    console.log(currentPage)
    console.log(data?.pagination?.pages);
    if (currentPage >= data?.pagination?.pages) {
      setCurrentPage(data.pagination.pages);
      return;
    }
    doSearch();
  }, [searchTerm, currentPage]);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === data ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === data ? 'white' : 'black';
    return (
      <View>
        <Pressable
          onPress={() =>
            navigation.navigate('Record', {
              data: item.id,
            })
          }>
          <ListItem
            item={item}
            backgroundColor={{backgroundColor}}
            textColor={{color}}
          />
        </Pressable>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <Pressable onPress={() => setCurrentPage(currentPage + 1)}>
        <Text>NEXT PAGE</Text>
      </Pressable>
      {data && (
        <FlatList
          data={data.results}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchResults;

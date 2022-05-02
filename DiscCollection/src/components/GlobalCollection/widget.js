import React, { Fragment, useEffect, useState } from 'react';
import ListItem from '../../components/ListItem';
import { Pressable, SafeAreaView, FlatList } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Record from '../../screens/Record';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchAndFilter from '../SearchAndFilter';
const GlobalCollection = ({ data }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  // useEffect(() => {
  //   setItems(data);
  // }, [data]);
  useEffect(() => {
    try {
      console.log(searchTerm);
      const filteredItems = data.filter(item => {
        return Object.keys(item).some(key => { 
          console.log(item[key].toString().toLowerCase().includes(searchTerm.toLowerCase()))
          return item[key].toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
      console.log({data});
      if (!searchTerm || !filteredItems) {
        setItems(data);
        return;
      };
      setItems(filteredItems);
    } catch(error) {
      console.log(`Error: ${error}`);
    }
  }, [searchTerm, data]);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === items ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === items ? 'white' : 'black';
    return (
      <Pressable onPress={() => navigation.navigate('Record', { data: item.id })}>
        <ListItem
          item={item}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      </Pressable>
    );
  };
  return (
    <SafeAreaView>
      <SearchAndFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

// const CollectionStack = createNativeStackNavigator();

// export const CollectionStackScreens = ({ParentComponent}) => {
//   return (
//     <Fragment>
//       <CollectionStack.Screen name="GlobalCollection" component={ParentComponent} />
//       <CollectionStack.Screen name="Record" component={Record} />
//     </Fragment>
//   );
// }

export default GlobalCollection;

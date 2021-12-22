import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useRef, useState} from 'react';
import testData from '../../tests/vinyls.json';

const useStore = storageKey => {
  const [storeData, setStoreData] = useState([]);
  const storeData2 = useRef([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
  // }, []);

  useEffect(() => {
    console.log('in useStore');
  }, [storageKey]);

  const getData = async () => {
    // try {
    //   const jsonValue = await AsyncStorage.getItem(storageKey);
    //   if (!jsonValue && storageKey === '@collection') {
    //     setStoreData(testData);
    //     storeData2.current = testData;
    //   } else {
    //     console.log(JSON.parse(jsonValue));
    //     setStoreData(JSON.parse(jsonValue));
    //     storeData2.current = JSON.parse(jsonValue);
    //   }
    // } catch (e) {
    //   console.log(`ERROR fetching data: ${e}`);
    // }
  };
  const saveData = async value => {
    // try {
    //   const jsonValue = value;
    //   const jsonValue2 = await AsyncStorage.getItem(storageKey);
    //   if (jsonValue2) {
    //     console.log('yes');
    //     const newJsonValue = JSON.parse(jsonValue2).push(jsonValue);
    //     await AsyncStorage.setItem(storageKey, JSON.stringify(newJsonValue));
    //     storeData2.current = newJsonValue;
    //     setStoreData(newJsonValue);
    //     getData();
    //   } else {
    //     console.log('no');
    //     await AsyncStorage.setItem(storageKey, JSON.stringify([jsonValue]));
    //     setStoreData(JSON.stringify([jsonValue]));
    //     storeData2.current = JSON.stringify([jsonValue]);
    //     getData();
    //   }
    //   console.log('SAVED');
    // } catch (e) {
    //   console.log(`ERROR: ${e}`);
    // }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(storageKey);
    } catch (e) {
      // remove error
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log('Failed to clear the async storage.');
    }
  };
  return {saveData, removeValue, clearStorage, storeData, storeData2: storeData2.current};
};

export default useStore;

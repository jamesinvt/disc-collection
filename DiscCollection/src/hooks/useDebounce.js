import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useRef, useState} from 'react';
import testData from '../../tests/vinyls.json';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue ] = useState(null);
  useEffect(() => {
    console.log('useDebounce')
    const handler = setTimeout(() => {
        setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;

};

export default useDebounce;

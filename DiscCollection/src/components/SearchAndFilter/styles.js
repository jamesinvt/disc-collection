import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 5,
    width: '91%',
  },
  searchButton: {
    width: '8%',
    marginHorizontal: 10,
  },
});

export default styles;

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: 'row',
  },
  gridLogo: {
    width: 100,
    height: 100,
  },
  logo: {
    width: '100%',
    height: 400,
  },
  actionBar: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  actionItem: {
    height: 50,
    display: 'flex',
  },
});

export default styles;

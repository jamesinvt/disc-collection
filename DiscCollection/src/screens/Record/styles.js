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
  header: {
    backgroundColor: 'red',
    fontSize: 20,
    padding: 10,
  },
  track: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  trackTitle: {
    width: '100%',
    height: '100%',
  },
  trackPosition: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    paddingLeft: 5,
  },
});

export default styles;

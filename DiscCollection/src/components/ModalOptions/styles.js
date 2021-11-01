import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    marginHorizontal: 0,
    width: '10%',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: 'transparent',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    alignItems: 'flex-start',
    margin: 0,
  },
  textStyle: {
    color: '#000',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default styles;

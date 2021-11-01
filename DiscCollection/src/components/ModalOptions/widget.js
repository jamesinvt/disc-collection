import React, {useCallback, useEffect, useState} from 'react';
import {Text, Pressable, View, Button, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from './styles.js';
import actions from './constants.js';
import testData from '../../../tests/vinyls.json';
const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('file', {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  });
  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  return data;
};

const ModalOptions = ({navigation}) => {
  const onButtonPress = useCallback((type, options) => {
    if (type === 'capture') {
      //   launchCamera(options, () => {
      //   }));
    } else if (type === 'library') {
      launchImageLibrary(options = {includeBase64: true}, response => {
        console.log('Begin Search');
        if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          fetch('http://10.0.0.53:5000/request', {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded', //Specifying the Content-Type
            }),
            body: createFormData(response.assets[0], {id: '123'}),
          })
            .then(data => data.json())
            .then(res => {
              console.log({res});
              const test = testData[0];
              console.log({test});

              navigation.navigate('Record', {data: res});
            //   navigation.goBack();
            //   navigation.navigate('Record', {data: testData[0]});
            })
            .catch(error => {
              console.log('upload error', error);
            });
        }
      });
    }
  }, []);

  return (
    <View style={styles.centeredView}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.buttonContainer}>
            {actions.map(({title, type, options}) => {
              return (
                <Button
                  title={title}
                  key={title}
                  onPress={() => onButtonPress(type, options)}>
                  {title}
                </Button>
              );
            })}
          </View>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ModalOptions;

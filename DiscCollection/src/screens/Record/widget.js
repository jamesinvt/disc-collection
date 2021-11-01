import * as React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
const Record = ({navigation, route}) => (
  <View>
    <Image
      style={styles.logo}
      source={{
        uri: route.params.data.images[0].uri,
      }}
    />
    <View>
      <Text>{route.params.data.title}</Text>
      <Text>{route.params.data.artists_sort}</Text>
      {route.params.data.formats[0].text &&
        ((<Text>{route.params.data.formats[0].descriptions.join(', ')}</Text>),
        (<Text>{route.params.data.formats[0].text}</Text>))}
      <Text>{route.params.data.year}</Text>
    </View>
    <View>
      <Text>Tracklist</Text>
      {route.params.data.tracklist.map(item => (
        <Text key={item.id}>{item.title}</Text>
      ))}
    </View>
    <View>
      <Text>Notes</Text>
      <Text>{route.params.data.notes}</Text>
    </View>
  </View>
);

export default Record;

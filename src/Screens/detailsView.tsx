import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Linking,
  TouchableHighlight,
  Text,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation/stackNavigtor';
import {WebView} from 'react-native-webview';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Details = ({route}: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [html, setHtml] = useState('');
  const [urlLink, setUrl] = useState('');

  const onPress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(urlLink);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(urlLink);
    } else {
      Alert.alert(`Don't know how to open this URL: ${urlLink}`);
    }
  }, [urlLink]);

  useEffect(() => {
    const {event} = route.params;
    if (event) {
      const {name, description, url} = event;
      // Format the HTML for the Event
      const htmlString = `${name.html}${description.html}`;
      setHtml(htmlString);
      setUrl(url);
    }
    setLoading(false);

    // Something went wrong...
  }, [route.params]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView originWhitelist={['*']} source={{html: html}} />
      <View style={styles.footerContainer}>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>More Details?</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  footerContainer: {
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 180,
    backgroundColor: '#00ff91',
    borderRadius: 20,
    padding: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Details;

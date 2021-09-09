import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation/stackNavigtor';
import EventListRow from '../Components/eventListRow';

// Types and Interfaces
type Props = NativeStackScreenProps<RootStackParamList, 'EventList'>;
export interface JsonResponse {
  id?: string;
  text?: string;
  html?: string;
  utc?: string;
  url?: string;
}
export interface Event {
  name: JsonResponse;
  start: JsonResponse;
  description: JsonResponse;
  logo: JsonResponse;
  id: string;
  url: string;
}

const EventList = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const eventSelected = (eventId: string) => {
    const eventData = data.find(({id}) => id === eventId);
    navigation.navigate('Details', {event: eventData});
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        'https://thedistance.co.uk/wp-content/uploads/2020/01/eventbrite.json',
      );
      const json = await response.json();
      // Just doing this, as the ids are all the same which wouldn't happen in valid data.
      // Key extract complains, so just tweaked it a bit
      const betterData = json.events.map((event: any, index: number) => {
        return {
          ...event,
          id: index.toString(),
        };
      });
      setData(betterData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}: {item: Event}) => (
            <EventListRow onPress={eventSelected} event={item} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default EventList;

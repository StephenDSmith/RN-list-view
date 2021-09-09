import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Event} from '../Screens/eventListView';
// Screens
import EventListScreen from '../Screens/eventListView';
import DetailsView from '../Screens/detailsView';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  EventList: undefined;
  Details: {event: Event | undefined};
};

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EventList" component={EventListScreen} />
      <Stack.Screen name="Details" component={DetailsView} />
    </Stack.Navigator>
  );
}

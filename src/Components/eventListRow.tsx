import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {Event} from '../Screens/eventListView';

const moment = require('moment');

interface Props {
  event: Event;
  onPress: (id: string) => void;
}

const EventListRow = ({event, onPress}: Props) => {
  const {name, start, logo} = event;
  const startDate = moment(start.utc).format();

  const eventSelected = () => {
    onPress(event.id);
  };

  return (
    <TouchableHighlight onPress={eventSelected}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: logo.url,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nameLabel}>{name.text}</Text>
          <Text style={styles.dateLabel}>{startDate}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 70,
    height: '100%',
    flexDirection: 'column',
    padding: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  nameLabel: {
    color: 'black',
    fontSize: 14,
    paddingBottom: 6,
    textAlign: 'left',
  },
  dateLabel: {
    color: 'grey',
    fontSize: 12,
    textAlign: 'left',
  },
});

export default EventListRow;

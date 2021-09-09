import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Components
import MyStack from './src/Navigation/stackNavigtor';

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

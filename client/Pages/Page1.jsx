import { View, Text, Button } from 'react-native';
import React from 'react';

export default function Page1(props) {
  return (
    <View>
      <Text>Page1</Text>
      <Button title='go to Login' onPress={() => props.navigation.navigate('Login')}/>
    </View>
  )
}

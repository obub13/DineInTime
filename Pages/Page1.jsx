import { View, Text, Button } from 'react-native';
import React, { useContext } from 'react';
import { ContextPage } from '../Context/ContextProvider';

export default function Page1(props) {

  const { LoadUsers, users } = useContext(ContextPage);

  return (
    <View>
      <Text>Page1</Text>
      <Button title='go to Login' onPress={() => props.navigation.navigate('Login')}/>
      <Button onPress={LoadUsers} title='load'></Button>
      <View>{users.map((u) =><Text key={u._id}>{u.email}</Text>)}</View>
      <Button title='go to not' onPress={() => props.navigation.navigate('PushNotification')}/>
    </View>
  )
}

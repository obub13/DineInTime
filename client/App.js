import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Page1 from './Pages/Page1';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import ContextProvider from './Context/ContextProvider';

import axios from 'axios';
import { useEffect } from 'react';

import { axiosURL } from './utils/api_url';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


//creates the popup hamburger menu with the pages options
function MyDrawer() {
  return (            //startup page 
    <Drawer.Navigator initialRouteName="Page1">  
      <Drawer.Screen
        name="Page1"                       //page title
        component={Page1}                  //component = page element
        options={{ drawerLabel: 'Page1' }} //sets menu label of page
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{ drawerLabel: 'Login' }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{ drawerLabel: 'Register' }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ drawerLabel: 'Home' }}
      />
    </Drawer.Navigator>
  );
}

const fetchApi = async() => {
  try {
    const res  = await fetch(`/api/users`);
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
}

export default function App() {

  useEffect(() => {
    fetchApi();
  }, [])
  

  return (
    <ContextProvider>
    <NavigationContainer>
      <MyDrawer>
      <Stack.Navigator initialRouteName="Page1">
        <Stack.Screen name="Page1" component={Page1} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
      </MyDrawer>
  </NavigationContainer>
  </ContextProvider>
  );
}

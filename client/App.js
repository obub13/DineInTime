import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Page1 from './Pages/Page1';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Order from './Pages/Order';
import ContextProvider from './Context/ContextProvider';
import Admin from './Pages/Admin';
import BusinessRegistration from './Pages/BusinessRegistration';


import { useEffect } from 'react';
import { apiUrl } from './utils/api_url';
import { I18nManager } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

I18nManager.allowRTL(false);  //feature to set app as english left to right language
//creates the popup hamburger menu with the pages options
function MyDrawer() {
  return (            //startup page 
    <Drawer.Navigator initialRouteName="Login">  
      <Drawer.Screen
        name="Main"                       //page title
        component={Page1}                  //component = page element
        options={{ drawerLabel: 'Main' }} //sets menu label of page
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
       <Drawer.Screen
        name="Order"
        component={Order}
        options={{ drawerLabel: 'Order' }}
      />
      <Drawer.Screen
      name="Admin"
      component={Admin}
      // options={{drawerItemStyle: { height: 0 }}} //hides the admin page from menu bar
      />
      <Drawer.Screen
      name="BusinessRegistration"
      component={BusinessRegistration}
      options={{drawerLabel: 'BusinessRegistration'}}/>
    </Drawer.Navigator>
  );
}

const fetchApi = async() => {
  try {
    const res  = await fetch(`${apiUrl}/api/users`);
    const data = await res.json();
    console.log(data);
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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Main" component={Page1} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Admin" component={Admin}/>
        <Stack.Screen name="BusinessRegistration" component={BusinessRegistration}/>
      </Stack.Navigator>
      </MyDrawer>
  </NavigationContainer>
  </ContextProvider>
  );
}

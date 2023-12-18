import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import home from './Home';
import bai1 from './CounterApp/CounterApp'
import bai2 from './TodoList/index'
import bai3 from './Authentication/index'
import bainc from './baitapnangcao'

const Tab = createBottomTabNavigator();

const BaiStack = createBottomTabNavigator();

const BaiTabs = () => (
  <BaiStack.Navigator>
    <BaiStack.Screen
      name="Counter App"
      component={bai1}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="caret-down" size={size} color={color} />
        ),
      }}
    />
   <BaiStack.Screen
      name="Todo List"
      component={bai2}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="caret-down" size={size} color={color} />
        ),
      }}
    />
    <BaiStack.Screen
      name="Login"
      component={bai3}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="caret-down" size={size} color={color} />
        ),
      }}
    />
    <BaiStack.Screen
      name="Bài tập nâng cao"
      component={bainc}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="caret-down" size={size} color={color} />
        ),
      }}
    />
  </BaiStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HOME"
          component={home}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Danh sách bài tập"
          component={BaiTabs}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="list-circle-outline" size={size} color= "red" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
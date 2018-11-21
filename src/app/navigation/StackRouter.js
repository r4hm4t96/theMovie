import React, {Component} from 'react';
import { fadeIn } from 'react-navigation-transitions';
import SplashScreenComponent from '../../modules/Main/Component/SplashScreenComponent';
import LoginScreen from '../../../component/screen/LoginScreen';
import HomeScreen from '.../../../component/screen//HomeScreen';
import DetailMovie from '../../../component/screen/DetailMovie';
import AddFavorite from '../../../component/screen/AddFavorite';
import Notifications from '../../../component/screen/NotificationScreen';
import {StackNavigator} from 'react-navigation';


const Root = StackNavigator({
  Splash:{
    screen:SplashScreenComponent
  },
  Login:{
    screen:LoginScreen
  },
  Home:{
    screen:HomeScreen
  },
  Detail:{
    screen:DetailMovie
  },
  Favorite:{
    screen:AddFavorite
  },
  Notifications:{
    screen: Notifications
  },
},{
  initialRouteName: 'Home',
  headerMode:"none",
  transitionConfig: () => fadeIn()
  
})

export default Root;
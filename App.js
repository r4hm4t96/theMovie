/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, YellowBox, ScrollView, Image, AppRegistry, AsyncStorage} from 'react-native'
import {DB_LOCAL_USER} from './component/property/constant';
import SplashScreen from './component/screen/SplashScreen';
import LoginScreen from './component/screen/LoginScreen';
import HomeScreen from './component/screen//HomeScreen';
import DetailMovie from './component/screen/DetailMovie';
import AddFavorite from './component/screen/AddFavorite';
import Notifications from './component/screen/NotificationScreen';
import firebase from 'react-native-firebase';
import type { Notification, } from 'react-native-firebase';
import {StackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from "redux";
//import store from './component/redux';
import thunk from "redux-thunk";
import * as reducers from './component/redux/reducers/index';
import * as appActions from './component/redux/actions/index';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

const Root = StackNavigator({
  Splash:{
    screen:SplashScreen
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
  }
},{
  initialRouteName: 'Home',
  headerMode:"none"
})

export default class App extends Component {


  onNotificationClick = (notificationOpen) => {
    if(notificationOpen){
      AsyncStorage.getItem(DB_LOCAL_USER).then(
          //   .then(data => {
          //     const notification: Notification = notificationOpen.notification;
          //     const resetAction = StackActions.reset({
          //         index: 0,
          //         actions: [NavigationActions.navigate({ routeName: notification.data.page })],
          //     });
          //     this.router.dispatch(resetAction)
          // })
          // .catch((error) => {
          //     console.log(error)
          // })
           
        
      )
      }
    }


  componentDidMount()
  {
    firebase.messaging().hasPermission()
    .then(enabled => {
      if (enabled) {
        console.log("user has permissions")
        firebase.messaging().getToken()
          .then(fcmToken => {
              if (fcmToken) {
                  console.log("Token")
                  console.log(fcmToken)
              } else {
                  // user doesn't have a device token yet
              }
          });
      } else {
        console.log("// user doesn't have permission")
        firebase.messaging().requestPermission()
        .then(() => {
          console.log(" // User has authorised  ")
        })
        .catch(error => {
          console.log("// User has rejected permissions  ")
        });
      } 
    });

    // FCM.on(event.notif)....{
    //   //change badge
    //   FCM.setBadge( badge => {
    //   FCM.getBadge()+=1;
    //   }).
    //   }
    
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      // Process your token as required
      console.log("Refresh Token");
      console.log(fcmToken);
  });

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
        // Process your notification as required
        notification
        .android.setChannelId('THE MOVIE')
        .android.setSmallIcon('logo_movie');
        firebase.notifications().displayNotification(notification)
    });
  
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(
    (notificationOpen:NotificationOpen) =>{
      this.onNotificationClick(notificationOpen)
    });

    firebase.notifications().getInitialNotification()
        .then((notificationOpen:NotificationOpen)=>{
            this.onNotificationClick(notificationOpen)
        });
  
  }

  componentWillUnmount() {
      this.notificationDisplayedListener();
      this.notificationListener();
      this.notificationOpenedListener();
      this.onTokenRefreshListener();
  }

  render(){
    return(
      <Provider store={store}>
        <Root/>
      </Provider>
    )
  }
}



import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, YellowBox, ScrollView, Image, AppRegistry, AsyncStorage} from 'react-native'
import {DB_LOCAL_USER} from './component/property/constant';
import firebase from 'react-native-firebase';
import { NavigationActions, StackActions } from 'react-navigation';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from "redux";
import { PersistGate } from 'redux-persist/integration/react';
import { createPersistStore } from './src/app/store';
import { createNavComponent, navMiddleware } from './src/app/navigation/ReduxNavigation';
import combinedReducers from './src/app/store/reducers';
import SplashScreenComponent from './src/modules/Main/Component/SplashScreenComponent';

export const ReduxPersist = createPersistStore(combinedReducers, navMiddleware);

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
    const NavView = createNavComponent();
    return(
      <Provider store={ReduxPersist.store}>
        <PersistGate loading={<SplashScreenComponent />} persistor={ReduxPersist.persistor}>
          <NavView/>
        </PersistGate>
      </Provider>
    )
  }
}


import React, { Component } from 'react';
import { View, Text,AsyncStorage,Image,ActivityIndicator,Dimensions } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

export default class SplashScreen extends Component {
  
    constructor(props) {
        super(props);
        this.state={
          
        }
      }

      render() {
        // const {navigate} = this.props.navigation;
          setTimeout(() => {
               this.props.navigation.navigate('Login')
          }, 5000);

        return (
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor:'steelblue'}}>
            <Image style={{alignSelf: 'center', justifyContent:'center',width:"100%",height:130}} source={require("../../../../component/images/splashMovie.png")}/>
            <ActivityIndicator size={'large'} style={{marginTop:30}}/>
          </View>
        );
      }
  }

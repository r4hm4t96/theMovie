import React, { Component } from 'react';
import { View, Text,Dimensions,Image, FlatList,ScrollView,TouchableOpacity,BackHandler,Alert } from 'react-native';
import listMovie from '../property/listMovie.json'
import ElevatedView from 'react-native-elevated-view'
import Icon from 'react-native-vector-icons/Entypo';
import IconBadge from 'react-native-icon-badge';
import { connect } from 'react-redux';
import {createStore, applyMiddleware, combineReducers, bindActionCreators} from "redux";
import * as appActions from '../redux/actions';
import _ from 'lodash';
import { StackActions, NavigationActions } from 'react-navigation';

const WINDOW = Dimensions.get('window');

// const notif = PushNotification.localNotificationSchedule({
//     message: message,
//     date: date,
//     number: ''+ someId,
//     applicationIconBadgeNumber: 0,
// });

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMovie:[],
      BadgeCount:2
    };
  }

  
  
//   handleBackButton = () => {
//    Alert.alert(
//        'Logout',
//        'Are you sure to logout?', [{
//            text: 'Cancel',
//            onPress: () => console.log('Cancel Pressed'),
//            style: 'cancel'
//        }, {
//            text: 'OK',
//            onPress: () => this.props.navigation.navigate('Login')
//        }, ], {
//            cancelable: false
//        }
//     )
//     return true;
//   } 

  componentDidMount = () => {
      console.log("this redux count = "+this.props.notifState.notif_count);
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    const url = 'https://next.json-generator.com/api/json/get/EyteKyjDH'
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                listMovie: responseJson.list_movie
            })
        })
        .catch((error) => {
            console.log(error)
        })

        // this.props.getNotification()
        //     .then(returnData => {
        //         // ambil notifikasi dari redux
        //     })
  }

  handleNotif = () => {
      this.props.navigation.navigate('Notifications')
  }

  

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={
        () => {
            this.props.navigation.navigate('Detail', item);
        }}>
            <ElevatedView elevation={2} style={{ flexDirection: 'row',marginVertical: 8, width: WINDOW.width / 1.1 ,alignSelf:'center', height: 300, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                <View>
                    <Image style={{ marginLeft: 16, width: 150, height: 280, marginTop: 10, marginBottom: 10,resizeMode:'stretch' }} source={{ uri: item.image }} />
                </View>
                <View style={{ width: WINDOW.width * 0.5, height: 280, backgroundColor: '#fff'}}>
                    <Text style={{ marginLeft: 8, marginRight: 16, fontSize: 34, marginTop: 8,textAlign:'center', color: '#998DE6' }}>{item.judul}</Text>
                    <Text style={{ marginLeft: 8, marginRight: 16, fontSize: 28, marginTop:30, textAlign:'center', marginBottom: 10, color: '#998DE6' }}>{item.rating}</Text>
                </View>
                <View style={{position:'absolute',justifyContent:'flex-end',right:0,bottom:0}}>
                    <Text style={{fontSize:12}}>Detail...</Text>
                </View>
            </ElevatedView >
          </TouchableOpacity>
        )
    }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#364854'}}>
        <View style={{backgroundColor:'steelblue',width:"100%", height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{width:50}}/>
          <Image source={require('../images/splashMovie.png')} style={{alignSelf:'center',width:100,height:80,resizeMode:'contain',}}/>
          <TouchableOpacity onPress={this.handleNotif}>
            <IconBadge
                MainElement={
                    <View style={{width:35,height:50,justifyContent: 'center',}}>
                        <Icon name='bell' size={28} style={{marginRight:10,color:'#fff'}}/>
                    </View>
                }
                BadgeElement={
                    <Text style={{color:'#FFFFFF'}}>{this.props.notifState.notif_count}</Text>
                }
                Hidden={this.state.BadgeCount==0}/>         
          </TouchableOpacity>
        </View>

        <ScrollView>
        <View>
          <FlatList 
                data={this.state.listMovie}
                renderItem={this.renderItem}
                keyExtractor={(item,index)=> index.toString()}/>
        </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
        notifState: state.notification,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(appActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

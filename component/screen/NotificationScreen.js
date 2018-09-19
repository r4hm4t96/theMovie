import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import IconBadge from 'react-native-icon-badge';
import { connect } from 'react-redux';
import { getNotifications } from '../redux/actions/ActNotification';
import _ from 'lodash';
import * as Actions from '../redux/actions';
import {DB_LOCAL_USER} from '../property/constant';

const WINDOW = Dimensions.get('window');

const dataNotif = [
    {
        id:2,
        title:"Announcement 2",
        read:false
    },
    {
        id:3,
        title:"Announcement 3",
        read:false
    },
    {
        id:4,
        title:"Announcement 4",
        read:true
    },
    {
        id:5,
        title:"Announcement 5",
        read:true
    }
]


 class NotificationScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            BadgeCount:2
        }
        
    }

    componentDidMount = () => {
        
        // AsyncStorage.getItem(DB_LOCAL_USER)
        //     .then(dbUser => {
        //         var user = JSON.stringify(dbUser);
  
        //     })
        // this.props.getNotification()
        //     .then(returnValue => {
              
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         // this.loading.setTimeout(true);
        //     })
    }

    readUnread = (item) => {
        // console.log(item)
        this.props.setNotification(item)
            .then(returnData => {
               
            })
            .catch(error => {
                this.setTimeout(true);
            })
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={ this.readUnread(item)}>   
                <View style={{ width: "100%", height: 70, backgroundColor: '#fff',margin:5}}>
                    <Text style={{ fontSize: 34, marginTop: 8,textAlign:'center', color: '#998DE6' }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
            )
        }

    render() {
        return (
        <View style={{flex:1,backgroundColor:'#364854'}}>
            <View style={{backgroundColor:'steelblue',width:"100%", height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <View style={{width:50}}/>
                    <Image source={require('../images/splashMovie.png')} style={{alignSelf:'center',width:100,height:80,resizeMode:'contain',}}/>
                        <TouchableOpacity>
                            <IconBadge
                                MainElement={
                                    <View style={{width:35,height:50,justifyContent: 'center',}}>      
                                    <Icon name='bell' size={28} style={{marginRight:10,color:'#fff'}}/>
                                    </View>
                                }
                                BadgeElement={
                                    <Text style={{color:'#FFFFFF'}}>{this.props.unreadNotifications.length.toString()}</Text>
                                }
                                Hidden={this.state.BadgeCount==0}/>
                        </TouchableOpacity>
            </View>

            <View>
                <FlatList 
                    data={dataNotif}
                    renderItem={this.renderItem}
                    keyExtractor={(item,index)=> index.toString()}/>
            </View>
        </View>
        );
      }
    }
  
    function mapStateToProps(state, props) {
        // console.log(state);
        // console.log(props);
        return {

            unreadNotifications: _.filter(state.notification, notification => notification.read != null && notification.read == false)
        }
    } 

    function mapDispatchToProps(dispatch, props) {
      return{
        getNotification: () => Actions.getNotification(dispatch),
        setNotification: (item) => Actions.setNotification(dispatch, item),
      };
    }

  export default connect(mapStateToProps,mapDispatchToProps) (NotificationScreen);
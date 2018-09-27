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
import _ from 'lodash';
import { connect } from 'react-redux';
import {createStore, applyMiddleware, combineReducers, bindActionCreators} from "redux";
import * as appActions from '../redux/actions';
import {notification} from '../redux/reducers/notificationReducer';
import {DB_LOCAL_USER} from '../property/constant';

const WINDOW = Dimensions.get('window');

// const dataNotif = [
//     {
//         id:2,
//         title:"Announcement 2",
//         read:false
//     },
//     {
//         id:3,
//         title:"Announcement 3",
//         read:false
//     },
//     {
//         id:4,
//         title:"Announcement 4",
//         read:true
//     },
//     {
//         id:5,
//         title:"Announcement 5",
//         read:true
//     }
// ]

 class ListItem extends Component {
    constructor(props){
        super(props);
        
        console.log(props)
    this.state = {
        selected: !props.read,
     }
    }
    //gimana mas?mas??

     _onPress = () => {
        this.setState({
            selected: !this.state.selected
        })
    };
    
    render = () => {
        const viewStyle = this.state.selected ?
            styles.textBold : styles.textNormal;
        console.log(this.state.selected);
        console.log(this.props.read)
        return (
            <TouchableOpacity onPress={this._onPress}>  
             
                <View style={{ width: "100%", height: 70, backgroundColor: '#fff',margin:5,justifyContent: 'center',}}>
                    <Text style={viewStyle }>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
            )
        }
 }

 class NotificationScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            BadgeCount:2,
            // changeRead: true,
            
        }
    }

    componentDidMount = () => {
    
    }
    
    _keyExtractor = (item, index) => item.id.toString();

    _renderItem = ({ item,index }) => (
        <ListItem
            id={item.id}
            title={item.title}
            read={item.read}
        />
    );
        
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
                                    <Text style={{color:'#FFFFFF'}}>{this.props.notifState.notif_count}</Text>
                                }
                                Hidden={this.state.BadgeCount==0}/>
                        </TouchableOpacity>
            </View>

            <View>
                <FlatList 
                    data={this.props.notifState.notif_data}
                    renderItem={this._renderItem}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}/>
            </View>
        </View>
        );
      }
    }

    const styles = StyleSheet.create({
        textBold:{
            fontSize: 16,  textAlign:'center',  color: 'black', fontWeight: 'bold',
        },
        textNormal:{
            fontSize: 16,  textAlign:'center',  color: 'black', fontWeight: 'normal',
        }
    })  
    
    function mapStateToProps(state, props) {
        return {
            notifState: state.notification,
            // unreadNotifications: _.filter(state.notification, notification => notification.read != null && notification.read == false)
        }
    } 

    function mapDispatchToProps(dispatch, props) {
      return{
        // getNotification: () => Actions.getNotification(dispatch),
        // setNotification: (item) => Actions.setNotification(dispatch, item),
        actions: bindActionCreators(appActions, dispatch)
      };
    }

  export default connect(mapStateToProps,mapDispatchToProps) (NotificationScreen);
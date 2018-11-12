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
// import IconBadge from 'react-native-icon-badge';
import ContainBadge from '../../container/ContainBadge'
import _ from 'lodash';
import { connect } from 'react-redux';
import {createStore, applyMiddleware, combineReducers, bindActionCreators} from "redux";
import * as appActions from '../redux/actions';
import {notification} from '../redux/reducers/notificationReducer';
import { NOTIFICATIONS_READ, NOTIFICATIONS_UNREAD } from '../redux/actions/actiontypes';
import ListNotif from '../../container/ListNotif';

const WINDOW = Dimensions.get('window');

class ListItem extends Component {
    constructor(props){
        super(props);
        console.log(props)
    this.state = {
        selected: !props.read,
        }
    }

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
            
        }
    }

    handleNotif = () => {
        this.props.navigation.navigate('Notifications')
    }

    _keyExtractor = (item, index) => item.id.toString();

    _renderItem = ({ item,index }) => (
        <ListItem
            id={item.id}
            title={item.title}
            read={item.read}
            onPress={this.props.onPress}
        />
    );
        
    render() {
        return (
        <View style={{flex:1,backgroundColor:'#364854'}}>
            <View style={{backgroundColor:'steelblue',width:"100%", height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <View style={{width:50}}/>
                    <Image source={require('../images/splashMovie.png')} style={{alignSelf:'center',width:100,height:80,resizeMode:'contain',}}/>
                        <ContainBadge/>                        
            </View>
                <FlatList 
                    data={this.props.notifState.notif_data}
                    renderItem={this._renderItem}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    onPress={this.props.unreadNotif}
                    />
            <View>
                
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
    
    function mapStateToProps(state, ownProps) {
        return {
            notifState: state.notification,
        }
    } 

    function mapDispatchToProps(dispatch) {
      return{
        actions: bindActionCreators(appActions, dispatch),
        // readNotif: (notification)=>dispatch({type: NOTIFICATIONS_READ, payload:notification}),
        unreadNotif: (readUnread)=>dispatch({type:NOTIFICATIONS_UNREAD, payload:readUnread})
      };
    }

  export default connect(mapStateToProps,mapDispatchToProps) (NotificationScreen);
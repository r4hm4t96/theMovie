import React, { Component } from 'react';
import { View, Text,Dimensions,TextInput,Image,TouchableOpacity,Alert,ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/Entypo';
import IconBadge from 'react-native-icon-badge';
import { connect } from 'react-redux';
import {createStore, applyMiddleware, combineReducers, bindActionCreators} from "redux";
import * as appActions from '../redux/actions';
import _ from 'lodash';


const WINDOW = Dimensions.get('window');

class AddFavorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BadgeCount:0,
      isFocused: false,
      skor:'',
      email:null,
      comments:null,
    };
    this.inputFile = {};
  }

  focusNext(id) {
    this
        .inputFile[id]
        .focus();
  };

  skor1 = () => {
    this.setState({skor:"★"})
  }

  skor2 = () => {
    this.setState({skor:"★★"})
  }

  skor3 = () => {
    this.setState({skor:"★★★"})
  }

  skor4 = () => {
    this.setState({skor:"★★★★"})
  }

  skor5 = () => {
    this.setState({skor:"★★★★★"})
  }

  textClear = () => {
    let email = this.inputFile["email"];
    let comments = this.inputFile["comments"];
    // console.log(email);
    email.clear();
    comments.clear();
    this.setState({ email:'', comments:'',skor:''})
  }

  handleEmail = (text) => {
    this.setState({email: text})
  };

  handleComments = (text) => {
    this.setState({comments: text})
  };

  handleNotif = () => {
    this.props.navigation.navigate('Notifications')
  }

  handleSave = () => {
    if(this.state.email == null || this.state.email.trim() == ""){
      Alert.alert("Error","Please Fill a valid Email!");
    } else if (this.state.comments == null || this.state.comments.trim() == ""){
      Alert.alert("Error","Please Input Your Comments!");
    } else if (this.state.skor == "" || this.state.skor.trim() == ""){
      Alert.alert("Error","Please Input Your Skor!");
    } else {
      Alert.alert("Success","Your comments has been saved!");
      this.textClear()
    }
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
         
        <View style={{flex:1}}>
          <ScrollView>
            <ElevatedView elevation={2} style={{width:"100%",height:WINDOW.height,alignItems:'center'}}>
              <View style={{marginTop:30}}>
                  <Text style={{fontSize:16,}}>Email</Text>
                  <TextInput 
                      style={{width:300,height:40,borderBottomColor:'grey',borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1}}
                      blurOnSubmit={false}
                      onChangeText={this.handleEmail}
                      returnKeyType={"next"}
                      placeholder='Input Your Email'
                      underlineColorAndroid='transparent'
                      onSubmitEditing={() => {
                        this.focusNext('comments')
                      }}
                      ref={input => {
                        this.inputFile['email'] = input;
                      }}
                      
                      />
              </View>
              <View style={{marginTop:30}}>
                  <Text style={{fontSize:16,}}>Comments</Text>
                  <TextInput 
                      style={{width:300,height:70,borderBottomColor:'grey',borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1}}
                      blurOnSubmit={false}
                      onChangeText={this.handleComments}
                      multiline={true}
                      placeholder='Comments...'
                      numberOfLines = {4}
                      underlineColorAndroid='transparent'
                      ref={input => {
                        this.inputFile['comments'] = input;
                      }}
                      />
              </View>
              <View style={{marginTop:30, flexDirection:'row', marginRight:15}}>
                  <Text style={{fontSize:16,marginRight:5,left:-120}}>Skor:</Text>
                  <Text style={{fontSize:16,color:'#ffdf00',position:'absolute',left:-75}}>{this.state.skor}</Text>
                
              </View>
              <View style={{marginTop:10,marginRight:10,marginLeft:10,flexDirection:'row',alignSelf:'center'}}>
                  <TouchableOpacity onPress={this.skor1} style={{width:"30%",height:30,borderRadius:20,backgroundColor:'#d2eaff',justifyContent: 'center',marginRight:5}}>
                      <Text style={{textAlign:'center',fontSize:20,color:'#ffdf00'}}>★</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.skor2} style={{width:"30%",height:30,borderRadius:20,backgroundColor:'#d2eaff',justifyContent: 'center',marginRight:5}}>
                      <Text style={{textAlign:'center',fontSize:20,color:'#ffdf00'}}>★★</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.skor3} style={{width:"30%",height:30,borderRadius:20,backgroundColor:'#d2eaff',justifyContent: 'center',marginRight:5}}>
                      <Text style={{textAlign:'center',fontSize:20,color:'#ffdf00'}}>★★★</Text>
                  </TouchableOpacity>
              </View>
              <View style={{marginTop:10,marginRight:10,marginLeft:10,flexDirection:'row',alignSelf:'center'}}>
                  <TouchableOpacity onPress={this.skor4} style={{width:"30%",height:30,borderRadius:20,backgroundColor:'#d2eaff',justifyContent: 'center',marginRight:5}}>
                      <Text style={{textAlign:'center',fontSize:20,color:'#ffdf00'}}>★★★★</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.skor5} style={{width:"30%",height:30,borderRadius:20,backgroundColor:'#d2eaff',justifyContent: 'center',marginRight:5}}>
                      <Text style={{textAlign:'center',fontSize:20,color:'#ffdf00'}}>★★★★★</Text>
                  </TouchableOpacity>
              </View>

              <View style={{flexDirection:'row',marginTop:30,marginLeft:30,marginRight:30,alignSelf:'center'}}>
                  <TouchableOpacity onPress={this.textClear} style={{width:"40%",height:40,borderRadius:20,backgroundColor:'red',justifyContent: 'center',marginRight:20}}>
                      <Text style={{textAlign:'center',fontSize:16,color:'#fff'}}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.handleSave} style={{width:"40%",height:40,borderRadius:20,justifyContent: 'center',backgroundColor:'steelblue'}}>
                      <Text style={{textAlign:'center',fontSize:16,color:'#fff'}}>Save</Text>
                  </TouchableOpacity>
              </View>
            </ElevatedView>
          </ScrollView>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFavorite);
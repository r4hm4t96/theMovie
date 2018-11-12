import React, { Component } from 'react';
import { View, Text,TouchableOpacity,Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'
import { withNavigation } from 'react-navigation'

class ContainBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static defaultProps = {
    onPress: null, // on click

  }

  render() {
    const badgeStyle = this.props.notifState.notif_count < 1 ?
        styles.hideBadge : styles.showBadge;
    
    const badgeTextStyle = this.props.notifState.notif_count < 1 ?
        styles.hideBadge : styles.textBadge;
    
    return (
      <View style={{padding:5}}>
        
        <View style={badgeStyle}>
            <Text style={badgeTextStyle}>
              {this.props.notifState.notif_count}
            </Text>
        </View>
            <Icon onPress={this.props.onPress} name='bell' size={30} style={{color:'#fff'}}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    return{
        notifState: state.notification,
    }
}

export default connect(mapStateToProps)(withNavigation(ContainBadge));

const styles= StyleSheet.create({
    showBadge:{
        position:'absolute',
        height:20,
        width:20,
        borderRadius:15,
        backgroundColor:'red',
        left:18,
        bottom:25,
        alignItems:'center',
        justifyContent:'center',
        zIndex:2000
    },
    hideBadge:{
        backgroundColor:'transparent',
        // color:'rgba(0,0,0,0)',
        position:'absolute',
        justifyContent:'center',
    },
    textBadge:{
        color:'white', 
        fontWeight: 'bold',
    }
})


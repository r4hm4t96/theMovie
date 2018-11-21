//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FavoriteComponent from '../Component/FavoriteComponent';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';

// create a component
class FavoriteContainer extends Component {
    
    // componentDidMount = () => {
    //     var count = this.props.notifState.notif_data.filter(value => value.read === false).length;
    //     this.props.actions.setNotifCount(count);
    //     console.log("count = "+count);
    //     console.log("this redux count = "+this.props.notifState.notif_count);
    //   }
    
    render() {
        return (
            <FavoriteComponent {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => {
    return{
        openNotif : () => (StackActions.push({routeName:"Notifications"}))
    }
};

//make this component available to the app
export default connect (mapStateToProps,mapDispatchToProps) (FavoriteContainer);

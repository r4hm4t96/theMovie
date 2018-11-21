// import { Reducer, createStore, applyMiddleware } from "redux";
import { createNavigationReducer, reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import StackRouter from "./StackRouter";
import { connect } from 'react-redux';
// import { Component } from "react";

export function createNavReducer() {
  return createNavigationReducer(StackRouter);
}

export const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

export function createNavComponent() {
  const AppNavigator = reduxifyNavigator(StackRouter, "root");
  const mapStateToProps = (state) => ({
    state: state.nav,
  });
  return connect(mapStateToProps)(AppNavigator);
}
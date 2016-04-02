import React, {
  Component,
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  DeviceEventEmitter,
  LayoutAnimation
} from 'react-native';

import User from '../common/user';
import Button from '../common/button';
import Link from '../common/link';
import Api from '../common/api';
import Validation from '../common/validation';

module.exports = class Signup extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      bottomSize: 0
    }
  }

  componentWillMount(){
    this.keyboardWillShowListener = DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    this.keyboardWillHideListener = DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  componentWillUnmount(){
    if(this.keyboardWillShowListener)
      this.keyboardWillShowListener = DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    if(this.keyboardWillHideListener)
      this.keyboardWillHideListener = DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  keyboardWillShow(e){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    let newSize = e.endCoordinates.height;
    this.setState({
      bottomSize: newSize
    })
  }

  keyboardWillHide(e){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({
      bottomSize: 0
    })
  }

  render(){
    return (
      <View style={[styles.container, {paddingBottom: this.state.bottomSize}]}>
        <View style={styles.top}>
          <Text>
            <Text style={styles.heading}>Sign up</Text>
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({email: text})}
            />

          <Text style={styles.label}>Password:</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}
              />

          <Text style={styles.error}>{this.state.errorMessage}</Text>
          <Button text="Sign Up" onPress={ () => this.onSignupPress() } />
          <Link
            text="Already have an account? Sign In"
            style={styles.link}
            onPress={ () => this.onLoginPress() } />
        </View>
      </View>
    );
  }

  onSignupPress(){
    let emailValidation = Validation.checkEmail(this.state.email);
    let passwordValidation = Validation.checkPassword(this.state.password);
    
    if(emailValidation.success
      && passwordValidation.success){
      Api.registration({
        email: this.state.email,
        password: this.state.password
      })
        .then((data) => {
          if(data.success) {
            User.setUser({
              email: this.state.email,
              token: data.token,
              refresh: data.refresh
            });

            this.props.navigator.immediatelyResetRouteStack([{ name: 'home'}]);
          }else{
            this.setState({
              errorMessage: data.message
            })
          }
        });
    }else{
      this.setState({
        errorMessage: emailValidation.message ?
          emailValidation.message : passwordValidation.message
      })
    }
  }

  onLoginPress(){
    this.props.navigator.push({name: 'signin'});
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#89bdd3'
  },
  top: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    flex: 1
  },
  link: {
    alignSelf: 'flex-end'
  },
  heading: {
    color: 'white',
    fontSize: 26
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    margin: 5,
    width: 250,
    alignSelf: 'center'
  },
  label : {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    width: 250
  },
  error: {
    fontSize: 18,
    color: 'red'
  }
});

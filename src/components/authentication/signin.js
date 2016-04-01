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

module.exports = class Signin extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      visibleHeight: Dimensions.get('window').height
    }
  }

  componentWillMount(){
    this.keyboardWillShowListener = DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    this.keyboardWillHideListener = DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  keyboardWillShow(e){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    let newSize = e.endCoordinates.height;
    this.setState({
      bottomSize: newSize
    })

    console.log(this.state.visibleHeight);
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
            <Text style={styles.heading}>Sign in</Text>
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
          <Button text="Sign In" onPress={ () => this.onPress() } />
          <Link
            text="Need an account? Sign Up"
            style={styles.link}
            onPress={ () => this.onSignupPress() } />
        </View>
      </View>
    );
  }

  onPress(){
    if(Validation.checkEmail(this.state.email).success
      && Validation.checkPassword(this.state.password).success){
        Api.authenticate({
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
    }
  }

  onSignupPress(){
    this.props.navigator.pop();
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

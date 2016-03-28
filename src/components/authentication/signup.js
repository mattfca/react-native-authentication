import React, {
  Component,
  Text,
  View,
  StyleSheet,
  TextInput
} from 'react-native';

import Realm from '../common/realm';
import Button from '../common/button';
import Api from '../common/api';

module.exports = class Signup extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>Sign up</Text>

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
        <Button text="Submit" onPress={ () => this.onSignupPress() } />
        <Button text="Back to login" onPress={ () => this.onLoginPress() } />
      </View>
    );
  }

  onSignupPress(){
    // check if email is an email
    // check if password is set

    Api.registration({
      email: this.state.email,
      password: this.state.password
    })
      .then((data) => {
        if(data.success) {
          Realm.write(() => {
            Realm.delete(Realm.objects('User'));

            let user = Realm.create('User', {
              email: this.state.email,
              token: data.token,
              refresh: data.refresh
            });
          });

          this.props.navigator.immediatelyResetRouteStack([{ name: 'home'}]);
        }else{
          this.setState({
            errorMessage: data.message
          })
        }
      });
  }

  onLoginPress(){
    this.props.navigator.pop();
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  label : {
    fontSize: 18
  },
  error: {
    fontSize: 18,
    color: 'red'
  }
});

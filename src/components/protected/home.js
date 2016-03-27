import React, {
  View,
  StyleSheet,
  Text
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

module.exports = class Button extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true
    }
  }

  componentWillMount(){
    setTimeout(() => {
      this.setState({ loading: false });
    },3000);
  }

  render(){
    return (
      <View style={styles.container}>
      <Spinner
        style={{marginTop: 30}}
        overlayColor='rgba(0,0,0,1)'
        visible={this.state.loading}
        />
        <Text>Welcome to the app!</Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

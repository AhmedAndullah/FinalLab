import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ImageBackground } from 'react-native';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface LoginProps {
  navigation: any;
}

interface LoginState {
  email: string;
  password: string;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in with:', user.email);
        navigation.navigate('Home');
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert('Login Failed', errorMessage);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <ImageBackground source={require('./assets/login_background.jpg')} style={styles.background}>
        <View style={styles.container}>
          <Image source={require('./assets/login_icon.jpeg')} style={styles.logo} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#333"
            onChangeText={text => this.setState({ email: text })}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#333"
            onChangeText={text => this.setState({ password: text })}
            value={password}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.linkText}>Don't have an account? Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: 'white',
    opacity: 0.8,
  },
  button: {
    backgroundColor: '#f7b731',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Login;

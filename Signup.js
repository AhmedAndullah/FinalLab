// Signup.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import CustomButton from './CustomButton';
import useForm from './useForm';
import styles from './styles';

const Signup = ({ navigation }) => {
  const [formValues, handleChange] = useForm({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword } = formValues;

  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Registered with:', user.email);
        navigation.navigate('Home');
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert('Signup Failed', errorMessage);
      });
  };

  return (
    <ImageBackground source={require('./assets/login_background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#333"
          onChangeText={text => handleChange('email', text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#333"
          onChangeText={text => handleChange('password', text)}
          value={password}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#333"
          onChangeText={text => handleChange('confirmPassword', text)}
          value={confirmPassword}
          secureTextEntry={true}
        />
        <CustomButton title="Signup" onPress={handleSignup} />
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Signup;

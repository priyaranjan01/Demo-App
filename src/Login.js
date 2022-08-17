import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    let defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let url = 'https://fakestoreapi.com/auth/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      // const json = await response.json();
      console.log('UserData=', response?.ok);
      if (response?.ok) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
    } finally {
      //
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.loginText}>Login</Text>
      </View>
      <View style={styles.bottomBox}>
        <GInput
          title={'Username'}
          value={username}
          placeholder="xyz25"
          onChangeText={val => setUsername(val)}
        />
        <GInput
          title={'Password'}
          value={password}
          placeholder="password"
          onChangeText={val => setPassword(val)}
          inputProps={{
            secureTextEntry: true,
          }}
        />
        <Text style={styles.forgotButton}>Forgot Password?</Text>
        <TouchableOpacity
          style={styles.signinButton}
          onPress={() => handleLogin()}>
          <Text style={styles.signTitle}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupInitialText}>Not a member? </Text>
          <Text style={styles.signupText}>Sign up here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const GInput = props => {
  const {title, placeholder, value, onChangeText, style} = props;
  return (
    <View style={style}>
      <Text style={styles.inputTitle}>{title}</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          spellCheck={false}
          {...props.inputProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBox: {
    flex: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {fontSize: 40, fontWeight: 'bold'},
  bottomBox: {
    flex: 4,
    padding: 30,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: Platform.OS === 'ios' ? 3 : 0,
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 4,
    shadowOpacity: 0.2,
    padding: 10,
    marginVertical: 15,
    borderRadius: 5,
  },
  inputTitle: {color: '#222'},
  forgotButton: {marginLeft: 'auto', color: '#555'},
  signinButton: {
    padding: 15,
    paddingHorizontal: 30,
    backgroundColor: 'green',
    marginLeft: 'auto',
    borderRadius: 10,
    marginVertical: 20,
  },
  signTitle: {fontSize: 18, color: '#fff', fontWeight: 'bold'},
  signupButton: {marginLeft: 'auto', flexDirection: 'row'},
  signupInitialText: {color: '#222'},
  signupText: {color: '#222', textDecorationLine: 'underline'},
});

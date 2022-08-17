import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

export default function Signup({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const handleLSignup = async () => {
    let defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let url = 'https://fakestoreapi.com/users';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          name: {
            firstname: 'John',
            lastname: 'Doe',
          },
          address: {
            city: 'kilcoole',
            street: '7835 new road',
            number: 3,
            zipcode: '12926-3874',
            geolocation: {
              lat: '-37.3159',
              long: '81.1496',
            },
          },
          phone: phone,
        }),
      });
      console.log('UserData=', JSON.stringify(response));
      if (response.ok) {
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    } finally {
      //
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.bottomBox}>
          <GInput
            title={'Email'}
            value={email}
            placeholder="xyz@gmail.com"
            onChangeText={val => setEmail(val)}
          />
          <GInput
            title={'Username'}
            value={username}
            placeholder="xyz_25"
            onChangeText={val => setUsername(val)}
          />
          <GInput
            title={'Phone'}
            value={phone}
            placeholder="9876543210"
            onChangeText={val => setPhone(val)}
            inputProps={{
              keyboardType: 'phone-pad',
            }}
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
          <TouchableOpacity
            // disabled={!email || !password || !username || !phone}
            style={styles.signupButton}
            onPress={() => handleLSignup()}>
            <Text style={styles.signTitle}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  },
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
  signupButton: {
    padding: 15,
    paddingHorizontal: 30,
    backgroundColor: 'green',
    marginTop: 50,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  signTitle: {fontSize: 18, color: '#fff', fontWeight: 'bold'},
  signupInitialText: {color: '#222'},
  signupText: {color: '#222', textDecorationLine: 'underline'},
});

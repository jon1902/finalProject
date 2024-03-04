import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { View } from '@/components/Themed';
import { useUserContext } from '@/contexts/userContext';

export default function RegisterScreen() {
  const { onRegister } = useUserContext()

  const [authForm, setAuthForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const onChangeAuthForm = (value: string, key: string): void => {
    setAuthForm((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        value={authForm.username}
        onChangeText={text => onChangeAuthForm(text, 'username')}
        style={styles.textInput}
      />
      <TextInput
        label="Email"
        value={authForm.email}
        onChangeText={text => onChangeAuthForm(text, 'email')}
        style={styles.textInput}
      />
      <TextInput
        label="Password"
        value={authForm.password}
        onChangeText={text => onChangeAuthForm(text, 'password')}
        style={styles.textInput}
      />
      <Button mode="contained" onPress={() => onRegister(authForm)} style={styles.button}>
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 12
  },
  textInput: {
    width: '90%'
  },
  button: {
    width: '60%'
  }
});
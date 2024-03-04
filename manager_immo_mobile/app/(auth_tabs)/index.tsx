import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { View } from '@/components/Themed';
import { useUserContext } from '@/contexts/userContext';

export default function LoginScreen() {
  const { onLogin } = useUserContext()

  const [authForm, setAuthForm] = useState({
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
        label="Email"
        value={authForm.email}
        onChangeText={text => onChangeAuthForm(text, 'email')}
        style={styles.textInput}
      />
      <TextInput
        label="Password"
        value={authForm.password}
        secureTextEntry
        onChangeText={text => onChangeAuthForm(text, 'password')}
        style={styles.textInput}
      />
      <Button mode="contained" onPress={() => onLogin(authForm)} style={styles.button}>
        Login
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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { TextInput, Button } from 'react-native-paper'
import { useState, useEffect } from 'react';
import { api } from '@/config/api';
import { usePropertyContext } from '@/contexts/propertyContext';
import { router } from 'expo-router';

export default function ModalScreen() {
  const { currentProperty, onSaveProperty } = usePropertyContext();

  const [propertyForm, setPropertyForm] = useState({
    name: '',
    address: ''
  });

  useEffect(() => {
    if(currentProperty) {
      setPropertyForm({
        name: currentProperty.name,
        address: currentProperty.address
      })
    }
  }, [currentProperty])

  const onChangePropertyForm = (value: string, key: string): void => {
    setPropertyForm((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={propertyForm.name}
        onChangeText={text => onChangePropertyForm(text, 'name')}
        style={styles.textInput}
      />
      <TextInput
        label="Address"
        value={propertyForm.address}
        onChangeText={text => onChangePropertyForm(text, 'address')}
        style={styles.textInput}
      />
      <Button mode="contained" onPress={() => onSaveProperty(propertyForm)} style={styles.button}>
        Save
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

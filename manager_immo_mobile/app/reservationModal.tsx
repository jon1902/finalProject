import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import { TextInput, Button } from 'react-native-paper'
import { useState, useEffect } from 'react';
import { api } from '@/config/api';
import { useReservationContext, IPropertyHistoryForm } from '@/contexts/reservationContext';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ModalScreen() {
  const { currentReservation, onSaveReservation } = useReservationContext();

  const [propertyForm, setPropertyForm] = useState<IPropertyHistoryForm>({
    name: '',
    incomea: 0,
    startAt: new Date(),
    endAt: new Date()
  });

  useEffect(() => {
    if(currentReservation) {
      setPropertyForm({
        name: currentReservation.name,
        incomea: currentReservation.incomea,
        startAt: new Date(currentReservation.startAt),
        endAt: new Date(currentReservation.endAt)
      })
    }
  }, [currentReservation])

  const onChangePropertyForm = (value: string, key: string, number?: boolean): void => {
    setPropertyForm((prev) => ({
      ...prev,
      [key]: number ? parseFloat(value) : value
    }))
  }

  const onChangePropertyDateForm = (value: Date | undefined, key: string): void => {
    if(!value) return;

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
        label="Incomea"
        value={`${propertyForm.incomea}`}
        onChangeText={text => onChangePropertyForm(text, 'incomea')}
        style={styles.textInput}
      />
      <View>
        <Text>StartAt: </Text>
        <DateTimePicker
              testID="startAt"
              value={propertyForm.startAt}
              mode="datetime"
              display="default"
              onChange={(_, selectedDate) => onChangePropertyDateForm(selectedDate, 'startAt')}
        />
      </View>
      <View>
        <Text>EndAt: </Text>
        <DateTimePicker
              testID="endAt"
              value={propertyForm.endAt}
              mode="datetime"
              display="default"
              onChange={(_, selectedDate) => onChangePropertyDateForm(selectedDate, 'endAt')}
        />
      </View>
      <Button mode="contained" onPress={() => onSaveReservation(propertyForm)} style={styles.button}>
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

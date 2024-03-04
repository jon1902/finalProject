import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { IProperty } from './index'
import { Text, View } from '@/components/Themed';
import { api } from '@/config/api';
import { PropertyHistoryCard } from '@/components/Properties/PropertyHistoryCard';
import { router } from 'expo-router';
import { useReservationContext, IPropertyHistory } from '@/contexts/reservationContext';
import { usePropertyContext } from '@/contexts/propertyContext';
import RNPickerSelect from 'react-native-picker-select';

export default function ReservationsScreen() {
  const { reservations, onChangePropertySelected, onSetCurrentReservation, onDeleteHistoryProperty } = useReservationContext();
  const { properties } = usePropertyContext()

  const onEditProperty = (reservation: IPropertyHistory) => {
    onSetCurrentReservation(reservation);

    router.navigate('/reservationModal')
  }

  return (
    <View style={styles.container}>
      <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => onChangePropertySelected(value)}
            items={properties.map((property) => ({
              label: property.name,
              value: property.id
            }))}
        />
      <ScrollView style={{ width: '100%', gap: 8 }}>
        {
          reservations.map((reservation) => 
            <PropertyHistoryCard
             key={reservation.id}
             propertyHistory={reservation}
             onEdit={onEditProperty} 
             onDelete={onDeleteHistoryProperty} />
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 8,
    alignItems: 'center',
  },
  select: {
    borderColor: 'black'
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '90%',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: '90%',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

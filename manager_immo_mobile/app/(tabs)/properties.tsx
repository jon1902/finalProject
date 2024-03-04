import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { IProperty } from './index'
import { Text, View } from '@/components/Themed';
import { api } from '@/config/api';
import { PropertyCard } from '@/components/Properties/PropertyCard';
import { usePropertyContext } from '@/contexts/propertyContext';
import { router } from 'expo-router';

export default function PropertiesScreen() {
  const { onSetCurrentProperty, properties, onDeleteProperty } = usePropertyContext()

  const onEditProperty = (property: IProperty) => {
    onSetCurrentProperty(property);

    router.navigate('/propertyModal')
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%', gap: 8 }}>
      {
          properties.map((property) => 
            <PropertyCard 
              key={property.id}
              property={property} 
              onEdit={onEditProperty} 
              onDelete={onDeleteProperty} 
            />
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
    alignItems: 'center',
  },
});

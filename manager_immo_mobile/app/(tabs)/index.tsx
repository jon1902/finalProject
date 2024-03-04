import { StyleSheet, FlatList } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View,  } from '@/components/Themed';
import { HomeCard } from '@/components/Home/HomeCard';
import { useState, useEffect, useMemo } from 'react';
import { api } from '@/config/api';
import { HomeProperty } from '@/components/Home/HomeProperty';
import { Button } from 'react-native-paper'
import { useUserContext } from '@/contexts/userContext';
import { usePropertyContext } from '@/contexts/propertyContext';

export interface IProperty {
  id: number;
  name: string;
  address: string;
  totalIncomea: number;
  userId: number;
}

export default function TabOneScreen() {
  const { onLogout } = useUserContext()
  const { properties } = usePropertyContext()

  const totalIncomea = useMemo(() => {
    return properties.reduce((acc, property) => property.totalIncomea + acc, 0)
  }, [properties]);

  return (
    <View style={styles.container}>
      <View style={styles.containerStat}>
        <Button onPress={onLogout}>
          Logout
        </Button>
        <HomeCard description={`Number of properties : ${properties?.length || 0}`} />
        <HomeCard description={`Total incomea : ${totalIncomea || 0}$`} />
      </View>
      <View style={styles.containerProperties}>
        <FlatList
          style={{ width: '100%' }}
          ItemSeparatorComponent={() => <View style={{height: 8}} />}
          data={properties.slice(0, 3)}
          renderItem={({ item }) => <HomeProperty property={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flex: 1,
    alignItems: 'center',
    rowGap: 80
  },
  containerStat: {
    width: '100%',
    alignItems: 'center',
    rowGap: 16
  },
  containerProperties: {
    width: '100%',
    alignItems: 'center'
  }
});

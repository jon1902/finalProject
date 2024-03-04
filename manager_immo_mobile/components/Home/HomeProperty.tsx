import { FC } from 'react';
import { Card } from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native'
import { IProperty } from '@/app/(tabs)';

interface IHomePropertyProps {
    property: IProperty
}

export const HomeProperty: FC<IHomePropertyProps> = ({ property }) => {
    return <Card mode="contained" style={styles.card}>
    <Card.Content style={styles.content}>
        <Text>{property.name}</Text>
        <Text>{property.address}</Text>
        <Text>{property.totalIncomea}$</Text>
    </Card.Content>
  </Card>
}

const styles = StyleSheet.create({
    card: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 4,
        paddingBottom: 4
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
  });
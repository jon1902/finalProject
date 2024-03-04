import { FC } from 'react';
import { Card, Button } from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { IProperty } from '@/app/(tabs)';

interface IPropertyCardProps {
    property: IProperty;
    onEdit: (property: IProperty) => void;
    onDelete: (propertyId: number) => void;
}

export const PropertyCard: FC<IPropertyCardProps> = ({ property, onEdit, onDelete }) => {
    return <View style={styles.wrapper}>
        <Card mode="contained" style={styles.card}>
        <Card.Content style={styles.content}>
            <Text>{property.name}</Text>
            <Text>{property.address}</Text>
            <Text>{property.totalIncomea}$</Text>
        </Card.Content>
        </Card>
        <View style={styles.footer}>
            <View style={styles.leftFooter}>
                <Button onPress={() => onEdit(property)}>Edit</Button>
            </View>
            <View style={styles.rightFooter}>
                <Button onPress={() => onDelete(property.id)}>Delete</Button>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    card: {
        paddingTop: 4,
        paddingBottom: 4,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    content: {
        rowGap: 8
    },
    footer: {
        flexDirection: 'row',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderColor: '#e8e1ed'
    },
    leftFooter: {
        width: '50%',
        borderRightWidth: 1,
        borderColor: '#e8e1ed'
    },
    rightFooter: {
        width: '50%',
    }
  });
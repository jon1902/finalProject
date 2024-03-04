import { FC } from 'react';
import { Card, Button } from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native';
import { IPropertyHistory } from '@/contexts/reservationContext';
import { formatDate } from '@/utils/formatDate';

interface IPropertyHistoryCardProps {
    propertyHistory: IPropertyHistory;
    onEdit: (propertyHistory: IPropertyHistory) => void;
    onDelete: (propertyHistoryId: number) => void;
}

export const PropertyHistoryCard: FC<IPropertyHistoryCardProps> = ({ propertyHistory, onEdit, onDelete }) => {
    return <View style={styles.wrapper}>
        <Card mode="contained" style={styles.card}>
        <Card.Content style={styles.content}>
            <Text>{propertyHistory.name}</Text>
            <Text>{formatDate(propertyHistory.startAt)} - {formatDate(propertyHistory.endAt)}</Text>
            <Text>{propertyHistory.incomea}$</Text>
        </Card.Content>
        </Card>
        <View style={styles.footer}>
            <View style={styles.leftFooter}>
                <Button onPress={() => onEdit(propertyHistory)}>Edit</Button>
            </View>
            <View style={styles.rightFooter}>
                <Button onPress={() => onDelete(propertyHistory.id)}>Delete</Button>
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
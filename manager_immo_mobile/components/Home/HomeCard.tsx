import { FC } from 'react';
import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface IHomeCardProps {
    description: string;
}

export const HomeCard: FC<IHomeCardProps> = ({ description }) => {
    return <Card style={styles.card}>
    <Card.Content>
      <Text>{description}</Text>
    </Card.Content>
  </Card>
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        width: '90%',
        paddingTop: 16,
        paddingBottom: 16
    }
  });
  
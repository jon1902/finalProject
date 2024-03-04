import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { usePropertyContext } from '@/contexts/propertyContext';
import { useReservationContext } from '@/contexts/reservationContext';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { onSetCurrentProperty } = usePropertyContext()
  const { onSetCurrentReservation } = useReservationContext();

  return <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              headerShown: useClientOnlyValue(false, true),
            }}>
            <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            }}
          />
          <Tabs.Screen
            name="properties"
            options={{
              title: 'Properties',
              headerRight: () => (
                <Link href="/propertyModal" asChild>
                  <Pressable onPress={() => onSetCurrentProperty(null)}>
                    {({ pressed }) => (
                      <FontAwesome
                        name="plus"
                        size={25}
                        color={Colors[colorScheme ?? 'light'].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            }}
          />

          <Tabs.Screen
            name="reservations"
            options={{
              title: 'Reservations',
              headerRight: () => (
                <Link href="/reservationModal" asChild>
                  <Pressable onPress={() => onSetCurrentReservation(null)}>
                    {({ pressed }) => (
                      <FontAwesome
                        name="plus"
                        size={25}
                        color={Colors[colorScheme ?? 'light'].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            }}
          />
          </Tabs>
}

import Icon from '@react-native-vector-icons/ionicons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TabNavigatorMainScreenProps } from '../../../routers';
import { QuickAction, FeaturedClass, Progress } from './components';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHome } from './useHome';

const quickActions: QuickActionProps[] = [
  {
    id: '1',
    title: 'Reservar Clase',
    icon: 'calendar-outline',
    color: '#FF6B35',
  },

  { id: '2', title: 'Membresías', icon: 'card-outline', color: '#96CEB4' },
];

export const Home: React.FC<TabNavigatorMainScreenProps<'Home'>> = ({
  navigation,
}) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const {
    featuredClasses,
    myProgress,
    userName,
    handleQuickAction,
    handelListNotifications,
  } = useHome(navigation);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.container]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola, {userName}!</Text>
          <Text style={styles.subtitle}>¿Listo para entrenar hoy?</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          activeOpacity={0.7}
          onPress={handelListNotifications}
        >
          <Icon name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.quickGrid}>
          {quickActions.map(action => (
            <QuickAction
              key={action.id}
              {...action}
              onPress={handleQuickAction}
            />
          ))}
        </View>
      </View>

      {featuredClasses.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Clases Destacadas</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Class')}
              activeOpacity={0.7}
            >
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredClasses.map(classItem => (
              <FeaturedClass
                key={classItem.id}
                {...classItem}
                onPress={() =>
                  navigation.navigate('Class', {
                    screen: 'ClassDetail',
                    params: {
                      id: classItem.id,
                    },
                  })
                }
              />
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tu Progreso</Text>
        <View style={styles.statsContainer}>
          <Progress number={myProgress.totalClasses} label="Clases este mes" />
          <Progress number={myProgress.nextClasses} label="Próximas reservas" />
        </View>
      </View>
      <View style={{ paddingBottom: paddingBottom + 50 }} />
    </ScrollView>
  );
};

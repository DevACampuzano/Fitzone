import React from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TabNavigatorMainScreenProps } from '../../../routers';
import Icon from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useReservations from './useReservatios';
import { CardReservations } from './components';
import styles from './style';

export const Reservations: React.FC<
  TabNavigatorMainScreenProps<'Reservations'>
> = ({ navigation }) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const {
    filteredBookings,
    onRefresh,
    refreshing,
    selectedTab,
    setSelectedTab,
  } = useReservations();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Reservas</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Class')}
          activeOpacity={0.7}
        >
          <Icon name="add-outline" size={24} color="#FF6B35" />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'upcoming' && styles.activeTabText,
            ]}
          >
            Próximas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
          onPress={() => setSelectedTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'past' && styles.activeTabText,
            ]}
          >
            Historial
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.bookingsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF6B35" // iOS
            colors={['#FF6B35']} // Android
          />
        }
      >
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="calendar-outline" size={64} color="#E5E5EA" />
            <Text style={styles.emptyTitle}>
              {selectedTab === 'upcoming'
                ? 'No tienes reservas próximas'
                : 'No hay historial de reservas'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {selectedTab === 'upcoming'
                ? '¡Reserva tu primera clase y comienza tu journey fitness!'
                : 'Tus reservas pasadas aparecerán aquí'}
            </Text>
            {selectedTab === 'upcoming' && (
              <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => navigation.navigate('Class')}
              >
                <Text style={styles.exploreButtonText}>Explorar Clases</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredBookings.map(booking => (
            <CardReservations key={booking.id} booking={booking} />
          ))
        )}
        <View style={{ paddingBottom: paddingBottom + 50 }} />
      </ScrollView>
    </View>
  );
};

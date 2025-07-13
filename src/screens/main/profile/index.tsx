import React from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { TabNavigatorMainScreenProps } from '../../../routers';
import Icon from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProfile } from './useProfile';
import styles from './styles';
import { MenuItem } from './components';

export const Profile: React.FC<
  TabNavigatorMainScreenProps<'Profile'>
> = ({}) => {
  const {
    handleLogout,
    user,
    notificationsEnabled,
    setNotificationsEnabled,
    menuItems,
    stats,
  } = useProfile();
  const { bottom: paddingBottom } = useSafeAreaInsets();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Icon name="person-circle" size={80} color="#FF6B35" />
        </View>
        <Text style={styles.userName}>{`${user.name} ${user.lastName}`}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>

        <View style={styles.membershipBadge}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.membershipText}>Miembro {'Premiun'}</Text>
        </View>
      </View>
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Icon name="fitness-outline" size={24} color="#FF6B35" />
          <Text style={styles.statNumber}>{stats.totalClasses}</Text>
          <Text style={styles.statLabel}>Clases Tomadas</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Icon name="notifications-outline" size={20} color="#666" />
            <Text style={styles.settingText}>Notificaciones</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#E5E5EA', true: '#FF6B35' }}
            thumbColor="#FFF"
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        {menuItems.map(item => (
          <MenuItem key={item.id} {...item} />
        ))}
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} color="#F44336" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: paddingBottom + 50 }} />
    </ScrollView>
  );
};

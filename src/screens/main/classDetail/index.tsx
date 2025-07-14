import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ClassRouterScreenProps } from '../../../routers/classRouterStack';
import Icon from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useClassDetail from './useClassDetail';
import { DetailsItem, ListItem, Loading, NotResult, Tag } from './components';
import styles from './sytles';
import { getDifficultyColor } from '../../../common/helpers/get-difficulty-color';
import { Toast } from '../../../common/components';

export const ClassDetail: React.FC<ClassRouterScreenProps<'ClassDetail'>> = ({
  route: { params },
}) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { id } = params;
  const {
    classDetail,
    isLoading,
    loadClassDetail,
    handleBookClass,
    onCloseToast,
    toast,
    isLoadingPay,
  } = useClassDetail(id);

  if (isLoading) {
    return <Loading />;
  }

  if (!classDetail) {
    return <NotResult onPress={loadClassDetail} />;
  }
  return (
    <View style={styles.container}>
      <Toast
        show={toast.show}
        msg={toast.msg}
        icon={toast.icon as any}
        callbackEnd={onCloseToast}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Image source={{ uri: classDetail.image }} style={styles.classImage} />
        <View style={styles.classInfo}>
          <View style={styles.classHeader}>
            <Text style={styles.className}>{classDetail.name}</Text>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(classDetail.difficulty) },
              ]}
            >
              <Text style={styles.difficultyText}>
                {classDetail.difficulty}
              </Text>
            </View>
          </View>
          <Text style={styles.description}>{classDetail.description}</Text>

          <View style={styles.detailsGrid}>
            <DetailsItem
              icon="calendar-outline"
              label="Fecha"
              value={classDetail.date}
            />
            <DetailsItem
              icon="time-outline"
              label="Hora"
              value={classDetail.time}
            />
            <DetailsItem
              icon="timer-outline"
              label="Duración"
              value={`${classDetail.duration} min`}
            />
            <DetailsItem
              icon="people-outline"
              label="Cupos Disponibles"
              value={`${classDetail.spots}/${classDetail.maxSpots}`}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <View style={styles.locationCard}>
            <Icon name="location-outline" size={24} color="#FF6B35" />
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{classDetail.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beneficios</Text>
          <View style={styles.listContainer}>
            {classDetail.benefits.length === 0 ? (
              <Text style={styles.description}>
                No hay beneficios específicos para esta clase.
              </Text>
            ) : (
              classDetail.benefits.map((benefit, index) => (
                <ListItem
                  key={index}
                  title={benefit}
                  icon="checkmark-circle-outline"
                  iconColor="#4CAF50"
                />
              ))
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipamiento</Text>
          <View style={styles.equipmentList}>
            {classDetail.equipment.length > 0 ? (
              classDetail.equipment.map((item, index) => (
                <Tag key={index} tag={item} />
              ))
            ) : (
              <Text style={styles.description}>
                No hay equipamiento específico para esta clase.
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Qué traer</Text>
          <View style={styles.listContainer}>
            {classDetail.requirements.length > 0 ? (
              classDetail.requirements.map((requirement, index) => (
                <ListItem
                  key={index}
                  title={requirement}
                  icon="ellipse"
                  iconSize={8}
                  iconColor="#FF6B35"
                />
              ))
            ) : (
              <Text style={styles.description}>
                No hay requisitos específicos para esta clase.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom:
              Platform.OS === 'ios' ? paddingBottom : paddingBottom + 75,
          },
        ]}
      >
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Precio</Text>
          <Text style={styles.price}>
            ${classDetail.price.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.bookButton,
            (classDetail.spots === 0 || isLoadingPay) &&
              styles.bookButtonDisabled,
          ]}
          onPress={handleBookClass}
          disabled={classDetail.spots === 0 || isLoadingPay}
        >
          <Text
            style={[
              styles.bookButtonText,
              classDetail.spots === 0 && styles.bookButtonTextDisabled,
            ]}
          >
            {classDetail.spots === 0 ? 'Agotado' : 'Reservar Clase'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

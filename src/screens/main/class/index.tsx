/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  Keyboard,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ClassRouterScreenProps } from '../../../routers/classRouterStack';
import Icon from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useClass } from './useClass';
import { CardClass, Tag } from './components';

export const Class: React.FC<ClassRouterScreenProps<'list'>> = ({
  navigation,
}) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const {
    filteredClasses,
    selectedCategory,
    setSelectedCategory,
    searchText,
    setSearchText,
    categories,
    refetchClasses,
    isLoadingClasses,
  } = useClass();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Clases Disponibles</Text>
        <View style={styles.searchContainer}>
          <Icon
            name="search-outline"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar clases"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={{ height: 55 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            data={categories}
            renderItem={({ item: { id, name } }) => (
              <Tag
                id={id}
                tag={name}
                onPress={() => setSelectedCategory(id)}
                style={selectedCategory === id && styles.categoryButtonActive}
                textStyle={selectedCategory === id && styles.categoryTextActive}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <ScrollView
          style={styles.classesList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingClasses}
              onRefresh={refetchClasses}
            />
          }
        >
          {filteredClasses.map(classItem => (
            <CardClass
              key={classItem.id}
              onPress={id => navigation.navigate('ClassDetail', { id })}
              {...classItem}
            />
          ))}
          <View style={{ paddingBottom: paddingBottom + 50 }} />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  classesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

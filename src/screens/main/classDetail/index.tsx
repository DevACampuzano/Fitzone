import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ClassRouterScreenProps } from '../../../routers/classRouterStack';

export const ClassDetail: React.FC<ClassRouterScreenProps<'ClassDetail'>> = ({
  route: { params },
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.goBack()}>
        Class Detail for ID: {params?.id}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

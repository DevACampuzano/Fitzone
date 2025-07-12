import Icon from '@react-native-vector-icons/ionicons';
import React, { useState } from 'react';
import { Animated, Text, useAnimatedValue, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

export const Toast = ({
  msg = '',
  show,
  callbackEnd,
  icon = 'information-circle-outline',
}: PropsToast) => {
  const fadeAnim = useAnimatedValue(0);
  const { top } = useSafeAreaInsets();
  const [zIndex, setZIndex] = useState(0);

  const fadeOut = React.useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setZIndex(0);
      }
    });
  }, [fadeAnim]);

  const fadeIn = React.useCallback(() => {
    setZIndex(10);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        callbackEnd();
      }
    });

    setTimeout(() => {
      fadeOut();
    }, 1500);
  }, [fadeAnim, fadeOut, callbackEnd]);

  React.useEffect(() => {
    if (show) fadeIn();
  }, [show, fadeIn]);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: top + 10,
          zIndex,
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Icon
          name={icon as any}
          size={20}
          color={
            icon === 'warning-sharp'
              ? '#FF6B35'
              : icon === 'checkmark-circle-outline'
              ? '#4CAF50'
              : '#2196F3'
          }
        />
        <Text>{msg}</Text>
      </View>
    </Animated.View>
  );
};

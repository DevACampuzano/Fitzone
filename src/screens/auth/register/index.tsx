/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AppRouterScreenProps } from '../../../routers';
import Icon from '@react-native-vector-icons/ionicons';
import { styles } from './styles';
import { useRegister } from './useRegister';

export const Register: React.FC<AppRouterScreenProps<'Register'>> = ({
  navigation,
}) => {
  const {
    formData,
    errors,
    touched,
    showPassword,
    showConfirmPassword,
    acceptTerms,
    isLoading,
    showTermsError,
    setShowPassword,
    setShowConfirmPassword,
    handleBlur,
    onChange,
    handleTermsChange,
    handleRegister,
  } = useRegister({ navigation });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
              >
                <Icon name="arrow-back-outline" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Crear Cuenta</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Icon name="fitness-outline" size={32} color="#FF6B35" />
              </View>
              <Text style={styles.welcomeText}>¡Únete a FitZone!</Text>
              <Text style={styles.subtitleText}>
                Crea tu cuenta y comienza tu journey fitness
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Icon
                    name="person-outline"
                    size={20}
                    color="#999"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={formData.name}
                    onChangeText={value => onChange('name', value)}
                    onBlur={() => handleBlur('name')}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Icon
                    name="person-outline"
                    size={20}
                    color="#999"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChangeText={value => onChange('lastName', value)}
                    onBlur={() => handleBlur('lastName')}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>
              {(touched.name && errors?.name) ||
                (touched.lastName && errors?.lastName && (
                  <View style={styles.errorRow}>
                    <Text style={[styles.errorText, styles.halfWidth]}>
                      {touched.name ? errors?.name : ''}
                    </Text>
                    <Text style={[styles.errorText, styles.halfWidth]}>
                      {touched.lastName ? errors?.lastName : ''}
                    </Text>
                  </View>
                ))}

              <View style={styles.inputContainer}>
                <Icon
                  name="mail-outline"
                  size={20}
                  color="#999"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChangeText={value => onChange('email', value)}
                  onBlur={() => handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <View style={styles.inputContainer}>
                <Icon
                  name="call-outline"
                  size={20}
                  color="#999"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Teléfono (10 dígitos)"
                  value={formData.phone}
                  onChangeText={value => onChange('phone', value)}
                  onBlur={() => handleBlur('phone')}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              <View style={styles.inputContainer}>
                <Icon
                  name="lock-closed-outline"
                  size={20}
                  color="#999"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  value={formData.password}
                  onChangeText={value => onChange('password', value)}
                  onBlur={() => handleBlur('password')}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  keyboardType="visible-password"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Icon
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={styles.inputContainer}>
                <Icon
                  name="lock-closed-outline"
                  size={20}
                  color="#999"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChangeText={value => onChange('confirmPassword', value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  keyboardType="visible-password"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  activeOpacity={0.7}
                >
                  <Icon
                    name={
                      showConfirmPassword ? 'eye-outline' : 'eye-off-outline'
                    }
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <Text style={styles.errorText}>
                    Las contraseñas no coinciden
                  </Text>
                )}
              <TouchableOpacity
                style={styles.termsContainer}
                onPress={handleTermsChange}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    acceptTerms && styles.checkboxChecked,
                  ]}
                >
                  {acceptTerms && (
                    <Icon name="checkmark" size={16} color="#FFF" />
                  )}
                </View>
                <Text style={styles.termsText}>
                  Acepto los{' '}
                  <Text style={styles.termsLink}>términos y condiciones</Text> y
                  la{' '}
                  <Text style={styles.termsLink}>política de privacidad</Text>
                </Text>
              </TouchableOpacity>
              {showTermsError && (
                <Text style={styles.errorText}>
                  Debes aceptar los términos y condiciones
                </Text>
              )}
              <TouchableOpacity
                style={[
                  styles.registerButton,
                  isLoading && styles.registerButtonDisabled,
                  {
                    opacity: isLoading || acceptTerms === false ? 0.6 : 1,
                  },
                ]}
                onPress={() => handleRegister(formData)}
                disabled={isLoading || acceptTerms === false}
                activeOpacity={0.7}
              >
                <Text style={styles.registerButtonText}>
                  {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Text>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.7}
                >
                  <Text style={styles.loginLink}>Inicia Sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

// ✅ Converted from React Web → React Native

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authService } from '../../services';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneSchema, type PhoneFormData } from '../../lib/validations';

type Nav = {
  navigate: (screen: 'OTPVerify') => void;
};

export default function Login() {
  const navigation = useNavigation<Nav>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '' },
  });

  const onSubmit = async (data: PhoneFormData) => {
    const p = data.phone.trim();
    setLoading(true);
    try {
      await authService.sendOTP(p);
      await AsyncStorage.setItem('login_phone', p);
      navigation.navigate('OTPVerify');
    } catch (err: any) {
      // Keep navigation even if backend isn't connected yet.
      console.log(
        'Backend not connected, using mock login:',
        err?.message ?? String(err)
      );
      await AsyncStorage.setItem('login_phone', p);
      navigation.navigate('OTPVerify');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.inner}>
            <View style={styles.header}>
              <Text style={styles.logo}>Intants</Text>
              <Text style={styles.subtitle}>School ERP</Text>
            </View>

            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>Welcome Back</Text>
              <Text style={styles.welcomeText}>
                Login to continue managing your school activities seamlessly.
              </Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Phone Number</Text>

              <View style={styles.phoneRow}>
                <View style={styles.prefixBox}>
                  <Text style={styles.prefixText}>+91</Text>
                </View>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={t => onChange(t.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98XXXXXXXX"
                      placeholderTextColor="#8A8A8A"
                      keyboardType="numeric"
                      maxLength={10}
                      style={styles.input}
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  )}
                />
              </View>

              {errors.phone ? <Text style={styles.errorText}>{errors.phone.message}</Text> : null}

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
                activeOpacity={0.8}
                style={[styles.primaryBtn, loading && styles.btnDisabled]}
              >
                <Text style={styles.primaryBtnText}>{loading ? 'Sending...' : 'Send OTP'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.flexSpacer} />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Powered by Intants</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 18,
  },
  header: {
    alignItems: 'center',
    marginBottom: 26,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#4A90D9',
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#8A8A8A',
  },
  welcomeCard: {
    backgroundColor: '#EAF3FB',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  welcomeText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: '#6F6F6F',
  },
  form: {
    gap: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  prefixBox: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: '#E2E2E2',
    backgroundColor: '#F7FBFF',
  },
  prefixText: {
    fontSize: 14,
    color: '#6F6F6F',
    fontWeight: '600',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1C1C1C',
  },
  errorText: {
    color: '#E85D5D',
    fontSize: 12,
    marginTop: 4,
  },
  primaryBtn: {
    backgroundColor: '#4A90D9',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  ghostBtn: {
    borderWidth: 1,
    borderColor: '#4A90D9',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  ghostBtnText: {
    color: '#4A90D9',
    fontSize: 15,
    fontWeight: '700',
  },
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    gap: 8,
    flexWrap: 'wrap',
  },
  staffText: {
    fontSize: 13,
    color: '#6F6F6F',
  },
  staffLink: {
    fontSize: 13,
    color: '#4A90D9',
    fontWeight: '700',
  },
  flexSpacer: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#8A8A8A',
  },
});

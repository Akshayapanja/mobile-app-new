// ✅ Converted from React Web → React Native

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import {
  Alert,
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
import { USERS } from '../../lib/mockData';

type Nav = {
  navigate: (screen: 'OTPVerify') => void;
};

export default function Login() {
  const navigation = useNavigation<Nav>();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const validPhones = useMemo(() => new Set(USERS.map(u => u.phone)), []);

  const onSendOtp = async () => {
    const p = phone.trim();

    if (!p) {
      Alert.alert('Error', 'Please enter phone number');
      return;
    }

    if (!/^\d{10}$/.test(p)) {
      Alert.alert('Error', 'Please enter valid 10 digit number');
      return;
    }

    if (!validPhones.has(p)) {
      Alert.alert('Error', 'Phone number not registered');
      return;
    }

    try {
      setLoading(true);
      await AsyncStorage.setItem('login_phone', p);
      navigation.navigate('OTPVerify');
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onEmailLogin = () => {
    Alert.alert('Info', 'Email login coming soon! Please use phone number to login.');
  };

  const onStaffLogin = () => {
    Alert.alert('Info', 'Staff login coming soon! Please use phone number to login.');
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
                <TextInput
                  value={phone}
                  onChangeText={t => setPhone(t.replace(/\D/g, '').slice(0, 10))}
                  placeholder="98XXXXXXXX"
                  placeholderTextColor="#8A8A8A"
                  keyboardType="number-pad"
                  maxLength={10}
                  style={styles.input}
                  returnKeyType="done"
                  onSubmitEditing={onSendOtp}
                />
              </View>

              <TouchableOpacity
                onPress={onSendOtp}
                disabled={loading}
                activeOpacity={0.8}
                style={[styles.primaryBtn, loading && styles.btnDisabled]}
              >
                <Text style={styles.primaryBtnText}>{loading ? 'Sending...' : 'Send OTP'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onEmailLogin}
                activeOpacity={0.8}
                style={styles.ghostBtn}
              >
                <Text style={styles.ghostBtnText}>Login with Email</Text>
              </TouchableOpacity>

              <View style={styles.staffRow}>
                <Text style={styles.staffText}>Are you a staff member?</Text>
                <TouchableOpacity onPress={onStaffLogin} activeOpacity={0.7}>
                  <Text style={styles.staffLink}>Use Staff Login →</Text>
                </TouchableOpacity>
              </View>
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

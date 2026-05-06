// ✅ Converted from React Web → React Native

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
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
import { authService } from '../../services';

type Nav = {
  navigate: (screen: any) => void;
  reset: (state: { index: number; routes: Array<{ name: string }> }) => void;
  goBack: () => void;
};

export default function OTPVerify() {
  const navigation = useNavigation<Nav>();
  const route = useRoute();

  const [phone, setPhone] = useState('');
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const p = (await AsyncStorage.getItem('login_phone')) || '';
      if (!mounted) return;
      setPhone(p);
      if (!p) navigation.goBack();
    })();
    return () => {
      mounted = false;
    };
  }, [navigation]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  useEffect(() => {
    const firstEmpty = digits.findIndex(d => !d);
    if (firstEmpty === -1) return;
    refs.current[firstEmpty]?.focus();
  }, []);

  const otp = useMemo(() => digits.join(''), [digits]);
  const canVerify = otp.length === 6 && !digits.some(d => !d) && !loading;

  const handleDigitChange = (index: number, value: string) => {
    const c = value.replace(/\D/g, '').slice(-1);
    setDigits(prev => {
      const next = [...prev];
      next[index] = c;
      return next;
    });
    if (c && index < 5) refs.current[index + 1]?.focus();
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key !== 'Backspace') return;
    if (digits[index]) {
      setDigits(prev => {
        const next = [...prev];
        next[index] = '';
        return next;
      });
      return;
    }
    if (index > 0) refs.current[index - 1]?.focus();
  };

  const resend = () => {
    setDigits(['', '', '', '', '', '']);
    setTimer(45);
    refs.current[0]?.focus();
  };

  const navigateByRole = (user: any, phone: string) => {
    if (phone === '9700000001' || user?.role === 'driver') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Driver' }],
      });
    } else if (user?.roles?.length > 1 || phone === '9900000001') {
      navigation.navigate('RoleSelect' as never);
    } else if (user?.role === 'staff') {
      navigation.navigate('SchoolSelector' as never);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Parent' }],
      });
    }
  };

  const handleMockLogin = async (phone: string, otpString: string) => {
    if (otpString !== '123456') {
      setError('Invalid OTP. Use 123456 for demo.');
      return;
    }

    const mockUsers: Record<string, any> = {
      '9800000001': {
        id: 'u1',
        name: 'Priya Kumar',
        phone: '9800000001',
        role: 'parent',
        roles: ['parent'],
        email: 'priya.kumar@email.com',
      },
      '9800000002': {
        id: 'u2',
        name: 'Meena Sharma',
        phone: '9800000002',
        role: 'parent',
        roles: ['parent'],
        email: 'meena.sharma@email.com',
      },
      '9900000001': {
        id: 'u3',
        name: 'Mrs. Lakshmi Subramaniam',
        phone: '9900000001',
        role: 'staff',
        roles: ['staff', 'parent'],
        email: 'lakshmi.s@dpshyd.edu',
        employeeId: 'EMP001',
        designation: 'Mathematics Teacher',
      },
      '9700000001': {
        id: 'u4',
        name: 'Ravi Driver',
        phone: '9700000001',
        role: 'driver',
        roles: ['driver'],
        email: 'ravi.driver@dpshyd.edu',
        employeeId: 'DRV001',
      },
    };

    const user = mockUsers[phone];
    if (!user) {
      setError('Phone number not found. Use demo numbers.');
      return;
    }

    await AsyncStorage.setItem('intants_user', JSON.stringify(user));
    navigateByRole(user, phone);
  };

  const verify = async () => {
    const otpString = otp;
    if (otpString.length !== 6) {
      setError('Please enter 6 digit OTP');
      return;
    }
    setError('');
    setLoading(true);

    const phone = (await AsyncStorage.getItem('login_phone')) || '';
    if (!phone) {
      setError('Please enter phone number');
      navigation.goBack();
      setLoading(false);
      return;
    }

    try {
      const response = await authService.verifyOTP(phone, otpString);
      const user = (response as any)?.user;

      await AsyncStorage.setItem('intants_user', JSON.stringify(user));
      navigateByRole(user, phone);
    } catch (err: any) {
      // TODO: handle error
      await handleMockLogin(phone, otpString);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setDigits(['', '', '', '', '', '']);
    setError('');
    setTimer(30);
    refs.current[0]?.focus();
    try {
      const phone = (await AsyncStorage.getItem('login_phone')) || '';
      if (!phone) return;
      await authService.sendOTP(phone);
    } catch (err: any) {
      // TODO: handle error
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.inner} testID={`otp-${route.name}`}>
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <Ionicons name="arrow-back" size={22} color="#111827" />
              </TouchableOpacity>

              <Text style={styles.title}>Verify OTP</Text>

              <View style={styles.rightPlaceholder} />
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>OTP Sent!</Text>
              <Text style={styles.infoText}>
                We sent a 6-digit code to{' '}
                <Text style={styles.phoneText}>+91 {phone || '—'}</Text>
              </Text>

              <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
                <Text style={styles.changeNumberLink}>Change Number</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.otpRow}>
              {digits.map((d, i) => {
                const isFocused = focusedIndex === i;
                return (
                  <TextInput
                    key={i}
                    ref={el => {
                      refs.current[i] = el;
                    }}
                    value={d}
                    onChangeText={t => handleDigitChange(i, t)}
                    onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
                    onFocus={() => setFocusedIndex(i)}
                    onBlur={() => setFocusedIndex(prev => (prev === i ? null : prev))}
                    keyboardType="number-pad"
                    maxLength={1}
                    returnKeyType={i === 5 ? 'done' : 'next'}
                    style={[styles.otpInput, isFocused && styles.otpInputFocused]}
                    textAlign="center"
                    placeholder="•"
                    placeholderTextColor="#D1D5DB"
                    selectionColor="#4A90D9"
                  />
                );
              })}
            </View>

            <View style={styles.resendRow}>
              {timer > 0 ? (
                <Text style={styles.resendText}>
                  Resend OTP in <Text style={styles.resendTime}>00:{String(timer).padStart(2, '0')}</Text>
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResendOTP} activeOpacity={0.7}>
                  <Text style={styles.resendLink}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              onPress={verify}
              disabled={!canVerify || loading}
              activeOpacity={0.85}
              style={[styles.primaryBtn, (!canVerify || loading) && styles.btnDisabled]}
            >
              <Text style={styles.primaryBtnText}>{loading ? 'Verifying...' : 'Verify OTP'}</Text>
            </TouchableOpacity>

            {error ? (
              <Text style={{ color: '#E85D5D', fontSize: 12, textAlign: 'center', marginTop: 8 }}>{error}</Text>
            ) : null}

            <View style={styles.greenCard}>
              <Ionicons name="checkmark-circle" size={18} color="#16A34A" style={styles.greenIcon} />
              <Text style={styles.greenText}>OTP is valid for <Text style={styles.greenBold}>10 minutes</Text></Text>
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
    paddingTop: 14,
    paddingBottom: 18,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  rightPlaceholder: {
    width: 40,
    height: 40,
  },
  infoCard: {
    backgroundColor: '#EAF3FB',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  infoText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: '#6B7280',
  },
  phoneText: {
    color: '#4A90D9',
    fontWeight: '800',
  },
  changeNumberLink: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '700',
    color: '#4A90D9',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 14,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    paddingVertical: 0,
  },
  otpInputFocused: {
    borderColor: '#4A90D9',
  },
  resendRow: {
    minHeight: 22,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {
    fontSize: 13,
    color: '#6B7280',
  },
  resendTime: {
    fontWeight: '800',
    color: '#111827',
  },
  resendLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4A90D9',
  },
  primaryBtn: {
    backgroundColor: '#4A90D9',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 12,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  greenCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 14,
    padding: 12,
  },
  greenIcon: {
    marginTop: 1,
  },
  greenText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#111827',
  },
  greenBold: {
    fontWeight: '800',
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
    color: '#9CA3AF',
  },
});

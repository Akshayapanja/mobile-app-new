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
import { getUser, login } from '../../lib/session';

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

  const verify = async () => {
    if (loading) return;

    if (otp !== '123456') {
      Alert.alert('Error', 'Invalid OTP.\nPlease enter 123456');
      return;
    }

    const p = (await AsyncStorage.getItem('login_phone')) || '';
    if (!p) {
      Alert.alert('Error', 'Please enter phone number');
      navigation.goBack();
      return;
    }

    try {
      setLoading(true);
      const u = await login(p);
      if (!u) {
        Alert.alert('Error', 'Phone number not registered');
        navigation.goBack();
        return;
      }

      const user = await getUser();
      const phone = await AsyncStorage.getItem('login_phone');

      if (phone === '9900000001') {
        navigation.navigate('RoleSelect' as never);
      } else if (user?.role === 'staff') {
        navigation.navigate('SchoolSelector' as never);
      } else if (user?.role === 'parent') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Parent' }],
        });
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
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
                <TouchableOpacity onPress={resend} activeOpacity={0.7}>
                  <Text style={styles.resendLink}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              onPress={verify}
              disabled={!canVerify}
              activeOpacity={0.85}
              style={[styles.primaryBtn, (!canVerify || loading) && styles.btnDisabled]}
            >
              <Text style={styles.primaryBtnText}>{loading ? 'Verifying...' : 'Verify OTP'}</Text>
            </TouchableOpacity>

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

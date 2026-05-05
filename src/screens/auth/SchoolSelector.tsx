// ✅ Converted from React Web → React Native

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser, setSchoolSelected } from '../../lib/session';

type Nav = {
  navigate: (screen: any) => void;
  goBack: () => void;
};

type School = {
  id: string;
  name: string;
  address: string;
  active: boolean;
};

const SCHOOLS: School[] = [
  {
    id: 'dps_hyd',
    name: 'Delhi Public School, Hyderabad',
    address: 'Jubilee Hills, Hyderabad, Telangana',
    active: true,
  },
];

export default function SchoolSelector() {
  const navigation = useNavigation<Nav>();

  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<'parent' | 'staff' | ''>('');
  const selectedSchool = SCHOOLS[0];

  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await getUser();
      if (!mounted) return;
      if (!u) {
        navigation.goBack();
        return;
      }
      setUserName(u.name || '');
      setUserRole(u.role);
    })();
    return () => {
      mounted = false;
    };
  }, [navigation]);

  const firstName = useMemo(() => {
    const n = userName.trim();
    if (!n) return '';
    return n.split(' ')[0] || n;
  }, [userName]);

  const onContinue = async () => {
    try {
      await setSchoolSelected();
      const user = await getUser();
      if (user?.role === 'staff') {
        navigation.navigate('StaffTabs' as never);
      } else {
        navigation.navigate('ParentTabs' as never);
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.inner}>
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Ionicons name="arrow-back" size={22} color="#111827" />
            </TouchableOpacity>

            <Text style={styles.title}>Select School</Text>

            <View style={styles.rightPlaceholder} />
          </View>

          <Text style={styles.welcomeHeading}>
            Welcome, {firstName || (userRole ? `${userRole}` : 'there')}!
          </Text>
          <Text style={styles.welcomeSubtitle}>Choose your school to continue</Text>

          <Text style={styles.sectionLabel}>YOUR SCHOOL</Text>

          <View style={styles.list}>
            {selectedSchool && (
              <View style={[styles.cardBase, styles.cardSelected]}>
                <View style={styles.cardLeft}>
                  <View style={styles.schoolIconBox}>
                    <Ionicons name="school" size={18} color="#111827" />
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.schoolName}>{selectedSchool.name}</Text>
                  <Text style={styles.schoolAddress}>{selectedSchool.address}</Text>

                  {selectedSchool.active && (
                    <View style={styles.activePill}>
                      <Text style={styles.activePillText}>Active</Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardRight}>
                  <Ionicons name="checkmark-circle" size={22} color="#4A90D9" />
                </View>
              </View>
            )}
          </View>

          <View style={styles.flexSpacer} />

          <TouchableOpacity onPress={onContinue} activeOpacity={0.85} style={styles.continueBtn}>
            <Text style={styles.continueBtnText}>Continue →</Text>
          </TouchableOpacity>

          <Text style={styles.helpText}>Not your school? Contact admin</Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by Intants</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  welcomeHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginTop: 6,
  },
  welcomeSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  list: {
    gap: 10,
  },
  cardBase: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#4A90D9',
    backgroundColor: '#EAF3FB',
  },
  cardLeft: {
    marginRight: 12,
  },
  schoolIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardBody: {
    flex: 1,
  },
  schoolName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  schoolAddress: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
  },
  activePill: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  activePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
  },
  cardRight: {
    marginLeft: 10,
  },
  flexSpacer: {
    flex: 1,
  },
  continueBtn: {
    width: '100%',
    height: 52,
    borderRadius: 50,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  continueBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  helpText: {
    marginTop: 12,
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 12,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

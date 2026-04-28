// ✅ Converted from React Web → React Native

import { Ionicons } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser, setSchoolSelected } from '../../lib/session';

type Nav = {
  dispatch: (action: any) => void;
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
  {
    id: 'stmarys_mum',
    name: "St. Mary's School",
    address: 'Mumbai, Maharashtra',
    active: true,
  },
  {
    id: 'kv_blr',
    name: 'Kendriya Vidyalaya',
    address: 'Bangalore, Karnataka',
    active: true,
  },
];

export default function SchoolSelector() {
  const navigation = useNavigation<Nav>();
  const rootNav = ((navigation as any).getParent?.() as any) || navigation;

  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<'parent' | 'staff' | ''>('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>(SCHOOLS[0]?.id ?? '');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await getUser();
      if (!mounted) return;
      if (!u) {
        Alert.alert('Error', 'Please login again.');
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

  const filteredSchools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SCHOOLS;
    return SCHOOLS.filter(s => {
      return s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q);
    });
  }, [query]);

  useEffect(() => {
    if (!selectedId) return;
    const stillVisible = filteredSchools.some(s => s.id === selectedId);
    if (!stillVisible && filteredSchools[0]) setSelectedId(filteredSchools[0].id);
  }, [filteredSchools, selectedId]);

  const firstName = useMemo(() => {
    const n = userName.trim();
    if (!n) return '';
    return n.split(' ')[0] || n;
  }, [userName]);

  const onContinue = async () => {
    if (!selectedId) {
      Alert.alert('Error', 'Please select a school');
      return;
    }
    try {
      await setSchoolSelected();
      const u = await getUser();
      if (!u) {
        Alert.alert('Error', 'Please login again.');
        navigation.goBack();
        return;
      }
      rootNav.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: u.role === 'parent' ? 'Parent' : 'Staff' }],
        })
      );
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const renderSchoolCard = (s: School) => {
    const selected = s.id === selectedId;
    return (
      <TouchableOpacity
        key={s.id}
        activeOpacity={0.85}
        onPress={() => setSelectedId(s.id)}
        style={[styles.cardBase, selected ? styles.cardSelected : styles.cardUnselected]}
      >
        <View style={styles.cardLeft}>
          <View style={styles.schoolIconBox}>
            <Ionicons name="school" size={18} color="#111827" />
          </View>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.schoolName}>{s.name}</Text>
          <Text style={styles.schoolAddress}>{s.address}</Text>

          {s.active && (
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>Active</Text>
            </View>
          )}
        </View>

        <View style={styles.cardRight}>
          {selected ? (
            <Ionicons name="checkmark-circle" size={22} color="#4A90D9" />
          ) : (
            <Ionicons name="ellipse-outline" size={22} color="#D1D5DB" />
          )}
        </View>
      </TouchableOpacity>
    );
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

          <View style={styles.searchWrap}>
            <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search school name..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.sectionLabel}>YOUR SCHOOLS</Text>

          <View style={styles.list}>
            {filteredSchools.map(renderSchoolCard)}
            {filteredSchools.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No schools found</Text>
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
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    paddingVertical: 0,
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
  cardUnselected: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
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
  emptyState: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  emptyText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Nav = { reset: (state: any) => void };

export default function DriverProfileScreen() {
  const navigation = useNavigation<Nav>();

  const name = 'Ravi Driver';
  const role = 'Bus Driver';
  const school = 'Delhi Public School, Hyderabad';

  const initials = useMemo(() => {
    const parts = name.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
    if (parts.length === 0) return 'DR';
    const first = parts[0]?.[0] ?? '';
    const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : parts[0]?.[1]) ?? '';
    return (first + last).toUpperCase() || 'DR';
  }, [name]);

  const logout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.multiRemove([
            'intants_token',
            'intants_refresh_token',
            'intants_user',
            'intants_school_id',
            'intants_school_selected',
            'login_phone',
            'sentHomework',
          ]);
          navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.school}>{school}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <InfoRow icon="📞" label="Phone" value="+91 9700000001" />
          <InfoRow icon="✉" label="Email" value="ravi.d@dpshyd.edu.in" />
          <InfoRow icon="🪪" label="Employee ID" value="EMP-DRV-001" />
          <InfoRow icon="📅" label="Joined" value="January 10 2020" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>License Details</Text>
          <InfoRow icon="📄" label="License No" value="DL-1234567890" />
          <InfoRow icon="📅" label="Expiry" value="December 31 2026" />
          <InfoRow icon="🚌" label="Vehicle Type" value="Heavy Vehicle" />
          <InfoRow icon="✅" label="Status" value="Valid" valueColor="#5CB85C" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vehicle Assignment</Text>
          <InfoRow icon="🚌" label="Vehicle" value="DL-1234 School Bus" />
          <InfoRow icon="📍" label="Route" value="Route 4" />
          <InfoRow icon="👥" label="Students" value="32" />
          <InfoRow icon="⏰" label="Shift" value="Morning + Evening" />
        </View>

        <TouchableOpacity onPress={logout} activeOpacity={0.85} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Powered by Intants</Text>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({
  icon,
  label,
  value,
  valueColor,
}: {
  icon: string;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowIcon}>{icon}</Text>
      <Text style={styles.rowLabel}>{label}:</Text>
      <Text style={[styles.rowValue, valueColor ? { color: valueColor } : null]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 80 },
  topBar: { alignItems: 'center', marginBottom: 14 },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EAF3FB',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  avatarText: { fontSize: 28, fontWeight: '900', color: '#4A90D9' },
  name: { marginTop: 12, fontSize: 20, fontWeight: '900', color: '#111827', textAlign: 'center' },
  role: { marginTop: 4, fontSize: 14, color: '#6B7280', textAlign: 'center' },
  school: { marginTop: 4, fontSize: 13, color: '#9CA3AF', textAlign: 'center' },
  card: { marginTop: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, gap: 10 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#111827' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  rowIcon: { fontSize: 14 },
  rowLabel: { fontSize: 12, color: '#6B7280' },
  rowValue: { fontSize: 12, fontWeight: '900', color: '#111827' },
  logoutBtn: {
    marginTop: 16,
    height: 52,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E85D5D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: { color: '#E85D5D', fontSize: 14, fontWeight: '900' },
  footer: { marginTop: 14, fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
});


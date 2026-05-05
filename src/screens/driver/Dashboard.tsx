import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { driverService } from '../../services';

type Nav = {
  navigate: (
    screen:
      | 'DriverNotifications'
      | 'DriverStudentList'
      | 'DriverMarkAttendance'
      | 'DriverGPS'
      | 'DriverVehicle'
      | 'DriverTrip'
  ) => void;
};

export default function DriverDashboardScreen() {
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      await Promise.all([driverService.getTransportStats(), driverService.getMyRoute()]);
      console.log('Driver dashboard loaded from API');
    } catch (err: any) {
      console.log('API not connected, using mock data:', err?.message ?? String(err));
    }
  };

  const driverName = 'Ravi Driver';
  const driverRole = 'Bus Driver';
  const empId = 'EMP-DRV-001';
  const vehicle = 'DL-1234';
  const route = 'Route 4';

  const initials = useMemo(() => {
    const parts = driverName.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
    if (parts.length === 0) return 'DR';
    const first = parts[0]?.[0] ?? '';
    const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : parts[0]?.[1]) ?? '';
    return (first + last).toUpperCase() || 'DR';
  }, [driverName]);

  const quickActions = useMemo(
    () => [
      {
        title: 'Student List',
        sub: 'View students',
        emoji: '👥',
        bg: '#EAF3FB',
        onPress: () => navigation.navigate('DriverStudentList'),
      },
      {
        title: 'Mark Attendance',
        sub: 'Mark pickup',
        emoji: '✅',
        bg: '#F0FDF4',
        onPress: () => navigation.navigate('DriverMarkAttendance'),
      },
      {
        title: 'GPS Tracking',
        sub: 'Live location',
        emoji: '📍',
        bg: '#FFF8E7',
        onPress: () => navigation.navigate('DriverGPS'),
      },
      {
        title: 'My Vehicle',
        sub: 'Vehicle details',
        emoji: '🚌',
        bg: '#F5F3FF',
        onPress: () => navigation.navigate('DriverVehicle'),
      },
    ],
    [navigation]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity
            style={styles.bellBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DriverNotifications')}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="#4A90D9" />
            <View style={styles.bellDot} />
          </TouchableOpacity>

          <View style={styles.centerHello}>
            <Text style={styles.helloSmall}>Good Morning</Text>
            <Text style={styles.helloName}>{driverName}</Text>
          </View>

          <View style={styles.avatarSmall}>
            <Text style={styles.avatarSmallText}>{initials}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoTopRow}>
            <View style={styles.avatar48}>
              <Text style={styles.avatar48Text}>{initials}</Text>
            </View>

            <View style={styles.infoMeta}>
              <Text style={styles.driverName} numberOfLines={1}>
                {driverName}
              </Text>
              <Text style={styles.driverRole} numberOfLines={1}>
                {driverRole}
              </Text>
              <Text style={styles.driverEmp} numberOfLines={1}>
                {empId}
              </Text>
            </View>
          </View>

          <View style={styles.infoBottomRow}>
            <Text style={styles.metaSmall}>Vehicle: {vehicle}</Text>
            <Text style={styles.metaSmall}>Route: {route}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Today's Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { backgroundColor: '#EAF3FB' }]}>
            <Text style={[styles.summaryValue, { color: '#4A90D9' }]}>32</Text>
            <Text style={styles.summaryLabel}>Total Students</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#F0FDF4' }]}>
            <Text style={[styles.summaryValue, { color: '#5CB85C' }]}>28</Text>
            <Text style={styles.summaryLabel}>Present Today</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#FFF8E7' }]}>
            <Text style={[styles.summaryValue, { color: '#F5A623' }]}>4</Text>
            <Text style={styles.summaryLabel}>Absent</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#FFF0F0' }]}>
            <Text style={[styles.summaryValueSmall, { color: '#E85D5D' }]}>Not Started</Text>
            <Text style={styles.summaryLabel}>Trip Status</Text>
          </View>
        </View>

        <View style={styles.tripCard}>
          <Text style={styles.cardTitle}>Today's Trip</Text>
          <View style={styles.tripRow}>
            <View style={styles.tripLeft}>
              <Text style={styles.tripName}>Morning Pickup</Text>
              <Text style={styles.tripSub}>6:30 AM - 8:00 AM</Text>
              <Text style={styles.tripSub}>Route 4 - Kondapur to School</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('DriverTrip')}
              style={styles.startTripBtn}
            >
              <Text style={styles.startTripText}>Start Trip</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map(a => (
            <TouchableOpacity key={a.title} activeOpacity={0.9} onPress={a.onPress} style={[styles.actionCard, { backgroundColor: a.bg }]}>
              <Text style={styles.actionEmoji}>{a.emoji}</Text>
              <Text style={styles.actionTitle}>{a.title}</Text>
              <Text style={styles.actionSub}>{a.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 80 },
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF3FB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: '#4A90D9' },
  centerHello: { flex: 1, alignItems: 'center' },
  helloSmall: { fontSize: 13, color: '#6B7280' },
  helloName: { marginTop: 2, fontSize: 20, fontWeight: '800', color: '#111827' },
  avatarSmall: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  avatarSmallText: { fontSize: 14, fontWeight: '800', color: '#4A90D9' },
  infoCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, marginBottom: 16 },
  infoTopRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar48: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  avatar48Text: { fontSize: 16, fontWeight: '800', color: '#4A90D9' },
  infoMeta: { flex: 1, minWidth: 0 },
  driverName: { fontSize: 15, fontWeight: '800', color: '#111827' },
  driverRole: { marginTop: 3, fontSize: 13, color: '#6B7280' },
  driverEmp: { marginTop: 2, fontSize: 12, color: '#9CA3AF' },
  infoBottomRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  metaSmall: { fontSize: 13, color: '#6B7280' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 10 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  summaryCard: { width: '48.5%', borderRadius: 12, padding: 14, marginBottom: 10 },
  summaryValue: { fontSize: 20, fontWeight: '800' },
  summaryValueSmall: { fontSize: 16, fontWeight: '800' },
  summaryLabel: { marginTop: 4, fontSize: 12, color: '#6B7280' },
  tripCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#111827' },
  tripRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, gap: 12 },
  tripLeft: { flex: 1, minWidth: 0 },
  tripName: { fontSize: 14, fontWeight: '800', color: '#111827' },
  tripSub: { marginTop: 2, fontSize: 12, color: '#6B7280' },
  startTripBtn: { backgroundColor: '#5CB85C', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8 },
  startTripText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionCard: { width: '48.5%', borderRadius: 12, padding: 14, marginBottom: 10 },
  actionEmoji: { fontSize: 22, marginBottom: 6 },
  actionTitle: { fontSize: 13, fontWeight: '800', color: '#111827' },
  actionSub: { marginTop: 2, fontSize: 11, color: '#6B7280' },
});


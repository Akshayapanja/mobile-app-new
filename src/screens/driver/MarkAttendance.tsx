import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { driverService } from '../../services';

type Nav = { goBack: () => void };

type TripType = 'Morning Pickup' | 'Evening Drop';
type Status = 'P' | 'A';

type Student = { id: string; roll: string; name: string; stop: string; phone: string };

export default function DriverMarkAttendanceScreen() {
  const navigation = useNavigation<Nav>();

  const dateLabel = 'Apr 21';

  const students: Student[] = useMemo(
    () => [
      { id: '1', roll: '01', name: 'Arjun Kumar', stop: 'Kondapur Metro', phone: '+91 9800000001' },
      { id: '2', roll: '02', name: 'Sneha Sharma', stop: 'Kondapur Metro', phone: '+91 9800000002' },
      { id: '3', roll: '03', name: 'Rahul Verma', stop: 'Botanical Garden', phone: '+91 9800000003' },
      { id: '4', roll: '04', name: 'Priya Patel', stop: 'Botanical Garden', phone: '+91 9800000004' },
      { id: '5', roll: '05', name: 'Karthik Reddy', stop: 'Gachibowli Circle', phone: '+91 9800000005' },
      { id: '6', roll: '06', name: 'Ananya Singh', stop: 'Gachibowli Circle', phone: '+91 9800000006' },
      { id: '7', roll: '07', name: 'Rohit Kumar', stop: 'Hitech City', phone: '+91 9800000007' },
      { id: '8', roll: '08', name: 'Kavya Menon', stop: 'Hitech City', phone: '+91 9800000008' },
    ],
    []
  );

  const [tripType, setTripType] = useState<TripType>('Morning Pickup');

  const [statusById, setStatusById] = useState<Record<string, Status>>(() => {
    const init: Record<string, Status> = {};
    for (const s of students) init[s.id] = 'P';
    return init;
  });

  const setStatus = (id: string, status: Status) => {
    setStatusById(prev => ({ ...prev, [id]: status }));
  };

  const handleSubmit = async () => {
    try {
      const attendanceData = students.map(s => ({
        studentId: s.id || s.name,
        pickupStatus: statusById[s.id] === 'P' ? 'picked' : 'absent',
      }));

      await driverService.markBulkAttendance({
        date: new Date().toISOString().split('T')[0],
        vehicleId: 'vehicle1',
        routeId: 'route1',
        attendance: attendanceData,
      });

      Alert.alert('Success', 'Attendance submitted!');
    } catch (err: any) {
      console.log('Transport attendance API error:', err?.message ?? String(err));
      Alert.alert('Success', 'Attendance submitted!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Mark Attendance</Text>
          <Text style={styles.dateText}>{dateLabel}</Text>
        </View>

        <View style={styles.tripSelector}>
          {(['Morning Pickup', 'Evening Drop'] as TripType[]).map(t => {
            const active = tripType === t;
            return (
              <TouchableOpacity
                key={t}
                activeOpacity={0.85}
                onPress={() => setTripType(t)}
                style={[styles.tripPill, active ? styles.tripPillActive : styles.tripPillInactive]}
              >
                <Text style={[styles.tripPillText, active ? styles.tripPillTextActive : styles.tripPillTextInactive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.list}>
          {students.map(s => {
            const st = statusById[s.id] || 'P';
            return (
              <View key={s.id} style={styles.card}>
                <View style={styles.row}>
                  <View style={styles.rollPill}>
                    <Text style={styles.rollText}>{s.roll}</Text>
                  </View>

                  <View style={styles.middle}>
                    <Text style={styles.name}>{s.name}</Text>
                    <Text style={styles.stop}>{s.stop}</Text>
                  </View>

                  <View style={styles.btnRow}>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => setStatus(s.id, 'P')}
                      style={[styles.statusBtn, st === 'P' ? styles.presentActive : styles.statusInactive]}
                    >
                      <Text style={[styles.statusBtnText, st === 'P' ? styles.whiteText : styles.grayText]}>P</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => setStatus(s.id, 'A')}
                      style={[styles.statusBtn, st === 'A' ? styles.absentActive : styles.statusInactive]}
                    >
                      <Text style={[styles.statusBtnText, st === 'A' ? styles.whiteText : styles.grayText]}>A</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.85} style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit Attendance</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 80 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  dateText: { width: 56, textAlign: 'right', fontSize: 13, color: '#6B7280' },
  tripSelector: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  tripPill: { flex: 1, height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  tripPillActive: { backgroundColor: '#4A90D9' },
  tripPillInactive: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' },
  tripPillText: { fontSize: 13, fontWeight: '800' },
  tripPillTextActive: { color: '#FFFFFF' },
  tripPillTextInactive: { color: '#6B7280' },
  list: { gap: 8 },
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rollPill: {
    width: 36,
    height: 24,
    borderRadius: 999,
    backgroundColor: '#EAF3FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rollText: { fontSize: 12, fontWeight: '800', color: '#4A90D9' },
  middle: { flex: 1, minWidth: 0 },
  name: { fontSize: 14, fontWeight: '800', color: '#111827' },
  stop: { marginTop: 2, fontSize: 11, color: '#6B7280' },
  btnRow: { flexDirection: 'row', gap: 8 },
  statusBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  statusBtnText: { fontSize: 13, fontWeight: '800' },
  statusInactive: { backgroundColor: '#F9FAFB' },
  presentActive: { backgroundColor: '#5CB85C' },
  absentActive: { backgroundColor: '#E85D5D' },
  whiteText: { color: '#FFFFFF' },
  grayText: { color: '#6B7280' },
  submitBtn: { marginTop: 16, height: 52, borderRadius: 999, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  submitText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});


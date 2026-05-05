import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useMemo, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { driverService } from '../../services';

type Nav = { goBack: () => void };

type Status = 'Picked' | 'Absent' | 'Waiting';
type Student = {
  id: string;
  roll: string;
  name: string;
  stop: string;
  phone: string;
  status: Status;
};

const STATUS_STYLES: Record<Status, { bg: string; fg: string }> = {
  Picked: { bg: '#F0FDF4', fg: '#5CB85C' },
  Absent: { bg: '#FFF0F0', fg: '#E85D5D' },
  Waiting: { bg: '#FFF8E7', fg: '#F5A623' },
};

export default function DriverStudentListScreen() {
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await driverService.getStudentsOnRoute();
      if ((response as any)?.data || response) {
        console.log('Students loaded from API');
      }
    } catch (err: any) {
      console.log('API not connected, using mock data:', err?.message ?? String(err));
    }
  };

  const students: Student[] = useMemo(
    () => [
      { id: '1', roll: '01', name: 'Arjun Kumar', stop: 'Kondapur Metro', phone: '+91 9800000001', status: 'Picked' },
      { id: '2', roll: '02', name: 'Sneha Sharma', stop: 'Kondapur Metro', phone: '+91 9800000002', status: 'Picked' },
      { id: '3', roll: '03', name: 'Rahul Verma', stop: 'Botanical Garden', phone: '+91 9800000003', status: 'Waiting' },
      { id: '4', roll: '04', name: 'Priya Patel', stop: 'Botanical Garden', phone: '+91 9800000004', status: 'Absent' },
      { id: '5', roll: '05', name: 'Karthik Reddy', stop: 'Gachibowli Circle', phone: '+91 9800000005', status: 'Picked' },
      { id: '6', roll: '06', name: 'Ananya Singh', stop: 'Gachibowli Circle', phone: '+91 9800000006', status: 'Picked' },
      { id: '7', roll: '07', name: 'Rohit Kumar', stop: 'Hitech City', phone: '+91 9800000007', status: 'Waiting' },
      { id: '8', roll: '08', name: 'Kavya Menon', stop: 'Hitech City', phone: '+91 9800000008', status: 'Picked' },
    ],
    []
  );

  const stops = useMemo(() => ['All Stops', ...Array.from(new Set(students.map(s => s.stop)))], [students]);
  const [selectedStop, setSelectedStop] = useState<string>('All Stops');

  const filtered = useMemo(() => {
    if (selectedStop === 'All Stops') return students;
    return students.filter(s => s.stop === selectedStop);
  }, [selectedStop, students]);

  const totals = useMemo(() => {
    const total = students.length;
    const picked = students.filter(s => s.status === 'Picked').length;
    const absent = students.filter(s => s.status === 'Absent').length;
    return { total, picked, absent };
  }, [students]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Student List</Text>
          <View style={styles.rightPlaceholder} />
        </View>

        <View style={styles.filterRow}>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={selectedStop}
              onValueChange={v => setSelectedStop(String(v))}
              style={styles.picker}
            >
              {stops.map(s => (
                <Picker.Item key={s} label={s} value={s} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total: {totals.total}</Text>
          <Text style={[styles.summaryText, { color: '#5CB85C' }]}>Picked: {totals.picked}</Text>
          <Text style={[styles.summaryText, { color: '#E85D5D' }]}>Absent: {totals.absent}</Text>
        </View>

        <View style={styles.list}>
          {filtered.map(s => {
            const st = STATUS_STYLES[s.status];
            return (
              <View key={s.id} style={styles.card}>
                <View style={styles.row}>
                  <View style={styles.rollPill}>
                    <Text style={styles.rollText}>{s.roll}</Text>
                  </View>

                  <View style={styles.middle}>
                    <Text style={styles.name}>{s.name}</Text>
                    <Text style={styles.meta}>{s.stop}</Text>
                    <Text style={styles.metaSmall}>Parent: {s.phone}</Text>
                  </View>

                  <View style={styles.right}>
                    <View style={[styles.badge, { backgroundColor: st.bg }]}>
                      <Text style={[styles.badgeText, { color: st.fg }]}>{s.status}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(`tel:${s.phone.replace(/\s+/g, '')}`)}
                      activeOpacity={0.7}
                      style={styles.callBtn}
                      accessibilityRole="button"
                      accessibilityLabel={`Call ${s.phone}`}
                    >
                      <Ionicons name="call" size={18} color="#4A90D9" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

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
  rightPlaceholder: { width: 40, height: 40 },
  filterRow: { marginBottom: 12 },
  pickerWrap: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: { height: 48, width: '100%' },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 12, flexWrap: 'wrap' },
  summaryText: { fontSize: 13, color: '#6B7280' },
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
  meta: { marginTop: 2, fontSize: 12, color: '#6B7280' },
  metaSmall: { marginTop: 2, fontSize: 11, color: '#9CA3AF' },
  right: { alignItems: 'flex-end', gap: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  badgeText: { fontSize: 11, fontWeight: '800' },
  callBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EAF3FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


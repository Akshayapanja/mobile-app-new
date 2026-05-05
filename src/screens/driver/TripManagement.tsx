import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Nav = { goBack: () => void; navigate: (screen: 'DriverMarkAttendance') => void };

type StopStatus = 'Completed' | 'Current' | 'Pending';
type Stop = { id: string; name: string; time: string; status: StopStatus };

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function DriverTripScreen() {
  const navigation = useNavigation<Nav>();

  const [tripStarted, setTripStarted] = useState(false);
  const [tripEnded, setTripEnded] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!tripStarted || tripEnded) return;
    timerRef.current = setInterval(() => setElapsedTime(s => s + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [tripStarted, tripEnded]);

  const stops: Stop[] = useMemo(
    () => [
      { id: '1', name: 'Kondapur Metro', time: '6:30 AM', status: 'Completed' },
      { id: '2', name: 'Botanical Garden', time: '6:45 AM', status: 'Completed' },
      { id: '3', name: 'Gachibowli Circle', time: '7:00 AM', status: 'Current' },
      { id: '4', name: 'Hitech City', time: '7:15 AM', status: 'Pending' },
      { id: '5', name: 'Madhapur', time: '7:30 AM', status: 'Pending' },
      { id: '6', name: 'DPS School', time: '8:00 AM', status: 'Pending' },
    ],
    []
  );

  const startTrip = () => {
    setTripStarted(true);
    setTripEnded(false);
    setElapsedTime(0);
  };

  const endTrip = () => {
    Alert.alert('End Trip', 'Are you sure you want to end trip?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'End Trip',
        style: 'destructive',
        onPress: () => {
          setTripEnded(true);
          setTripStarted(false);
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Trip Management</Text>
          <View style={styles.rightPlaceholder} />
        </View>

        <View style={[styles.statusCard, tripStarted ? styles.statusStarted : styles.statusNotStarted]}>
          {!tripStarted && !tripEnded && (
            <>
              <Text style={[styles.statusTitle, { color: '#F5A623' }]}>Trip Not Started</Text>
              <Text style={styles.statusSub}>Tap Start Trip to begin</Text>
            </>
          )}

          {tripStarted && !tripEnded && (
            <>
              <Text style={[styles.statusTitle, { color: '#5CB85C' }]}>Trip In Progress</Text>
              <Text style={styles.statusSub}>Started at 6:30 AM</Text>
              <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
            </>
          )}

          {tripEnded && (
            <>
              <Text style={[styles.statusTitle, { color: '#5CB85C' }]}>Trip Completed!</Text>
              <Text style={styles.statusSub}>Great job — trip has ended.</Text>
            </>
          )}
        </View>

        <View style={styles.detailsCard}>
          <InfoRow label="Route" value="Route 4" />
          <InfoRow label="Vehicle" value="DL-1234" />
          <InfoRow label="Total Students" value="32" />
          <InfoRow label="Trip Type" value="Morning Pickup" />
          <InfoRow label="Date" value="April 21 2025" />
        </View>

        <Text style={styles.sectionTitle}>Stops Progress</Text>
        <View style={styles.stopsList}>
          {stops.map(s => (
            <View key={s.id} style={styles.stopRow}>
              <View style={styles.stopIcon}>
                {s.status === 'Completed' ? (
                  <Ionicons name="checkmark-circle" size={20} color="#5CB85C" />
                ) : s.status === 'Current' ? (
                  <View style={styles.currentDot} />
                ) : (
                  <View style={styles.pendingDot} />
                )}
              </View>
              <View style={styles.stopMeta}>
                <Text style={styles.stopName}>{s.name}</Text>
                <Text style={styles.stopTime}>{s.time}</Text>
              </View>
              <Text
                style={[
                  styles.stopStatus,
                  s.status === 'Completed'
                    ? { color: '#5CB85C' }
                    : s.status === 'Current'
                      ? { color: '#4A90D9' }
                      : { color: '#9CA3AF' },
                ]}
              >
                {s.status}
              </Text>
            </View>
          ))}
        </View>

        {!tripStarted && !tripEnded && (
          <TouchableOpacity onPress={startTrip} activeOpacity={0.85} style={[styles.actionBtn, styles.startBtn]}>
            <Text style={styles.actionText}>Start Trip</Text>
          </TouchableOpacity>
        )}

        {tripStarted && !tripEnded && (
          <TouchableOpacity onPress={endTrip} activeOpacity={0.85} style={[styles.actionBtn, styles.endBtn]}>
            <Text style={styles.actionText}>End Trip</Text>
          </TouchableOpacity>
        )}

        {tripEnded && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Trip Completed!</Text>
            <Text style={styles.summaryItem}>Duration: 1hr 30mins</Text>
            <Text style={styles.summaryItem}>Students Picked: 28/32</Text>
            <Text style={styles.summaryItem}>Distance: 12.5 km</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('DriverMarkAttendance')}>
              <Text style={styles.linkText}>View Attendance Report →</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 80 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  rightPlaceholder: { width: 40, height: 40 },
  statusCard: { borderRadius: 12, padding: 16, borderWidth: 1, marginBottom: 12 },
  statusNotStarted: { backgroundColor: '#FFF8E7', borderColor: '#F5A623' },
  statusStarted: { backgroundColor: '#F0FDF4', borderColor: '#5CB85C' },
  statusTitle: { fontSize: 16, fontWeight: '800' },
  statusSub: { marginTop: 6, fontSize: 13, color: '#6B7280' },
  timerText: { marginTop: 10, fontSize: 24, fontWeight: '900', color: '#1F2937' },
  detailsCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, gap: 10, marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  infoLabel: { fontSize: 13, color: '#6B7280' },
  infoValue: { fontSize: 13, fontWeight: '800', color: '#111827' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 10 },
  stopsList: { gap: 10, marginBottom: 16 },
  stopRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  stopIcon: { width: 24, alignItems: 'center' },
  currentDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4A90D9' },
  pendingDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#D1D5DB' },
  stopMeta: { flex: 1, minWidth: 0 },
  stopName: { fontSize: 13, fontWeight: '800', color: '#111827' },
  stopTime: { marginTop: 2, fontSize: 12, color: '#6B7280' },
  stopStatus: { fontSize: 12, fontWeight: '800' },
  actionBtn: { height: 52, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  startBtn: { backgroundColor: '#5CB85C' },
  endBtn: { backgroundColor: '#E85D5D' },
  actionText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  summaryCard: { marginTop: 12, backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#BBF7D0', borderRadius: 12, padding: 16 },
  summaryTitle: { fontSize: 15, fontWeight: '900', color: '#16A34A' },
  summaryItem: { marginTop: 6, fontSize: 13, color: '#111827' },
  linkText: { marginTop: 10, fontSize: 13, fontWeight: '800', color: '#4A90D9' },
});


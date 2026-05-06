import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { driverService } from '../../services';

type Nav = { goBack: () => void };

type Stop = { id: string; name: string; time: string; students: string; isLast?: boolean };

export default function DriverMyRouteScreen() {
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    loadRoute();
  }, []);

  const loadRoute = async () => {
    try {
      const response = await driverService.getMyRoute();
      if ((response as any)?.data || response) {
      }
    } catch (err: any) {
      // TODO: handle error
    }
  };

  const stops: Stop[] = useMemo(
    () => [
      { id: 's1', name: 'Kondapur Metro Station', time: '6:30 AM', students: '8 students' },
      { id: 's2', name: 'Botanical Garden', time: '6:45 AM', students: '6 students' },
      { id: 's3', name: 'Gachibowli Circle', time: '7:00 AM', students: '7 students' },
      { id: 's4', name: 'Hitech City', time: '7:15 AM', students: '5 students' },
      { id: 's5', name: 'Madhapur', time: '7:30 AM', students: '6 students' },
      { id: 's6', name: 'Delhi Public School', time: '8:00 AM', students: 'Final destination', isLast: true },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>My Route</Text>
          <View style={styles.rightPlaceholder} />
        </View>

        <View style={styles.routeCard}>
          <Text style={styles.routeName}>Route 4</Text>
          <Text style={styles.routeDesc}>Kondapur to Delhi Public School</Text>
          <View style={styles.routeStatsRow}>
            <Text style={styles.routeStat}>32 Students</Text>
            <Text style={styles.routeStat}>12.5 km</Text>
            <Text style={styles.routeStat}>45 mins</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Route Stops</Text>
        <View style={styles.timeline}>
          {stops.map(s => (
            <View key={s.id} style={styles.stopRow}>
              <View style={styles.timelineLeft}>
                <View style={styles.dot} />
                {!s.isLast && <View style={styles.line} />}
              </View>
              <View style={styles.stopCard}>
                <Text style={styles.stopName}>{s.name}</Text>
                <Text style={styles.stopSub}>{s.time}</Text>
                <Text style={styles.stopSub}>{s.students}</Text>
              </View>
            </View>
          ))}
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
  routeCard: {
    backgroundColor: '#EAF3FB',
    borderWidth: 1,
    borderColor: '#B5D4F4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  routeName: { fontSize: 16, fontWeight: '800', color: '#1F2937' },
  routeDesc: { marginTop: 4, fontSize: 13, color: '#6B7280' },
  routeStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  routeStat: { fontSize: 13, color: '#6B7280' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 10 },
  timeline: { marginTop: 2 },
  stopRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 10 },
  timelineLeft: { width: 16, alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#4A90D9', marginTop: 10 },
  line: { width: 2, flex: 1, backgroundColor: '#B5D4F4', marginTop: 6 },
  stopCard: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12 },
  stopName: { fontSize: 14, fontWeight: '800', color: '#111827' },
  stopSub: { marginTop: 2, fontSize: 12, color: '#6B7280' },
});


import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Nav = { goBack: () => void };

export default function DriverVehicleScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>My Vehicle</Text>
          <View style={styles.rightPlaceholder} />
        </View>

        <View style={styles.vehicleHero}>
          <Text style={styles.vehicleEmoji}>🚌</Text>
          <Text style={styles.vehicleNo}>DL-1234</Text>
          <Text style={styles.vehicleType}>School Bus</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vehicle Details</Text>
          <View style={styles.rows}>
            <Detail icon="🚌" label="Vehicle Number" value="DL-1234" />
            <Detail icon="📋" label="Type" value="School Bus" />
            <Detail icon="👥" label="Capacity" value="40 seats" />
            <Detail icon="⚙️" label="Model" value="Tata Starbus 2022" />
            <Detail icon="🔧" label="Last Service" value="March 15 2025" />
            <Detail icon="📅" label="Next Service" value="June 15 2025" />
            <Detail icon="🛡️" label="Insurance Expiry" value="Dec 31 2025" />
            <Detail icon="📄" label="Permit Expiry" value="Aug 20 2025" />
          </View>
        </View>

        <View style={styles.statusRow}>
          <View style={[styles.statusCard, { backgroundColor: '#F0FDF4' }]}>
            <Text style={[styles.statusValue, { color: '#5CB85C' }]}>Active</Text>
            <Text style={styles.statusLabel}>Status</Text>
          </View>
          <View style={[styles.statusCard, { backgroundColor: '#EAF3FB' }]}>
            <Text style={[styles.statusValue, { color: '#4A90D9' }]}>40</Text>
            <Text style={styles.statusLabel}>Capacity</Text>
          </View>
          <View style={[styles.statusCard, { backgroundColor: '#FFF8E7' }]}>
            <Text style={[styles.statusValue, { color: '#F5A623' }]}>32</Text>
            <Text style={styles.statusLabel}>Assigned</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Assigned Route</Text>
          <Text style={styles.routeName}>Route 4 - Kondapur to DPS</Text>
          <Text style={styles.routeMeta}>12.5 km • 45 mins</Text>
          <Text style={styles.routeMeta}>32 students assigned</Text>
        </View>

        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>⚠️ Compliance Alerts</Text>
          <Text style={styles.alertText}>Insurance renewal due in 45 days</Text>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Detail({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
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
  vehicleHero: {
    backgroundColor: '#EAF3FB',
    borderWidth: 1,
    borderColor: '#B5D4F4',
    borderRadius: 12,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  vehicleEmoji: { fontSize: 64, marginBottom: 6 },
  vehicleNo: { fontSize: 18, fontWeight: '900', color: '#1F2937' },
  vehicleType: { marginTop: 4, fontSize: 13, color: '#6B7280' },
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#111827', marginBottom: 10 },
  rows: { gap: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  detailIcon: { fontSize: 14 },
  detailLabel: { fontSize: 12, color: '#6B7280' },
  detailValue: { fontSize: 12, fontWeight: '800', color: '#111827' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 12 },
  statusCard: { flex: 1, borderRadius: 12, padding: 12 },
  statusValue: { fontSize: 14, fontWeight: '900' },
  statusLabel: { marginTop: 4, fontSize: 11, color: '#6B7280' },
  routeName: { fontSize: 14, fontWeight: '900', color: '#111827' },
  routeMeta: { marginTop: 4, fontSize: 12, color: '#6B7280' },
  alertCard: { backgroundColor: '#FFF8E7', borderWidth: 1, borderColor: '#F5A623', borderRadius: 12, padding: 16 },
  alertTitle: { fontSize: 14, fontWeight: '900', color: '#F5A623' },
  alertText: { marginTop: 6, fontSize: 13, color: '#6B7280' },
});


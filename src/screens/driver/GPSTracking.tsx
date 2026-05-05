import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Nav = { goBack: () => void };

export default function DriverGPSScreen() {
  const navigation = useNavigation<Nav>();

  const [sharing, setSharing] = useState(true);
  const blink = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0.2, duration: 600, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [blink]);

  const toggle = () => {
    setSharing(prev => {
      const next = !prev;
      if (next) {
        Alert.alert('Location sharing started', 'Parents can now see your location.');
      } else {
        Alert.alert('Location sharing stopped.');
      }
      return next;
    });
  };

  const btnLabel = useMemo(() => (sharing ? 'Stop Location Sharing' : 'Start Location Sharing'), [sharing]);
  const btnStyle = sharing ? styles.stopBtn : styles.startBtn;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>GPS Tracking</Text>
          <View style={styles.rightPlaceholder} />
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Animated.View style={[styles.greenDot, { opacity: blink }]} />
            <Text style={styles.statusTitle}>Location Sharing Active</Text>
          </View>
          <Text style={styles.statusSub}>Updates every 30 seconds</Text>
        </View>

        <View style={styles.mapBox}>
          <Text style={styles.mapEmoji}>📍</Text>
          <Text style={styles.mapTitle}>Live Map View</Text>
          <Text style={styles.mapSub}>Connect to backend for</Text>
          <Text style={styles.mapSub}>real-time GPS tracking</Text>
          <Text style={styles.mapMeta}>Lat: 17.4401° N</Text>
          <Text style={styles.mapMeta}>Lng: 78.3489° E</Text>
        </View>

        <View style={styles.detailsCard}>
          <Row label="Current Location" value="Gachibowli, Hyderabad" />
          <Row label="Speed" value="35 km/h" />
          <Row label="Next Stop" value="Hitech City" valueColor="#4A90D9" />
          <Row label="ETA to School" value="25 minutes" />
        </View>

        <TouchableOpacity onPress={toggle} activeOpacity={0.85} style={[styles.toggleBtn, btnStyle]}>
          <Text style={styles.toggleText}>{btnLabel}</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>Parents can see your live location{'\n'}when sharing is active.</Text>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, valueColor ? { color: valueColor } : null]}>{value}</Text>
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
  statusCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#5CB85C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  greenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#5CB85C' },
  statusTitle: { fontSize: 14, fontWeight: '800', color: '#5CB85C' },
  statusSub: { marginTop: 6, fontSize: 12, color: '#6B7280' },
  mapBox: {
    backgroundColor: '#EAF3FB',
    borderWidth: 1,
    borderColor: '#B5D4F4',
    borderRadius: 12,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 12,
  },
  mapEmoji: { fontSize: 48, marginBottom: 6 },
  mapTitle: { fontSize: 16, fontWeight: '800', color: '#4A90D9' },
  mapSub: { marginTop: 4, fontSize: 13, color: '#6B7280' },
  mapMeta: { marginTop: 6, fontSize: 12, color: '#6B7280' },
  detailsCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, gap: 8 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  detailLabel: { fontSize: 13, color: '#6B7280' },
  detailValue: { fontSize: 13, fontWeight: '800', color: '#111827' },
  toggleBtn: { marginTop: 14, height: 52, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  startBtn: { backgroundColor: '#5CB85C' },
  stopBtn: { backgroundColor: '#E85D5D' },
  toggleText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  footerNote: { marginTop: 12, fontSize: 12, color: '#6B7280', textAlign: 'center', lineHeight: 16 },
});


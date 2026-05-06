// ✅ Converted from React Web → React Native

import React, { useEffect } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { parentService } from '../../services';

type RouteStop = {
  id: string;
  name: string;
  time: string;
  status: 'done' | 'you' | 'upcoming';
};

function InfoRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, valueColor ? { color: valueColor } : null]}>{value}</Text>
    </View>
  );
}

export default function BusTracking() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    loadTracking();
  }, []);

  const loadTracking = async () => {
    try {
      const response = await parentService.getLiveTracking();
      if ((response as any)?.data || response) {
      }
    } catch (err: any) {
      // TODO: handle error
    }
  };

  const stops: RouteStop[] = [
    { id: 's1', name: 'Kondapur Main Road', time: '7:15 AM', status: 'done' },
    { id: 's2', name: 'Madhapur Signal', time: '7:25 AM', status: 'done' },
    { id: 's3', name: 'Jubilee Hills Stop 3', time: '7:45 AM', status: 'you' },
    { id: 's4', name: 'School Gate', time: '8:00 AM', status: 'upcoming' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>Bus Tracking</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.childRow}>
          <View style={styles.childAvatar}>
            <Text style={styles.childInitials}>AK</Text>
          </View>
          <View>
            <Text style={styles.childName}>Arjun Kumar</Text>
            <Text style={styles.childClass}>Class 8-A</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚌 Bus Details</Text>
          <View style={styles.divider} />

          <Text style={styles.busNumber}>DPS-HYD-04</Text>
          <InfoRow label="Route" value="Route 4 — Kondapur to School" />
          <InfoRow label="Pickup Stop" value="Jubilee Hills Stop 3" />
          <InfoRow label="Pickup Time" value="7:45 AM" />
          <InfoRow label="Drop Time" value="4:15 PM" />
        </View>

        <View style={styles.card}>
          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitials}>RD</Text>
            </View>

            <View style={styles.driverMid}>
              <Text style={styles.driverName}>Mr. Ravi Driver</Text>
              <Text style={styles.driverSub}>Senior Driver — 8 years exp</Text>
            </View>

            <View style={styles.driverRight}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => Linking.openURL('tel:+919876543210')}
                style={styles.driverCallBtn}
              >
                <Ionicons name="call" size={22} color="#4A90D9" />
              </TouchableOpacity>
              <Text style={styles.driverPhone}>+91 9876543210</Text>
            </View>
          </View>
        </View>

        <View style={styles.liveCard}>
          <Text style={styles.liveTitle}>🟢 Bus is On the Way</Text>
          <Text style={styles.liveText}>Expected arrival: 7:43 AM</Text>
          <Text style={styles.liveText}>Current Location: Banjara Hills</Text>
          <Text style={styles.liveTime}>Last updated: 2 mins ago</Text>
        </View>

        <Text style={styles.sectionTitle}>Today's Route Stops</Text>
        <View style={styles.stopsList}>
          {stops.map(s => {
            const dotColor =
              s.status === 'done' ? '#5CB85C' : s.status === 'you' ? '#4A90D9' : '#D1D5DB';

            return (
              <View key={s.id} style={styles.stopRow}>
                <View style={[styles.stopDot, { backgroundColor: dotColor }]} />

                <View style={styles.stopMid}>
                  <Text style={styles.stopName}>{s.name}</Text>
                </View>

                <View style={styles.stopRight}>
                  <Text style={styles.stopTime}>{s.time}</Text>
                  {s.status === 'done' ? <Text style={styles.stopDone}>✓</Text> : null}
                  {s.status === 'you' ? (
                    <View style={styles.youPill}>
                      <Text style={styles.youPillText}>YOUR STOP</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 80 },

  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  topNavBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  topNavTitle: { fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center', flex: 1 },
  topNavRightSpacer: { width: 40, height: 40 },

  childRow: {
    backgroundColor: '#EAF3FB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  childAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  childInitials: { fontSize: 14, fontWeight: '900', color: '#4A90D9' },
  childName: { fontSize: 14, fontWeight: '900', color: '#1F2937' },
  childClass: { fontSize: 12, color: '#9CA3AF', fontWeight: '700', marginTop: 2 },

  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '900', color: '#1F2937' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },

  busNumber: { fontSize: 14, fontWeight: '900', color: '#4A90D9', marginBottom: 6 },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 },
  infoLabel: { fontSize: 13, color: '#9CA3AF', fontWeight: '700' },
  infoValue: { fontSize: 14, color: '#111827', fontWeight: '900' },

  driverRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  driverAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  driverInitials: { fontSize: 16, fontWeight: '900', color: '#4A90D9' },
  driverMid: { flex: 1 },
  driverName: { fontSize: 15, fontWeight: '900', color: '#111827' },
  driverSub: { fontSize: 13, color: '#9CA3AF', fontWeight: '700', marginTop: 4 },
  driverRight: { alignItems: 'flex-end', gap: 8 },
  driverCallBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  driverPhone: { fontSize: 11, color: '#9CA3AF', fontWeight: '700' },

  liveCard: { backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#5CB85C', borderRadius: 12, padding: 16, marginBottom: 16 },
  liveTitle: { fontSize: 14, fontWeight: '900', color: '#5CB85C', marginBottom: 6 },
  liveText: { fontSize: 13, color: '#6B7280', fontWeight: '700', marginTop: 4 },
  liveTime: { fontSize: 11, color: '#9CA3AF', fontWeight: '700', marginTop: 10 },

  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#111827', marginBottom: 12 },
  stopsList: { gap: 10 },
  stopRow: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  stopDot: { width: 10, height: 10, borderRadius: 5 },
  stopMid: { flex: 1 },
  stopName: { fontSize: 14, fontWeight: '900', color: '#111827' },
  stopRight: { alignItems: 'flex-end', gap: 6, minWidth: 110 },
  stopTime: { fontSize: 12, color: '#9CA3AF', fontWeight: '700' },
  stopDone: { color: '#5CB85C', fontSize: 16, fontWeight: '900' },
  youPill: { backgroundColor: '#EAF3FB', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  youPillText: { color: '#4A90D9', fontSize: 11, fontWeight: '900' },
});


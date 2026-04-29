import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Period = {
  title: string;
  room: string;
  time: string;
  status: 'Ongoing' | 'Upcoming';
};

type DayItem = { key: keyof typeof TIMETABLE; label: string; date: string };

const DAYS: DayItem[] = [
  { key: 'Monday', label: 'Mon', date: '21' },
  { key: 'Tuesday', label: 'Tue', date: '22' },
  { key: 'Wednesday', label: 'Wed', date: '23' },
  { key: 'Thursday', label: 'Thu', date: '24' },
  { key: 'Friday', label: 'Fri', date: '25' },
  { key: 'Saturday', label: 'Sat', date: '26' },
];

const TIMETABLE = {
  Monday: [
    { title: 'Class 8A Mathematics', room: 'Room 12', time: '8:00 AM - 8:45 AM', status: 'Ongoing' },
    { title: 'Class 9B Mathematics', room: 'Room 8', time: '10:30 AM - 11:15 AM', status: 'Upcoming' },
    { title: 'Class 7C Mathematics', room: 'Room 5', time: '11:15 AM - 12:00 PM', status: 'Upcoming' },
  ],
  Tuesday: [
    { title: 'Class 8A Mathematics', room: 'Room 12', time: '8:45 AM - 9:30 AM', status: 'Ongoing' },
    { title: 'Class 9B Mathematics', room: 'Room 8', time: '11:15 AM - 12:00 PM', status: 'Upcoming' },
  ],
  Wednesday: [
    { title: 'Class 8A Mathematics', room: 'Room 12', time: '8:45 AM - 9:30 AM', status: 'Ongoing' },
    { title: 'Class 7C Mathematics', room: 'Room 5', time: '10:30 AM - 11:15 AM', status: 'Upcoming' },
  ],
  Thursday: [
    { title: 'Class 8A Mathematics', room: 'Room 12', time: '9:30 AM - 10:15 AM', status: 'Ongoing' },
    { title: 'Class 9B Mathematics', room: 'Room 8', time: '10:30 AM - 11:15 AM', status: 'Upcoming' },
  ],
  Friday: [
    { title: 'Class 8A Mathematics', room: 'Room 12', time: '10:30 AM - 11:15 AM', status: 'Ongoing' },
    { title: 'Class 7C Mathematics', room: 'Room 5', time: '11:15 AM - 12:00 PM', status: 'Upcoming' },
  ],
  Saturday: [
    { title: 'Class 8A Mathematics', room: 'Room 12', time: '8:00 AM - 8:45 AM', status: 'Ongoing' },
    { title: 'Class 9B Mathematics', room: 'Room 8', time: '10:30 AM - 11:15 AM', status: 'Upcoming' },
  ],
} as const;

export default function StaffTimetable() {
  const navigation = useNavigation<any>();
  const [activeDay, setActiveDay] = useState<DayItem['key']>('Monday');

  const periods = useMemo(() => TIMETABLE[activeDay] as readonly Period[], [activeDay]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>My Timetable</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayScroller}>
          {DAYS.map(day => {
            const active = activeDay === day.key;
            return (
              <TouchableOpacity key={day.key} style={[styles.dayPill, active ? styles.dayPillActive : styles.dayPillInactive]} activeOpacity={0.9} onPress={() => setActiveDay(day.key)}>
                <Text style={[styles.dayLabel, active ? styles.dayLabelActive : styles.dayLabelInactive]}>{day.label}</Text>
                <Text style={[styles.dayDate, active ? styles.dayLabelActive : styles.dayLabelInactive]}>{day.date}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {periods.map((p, idx) => {
          const ongoing = p.status === 'Ongoing';
          return (
            <View key={`${activeDay}-${idx}`} style={styles.periodCard}>
              <View style={[styles.leftBar, { backgroundColor: ongoing ? '#4A90D9' : '#6B7280' }]} />
              <View style={styles.periodBody}>
                <Text style={styles.periodTitle}>{p.title}</Text>
                <Text style={styles.periodRoom}>{p.room}</Text>
                <Text style={styles.periodTime}>{p.time}</Text>
              </View>
              <View style={[styles.statusPill, ongoing ? styles.statusPillOngoing : styles.statusPillUpcoming]}>
                <Text style={[styles.statusText, ongoing ? styles.statusTextOngoing : styles.statusTextUpcoming]}>{p.status}</Text>
              </View>
            </View>
          );
        })}
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

  dayScroller: { paddingBottom: 10, gap: 10 },
  dayPill: { width: 52, height: 64, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  dayPillActive: { backgroundColor: '#4A90D9' },
  dayPillInactive: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' },
  dayLabel: { fontSize: 11, fontWeight: '700' },
  dayDate: { marginTop: 2, fontSize: 18, fontWeight: '800' },
  dayLabelActive: { color: '#FFFFFF' },
  dayLabelInactive: { color: '#6B7280' },

  periodCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  leftBar: { width: 4, alignSelf: 'stretch', borderRadius: 4 },
  periodBody: { flex: 1, paddingLeft: 12 },
  periodTitle: { fontSize: 15, fontWeight: '700', color: '#111827' },
  periodRoom: { marginTop: 4, fontSize: 12, color: '#6B7280' },
  periodTime: { marginTop: 2, fontSize: 12, color: '#6B7280' },
  statusPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  statusPillOngoing: { backgroundColor: '#EAF3FB' },
  statusPillUpcoming: { backgroundColor: '#F9FAFB' },
  statusText: { fontSize: 11, fontWeight: '800' },
  statusTextOngoing: { color: '#4A90D9' },
  statusTextUpcoming: { color: '#6B7280' },
});

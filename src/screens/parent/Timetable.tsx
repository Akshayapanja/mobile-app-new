// ✅ Converted from React Web → React Native

import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { parentService } from '../../services';

type Status = 'Ongoing' | 'Done' | 'Upcoming';
type Period = {
  id: string;
  subject: string;
  teacher?: string;
  time?: string;
  room?: string;
  status?: Status;
  barColor?: string;
  isBreak?: boolean;
};

const DAYS = [
  { key: 'Mon', label: 'Mon', date: 14 },
  { key: 'Tue', label: 'Tue', date: 15 },
  { key: 'Wed', label: 'Wed', date: 16 },
  { key: 'Thu', label: 'Thu', date: 17 },
  { key: 'Fri', label: 'Fri', date: 18 },
  { key: 'Sat', label: 'Sat', date: 19 },
] as const;

function pillStyle(status: Status) {
  if (status === 'Ongoing') return { bg: '#EAF3FB', fg: '#4A90D9' };
  if (status === 'Done') return { bg: '#F0FDF4', fg: '#5CB85C' };
  return { bg: '#F9FAFB', fg: '#6B7280' };
}

export default function Timetable() {
  const navigation = useNavigation<any>();
  const [activeDay, setActiveDay] = useState<(typeof DAYS)[number]['key']>('Mon');

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    try {
      const response = await parentService.getTimetable('section1');
      if ((response as any)?.data || response) {
        console.log('Timetable loaded from API');
      }
    } catch (err: any) {
      console.log('API not connected, using mock data:', err?.message ?? String(err));
    }
  };

  const periodsByDay = useMemo<Record<string, Period[]>>(
    () => ({
      Mon: [
        { id: 'm1', subject: 'Mathematics', teacher: 'Mrs. Lakshmi Subramaniam', time: '8:00-8:45', room: 'Room 12', status: 'Ongoing', barColor: '#4A90D9' },
        { id: 'm2', subject: 'Science', teacher: 'Mr. Rajesh Venkataraman', time: '8:45-9:30', room: 'Lab 2', status: 'Done', barColor: '#5CB85C' },
        { id: 'm3', subject: 'English', teacher: 'Ms. Priya Menon', time: '9:30-10:15', room: 'Room 8', status: 'Done', barColor: '#F5A623' },
        { id: 'm4', subject: 'Break Time', isBreak: true },
        { id: 'm5', subject: 'Hindi', teacher: 'Mr. Ashok Sharma', time: '10:30-11:15', room: 'Room 5', status: 'Upcoming', barColor: '#4A90D9' },
        { id: 'm6', subject: 'Social Studies', teacher: 'Mrs. Kavitha Nair', time: '11:15-12:00', room: 'Room 3', status: 'Upcoming', barColor: '#E85D5D' },
      ],
      Tue: [
        { id: 't1', subject: 'Science', teacher: 'Mr. Rajesh Venkataraman', time: '8:00-8:45', room: 'Lab 2', status: 'Ongoing', barColor: '#4A90D9' },
        { id: 't2', subject: 'Mathematics', teacher: 'Mrs. Lakshmi Subramaniam', time: '8:45-9:30', room: 'Room 12', status: 'Done', barColor: '#5CB85C' },
        { id: 't3', subject: 'Social Studies', teacher: 'Mrs. Kavitha Nair', time: '9:30-10:15', room: 'Room 3', status: 'Done', barColor: '#F5A623' },
        { id: 't4', subject: 'Break Time', isBreak: true },
        { id: 't5', subject: 'English', teacher: 'Ms. Priya Menon', time: '10:30-11:15', room: 'Room 8', status: 'Upcoming', barColor: '#4A90D9' },
        { id: 't6', subject: 'Mathematics', teacher: 'Mrs. Lakshmi Subramaniam', time: '11:15-12:00', room: 'Room 12', status: 'Upcoming', barColor: '#4A90D9' },
      ],
      Wed: [
        { id: 'w1', subject: 'Hindi', teacher: 'Mr. Ashok Sharma', time: '8:00-8:45', room: 'Room 5', status: 'Ongoing', barColor: '#4A90D9' },
        { id: 'w2', subject: 'Mathematics', teacher: 'Mrs. Lakshmi Subramaniam', time: '8:45-9:30', room: 'Room 12', status: 'Done', barColor: '#5CB85C' },
        { id: 'w3', subject: 'Science', teacher: 'Mr. Rajesh Venkataraman', time: '9:30-10:15', room: 'Lab 2', status: 'Done', barColor: '#F5A623' },
        { id: 'w4', subject: 'Break Time', isBreak: true },
        { id: 'w5', subject: 'Social Studies', teacher: 'Mrs. Kavitha Nair', time: '10:30-11:15', room: 'Room 3', status: 'Upcoming', barColor: '#4A90D9' },
        { id: 'w6', subject: 'English', teacher: 'Ms. Priya Menon', time: '11:15-12:00', room: 'Room 8', status: 'Upcoming', barColor: '#4A90D9' },
      ],
      Thu: [
        { id: 'th1', subject: 'English', teacher: 'Ms. Priya Menon', time: '8:00-8:45', room: 'Room 8', status: 'Ongoing', barColor: '#4A90D9' },
        { id: 'th2', subject: 'Hindi', teacher: 'Mr. Ashok Sharma', time: '8:45-9:30', room: 'Room 5', status: 'Done', barColor: '#5CB85C' },
        { id: 'th3', subject: 'Mathematics', teacher: 'Mrs. Lakshmi Subramaniam', time: '9:30-10:15', room: 'Room 12', status: 'Done', barColor: '#F5A623' },
        { id: 'th4', subject: 'Break Time', isBreak: true },
        { id: 'th5', subject: 'Science', teacher: 'Mr. Rajesh Venkataraman', time: '10:30-11:15', room: 'Lab 2', status: 'Upcoming', barColor: '#4A90D9' },
        { id: 'th6', subject: 'Hindi', teacher: 'Mr. Ashok Sharma', time: '11:15-12:00', room: 'Room 5', status: 'Upcoming', barColor: '#4A90D9' },
      ],
      Fri: [
        { id: 'f1', subject: 'Social Studies', teacher: 'Mrs. Kavitha Nair', time: '8:00-8:45', room: 'Room 3', status: 'Ongoing', barColor: '#4A90D9' },
        { id: 'f2', subject: 'English', teacher: 'Ms. Priya Menon', time: '8:45-9:30', room: 'Room 8', status: 'Done', barColor: '#5CB85C' },
        { id: 'f3', subject: 'Hindi', teacher: 'Mr. Ashok Sharma', time: '9:30-10:15', room: 'Room 5', status: 'Done', barColor: '#F5A623' },
        { id: 'f4', subject: 'Break Time', isBreak: true },
        { id: 'f5', subject: 'Mathematics', teacher: 'Mrs. Lakshmi Subramaniam', time: '10:30-11:15', room: 'Room 12', status: 'Upcoming', barColor: '#4A90D9' },
        { id: 'f6', subject: 'Science', teacher: 'Mr. Rajesh Venkataraman', time: '11:15-12:00', room: 'Lab 2', status: 'Upcoming', barColor: '#4A90D9' },
      ],
      Sat: [
        { id: 's1', subject: 'Mathematics', teacher: 'Mrs. Lakshmi Subramaniam', time: '8:00-8:45', room: 'Room 12', status: 'Ongoing', barColor: '#4A90D9' },
        { id: 's2', subject: 'Social Studies', teacher: 'Mrs. Kavitha Nair', time: '8:45-9:30', room: 'Room 3', status: 'Done', barColor: '#5CB85C' },
        { id: 's3', subject: 'Science', teacher: 'Mr. Rajesh Venkataraman', time: '9:30-10:15', room: 'Lab 2', status: 'Done', barColor: '#F5A623' },
        { id: 's4', subject: 'Break Time', isBreak: true },
        { id: 's5', subject: 'English', teacher: 'Ms. Priya Menon', time: '10:30-11:15', room: 'Room 8', status: 'Upcoming', barColor: '#4A90D9' },
        { id: 's6', subject: 'Hindi', teacher: 'Mr. Ashok Sharma', time: '11:15-12:00', room: 'Room 5', status: 'Upcoming', barColor: '#4A90D9' },
      ],
    }),
    []
  );

  const periods = periodsByDay[activeDay] ?? periodsByDay.Mon;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.topNavTitle}>Timetable</Text>

          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.childRow}>
          <View style={styles.childAvatar}>
            <Text style={styles.childInitials}>AK</Text>
          </View>
          <View style={styles.childInfo}>
            <Text style={styles.childName}>Arjun Kumar</Text>
            <Text style={styles.childClass}>Class 8 - Section A</Text>
          </View>
          <View style={styles.termPill}>
            <Text style={styles.termPillText}>Term 2</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayPillsRow}>
          {DAYS.map(d => {
            const active = activeDay === d.key;
            return (
              <TouchableOpacity
                key={d.key}
                activeOpacity={0.9}
                onPress={() => setActiveDay(d.key)}
                style={[styles.dayPill, active ? styles.dayPillActive : styles.dayPillInactive]}
              >
                <Text style={[styles.dayName, active ? styles.dayTextActive : styles.dayTextInactive]}>{d.label}</Text>
                <Text style={[styles.dayDate, active ? styles.dayTextActive : styles.dayTextInactive]}>{d.date}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.periodList}>
          {periods.map(p => {
            if (p.isBreak) {
              return (
                <View key={p.id} style={styles.breakCard}>
                  <Text style={styles.breakEmoji}>☕</Text>
                  <Text style={styles.breakTitle}>Break Time</Text>
                </View>
              );
            }

            const s = pillStyle(p.status!);
            return (
              <View key={p.id} style={styles.periodCard}>
                <View style={[styles.periodBar, { backgroundColor: p.barColor }]} />

                <View style={styles.periodBody}>
                  <View style={styles.periodTopRow}>
                    <Text style={styles.subject}>{p.subject}</Text>
                    <View style={[styles.statusPill, { backgroundColor: s.bg }]}>
                      <Text style={[styles.statusText, { color: s.fg }]}>{p.status}</Text>
                    </View>
                  </View>

                  <Text style={styles.teacher}>{p.teacher}</Text>
                  <Text style={styles.meta}>
                    {p.time} | {p.room}
                  </Text>
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
    marginBottom: 14,
  },
  childAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  childInitials: { fontSize: 14, fontWeight: '800', color: '#4A90D9' },
  childInfo: { flex: 1 },
  childName: { fontSize: 14, fontWeight: '800', color: '#1F2937', marginBottom: 2 },
  childClass: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  termPill: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  termPillText: { fontSize: 11, fontWeight: '800', color: '#4A90D9' },

  dayPillsRow: { gap: 10, paddingBottom: 4, paddingRight: 4, marginBottom: 14 },
  dayPill: { width: 52, height: 64, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 6 },
  dayPillActive: { backgroundColor: '#4A90D9' },
  dayPillInactive: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' },
  dayName: { fontSize: 11, fontWeight: '800' },
  dayDate: { fontSize: 18, fontWeight: '900' },
  dayTextActive: { color: '#FFFFFF' },
  dayTextInactive: { color: '#6B7280' },

  periodList: { gap: 10 },
  periodCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14, flexDirection: 'row', gap: 12 },
  periodBar: { width: 4, borderRadius: 999 },
  periodBody: { flex: 1 },
  periodTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, gap: 10 },
  subject: { fontSize: 15, fontWeight: '800', color: '#1F2937', flex: 1 },
  statusPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  statusText: { fontSize: 11, fontWeight: '800' },
  teacher: { fontSize: 12, color: '#9CA3AF', fontWeight: '600', marginBottom: 2 },
  meta: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },

  breakCard: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  breakEmoji: { fontSize: 20 },
  breakTitle: { fontSize: 14, fontWeight: '800', color: '#6B7280' },
});

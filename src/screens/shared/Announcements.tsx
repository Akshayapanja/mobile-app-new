import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser } from '../../lib/session';

type Role = 'parent' | 'staff';
type Announcement = {
  id: string;
  title: string;
  category: string;
  message: string;
  time: string;
  author: string;
  barColor: string;
  pillBg: string;
  filterKey: 'Academic' | 'Events' | 'General' | 'Finance' | 'Exams';
};

const PARENT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'p1',
    title: 'Annual Sports Day 2025',
    category: 'Academic',
    filterKey: 'Academic',
    message: 'All students must report to ground\nby 8AM on April 25th.',
    time: '2 hours ago',
    author: 'School Admin',
    barColor: '#4A90D9',
    pillBg: '#EAF3FB',
  },
  {
    id: 'p2',
    title: 'Holiday Notice — Ram Navami',
    category: 'Events',
    filterKey: 'Events',
    message: 'School closed April 17th',
    time: 'Yesterday',
    author: 'School Admin',
    barColor: '#5CB85C',
    pillBg: '#F0FDF4',
  },
  {
    id: 'p3',
    title: 'Fee Payment Last Date Reminder',
    category: 'General',
    filterKey: 'General',
    message: 'Last date April 30th',
    time: '2 days ago',
    author: 'Accounts Dept',
    barColor: '#F5A623',
    pillBg: '#FFF8E7',
  },
  {
    id: 'p4',
    title: 'Parent Teacher Meeting April 20',
    category: 'Academic',
    filterKey: 'Academic',
    message: 'PTM April 20th 10AM to 1PM',
    time: '3 days ago',
    author: 'Class Teacher',
    barColor: '#4A90D9',
    pillBg: '#EAF3FB',
  },
  {
    id: 'p5',
    title: 'Exam Schedule Released',
    category: 'Academic',
    filterKey: 'Academic',
    message: 'Final exams begin May 5th',
    time: '4 days ago',
    author: 'Exam Cell',
    barColor: '#E85D5D',
    pillBg: '#FFF0F0',
  },
];

const STAFF_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 's1',
    title: 'Staff Meeting — April 22',
    category: 'Academic',
    filterKey: 'Academic',
    message: 'All staff monthly meeting\nat 3PM in conference room.',
    time: 'Today',
    author: 'Principal',
    barColor: '#4A90D9',
    pillBg: '#EAF3FB',
  },
  {
    id: 's2',
    title: 'Salary Credited for March',
    category: 'Finance',
    filterKey: 'Finance',
    message: 'March salary credited successfully',
    time: 'Yesterday',
    author: 'Accounts Dept',
    barColor: '#5CB85C',
    pillBg: '#F0FDF4',
  },
  {
    id: 's3',
    title: 'Annual Day Preparation',
    category: 'Events',
    filterKey: 'Events',
    message: 'Teachers prepare students\nfor annual day May 15th',
    time: '2 days ago',
    author: 'Vice Principal',
    barColor: '#F5A623',
    pillBg: '#FFF8E7',
  },
  {
    id: 's4',
    title: 'New Academic Calendar Released',
    category: 'Academic',
    filterKey: 'Academic',
    message: '2025-26 calendar finalized',
    time: '3 days ago',
    author: 'Admin Office',
    barColor: '#4A90D9',
    pillBg: '#EAF3FB',
  },
  {
    id: 's5',
    title: 'Exam Duty Roster Published',
    category: 'Exams',
    filterKey: 'Exams',
    message: 'Exam duty roster published',
    time: '4 days ago',
    author: 'Exam Cell',
    barColor: '#E85D5D',
    pillBg: '#FFF0F0',
  },
];

export default function Announcements() {
  const navigation = useNavigation<any>();
  const [role, setRole] = useState<Role>('parent');
  const [filter, setFilter] = useState<'All' | 'Academic' | 'Events' | 'General' | 'Finance' | 'Exams'>('All');

  useEffect(() => {
    let alive = true;
    (async () => {
      const u = await getUser();
      const r = (u as any)?.role === 'staff' ? 'staff' : 'parent';
      if (alive) setRole(r);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filters = useMemo(() => {
    return role === 'parent' ? (['All', 'Academic', 'Events', 'General'] as const) : (['All', 'Academic', 'Events', 'General'] as const);
  }, [role]);

  const list = role === 'parent' ? PARENT_ANNOUNCEMENTS : STAFF_ANNOUNCEMENTS;
  const filtered = filter === 'All' ? list : list.filter(a => a.filterKey === filter);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <View style={{ width: 40 }} />
          <Text style={styles.title}>Announcements</Text>
          <TouchableOpacity
            onPress={() => {
              if (role === 'parent') navigation.navigate('ParentNotifications');
              else navigation.navigate('StaffNotifications');
            }}
            style={styles.bellBtn}
            hitSlop={10}
          >
            <Ionicons name="notifications-outline" size={22} color="#111827" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map(f => {
            const active = filter === f;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                style={[styles.filterPill, active ? styles.filterPillActive : styles.filterPillInactive]}
              >
                <Text style={[styles.filterText, active ? styles.filterTextActive : styles.filterTextInactive]}>{f}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.section}>Recent Announcements</Text>

        <View style={{ gap: 12 }}>
          {filtered.map(a => (
            <View key={a.id} style={styles.card}>
              <View style={[styles.cardBar, { backgroundColor: a.barColor }]} />
              <View style={styles.cardContent}>
                <View style={styles.cardTopRow}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {a.title}
                  </Text>
                  <View style={[styles.categoryPill, { backgroundColor: a.pillBg }]}>
                    <Text style={[styles.categoryText, { color: a.barColor }]}>{a.category}</Text>
                  </View>
                </View>
                <Text style={styles.cardMessage}>{a.message}</Text>
                <View style={styles.cardBottomRow}>
                  <Text style={styles.meta}>{a.time}</Text>
                  <Text style={styles.meta}>{a.author}</Text>
                </View>
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
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 0 },

  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center', flex: 1 },
  bellBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', right: 8, top: 8, width: 10, height: 10, borderRadius: 5, backgroundColor: '#EF4444', borderWidth: 1, borderColor: '#FFFFFF' },

  filterRow: { gap: 10, paddingVertical: 6, paddingHorizontal: 2 },
  filterPill: { borderRadius: 50, paddingVertical: 6, paddingHorizontal: 16, borderWidth: 1 },
  filterPillActive: { backgroundColor: '#4A90D9', borderColor: '#4A90D9' },
  filterPillInactive: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' },
  filterText: { fontSize: 12, fontWeight: '700' },
  filterTextActive: { color: '#FFFFFF' },
  filterTextInactive: { color: '#6B7280' },

  section: { fontSize: 15, fontWeight: '700', color: '#111827', marginTop: 10, marginBottom: 12 },

  card: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14 },
  cardBar: { width: 4, borderRadius: 2, marginRight: 12 },
  cardContent: { flex: 1 },
  cardTopRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
  cardTitle: { flex: 1, fontSize: 14, fontWeight: '700', color: '#1F2937' },
  categoryPill: { borderRadius: 50, paddingHorizontal: 10, paddingVertical: 5 },
  categoryText: { fontSize: 12, fontWeight: '700' },
  cardMessage: { color: '#6B7280', fontSize: 12, marginTop: 6, fontWeight: '600', lineHeight: 16 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  meta: { color: '#6B7280', fontSize: 11, fontWeight: '600' },
});

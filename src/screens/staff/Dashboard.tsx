// ✅ Converted from React Web → React Native

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUser } from '../../lib/session';
import { USERS } from '../../lib/mockData';

type Nav = {
  navigate: (
    screen:
      | 'StaffNotifications'
      | 'StaffAttendanceTab'
      | 'StaffCreateHomework'
      | 'StaffHomeworkBot'
      | 'StaffStudentList'
      | 'StaffMarksEntry'
      | 'StaffTimetable'
  ) => void;
};

type Accent = 'blue' | 'gray';

export default function StaffDashboard() {
  const navigation = useNavigation<Nav>();

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await getUser();
      if (!mounted) return;

      if (!u || u.role !== 'staff') {
        Alert.alert('Error', 'Please login again.');
        return;
      }

      const fallback = USERS.find(x => x.phone === u.phone);
      setName(u.name || fallback?.name || '');
      setDesignation(u.designation || fallback?.designation || '');
      setSubject(u.subject || fallback?.subject || 'Mathematics');
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const firstName = useMemo(() => {
    const n = name.trim();
    if (!n) return '';
    const parts = n.split(' ').filter(Boolean);
    return parts[0] || n;
  }, [name]);

  const initials = useMemo(() => {
    const parts = name.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
    if (parts.length === 0) return 'ST';
    const first = parts[0]?.[0] ?? '';
    const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : parts[0]?.[1]) ?? '';
    return (first + last).toUpperCase() || 'ST';
  }, [name]);

  const statsRow = useMemo(
    () => [
      { value: '5', label: 'Classes' },
      { value: '180', label: 'Students' },
      { value: '8A', label: 'My Class' },
    ],
    []
  );

  const summary = useMemo(
    () => [
      { icon: '📚', label: 'My Classes', value: '5', bg: '#EAF3FB' },
      { icon: '👥', label: 'Students', value: '180', bg: '#F0FDF4' },
      { icon: '📝', label: 'Pending HW', value: '3', bg: '#FFF8E7' },
      { icon: '✅', label: 'Marked Today', value: '2', bg: '#FFF0F0' },
    ],
    []
  );

  const periods = useMemo(
    () => [
      {
        title: `${subject} — Class 8A`,
        time: '8:00 AM - 8:45 AM | Room 12',
        status: 'Ongoing',
        accent: 'blue' as Accent,
      },
      {
        title: `${subject} — Class 9B`,
        time: '10:30 AM - 11:15 AM | Room 8',
        status: 'Upcoming',
        accent: 'gray' as Accent,
      },
      {
        title: `${subject} — Class 7C`,
        time: '11:15 AM - 12:00 PM | Room 5',
        status: 'Upcoming',
        accent: 'gray' as Accent,
      },
    ],
    [subject]
  );

  const dateLabel = useMemo(() => {
    const d = new Date();
    const day = d.toLocaleDateString('en-US', { weekday: 'short' });
    const mon = d.toLocaleDateString('en-US', { month: 'short' });
    const dd = d.getDate();
    return `${day}, ${mon} ${dd}`;
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.helloName}>{firstName || name || 'Staff'} 👋</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('StaffNotifications')}
            style={styles.bellBtn}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="#4A90D9" />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.teacherCard}>
          <View style={styles.teacherTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>

            <View style={styles.teacherMeta}>
              <Text style={styles.teacherName} numberOfLines={1}>
                {name || 'Staff Member'}
              </Text>
              <Text style={styles.teacherDesignation} numberOfLines={1}>
                {designation || 'Teacher'}
              </Text>
              <View style={styles.classPill}>
                <Text style={styles.classPillText}>Class Teacher — Class 8A</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            {statsRow.map(s => (
              <View key={s.label} style={styles.statCell}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.teachingTodayRow}>
            <Text style={styles.teachingTodayLabel}>Teaching Today:</Text>
            <View style={styles.subjectPills}>
              {['Mathematics', 'Science', 'English'].map(s => (
                <View key={s} style={styles.subjectPill}>
                  <Text style={styles.subjectPillText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Today Summary</Text>
        <View style={styles.summaryGrid}>
          {summary.map(s => (
            <View key={s.label} style={[styles.summaryCard, { backgroundColor: s.bg }]}>
              <Text style={styles.summaryIcon}>{s.icon}</Text>
              <Text style={styles.summaryValue}>{s.value}</Text>
              <Text style={styles.summaryLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Today's Classes</Text>
          <Text style={styles.dateSub}>{dateLabel}</Text>
        </View>

        <View style={styles.periodList}>
          {periods.map((p, idx) => {
            const isOngoing = p.status === 'Ongoing';
            return (
              <View key={`${p.title}-${idx}`} style={styles.periodCard}>
                <View style={[styles.periodBar, p.accent === 'blue' ? styles.barBlue : styles.barGray]} />
                <View style={styles.periodBody}>
                  <View style={styles.periodTopRow}>
                    <Text style={styles.periodTitle} numberOfLines={1}>
                      {p.title}
                    </Text>
                    <View
                      style={[
                        styles.statusPill,
                        isOngoing ? styles.pillOngoing : styles.pillUpcoming,
                      ]}
                    >
                      <Text style={[styles.statusText, isOngoing ? styles.textOngoing : styles.textUpcoming]}>
                        {p.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.periodTime}>{p.time}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionsGrid}>
          <View style={styles.actionRow}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('StaffAttendanceTab')}
              style={[styles.actionCard, styles.bgBlue]}
            >
              <Text style={styles.actionIcon}>📋</Text>
              <Text style={styles.actionTitle}>Mark Attendance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('StaffCreateHomework')}
              style={[styles.actionCard, styles.bgGreen]}
            >
              <Text style={styles.actionIcon}>📝</Text>
              <Text style={styles.actionTitle}>Create Homework</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('StaffHomeworkBot')}
              style={[styles.actionCard, styles.bgAmber]}
            >
              <Text style={styles.actionIcon}>🤖</Text>
              <Text style={styles.actionTitle}>AI Homework Bot</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('StaffStudentList')}
              style={[styles.actionCard, styles.bgBlue]}
            >
              <Text style={styles.actionIcon}>👥</Text>
              <Text style={styles.actionTitle}>Students</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('StaffMarksEntry')}
              style={[styles.actionCard, styles.bgPink]}
            >
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionTitle}>Marks Entry</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('StaffTimetable')}
              style={[styles.actionCard, styles.bgBlue]}
            >
              <Text style={styles.actionIcon}>🗓</Text>
              <Text style={styles.actionTitle}>My Timetable</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  hello: {
    fontSize: 13,
    color: '#6B7280',
  },
  helloName: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF3FB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E85D5D',
  },
  teacherCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  teacherTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EAF3FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4A90D9',
  },
  teacherMeta: {
    flex: 1,
    minWidth: 0,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  teacherDesignation: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7280',
  },
  classPill: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#F0FDF4',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  classPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCell: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4A90D9',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 11,
    color: '#6B7280',
  },
  teachingTodayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  teachingTodayLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 4,
  },
  subjectPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectPill: {
    backgroundColor: '#EAF3FB',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  subjectPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A90D9',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryCard: {
    width: '48.5%',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  summaryIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 11,
    color: '#6B7280',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 10,
  },
  dateSub: {
    fontSize: 11,
    color: '#6B7280',
  },
  periodList: {
    marginBottom: 16,
  },
  periodCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 10,
  },
  periodBar: {
    width: 4,
  },
  barBlue: {
    backgroundColor: '#4A90D9',
  },
  barGray: {
    backgroundColor: '#9CA3AF',
  },
  periodBody: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  periodTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  periodTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillOngoing: {
    backgroundColor: '#EAF3FB',
  },
  pillUpcoming: {
    backgroundColor: '#F3F4F6',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  textOngoing: {
    color: '#4A90D9',
  },
  textUpcoming: {
    color: '#6B7280',
  },
  periodTime: {
    marginTop: 6,
    fontSize: 11,
    color: '#6B7280',
  },
  actionsGrid: {
    marginTop: 6,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionCard: {
    width: '32%',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  actionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  bgBlue: {
    backgroundColor: '#EAF3FB',
  },
  bgGreen: {
    backgroundColor: '#F0FDF4',
  },
  bgAmber: {
    backgroundColor: '#FFF8E7',
  },
  bgPink: {
    backgroundColor: '#FFF0F0',
  },
});

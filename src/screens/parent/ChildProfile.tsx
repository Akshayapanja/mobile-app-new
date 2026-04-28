// ✅ Converted from React Web → React Native

import React, { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CHILDREN } from '../../lib/mockData';

type RouteParams = { childId: string | number };

function normalizeChildId(input: unknown): '1' | '2' | '' {
  if (input === null || input === undefined) return '';
  const s = String(input);
  if (s === '1' || s === 'c1') return '1';
  if (s === '2' || s === 'c2') return '2';
  return '';
}

const CHILD_BY_ID = {
  '1': {
    id: '1',
    name: 'Arjun Kumar',
    class: '8',
    section: 'A',
    rollNo: '24',
    regNo: 'AK2024',
    initials: 'AK',
    avatarBg: '#EAF3FB',
    avatarColor: '#4A90D9',
    attendance: 87,
    rank: '5th',
    homeworkDone: '12/14',
  },
  '2': {
    id: '2',
    name: 'Sneha Sharma',
    class: '5',
    section: 'B',
    rollNo: '11',
    regNo: 'SS2024',
    initials: 'SS',
    avatarBg: '#FFF3E0',
    avatarColor: '#F5A623',
    attendance: 92,
    rank: '3rd',
    homeworkDone: '9/10',
  },
} as const;

export default function ChildProfile() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { childId } = (route.params || {}) as RouteParams;

  const normalizedId = normalizeChildId(childId);
  const child = (normalizedId ? CHILD_BY_ID[normalizedId] : null) || CHILDREN[String(childId ?? '')] || null;

  const stats = useMemo(() => {
    if (!child) return [];
    return [
      { icon: '📊', label: 'Attendance', value: `${child.attendance}%`, bg: '#EAF3FB', valueColor: '#1F2937' },
      { icon: '🏆', label: 'Class Rank', value: child.rank, bg: '#FFF3E0', valueColor: '#1F2937' },
      { icon: '📚', label: 'Homework Done', value: child.homeworkDone, bg: '#F0FDF4', valueColor: '#1F2937' },
      { icon: '💰', label: 'Fee Status', value: 'Paid', bg: '#FFF8E7', valueColor: '#5CB85C' },
    ];
  }, [child]);

  const actions = useMemo(
    () => [
      { icon: '📅', label: 'Attendance', subtitle: 'View attendance', screen: 'ParentAttendance' },
      { icon: '🗓', label: 'Timetable', subtitle: 'Class schedule', screen: 'ParentTimetable' },
      { icon: '📝', label: 'Homework', subtitle: 'Assignments', screen: 'ParentHomework' },
      { icon: '🏅', label: 'Results', subtitle: 'Report cards', screen: 'ParentResults' },
      { icon: '💳', label: 'Fee Details', subtitle: 'Payments', screen: 'ParentFees' },
      { icon: '💬', label: 'Messages', subtitle: 'Chat', screen: 'ParentMessages' },
      { icon: '👨‍🏫', label: 'Faculty', subtitle: 'Teachers', screen: 'ParentFaculty' },
      { icon: '🚌', label: 'Bus Tracking', subtitle: 'Live location', screen: 'ParentBusTracking' },
    ],
    []
  );

  if (!child) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.errorWrap}>
          <Text style={styles.errorTitle}>Child not found</Text>
          <Text style={styles.errorSubtitle}>Please go back and select a child again.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.errorButton}>
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.topNavTitle}>Child Profile</Text>

          <TouchableOpacity activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="ellipsis-vertical" size={18} color="#111827" />
          </TouchableOpacity>
        </View>

        <View style={styles.childCard}>
          <View style={styles.childCardRow}>
            <View style={[styles.avatar, { backgroundColor: '#EAF3FB' }]}>
              <Text style={styles.avatarInitials}>{child.initials}</Text>
            </View>

            <View style={styles.childCardRight}>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.childMeta}>Class {child.class} - Section {child.section}</Text>
              <Text style={styles.childMetaSmall}>
                Roll No. {child.rollNo} | Reg. No. {child.regNo}
              </Text>
              <View style={styles.activePill}>
                <Text style={styles.activePillText}>🟢 Active Student</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map(s => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: s.bg }]}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={[styles.statValue, { color: s.valueColor }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionsGrid}>
          {actions.map(a => (
            <TouchableOpacity
              key={a.label}
              activeOpacity={0.9}
              style={styles.actionCard}
              onPress={() => navigation.navigate(a.screen)}
            >
              <Text style={styles.actionIcon}>{a.icon}</Text>
              <Text style={styles.actionLabel}>{a.label}</Text>
              <Text style={styles.actionSubtitle}>{a.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.applyLeaveBtn}
          onPress={() => navigation.navigate('ParentApplyLeave')}
        >
          <Text style={styles.applyLeaveText}>Apply Leave for {child.name}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 80,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  topNavBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topNavTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    flex: 1,
  },
  childCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  childCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: '800',
    color: '#4A90D9',
  },
  childCardRight: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 2,
  },
  childMeta: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 1,
  },
  childMetaSmall: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activePill: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: '#EAF7EF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  activePillText: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 18,
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 14,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  actionCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 3,
  },
  actionSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  applyLeaveBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyLeaveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorButton: {
    backgroundColor: '#4A90D9',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  errorButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});

// ✅ Converted from React Web → React Native

import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getUser } from '../../lib/session';
import { type Child } from '../../lib/mockData';

type ChildCard = Child & { navChildId: string };

const CHILDREN_BY_PHONE: Record<string, Array<Omit<Child, 'id'> & { id: string }>> = {
  '9800000001': [
    {
      id: '1',
      name: 'Arjun Kumar',
      initials: 'AK',
      class: '8',
      section: 'A',
      rollNo: '24',
      regNo: 'AK2024',
      attendance: 87,
      rank: '5th',
      homeworkDone: '12/14',
      avatarBg: '#EAF3FB',
      avatarColor: '#4A90D9',
    },
  ],
  '9800000002': [
    {
      id: '2',
      name: 'Sneha Sharma',
      initials: 'SS',
      class: '5',
      section: 'B',
      rollNo: '11',
      regNo: 'SS2024',
      attendance: 92,
      rank: '3rd',
      homeworkDone: '9/10',
      avatarBg: '#FFF3E0',
      avatarColor: '#F5A623',
    },
  ],
};

export default function Children() {
  const navigation = useNavigation<any>();
  const parentNav = (navigation as any).getParent?.();
  const [loading, setLoading] = useState(true);
  const [kids, setKids] = useState<ChildCard[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const u = await getUser();
        const phone = (u as any)?.phone || (u as any)?.phoneNumber || (u as any)?.mobile || '';
        const list = (CHILDREN_BY_PHONE[String(phone)] || []).map((c, idx) => ({
          ...(c as any),
          // Always: first child -> '1', second child -> '2'
          navChildId: idx === 0 ? '1' : '2',
        })) as ChildCard[];

        if (mounted) setKids(list);
      } catch (e) {
        Alert.alert('Error', 'Failed to load children.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const enrolledLabel = useMemo(() => {
    const n = kids.length;
    return `${n} ${n === 1 ? 'child' : 'children'} enrolled`;
  }, [kids.length]);

  const notificationBadgeVisible = true;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.headerSideSpacer} />

          <Text style={styles.headerTitle}>My Children</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('ParentNotifications')}
            activeOpacity={0.85}
            style={styles.bellButton}
          >
            <Ionicons name="notifications-outline" size={20} color="#4A90D9" />
            {notificationBadgeVisible ? <View style={styles.bellBadge} /> : null}
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>{enrolledLabel}</Text>

        <View style={styles.cardsWrap}>
          {kids.map(child => (
            <TouchableOpacity
              key={child.id}
              activeOpacity={0.9}
              style={styles.card}
              onPress={() => (parentNav || navigation).navigate('ParentChildProfile', { childId: child.navChildId })}
            >
              <View style={styles.cardTopRow}>
                <View style={[styles.avatar, { backgroundColor: child.avatarBg }]}>
                  <Text style={[styles.avatarText, { color: child.avatarColor }]}>{child.initials}</Text>
                </View>

                <View style={styles.cardTopMid}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childMeta}>Class {child.class} - Section {child.section}</Text>
                  <Text style={styles.childMetaSmall}>Roll No. {child.rollNo}</Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </View>

              <View style={styles.divider} />

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: '#5CB85C' }]}>{child.attendance}%</Text>
                  <Text style={styles.statLabel}>Attendance</Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: '#4A90D9' }]}>{child.rank}</Text>
                  <Text style={styles.statLabel}>Class Rank</Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: '#F5A623' }]}>{child.homeworkDone}</Text>
                  <Text style={styles.statLabel}>Homework</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.cardBottomRow}>
                <View style={styles.activePill}>
                  <Text style={styles.activePillText}>🟢 Active Student</Text>
                </View>

                <TouchableOpacity
                  onPress={() => (parentNav || navigation).navigate('ParentChildProfile', { childId: child.navChildId })}
                  activeOpacity={0.85}
                >
                  <Text style={styles.viewProfileText}>View Full Profile →</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          {!loading && kids.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No children found</Text>
              <Text style={styles.emptySubtitle}>Please log in again or try later.</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={18} color="#4A90D9" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Tap any child to view{'\n'}full profile, attendance,{'\n'}timetable and more.
          </Text>
        </View>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  headerSideSpacer: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    flex: 1,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  cardsWrap: {
    gap: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
  },
  cardTopMid: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '700',
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
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 14,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activePill: {
    backgroundColor: '#EAF7EF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  activePillText: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '600',
  },
  viewProfileText: {
    color: '#4A90D9',
    fontSize: 12,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#EAF3FB',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoIcon: {
    marginTop: 1,
  },
  infoText: {
    flex: 1,
    color: '#4A90D9',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  emptyState: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
});

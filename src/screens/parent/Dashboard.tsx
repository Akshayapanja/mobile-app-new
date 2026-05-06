// ✅ Converted from React Web → React Native

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser } from '../../lib/session';
// TODO: Remove when backend connected
import { CHILDREN, USERS } from '../../lib/mockData';
import { parentService } from '../../services';
import { SkeletonCard } from '../../components/common';

type Nav = {
  navigate: (
    screen:
      | 'ParentNotifications'
      | 'ParentChildren'
      | 'ParentChildProfile'
      | 'ParentFees'
      | 'ParentApplyLeave'
      | 'ParentFaculty'
      | 'ParentBusTracking'
      | 'ParentAnnouncements'
      | 'ParentCalendar'
    ,
    params?: any
  ) => void;
  getParent?: () => any;
};

type ChildCard = {
  id: string;
  name: string;
  initials: string;
  class: string;
  section: string;
  attendance: number;
};

type Accent = 'blue' | 'amber';

export default function ParentDashboard() {
  const navigation = useNavigation<Nav>();
  const parentNav = navigation.getParent?.();

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [children, setChildren] = useState<ChildCard[]>([]);

  const CHILDREN_BY_PHONE: Record<string, ChildCard[]> = {
    '9800000001': [
      { id: '1', name: 'Arjun Kumar', initials: 'AK', class: '8', section: 'A', attendance: 87 },
    ],
    '9800000002': [
      { id: '2', name: 'Sneha Sharma', initials: 'SS', class: '5', section: 'B', attendance: 92 },
    ],
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await getUser();
      if (!mounted) return;

      if (!u || u.role !== 'parent') {
        return;
      }

      setParentName(u.name);
      setParentPhone(u.phone);

      const phone = (u as any)?.phone || (u as any)?.phoneNumber || (u as any)?.mobile || '';
      const kids = CHILDREN_BY_PHONE[String(phone)] || [];
      setChildren(kids);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await parentService.getDashboard();
      setDashboardData((response as any)?.data || response);
    } catch (err: any) {
      // TODO: handle error
      // keep existing mock UI as fallback
    } finally {
      setLoading(false);
    }
  };

  const firstName = useMemo(() => {
    const n = String((dashboardData as any)?.parentName || (dashboardData as any)?.name || parentName).trim();
    if (!n) return '';
    return n.split(' ')[0] || n;
  }, [dashboardData, parentName]);

  const announcements = useMemo(
    () => [
      {
        id: 'a1',
        title: 'Annual Sports Day 2025',
        message: 'Sports day on April 25th. All students must wear sports uniform.',
        time: '2 hours ago',
        accent: 'blue' as Accent,
      },
      {
        id: 'a2',
        title: 'Fee Payment Reminder',
        message: 'Last date April 30th. Avoid late fees by paying early.',
        time: 'Yesterday',
        accent: 'blue' as Accent,
      },
    ],
    []
  );

  const events = useMemo(
    () => [
      { id: 'e1', title: 'Annual Sports Day', date: 'April 25, 2025', accent: 'blue' as Accent },
      { id: 'e2', title: 'Parent Teacher Meeting', date: 'April 20, 2025', accent: 'amber' as Accent },
    ],
    []
  );

  const kidsLayout = children.length === 2 ? 'two' : 'one';

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={{ padding: 16 }}>
          <SkeletonCard height={120} />
          <SkeletonCard height={80} />
          <SkeletonCard height={80} />
          <SkeletonCard height={80} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.helloName}>{firstName || parentName || 'Parent'} 👋</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => parentNav?.navigate('ParentNotifications')}
            style={styles.bellBtn}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="#4A90D9" />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>My Children</Text>
          <TouchableOpacity
            onPress={() => navigation.getParent?.()?.navigate('ParentChildren')}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAll}>See All →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.kidsWrap}>
          {children.map((c, idx) => (
            <TouchableOpacity
              key={c.id}
              activeOpacity={0.85}
              onPress={() =>
                parentNav?.navigate('ParentChildProfile', {
                  // Always: first child -> '1', second child -> '2'
                  childId: idx === 0 ? '1' : '2',
                })
              }
              style={[
                styles.childCard,
                kidsLayout === 'two' ? styles.childCardHalf : styles.childCardFull,
              ]}
            >
              <View style={styles.childInner}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{c.initials}</Text>
                </View>

                <Text style={styles.childName}>{c.name}</Text>
                <Text style={styles.childClass}>
                  Class {c.class} - {c.section}
                </Text>

                <View style={styles.divider} />

                <View style={styles.attRow}>
                  <Text style={styles.attPct}>{c.attendance}%</Text>
                  <Text style={styles.attLbl}>Attend.</Text>
                </View>

                <View style={styles.viewPill}>
                  <Text style={styles.viewPillText}>View Profile</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {children.length === 0 && (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                No children found for {parentPhone ? `+91 ${parentPhone}` : 'this account'}.
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionsGrid}>
          <View style={styles.actionRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => parentNav?.navigate('ParentFees')}
              style={[styles.actionCard, styles.actionBlue, styles.actionHalf]}
            >
              <Text style={styles.actionEmoji}>💰</Text>
              <Text style={styles.actionTitle}>Pay Fees</Text>
              <Text style={styles.actionSub}>₹4,500 due</Text>
            </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => parentNav?.navigate('ParentApplyLeave')}
              style={[styles.actionCard, styles.actionGreen, styles.actionHalf]}
            >
              <Text style={styles.actionEmoji}>📅</Text>
              <Text style={styles.actionTitle}>Apply Leave</Text>
              <Text style={styles.actionSub}>For your child</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => parentNav?.navigate('ParentFaculty')}
              style={[styles.actionCard, styles.actionGreen, styles.actionWide]}
            >
              <Text style={styles.actionEmoji}>👨‍🏫</Text>
              <Text style={styles.actionTitle}>Faculty</Text>
              <Text style={styles.actionSub}>View teachers</Text>
            </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => parentNav?.navigate('ParentBusTracking')}
              style={[styles.actionCard, styles.actionBlue, styles.actionWide]}
            >
              <Text style={styles.actionEmoji}>🚌</Text>
              <Text style={styles.actionTitle}>Bus</Text>
              <Text style={styles.actionSub}>Track bus</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Announcements</Text>
            <TouchableOpacity onPress={() => parentNav?.navigate('ParentAnnouncements')} activeOpacity={0.7}>
            <Text style={styles.seeAll}>See All →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardList}>
          {announcements.slice(0, 2).map(a => (
            <TouchableOpacity
              key={a.id}
              activeOpacity={0.85}
              onPress={() => parentNav?.navigate('ParentAnnouncements')}
              style={styles.infoCard}
            >
              <View style={[styles.accentBar, a.accent === 'amber' ? styles.accentAmber : styles.accentBlue]} />
              <View style={styles.infoCardBody}>
                <Text style={styles.infoTitle}>{a.title}</Text>
                <Text style={styles.infoMsg} numberOfLines={2}>
                  {a.message}
                </Text>
                <Text style={styles.infoTime}>{a.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Academic Calendar</Text>
            <TouchableOpacity onPress={() => parentNav?.navigate('ParentCalendar')} activeOpacity={0.7}>
            <Text style={styles.seeAll}>See All →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardList}>
          {events.slice(0, 2).map(e => (
            <TouchableOpacity
              key={e.id}
              activeOpacity={0.85}
              onPress={() => parentNav?.navigate('ParentCalendar')}
              style={styles.infoCard}
            >
              <View style={[styles.accentBar, e.accent === 'amber' ? styles.accentAmber : styles.accentBlue]} />
              <View style={styles.infoCardBody}>
                <Text style={styles.infoTitle}>{e.title}</Text>
                <Text style={styles.infoDate}>{e.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by Intants</Text>
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
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A90D9',
  },
  kidsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  childCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  childCardFull: {
    width: '100%',
  },
  childCardHalf: {
    width: '48%',
  },
  childInner: {
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF3FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4A90D9',
  },
  childName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  childClass: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 12,
    marginBottom: 10,
  },
  attRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  attPct: {
    fontSize: 14,
    fontWeight: '800',
    color: '#16A34A',
    marginRight: 6,
  },
  attLbl: {
    fontSize: 11,
    color: '#6B7280',
  },
  viewPill: {
    width: '100%',
    borderRadius: 999,
    backgroundColor: '#EAF3FB',
    paddingVertical: 7,
    alignItems: 'center',
  },
  viewPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4A90D9',
  },
  emptyCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
  },
  emptyText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionsGrid: {
    marginTop: 10,
    marginBottom: 18,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionCard: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '32%',
  },
  actionHalf: {
    width: '48.5%',
  },
  actionWide: {
    width: '48.5%',
  },
  actionEmoji: {
    fontSize: 22,
    marginBottom: 6,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  actionSub: {
    marginTop: 2,
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionBlue: {
    backgroundColor: '#EAF3FB',
  },
  actionGreen: {
    backgroundColor: '#F0FDF4',
  },
  actionAmber: {
    backgroundColor: '#FFF8E7',
  },
  cardList: {
    marginBottom: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  accentBar: {
    width: 4,
  },
  accentBlue: {
    backgroundColor: '#4A90D9',
  },
  accentAmber: {
    backgroundColor: '#F5A623',
  },
  infoCardBody: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  infoMsg: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    color: '#6B7280',
  },
  infoTime: {
    marginTop: 8,
    fontSize: 11,
    color: '#9CA3AF',
  },
  infoDate: {
    marginTop: 6,
    fontSize: 12,
    color: '#6B7280',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

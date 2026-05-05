import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { driverService } from '../../services';

type Nav = { goBack: () => void };

type Notice = {
  id: string;
  section: 'TODAY' | 'YESTERDAY';
  title: string;
  message: string;
  time: string;
  emoji: string;
  circleBg: string;
  unread: boolean;
};

export default function DriverNotificationsScreen() {
  const navigation = useNavigation<Nav>();

  const initial: Notice[] = useMemo(
    () => [
      {
        id: 'n1',
        section: 'TODAY',
        title: 'Route Change Alert',
        message: 'Route 4 has been modified.\nCheck updated stops.',
        time: '1 hour ago',
        emoji: '📍',
        circleBg: '#EAF3FB',
        unread: true,
      },
      {
        id: 'n2',
        section: 'TODAY',
        title: 'Trip Reminder',
        message: 'Morning pickup starts in 30 mins',
        time: '2 hours ago',
        emoji: '🚌',
        circleBg: '#F0FDF4',
        unread: true,
      },
      {
        id: 'n3',
        section: 'TODAY',
        title: 'Compliance Alert',
        message: 'Vehicle insurance renewal due',
        time: '3 hours ago',
        emoji: '⚠️',
        circleBg: '#FFF8E7',
        unread: true,
      },
      {
        id: 'n4',
        section: 'YESTERDAY',
        title: 'Trip Completed',
        message: 'Evening drop completed successfully',
        time: 'Yesterday 6:00 PM',
        emoji: '✓',
        circleBg: '#F9FAFB',
        unread: false,
      },
      {
        id: 'n5',
        section: 'YESTERDAY',
        title: 'Attendance Submitted',
        message: 'Morning attendance marked for 32 students',
        time: 'Yesterday 8:30 AM',
        emoji: '📋',
        circleBg: '#F9FAFB',
        unread: false,
      },
    ],
    []
  );

  const [items, setItems] = useState<Notice[]>(initial);

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await driverService.getNotifications();
      if ((response as any)?.data || response) {
        console.log('Notifications loaded from API');
      }
    } catch (err: any) {
      console.log('API not connected, using mock data:', err?.message ?? String(err));
    }
  };

  const grouped = useMemo(() => {
    const today = items.filter(i => i.section === 'TODAY');
    const yesterday = items.filter(i => i.section === 'YESTERDAY');
    return { today, yesterday };
  }, [items]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity onPress={markAllRead} activeOpacity={0.7} style={styles.rightBtn}>
            <Text style={styles.markRead}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>TODAY</Text>
        <View style={styles.list}>
          {grouped.today.map(n => (
            <Item key={n.id} n={n} />
          ))}
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 16 }]}>YESTERDAY</Text>
        <View style={styles.list}>
          {grouped.yesterday.map(n => (
            <Item key={n.id} n={n} />
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Item({ n }: { n: Notice }) {
  const isRead = !n.unread;
  return (
    <View style={styles.itemRow}>
      <View style={[styles.circle, { backgroundColor: n.circleBg }]}>
        <Text style={[styles.circleEmoji, isRead ? { color: '#6B7280' } : null]}>{n.emoji}</Text>
      </View>

      <View style={styles.itemMiddle}>
        <Text style={[styles.itemTitle, isRead ? styles.readTitle : null]}>{n.title}</Text>
        <Text style={styles.itemMsg}>{n.message}</Text>
        <Text style={styles.itemTime}>{n.time}</Text>
      </View>

      {n.unread ? <View style={styles.blueDot} /> : <View style={{ width: 8, height: 8 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 80 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  rightBtn: { minWidth: 96, alignItems: 'flex-end' },
  markRead: { fontSize: 12, fontWeight: '800', color: '#4A90D9' },
  sectionLabel: { fontSize: 12, fontWeight: '900', color: '#9CA3AF', letterSpacing: 1, marginBottom: 8 },
  list: { gap: 10 },
  itemRow: { flexDirection: 'row', gap: 12, paddingVertical: 8, alignItems: 'flex-start' },
  circle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  circleEmoji: { fontSize: 20 },
  itemMiddle: { flex: 1, minWidth: 0 },
  itemTitle: { fontSize: 14, fontWeight: '900', color: '#111827' },
  readTitle: { color: '#6B7280' },
  itemMsg: { marginTop: 4, fontSize: 12, color: '#6B7280', lineHeight: 16 },
  itemTime: { marginTop: 6, fontSize: 11, color: '#9CA3AF' },
  blueDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4A90D9', marginTop: 6 },
});


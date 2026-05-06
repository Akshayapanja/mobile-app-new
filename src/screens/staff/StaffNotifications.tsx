import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { notificationService, teacherService } from '../../services';

type NItem = {
  icon: string;
  title: string;
  text: string;
  time: string;
  bg: string;
  unread: boolean;
};
const NOTIFICATION_ICONS = {
  marks: '\u{1F4CB}',
  announcement: '\u{1F4E2}',
  salary: '\u{1F4B0}',
  leave: '\u2705',
  homework: '\u{1F4DA}',
  attendance: '\u{1F4C5}',
} as const;

const TODAY: NItem[] = [
  { icon: NOTIFICATION_ICONS.marks, title: 'Marks Submission Reminder', text: 'Submit Class 8A marks by Friday', time: '1 hour ago', bg: '#EAF3FB', unread: true },
  { icon: NOTIFICATION_ICONS.announcement, title: 'New Announcement', text: 'Staff meeting scheduled April 22', time: '2 hours ago', bg: '#F0FDF4', unread: true },
  { icon: NOTIFICATION_ICONS.salary, title: 'Salary Update', text: 'March salary credited to account', time: '3 hours ago', bg: '#FFF8E7', unread: true },
];

const YDAY: NItem[] = [
  { icon: NOTIFICATION_ICONS.leave, title: 'Leave Approved', text: 'Casual leave Apr 10 approved', time: 'Yesterday 2:00 PM', bg: '#F9FAFB', unread: false },
  { icon: NOTIFICATION_ICONS.homework, title: 'Homework Reminder', text: '3 students yet to submit homework', time: 'Yesterday 9:00 AM', bg: '#F9FAFB', unread: false },
  { icon: NOTIFICATION_ICONS.attendance, title: 'Attendance Reminder', text: 'Class 9B attendance not marked', time: 'Yesterday 8:30 AM', bg: '#F9FAFB', unread: false },
];

export default function StaffNotifications() {
  const navigation = useNavigation<any>();
  const [allRead, setAllRead] = useState(false);

  const todayRows = useMemo(() => TODAY.map(item => ({ ...item, unread: allRead ? false : item.unread })), [allRead]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await teacherService.getNotifications();
      if ((response as any)?.data || response) {
        console.log('Notifications loaded from API');
      }
    } catch (err: any) {
      console.log('API not connected, using mock data:', err?.message ?? String(err));
    }
  };

  const handleMarkAllRead = async () => {
    setAllRead(true);
    await notificationService.clearBadge();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>Notifications</Text>
          <TouchableOpacity activeOpacity={0.85} onPress={handleMarkAllRead}><Text style={styles.markRead}>Mark all read</Text></TouchableOpacity>
        </View>

        <Text style={styles.section}>TODAY</Text>
        <View style={styles.listWrap}>
          {todayRows.map((n, idx) => (
            <View key={`t-${idx}`} style={[styles.itemRow, idx !== todayRows.length - 1 ? styles.divider : null]}>
              <View style={[styles.iconCircle, { backgroundColor: n.bg }]}><Text style={styles.iconText}>{n.icon}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.titleUnread}>{n.title}</Text>
                <Text style={styles.bodyUnread}>{n.text}</Text>
                <Text style={styles.timeUnread}>{n.time}</Text>
              </View>
              {n.unread ? <View style={styles.dot} /> : null}
            </View>
          ))}
        </View>

        <Text style={[styles.section, { marginTop: 14 }]}>YESTERDAY</Text>
        <View style={styles.listWrap}>
          {YDAY.map((n, idx) => (
            <View key={`y-${idx}`} style={[styles.itemRow, idx !== YDAY.length - 1 ? styles.divider : null]}>
              <View style={[styles.iconCircle, { backgroundColor: n.bg }]}><Text style={[styles.iconText, { color: '#9CA3AF' }]}>{n.icon}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.titleRead}>{n.title}</Text>
                <Text style={styles.bodyRead}>{n.text}</Text>
                <Text style={styles.timeRead}>{n.time}</Text>
              </View>
            </View>
          ))}
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
  topNavTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#111827' },
  markRead: { fontSize: 13, color: '#4A90D9', fontWeight: '700' },

  section: { fontSize: 11, color: '#9CA3AF', fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
  listWrap: { backgroundColor: '#FFFFFF' },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  iconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 20 },

  titleUnread: { fontSize: 14, fontWeight: '800', color: '#111827' },
  bodyUnread: { marginTop: 4, fontSize: 12, color: '#6B7280' },
  timeUnread: { marginTop: 4, fontSize: 11, color: '#9CA3AF' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4A90D9' },

  titleRead: { fontSize: 14, fontWeight: '700', color: '#6B7280' },
  bodyRead: { marginTop: 4, fontSize: 12, color: '#9CA3AF' },
  timeRead: { marginTop: 4, fontSize: 11, color: '#9CA3AF' },
});

// ✅ Converted from React Web → React Native

import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { notificationService, parentService } from '../../services';

type NotificationItem = {
  id: string;
  icon: string;
  circleBg: string;
  title: string;
  text: string;
  time: string;
  unread: boolean;
  muted?: boolean;
};

export default function Notifications() {
  const navigation = useNavigation<any>();

  const initial = useMemo(
    () => ({
      today: [
        {
          id: 't1',
          icon: '📅',
          circleBg: '#EAF3FB',
          title: 'Attendance Marked',
          text: 'Arjun Kumar was marked Present\ntoday by Mrs. Lakshmi Subramaniam',
          time: '10 mins ago',
          unread: true,
        },
        {
          id: 't2',
          icon: '💰',
          circleBg: '#FFF0F0',
          title: 'Fee Payment Reminder',
          text: '₹4500 is due before April 30 2025',
          time: '1 hour ago',
          unread: true,
        },
        {
          id: 't3',
          icon: '📢',
          circleBg: '#F0FDF4',
          title: 'New Announcement',
          text: 'Annual Sports Day April 25th',
          time: '2 hours ago',
          unread: true,
        },
      ] as NotificationItem[],
      yesterday: [
        {
          id: 'y1',
          icon: '✓',
          circleBg: '#F9FAFB',
          title: 'Leave Approved',
          text: 'Leave Apr 10-11 approved',
          time: 'Yesterday 3:00 PM',
          unread: false,
          muted: true,
        },
        {
          id: 'y2',
          icon: '📝',
          circleBg: '#F9FAFB',
          title: 'Homework Reminder',
          text: '1 pending homework due tomorrow',
          time: 'Yesterday 9:00 AM',
          unread: false,
          muted: true,
        },
        {
          id: 'y3',
          icon: '🏆',
          circleBg: '#F9FAFB',
          title: 'Result Published',
          text: 'Mid Term results published.\nArjun scored 375/500.',
          time: 'Yesterday 8:00 AM',
          unread: false,
          muted: true,
        },
      ] as NotificationItem[],
      earlier: [
        {
          id: 'e1',
          icon: '📅',
          circleBg: '#F9FAFB',
          title: 'Timetable Updated',
          text: 'Class 8A timetable updated for Term 2',
          time: '2 days ago',
          unread: false,
          muted: true,
        },
      ] as NotificationItem[],
    }),
    []
  );

  const [today, setToday] = useState<NotificationItem[]>(initial.today);
  const [yesterday, setYesterday] = useState<NotificationItem[]>(initial.yesterday);
  const [earlier, setEarlier] = useState<NotificationItem[]>(initial.earlier);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await parentService.getNotifications();
      if ((response as any)?.data || response) {
        console.log('Notifications loaded from API');
      }
    } catch (err: any) {
      console.log('API not connected, using mock data:', err?.message ?? String(err));
    }
  };

  const unreadCount = useMemo(
    () =>
      [...today, ...yesterday, ...earlier].reduce((acc, n) => {
        return acc + (n.unread ? 1 : 0);
      }, 0),
    [today, yesterday, earlier]
  );

  const markAllRead = async () => {
    setToday(prev => prev.map(n => ({ ...n, unread: false })));
    setYesterday(prev => prev.map(n => ({ ...n, unread: false })));
    setEarlier(prev => prev.map(n => ({ ...n, unread: false })));
    await notificationService.clearBadge();
  };

  function renderItem(n: NotificationItem, isLast: boolean) {
    const titleStyle = n.muted ? styles.itemTitleMuted : styles.itemTitle;
    const textStyle = n.muted ? styles.itemTextMuted : styles.itemText;
    const timeStyle = n.muted ? styles.itemTimeMuted : styles.itemTime;
    const circleTextStyle = n.muted ? styles.circleEmojiMuted : styles.circleEmoji;

    return (
      <View key={n.id} style={styles.itemWrap}>
        <View style={styles.itemRow}>
          <View style={[styles.circle, { backgroundColor: n.circleBg }]}>
            <Text style={circleTextStyle}>{n.icon}</Text>
          </View>

          <View style={styles.itemMid}>
            <Text style={titleStyle}>{n.title}</Text>
            <Text style={textStyle}>{n.text}</Text>
            <Text style={timeStyle}>{n.time}</Text>
          </View>

          {n.unread ? <View style={styles.unreadDot} /> : <View style={styles.dotSpacer} />}
        </View>

        {!isLast ? <View style={styles.divider} /> : null}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.topNavTitle}>Notifications</Text>

          <TouchableOpacity onPress={markAllRead} activeOpacity={0.85} style={styles.markAllBtn}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>TODAY</Text>
        <View style={styles.sectionCard}>
          {today.map((n, idx) => renderItem(n, idx === today.length - 1))}
        </View>

        <Text style={styles.sectionLabel}>YESTERDAY</Text>
        <View style={styles.sectionCardMuted}>
          {yesterday.map((n, idx) => renderItem(n, idx === yesterday.length - 1))}
        </View>

        <Text style={styles.sectionLabel}>EARLIER</Text>
        <View style={styles.sectionCardMuted}>
          {earlier.map((n, idx) => renderItem(n, idx === earlier.length - 1))}
        </View>

        {unreadCount === 0 ? <View style={styles.bottomSpacer} /> : <View style={styles.bottomSpacer} />}
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
    marginBottom: 14,
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
  markAllBtn: {
    minWidth: 90,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  markAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A90D9',
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1.4,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionCardMuted: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    opacity: 0.9,
  },
  itemWrap: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 0,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 14,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleEmoji: {
    fontSize: 20,
  },
  circleEmojiMuted: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: '700',
  },
  itemMid: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
  },
  itemTitleMuted: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6B7280',
  },
  itemText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    lineHeight: 16,
  },
  itemTextMuted: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    lineHeight: 16,
  },
  itemTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  itemTimeMuted: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90D9',
    marginTop: 6,
  },
  dotSpacer: {
    width: 8,
    height: 8,
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 14,
    marginLeft: 14 + 44 + 12,
  },
  bottomSpacer: {
    height: 1,
  },
});

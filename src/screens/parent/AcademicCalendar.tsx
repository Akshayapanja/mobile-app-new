import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CalEventType = 'event' | 'holiday' | 'exam' | 'meeting';
type CalEvent = { day: number; label: string; type: CalEventType };

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

const TYPE_COLOR: Record<CalEventType, string> = {
  event: '#4A90D9',
  holiday: '#5CB85C',
  exam: '#E85D5D',
  meeting: '#F5A623',
};

function monthLabelForOffset(monthOffset: number) {
  const base = new Date(2025, 3, 1); // April 2025
  const d = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  const month = d.toLocaleString('en-US', { month: 'long' });
  return `${month} ${d.getFullYear()}`;
}

function monthMetaForOffset(monthOffset: number) {
  const base = new Date(2025, 3, 1); // April 2025
  const d = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const startDayIndex = d.getDay(); // 0..6, Sunday=0
  return { year: d.getFullYear(), monthIndex: d.getMonth(), daysInMonth, startDayIndex };
}

function EventCard({
  title,
  date,
  pillText,
  barColor,
  pillBg,
}: {
  title: string;
  date: string;
  pillText: string;
  barColor: string;
  pillBg: string;
}) {
  return (
    <View style={styles.eventCard}>
      <View style={[styles.eventAccent, { backgroundColor: barColor }]} />
      <View style={styles.eventBody}>
        <View style={styles.eventTopRow}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={styles.eventTitle}>{title}</Text>
            <Text style={styles.eventDate}>{date}</Text>
          </View>
          <View style={[styles.eventPill, { backgroundColor: pillBg }]}>
            <Text style={[styles.eventPillText, { color: barColor }]}>{pillText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function AcademicCalendar() {
  const navigation = useNavigation<any>();
  const [monthOffset, setMonthOffset] = useState(0); // 0 = April 2025

  const monthLabel = useMemo(() => monthLabelForOffset(monthOffset), [monthOffset]);
  const meta = useMemo(() => monthMetaForOffset(monthOffset), [monthOffset]);

  const eventsForMonth = useMemo<CalEvent[]>(() => {
    if (monthOffset !== 0) return [];
    return [
      { day: 14, label: 'Holiday', type: 'holiday' },
      { day: 17, label: 'Holiday', type: 'holiday' },
      { day: 20, label: 'PTM', type: 'meeting' },
      { day: 25, label: 'Sports Day', type: 'event' },
      { day: 30, label: 'Fee Due', type: 'exam' },
    ];
  }, [monthOffset]);

  const eventByDay = useMemo(() => {
    const m = new Map<number, CalEvent>();
    for (const e of eventsForMonth) m.set(e.day, e);
    return m;
  }, [eventsForMonth]);

  const cells = useMemo(() => {
    const out: Array<number | null> = [];
    for (let i = 0; i < meta.startDayIndex; i++) out.push(null);
    for (let day = 1; day <= meta.daysInMonth; day++) out.push(day);
    return out;
  }, [meta.daysInMonth, meta.startDayIndex]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>Academic Calendar</Text>
          <View style={styles.yearPill}>
            <Text style={styles.yearPillText}>2024-25</Text>
          </View>
        </View>

        <View style={styles.monthNav}>
          <TouchableOpacity onPress={() => setMonthOffset(v => v - 1)} style={styles.monthArrowBtn} hitSlop={10}>
            <Text style={styles.monthArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{monthLabel}</Text>
          <TouchableOpacity onPress={() => setMonthOffset(v => v + 1)} style={styles.monthArrowBtn} hitSlop={10}>
            <Text style={styles.monthArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.weekdaysRow}>
            {WEEKDAYS.map((d, idx) => (
              <Text key={`${d}-${idx}`} style={styles.weekday}>
                {d}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {cells.map((day, idx) => {
              if (!day) return <View key={`e-${idx}`} style={styles.emptyCell} />;
              const e = eventByDay.get(day);
              const circleColor = e ? TYPE_COLOR[e.type] : undefined;
              return (
                <View key={`d-${idx}`} style={styles.cell}>
                  <View style={[styles.dateCircle, circleColor ? { backgroundColor: circleColor } : null]}>
                    <Text style={[styles.dateText, circleColor ? styles.dateTextOnColor : null]}>{day}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.legendWrap}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4A90D9' }]} />
            <Text style={styles.legendText}>School Event</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#5CB85C' }]} />
            <Text style={styles.legendText}>Holiday</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#E85D5D' }]} />
            <Text style={styles.legendText}>Exam/Due</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F5A623' }]} />
            <Text style={styles.legendText}>Meeting</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <View style={{ gap: 10 }}>
          <EventCard
            title="Annual Sports Day"
            date="April 25 2025"
            pillText="School Event"
            barColor="#4A90D9"
            pillBg="#EAF3FB"
          />
          <EventCard
            title="Parent Teacher Meeting"
            date="April 20 2025"
            pillText="Meeting"
            barColor="#F5A623"
            pillBg="#FFF8E7"
          />
          <EventCard
            title="Term 2 Fee Due Date"
            date="April 30 2025"
            pillText="Fee"
            barColor="#E85D5D"
            pillBg="#FFF0F0"
          />
          <EventCard
            title="Ram Navami Holiday"
            date="April 17 2025"
            pillText="Holiday"
            barColor="#5CB85C"
            pillBg="#F0FDF4"
          />
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 0 },

  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  backText: { fontSize: 26, color: '#1F2937', lineHeight: 26 },
  topTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#111827' },
  yearPill: { backgroundColor: '#EAF3FB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50 },
  yearPillText: { color: '#4A90D9', fontWeight: '700', fontSize: 12 },

  monthNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, marginBottom: 12 },
  monthArrowBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  monthArrow: { fontSize: 18, fontWeight: '700', color: '#4A90D9' },
  monthLabel: { fontSize: 15, fontWeight: '700', color: '#111827' },

  calendarCard: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14, backgroundColor: '#FFFFFF' },
  weekdaysRow: { flexDirection: 'row', marginBottom: 10 },
  weekday: { width: `${100 / 7}%`, textAlign: 'center', color: '#9CA3AF', fontSize: 12, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  emptyCell: { width: `${100 / 7}%`, height: 36, alignItems: 'center', justifyContent: 'center' },
  cell: { width: `${100 / 7}%`, height: 36, alignItems: 'center', justifyContent: 'center' },
  dateCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  dateText: { fontSize: 12, fontWeight: '700', color: '#111827' },
  dateTextOnColor: { color: '#FFFFFF' },

  legendWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 12, marginBottom: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },

  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginTop: 4, marginBottom: 10 },

  eventCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14 },
  eventAccent: { width: 4, borderRadius: 2, marginRight: 12 },
  eventBody: { flex: 1 },
  eventTopRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  eventTitle: { fontSize: 14, fontWeight: '700', color: '#111827' },
  eventDate: { fontSize: 12, color: '#6B7280', marginTop: 2, fontWeight: '600' },
  eventPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 50 },
  eventPillText: { fontSize: 12, fontWeight: '700' },
});


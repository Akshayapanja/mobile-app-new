import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { teacherService } from '../../services';

type CellType = 'event' | 'holiday' | 'exam' | 'meeting' | 'deadline' | 'none';
type Cell = { day: number | null; type: CellType };

const BASE = new Date(2025, 3, 1); // April 2025

function buildCells(year: number, monthIndex: number, typeForDay: (day: number) => CellType): Cell[] {
  const first = new Date(year, monthIndex, 1);
  const startDay = first.getDay(); // 0=Sun
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const cells: Cell[] = [];
  for (let i = 0; i < startDay; i++) cells.push({ day: null, type: 'none' });
  for (let d = 1; d <= days; d++) cells.push({ day: d, type: typeForDay(d) });
  return cells;
}

export default function StaffCalendar() {
  const navigation = useNavigation<any>();
  const [monthOffset, setMonthOffset] = useState(0);

  useEffect(() => {
    loadCalendar();
  }, []);

  const loadCalendar = async () => {
    try {
      const response = await teacherService.getCalendar();
      if ((response as any)?.data || response) {
      }
    } catch (err: any) {
      // TODO: handle error
    }
  };

  const current = useMemo(
    () => new Date(BASE.getFullYear(), BASE.getMonth() + monthOffset, 1),
    [monthOffset],
  );
  const year = current.getFullYear();
  const monthIndex = current.getMonth();
  const monthLabel = current.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const typeForDay = (d: number): CellType => {
    if (year === 2025 && monthIndex === 3) {
      if (d === 14 || d === 17) return 'holiday';
      if (d === 20) return 'meeting';
      if (d === 22) return 'meeting';
      if (d === 25) return 'event';
      if (d === 30) return 'deadline';
    }
    return 'none';
  };

  const cells = useMemo(() => buildCells(year, monthIndex, typeForDay), [year, monthIndex, monthOffset]);

  const circleStyleFor = (t: CellType) => {
    if (t === 'event') return styles.dayEvent;
    if (t === 'holiday') return styles.dayHoliday;
    if (t === 'exam') return styles.dayExam;
    if (t === 'meeting') return styles.dayMeeting;
    if (t === 'deadline') return styles.dayDeadline;
    return styles.dayEmpty;
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.topNavTitle}>Academic Calendar</Text>

          <View style={styles.yearPill}>
            <Text style={styles.yearPillText}>2024-25</Text>
          </View>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity
              onPress={() => setMonthOffset(o => o - 1)}
              activeOpacity={0.85}
              style={styles.monthArrowBtn}
            >
              <Ionicons name="chevron-back" size={20} color="#1F2937" />
            </TouchableOpacity>

            <Text style={styles.monthTitle}>{monthLabel}</Text>

            <TouchableOpacity
              onPress={() => setMonthOffset(o => o + 1)}
              activeOpacity={0.85}
              style={styles.monthArrowBtn}
            >
              <Ionicons name="chevron-forward" size={20} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <View style={styles.weekdaysRow}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
              <Text key={`weekday-${idx}-${d}`} style={styles.weekday}>
                {d}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {cells.map((c, idx) => (
              <View key={`cell-${monthOffset}-${idx}`} style={styles.gridCell}>
                {c.day ? (
                  <View style={[styles.dayCircle, circleStyleFor(c.type)]}>
                    <Text style={styles.dayText}>{c.day}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#4A90D9' }]} />
              <Text style={styles.legendText}>School Event</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>Holiday</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.legendText}>Exam/Deadline</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.legendText}>PTM</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#7C3AED' }]} />
              <Text style={styles.legendText}>Meeting</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Upcoming Events</Text>

        <View style={styles.eventsList}>
          <View style={styles.eventCard}>
            <View style={[styles.eventAccent, { backgroundColor: '#F59E0B' }]} />
            <View style={styles.eventBody}>
              <Text style={styles.eventTitle}>Parent Teacher Meeting</Text>
              <Text style={styles.eventDate}>April 20, 2025</Text>
              <View style={[styles.eventPill, { backgroundColor: '#FFF8E7' }]}>
                <Text style={[styles.eventPillText, { color: '#F5A623' }]}>PTM</Text>
              </View>
            </View>
          </View>

          <View style={styles.eventCard}>
            <View style={[styles.eventAccent, { backgroundColor: '#7C3AED' }]} />
            <View style={styles.eventBody}>
              <Text style={styles.eventTitle}>Staff Monthly Meeting</Text>
              <Text style={styles.eventDate}>April 22, 2025</Text>
              <View style={[styles.eventPill, { backgroundColor: '#F5F3FF' }]}>
                <Text style={[styles.eventPillText, { color: '#7C3AED' }]}>Meeting</Text>
              </View>
            </View>
          </View>

          <View style={styles.eventCard}>
            <View style={[styles.eventAccent, { backgroundColor: '#4A90D9' }]} />
            <View style={styles.eventBody}>
              <Text style={styles.eventTitle}>Annual Sports Day</Text>
              <Text style={styles.eventDate}>April 25, 2025</Text>
              <View style={[styles.eventPill, { backgroundColor: '#EAF3FB' }]}>
                <Text style={[styles.eventPillText, { color: '#4A90D9' }]}>School Event</Text>
              </View>
            </View>
          </View>

          <View style={styles.eventCard}>
            <View style={[styles.eventAccent, { backgroundColor: '#EF4444' }]} />
            <View style={styles.eventBody}>
              <Text style={styles.eventTitle}>Marks Submission Deadline</Text>
              <Text style={styles.eventDate}>April 30, 2025</Text>
              <View style={[styles.eventPill, { backgroundColor: '#FFF0F0' }]}>
                <Text style={[styles.eventPillText, { color: '#E85D5D' }]}>Deadline</Text>
              </View>
            </View>
          </View>

          <View style={styles.eventCard}>
            <View style={[styles.eventAccent, { backgroundColor: '#10B981' }]} />
            <View style={styles.eventBody}>
              <Text style={styles.eventTitle}>Ram Navami Holiday</Text>
              <Text style={styles.eventDate}>April 17, 2025</Text>
              <View style={[styles.eventPill, { backgroundColor: '#F0FDF4' }]}>
                <Text style={[styles.eventPillText, { color: '#5CB85C' }]}>Holiday</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 80 },

  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  topNavBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  topNavTitle: { fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center', flex: 1 },
  yearPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#EAF3FB',
  },
  yearPillText: { fontSize: 11, fontWeight: '800', color: '#4A90D9' },

  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },
  calendarHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  monthArrowBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  monthTitle: { fontSize: 15, fontWeight: '800', color: '#111827', textAlign: 'center', flex: 1 },

  weekdaysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  weekday: { width: `${100 / 7}%`, textAlign: 'center', fontSize: 12, color: '#9CA3AF', fontWeight: '700' },

  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridCell: { width: `${100 / 7}%`, alignItems: 'center', justifyContent: 'center', paddingVertical: 4 },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: { fontSize: 12, fontWeight: '800', color: '#FFFFFF' },

  dayEvent: { backgroundColor: '#4A90D9' },
  dayHoliday: { backgroundColor: '#10B981' },
  dayExam: { backgroundColor: '#EF4444' },
  dayMeeting: { backgroundColor: '#F59E0B' },
  dayDeadline: { backgroundColor: '#7C3AED' },
  dayEmpty: { backgroundColor: 'transparent' },

  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
    marginTop: 14,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, color: '#6B7280', fontWeight: '700' },

  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 10 },
  eventsList: { gap: 10 },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
  },
  eventAccent: { width: 4 },
  eventBody: { flex: 1, paddingVertical: 12, paddingHorizontal: 12 },
  eventTitle: { fontSize: 14, fontWeight: '800', color: '#111827', marginBottom: 4 },
  eventDate: { fontSize: 12, color: '#6B7280', marginBottom: 8 },
  eventPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  eventPillText: { fontSize: 11, fontWeight: '700' },
});


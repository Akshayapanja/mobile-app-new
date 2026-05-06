// ✅ Converted from React Web → React Native

import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

// TODO: Remove when backend connected
import { CHILDREN } from '../../lib/mockData';
import { getUser } from '../../lib/session';
import { parentService } from '../../services';

type CellType = 'present' | 'absent' | 'leave' | 'holiday' | 'upcoming';
type Cell = { day: number | null; type?: CellType };

const BASE = new Date(2025, 3, 1); // April 2025

function buildCells(year: number, monthIndex: number, typeForDay: (day: number) => CellType): Cell[] {
  const first = new Date(year, monthIndex, 1);
  const startDay = first.getDay(); // 0=Sun
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const cells: Cell[] = [];
  for (let i = 0; i < startDay; i++) cells.push({ day: null });
  for (let d = 1; d <= days; d++) cells.push({ day: d, type: typeForDay(d) });
  return cells;
}

function isSunday(year: number, monthIndex: number, day: number) {
  return new Date(year, monthIndex, day).getDay() === 0;
}

export default function Attendance() {
  const navigation = useNavigation<any>();
  // TODO: Replace with real ID from user context when backend connected
  const child = CHILDREN.c1; // Arjun Kumar (mock)

  const [attendanceData, setAttendanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [monthOffset, setMonthOffset] = useState(0); // 0 = April 2025
  const current = new Date(BASE.getFullYear(), BASE.getMonth() + monthOffset, 1);
  const year = current.getFullYear();
  const monthIndex = current.getMonth();
  const monthLabel = current.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const user = await getUser();
      // TODO: Replace with real ID from user context when backend connected
      const childId = (user as any)?.childIds?.[0] || 'c1';
      const [attendance, stats] = await Promise.all([
        parentService.getAttendance({ studentId: childId }),
        parentService.getAttendanceStats({ studentId: childId }),
      ]);
      setAttendanceData({
        records: (attendance as any)?.data || attendance,
        stats: (stats as any)?.data || stats,
      });
    } catch (err: any) {
      // TODO: handle error
      // Keep existing mock UI as fallback
      setAttendanceData(null);
    } finally {
      setLoading(false);
    }
  };

  const typeForDay = (d: number): CellType => {
    // May 2025 (next month): all upcoming
    if (monthOffset >= 1) return 'upcoming';

    // March 2025 (previous month): all working days present, Day 8 & 15 absent (Sundays are holiday)
    if (monthOffset <= -1) {
      if (isSunday(year, monthIndex, d)) return 'holiday';
      if (d === 8 || d === 15) return 'absent';
      return 'present';
    }

    // April 2025: per spec
    if (isSunday(year, monthIndex, d)) return 'holiday';
    if (d === 8 || d === 14) return 'absent';
    if (d === 21) return 'leave';
    // Days 1-6 present, 9-12 present, 15-19 present, 22-26 present, 28-30 present
    return 'present';
  };

  const cells = useMemo(() => buildCells(year, monthIndex, typeForDay), [year, monthIndex, monthOffset]);

  const percent = 0.87;
  const ringR = 50;
  const circumference = 2 * Math.PI * ringR;
  const dash = `${circumference * percent} ${circumference}`;

  const circleStyleFor = (t?: CellType) => {
    if (t === 'present') return styles.dayPresent;
    if (t === 'absent') return styles.dayAbsent;
    if (t === 'leave') return styles.dayLeave;
    if (t === 'holiday') return styles.dayHoliday;
    return styles.dayUpcoming;
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {loading ? (
        <View style={[styles.content, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#4A90D9" />
        </View>
      ) : (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.topNavTitle}>Attendance</Text>

          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.childRow}>
          <View style={styles.childAvatar}>
            <Text style={styles.childInitials}>AK</Text>
          </View>

          <View style={styles.childInfo}>
            <Text style={styles.childName}>Arjun Kumar</Text>
            <Text style={styles.childClass}>Class 8 - Section A</Text>
          </View>

          <View style={styles.yearPill}>
            <Text style={styles.yearPillText}>2024-25</Text>
          </View>
        </View>

        <View style={styles.overallCard}>
          <View style={styles.ringWrap}>
            <Svg width={120} height={120} viewBox="0 0 120 120">
              <Circle cx={60} cy={60} r={ringR} fill="none" stroke="#F3F4F6" strokeWidth={10} />
              <Circle
                cx={60}
                cy={60}
                r={ringR}
                fill="none"
                stroke="#5CB85C"
                strokeWidth={10}
                strokeDasharray={dash}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </Svg>

            <View style={styles.ringCenter}>
              <Text style={styles.ringPercent}>87%</Text>
              <Text style={styles.ringSub}>Present</Text>
            </View>
          </View>

          <Text style={styles.overallLabel}>Overall Attendance</Text>

          <View style={styles.divider} />

          <View style={styles.overallStatsRow}>
            <View style={styles.overallStatItem}>
              <View style={styles.overallStatTop}>
                <View style={[styles.dot, { backgroundColor: '#5CB85C' }]} />
                <Text style={styles.overallStatValue}>142</Text>
              </View>
              <Text style={styles.overallStatLabel}>Present</Text>
            </View>

            <View style={styles.overallStatItem}>
              <View style={styles.overallStatTop}>
                <View style={[styles.dot, { backgroundColor: '#E85D5D' }]} />
                <Text style={styles.overallStatValue}>18</Text>
              </View>
              <Text style={styles.overallStatLabel}>Absent</Text>
            </View>

            <View style={styles.overallStatItem}>
              <View style={styles.overallStatTop}>
                <View style={[styles.dot, { backgroundColor: '#F5A623' }]} />
                <Text style={styles.overallStatValue}>6</Text>
              </View>
              <Text style={styles.overallStatLabel}>Leave</Text>
            </View>
          </View>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => setMonthOffset(o => o - 1)} activeOpacity={0.85} style={styles.monthArrowBtn}>
              <Text style={styles.monthArrow}>←</Text>
            </TouchableOpacity>

            <Text style={styles.monthTitle}>{monthLabel}</Text>

            <TouchableOpacity onPress={() => setMonthOffset(o => o + 1)} activeOpacity={0.85} style={styles.monthArrowBtn}>
              <Text style={styles.monthArrow}>→</Text>
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
              <View
                key={
                  c.day == null
                    ? `empty-start-${monthOffset}-${idx}`
                    : `date-${monthOffset}-${c.day}`
                }
                style={styles.gridCell}
              >
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
              <View style={[styles.legendDot, { backgroundColor: '#5CB85C' }]} />
              <Text style={styles.legendText}>Present</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#E85D5D' }]} />
              <Text style={styles.legendText}>Absent</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F5A623' }]} />
              <Text style={styles.legendText}>Leave</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#E5E7EB' }]} />
              <Text style={styles.legendText}>Holiday</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 80 },

  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  topNavBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  topNavTitle: { fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center', flex: 1 },
  topNavRightSpacer: { width: 40, height: 40 },

  childRow: {
    backgroundColor: '#EAF3FB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  childAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childInitials: { fontSize: 14, fontWeight: '800', color: '#4A90D9' },
  childInfo: { flex: 1 },
  childName: { fontSize: 14, fontWeight: '800', color: '#1F2937', marginBottom: 2 },
  childClass: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  yearPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B5D4F4',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  yearPillText: { fontSize: 11, fontWeight: '800', color: '#4A90D9' },

  overallCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
  },
  ringWrap: { width: 120, height: 120, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  ringCenter: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  ringPercent: { fontSize: 28, fontWeight: '900', color: '#1F2937' },
  ringSub: { fontSize: 12, color: '#9CA3AF', fontWeight: '600', marginTop: 2 },
  overallLabel: { fontSize: 13, color: '#9CA3AF', fontWeight: '600', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#E5E7EB', alignSelf: 'stretch', marginBottom: 12 },
  overallStatsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch' },
  overallStatItem: { flex: 1, alignItems: 'center' },
  overallStatTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  overallStatValue: { fontSize: 18, fontWeight: '900', color: '#111827' },
  overallStatLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '600' },

  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },
  calendarHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  monthArrowBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  monthArrow: { fontSize: 16, fontWeight: '800', color: '#4A90D9' },
  monthTitle: { fontSize: 15, fontWeight: '800', color: '#111827', textAlign: 'center', flex: 1 },

  weekdaysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  weekday: { width: `${100 / 7}%`, textAlign: 'center', fontSize: 12, color: '#9CA3AF', fontWeight: '700' },

  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridCell: { width: `${100 / 7}%`, alignItems: 'center', justifyContent: 'center', paddingVertical: 4 },
  dayCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  dayText: { fontSize: 12, fontWeight: '800', color: '#FFFFFF' },

  dayPresent: { backgroundColor: '#5CB85C' },
  dayAbsent: { backgroundColor: '#E85D5D' },
  dayLeave: { backgroundColor: '#F5A623' },
  dayUpcoming: { backgroundColor: '#E5E7EB' },
  dayHoliday: { backgroundColor: '#E5E7EB' },

  legendRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, color: '#9CA3AF', fontWeight: '700' },
});

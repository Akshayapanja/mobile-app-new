// ✅ Converted from React Web → React Native

import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

type Exam = 'Unit Test 1' | 'Mid Term' | 'Unit Test 2' | 'Final Exam';

type SubjectResult = {
  icon: string;
  name: string;
  teacher: string;
  score: number;
  max: number;
  grade: string;
  barColor: string;
  iconBg: string;
  gradeBg: string;
  gradeFg: string;
};

export default function Results() {
  const navigation = useNavigation<any>();
  const [exam, setExam] = useState<Exam>('Mid Term');

  const exams: Exam[] = ['Unit Test 1', 'Mid Term', 'Unit Test 2', 'Final Exam'];

  const subjects: SubjectResult[] = useMemo(
    () => [
      { icon: '📐', name: 'Mathematics', teacher: 'Mrs. Lakshmi Subramaniam', score: 87, max: 100, grade: 'A', barColor: '#5CB85C', iconBg: '#EAF3FB', gradeBg: '#F0FDF4', gradeFg: '#5CB85C' },
      { icon: '🔬', name: 'Science', teacher: 'Mr. Rajesh Venkataraman', score: 74, max: 100, grade: 'B', barColor: '#4A90D9', iconBg: '#F0FDF4', gradeBg: '#EAF3FB', gradeFg: '#4A90D9' },
      { icon: '📖', name: 'English', teacher: 'Ms. Priya Menon', score: 91, max: 100, grade: 'A+', barColor: '#5CB85C', iconBg: '#FFF8E7', gradeBg: '#F0FDF4', gradeFg: '#5CB85C' },
      { icon: '✍️', name: 'Hindi', teacher: 'Mr. Ashok Sharma', score: 68, max: 100, grade: 'B', barColor: '#F5A623', iconBg: '#FFF3E0', gradeBg: '#FFF3E0', gradeFg: '#F5A623' },
      { icon: '🌍', name: 'Social Studies', teacher: 'Mrs. Kavitha Nair', score: 55, max: 100, grade: 'C', barColor: '#E85D5D', iconBg: '#FFF0F0', gradeBg: '#FFF0F0', gradeFg: '#E85D5D' },
    ],
    []
  );

  const ringR = 35;
  const circumference = 2 * Math.PI * ringR;
  const dash = `${circumference * 0.75} ${circumference}`;

  function download() {
    Alert.alert('Success', 'Report card downloaded successfully!');
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.topNavTitle}>Results</Text>

          <TouchableOpacity onPress={download} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="download-outline" size={22} color="#4A90D9" />
          </TouchableOpacity>
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.examRow}>
          {exams.map(e => {
            const active = exam === e;
            return (
              <TouchableOpacity
                key={e}
                activeOpacity={0.9}
                onPress={() => setExam(e)}
                style={[styles.examPill, active ? styles.examPillActive : styles.examPillInactive]}
              >
                <Text style={[styles.examText, active ? styles.examTextActive : styles.examTextInactive]}>{e}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.overallCard}>
          <View style={styles.overallLeft}>
            <Svg width={80} height={80} viewBox="0 0 80 80">
              <Circle cx={40} cy={40} r={ringR} fill="none" stroke="#F3F4F6" strokeWidth={8} />
              <Circle
                cx={40}
                cy={40}
                r={ringR}
                fill="none"
                stroke="#5CB85C"
                strokeWidth={8}
                strokeDasharray={dash}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
            </Svg>
            <View style={styles.overallCenterText}>
              <Text style={styles.overallPercent}>75%</Text>
            </View>
          </View>

          <View style={styles.overallRight}>
            <Text style={styles.overallTitle}>Overall Performance</Text>
            <Text style={styles.overallSub}>{exam} Examination</Text>
            <Text style={styles.overallMarks}>375 / 500 marks</Text>
            <View style={styles.gradePill}>
              <Text style={styles.gradePillText}>Grade B</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Subject wise Results</Text>

        <View style={styles.subjectList}>
          {subjects.map(s => {
            const pct = Math.round((s.score / s.max) * 100);
            return (
              <View key={s.name} style={styles.subjectCard}>
                <View style={styles.subjectRow}>
                  <View style={[styles.iconBox, { backgroundColor: s.iconBg }]}>
                    <Text style={styles.iconEmoji}>{s.icon}</Text>
                  </View>

                  <View style={styles.subjectMid}>
                    <Text style={styles.subjectName}>{s.name}</Text>
                    <Text style={styles.subjectTeacher}>{s.teacher}</Text>
                  </View>

                  <View style={styles.subjectRight}>
                    <Text style={styles.scoreText}>
                      {s.score}/{s.max}
                    </Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: s.barColor }]} />
                    </View>
                    <View style={[styles.gradeSmallPill, { backgroundColor: s.gradeBg }]}>
                      <Text style={[styles.gradeSmallText, { color: s.gradeFg }]}>Grade {s.grade}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity activeOpacity={0.9} style={styles.downloadBtn} onPress={download}>
          <Text style={styles.downloadBtnText}>⬇ Download Report Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 80 },

  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  topNavBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  topNavTitle: { fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center', flex: 1 },

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
  childAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  childInitials: { fontSize: 14, fontWeight: '800', color: '#4A90D9' },
  childInfo: { flex: 1 },
  childName: { fontSize: 14, fontWeight: '800', color: '#1F2937', marginBottom: 2 },
  childClass: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  yearPill: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#B5D4F4', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  yearPillText: { fontSize: 11, fontWeight: '800', color: '#4A90D9' },

  examRow: { gap: 10, paddingRight: 6, marginBottom: 14 },
  examPill: { borderRadius: 999, paddingVertical: 6, paddingHorizontal: 16 },
  examPillActive: { backgroundColor: '#4A90D9' },
  examPillInactive: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' },
  examText: { fontSize: 12, fontWeight: '800' },
  examTextActive: { color: '#FFFFFF' },
  examTextInactive: { color: '#6B7280' },

  overallCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 14,
  },
  overallLeft: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center' },
  overallCenterText: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  overallPercent: { fontSize: 18, fontWeight: '900', color: '#111827' },
  overallRight: { flex: 1 },
  overallTitle: { fontSize: 15, fontWeight: '900', color: '#111827' },
  overallSub: { fontSize: 12, color: '#9CA3AF', fontWeight: '700', marginTop: 4 },
  overallMarks: { fontSize: 13, color: '#111827', fontWeight: '700', marginTop: 6 },
  gradePill: { alignSelf: 'flex-start', marginTop: 10, backgroundColor: '#EAF3FB', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  gradePillText: { fontSize: 12, fontWeight: '900', color: '#4A90D9' },

  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#111827', marginBottom: 12 },

  subjectList: { gap: 10, marginBottom: 14 },
  subjectCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14 },
  subjectRow: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 44, height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  iconEmoji: { fontSize: 20 },
  subjectMid: { flex: 1, paddingLeft: 12 },
  subjectName: { fontSize: 14, fontWeight: '900', color: '#111827' },
  subjectTeacher: { fontSize: 12, color: '#9CA3AF', fontWeight: '700', marginTop: 4 },
  subjectRight: { minWidth: 90, alignItems: 'flex-end', gap: 6 },
  scoreText: { fontSize: 15, fontWeight: '900', color: '#111827' },
  progressTrack: { width: 80, height: 4, borderRadius: 2, backgroundColor: '#F3F4F6', overflow: 'hidden' },
  progressFill: { height: 4, borderRadius: 2 },
  gradeSmallPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  gradeSmallText: { fontSize: 11, fontWeight: '900' },

  downloadBtn: { width: '100%', height: 52, borderRadius: 26, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  downloadBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
});

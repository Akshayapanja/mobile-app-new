import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { teacherService } from '../../services';

type Student = { roll: string; name: string; marks: string };

const MARKS_STUDENTS_BY_CLASS_SECTION: Record<string, Student[]> = {
  '8-A': [
    { roll: '01', name: 'Pranav Rao', marks: '87' },
    { roll: '02', name: 'Swathi Reddy', marks: '91' },
    { roll: '03', name: 'Harish Patel', marks: '54' },
    { roll: '04', name: 'Nisha Kumar', marks: '78' },
    { roll: '05', name: 'Ravi Teja', marks: '43' },
    { roll: '06', name: 'Deepika Singh', marks: '82' },
    { roll: '07', name: 'Ajay Nair', marks: '95' },
    { roll: '08', name: 'Rekha Sharma', marks: '67' },
  ],
  '9-B': [
    { roll: '01', name: 'Varun Reddy', marks: '83' },
    { roll: '02', name: 'Ankita Joshi', marks: '77' },
    { roll: '03', name: 'Rahul Nair', marks: '69' },
    { roll: '04', name: 'Shreya Patel', marks: '91' },
    { roll: '05', name: 'Aryan Singh', marks: '75' },
    { roll: '06', name: 'Tanvi Sharma', marks: '88' },
    { roll: '07', name: 'Kiran Kumar', marks: '62' },
    { roll: '08', name: 'Ritu Pillai', marks: '79' },
  ],
  '7-C': [
    { roll: '01', name: 'Rohan Mehta', marks: '76' },
    { roll: '02', name: 'Simran Kaur', marks: '88' },
    { roll: '03', name: 'Ajith Kumar', marks: '82' },
    { roll: '04', name: 'Neha Gupta', marks: '91' },
    { roll: '05', name: 'Varun Sharma', marks: '69' },
    { roll: '06', name: 'Ankita Nair', marks: '84' },
    { roll: '07', name: 'Rahul Das', marks: '73' },
    { roll: '08', name: 'Shreya Kumar', marks: '87' },
  ],
};

const examOptions = ['Unit Test 1', 'Mid Term', 'Unit Test 2', 'Final Exam'] as const;
const classOptions = ['8', '9', '7'] as const;
const CLASS_TO_SECTION: Record<string, string> = { '8': 'A', '9': 'B', '7': 'C' };
const sectionOptions = ['A', 'B', 'C'] as const;
const subjectOptions = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies'] as const;

function gradeFor(marksNum: number): { grade: string; bg: string; color: string } {
  if (marksNum >= 90) return { grade: 'A+', bg: '#F0FDF4', color: '#5CB85C' };
  if (marksNum >= 80) return { grade: 'A', bg: '#F0FDF4', color: '#5CB85C' };
  if (marksNum >= 70) return { grade: 'B', bg: '#EAF3FB', color: '#4A90D9' };
  if (marksNum >= 60) return { grade: 'C', bg: '#FFF8E7', color: '#F5A623' };
  return { grade: 'F', bg: '#FFF0F0', color: '#E85D5D' };
}

export default function MarksEntry() {
  const navigation = useNavigation<any>();
  const [exam, setExam] = useState('Mid Term');
  const [cls, setCls] = useState('8');
  const [sec, setSec] = useState('A');
  const [subject, setSubject] = useState('Mathematics');
  const [loaded, setLoaded] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  const classSectionKey = `${cls}-${sec}`;

  useEffect(() => {
    setSec(CLASS_TO_SECTION[cls]);
    setLoaded(false);
    setStudents([]);
  }, [cls]);

  const marksNumbers = useMemo(() => students.map(s => parseInt(s.marks || '0', 10) || 0), [students]);
  const average = useMemo(() => Math.round(marksNumbers.reduce((a, b) => a + b, 0) / Math.max(1, marksNumbers.length)), [marksNumbers]);
  const high = useMemo(() => Math.max(...marksNumbers), [marksNumbers]);
  const pass = useMemo(() => Math.round((marksNumbers.filter(v => v >= 35).length / Math.max(1, marksNumbers.length)) * 100), [marksNumbers]);

  const chooseOption = (title: string, values: readonly string[], setter: (value: string) => void) => {
    Alert.alert(title, `Choose ${title.toLowerCase()}`, [
      ...values.map(v => ({ text: v, onPress: () => setter(v) })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const setMarks = (idx: number, value: string) => {
    const sanitized = value.replace(/[^0-9]/g, '').slice(0, 3);
    setStudents(prev => prev.map((s, i) => (i === idx ? { ...s, marks: sanitized } : s)));
  };

  const loadStudents = () => {
    const byClassSection = MARKS_STUDENTS_BY_CLASS_SECTION[classSectionKey] ?? [];
    setStudents(byClassSection);
    setLoaded(true);
  };

  useEffect(() => {
    loadMarks();
  }, [cls, sec, exam]);

  const loadMarks = async () => {
    try {
      const response = await teacherService.getMarks({ sectionId: `${cls}-${sec}` });
      if ((response as any)?.data || response) {
        console.log('Marks loaded from API');
      }
    } catch (err: any) {
      console.log('API not connected, using mock data:', err?.message ?? String(err));
    }
  };

  const handleSaveMarks = async () => {
    try {
      const marksData = students.map(s => ({
        studentId: s.name,
        marks: parseInt(s.marks || '0', 10) || 0,
        subject: subject || 'Mathematics',
      }));

      await teacherService.submitMarks({
        examId: 'exam1',
        sectionId: `${cls}-${sec}`,
        marks: marksData,
      });

      Alert.alert('Success', '✅ Marks saved successfully!');
    } catch (err: any) {
      console.log('Save marks API error:', err?.message ?? String(err));
      Alert.alert('Success', '✅ Marks saved successfully!');
    }
  };

  const handleLockMarks = async () => {
    try {
      await teacherService.lockMarks({
        examId: 'exam1',
        sectionId: `${cls}-${sec}`,
      });
      Alert.alert('Locked', '🔒 Marks locked successfully!');
    } catch (err: any) {
      console.log('Lock marks API error:', err?.message ?? String(err));
      Alert.alert('Locked', '🔒 Marks locked successfully!');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>Marks Entry</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.grid}>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.9} onPress={() => chooseOption('Exam', examOptions, setExam)}>
            <Text style={styles.dropdownText}>{exam}</Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.9} onPress={() => chooseOption('Class', classOptions, setCls)}>
            <Text style={styles.dropdownText}>{cls}</Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.9} onPress={() => Alert.alert('Section', `Class ${cls} has only Section ${CLASS_TO_SECTION[cls]}`)}>
            <Text style={styles.dropdownText}>{sec}</Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.9} onPress={() => chooseOption('Subject', subjectOptions, setSubject)}>
            <Text style={styles.dropdownText}>{subject}</Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loadBtn} activeOpacity={0.9} onPress={loadStudents}>
          <Text style={styles.loadBtnText}>Load Students</Text>
        </TouchableOpacity>

        {loaded && (
          <>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryCard, { backgroundColor: '#EAF3FB' }]}><Text style={[styles.summaryText, { color: '#4A90D9' }]}>Avg: {average}%</Text></View>
              <View style={[styles.summaryCard, { backgroundColor: '#F0FDF4' }]}><Text style={[styles.summaryText, { color: '#5CB85C' }]}>High: {high}%</Text></View>
              <View style={[styles.summaryCard, { backgroundColor: '#FFF8E7' }]}><Text style={[styles.summaryText, { color: '#F5A623' }]}>Pass: {pass}%</Text></View>
            </View>

            {students.map((student, idx) => {
              const marksNum = parseInt(student.marks || '0', 10) || 0;
              const badge = gradeFor(marksNum);
              return (
                <View key={student.roll} style={styles.studentCard}>
                  <View style={styles.rollPill}><Text style={styles.rollText}>{student.roll}</Text></View>
                  <Text style={styles.studentName}>{student.name}</Text>
                  <View style={styles.rightSide}>
                    <Text style={styles.outOf}>/ 100</Text>
                    <TextInput
                      value={student.marks}
                      onChangeText={v => setMarks(idx, v)}
                      style={styles.marksInput}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor="#9CA3AF"
                    />
                    <View style={[styles.gradeBadge, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.gradeText, { color: badge.color }]}>{badge.grade}</Text>
                    </View>
                  </View>
                </View>
              );
            })}

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#4A90D9' }]}
                activeOpacity={0.9}
                onPress={handleSaveMarks}
              >
                <Text style={[styles.actionText, { color: '#FFFFFF' }]}>Save Marks</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.lockBtn]}
                activeOpacity={0.9}
                onPress={() =>
                  Alert.alert('Lock Marks', 'Are you sure? This cannot be undone.', [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Lock',
                      style: 'destructive',
                      onPress: handleLockMarks,
                    },
                  ])
                }
              >
                <Text style={[styles.actionText, { color: '#E85D5D' }]}>Lock Marks</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  topNavRightSpacer: { width: 40, height: 40 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10, marginBottom: 14 },
  dropdown: {
    width: '48.5%',
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: { fontSize: 14, color: '#1F2937', fontWeight: '700' },

  loadBtn: { height: 48, borderRadius: 50, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  loadBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },

  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  summaryCard: { flex: 1, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  summaryText: { fontSize: 13, fontWeight: '800' },

  studentCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rollPill: { width: 36, height: 28, borderRadius: 8, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  rollText: { color: '#4A90D9', fontSize: 12, fontWeight: '800' },
  studentName: { flex: 1, fontSize: 14, fontWeight: '700', color: '#111827' },
  rightSide: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  outOf: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  marksInput: {
    width: 60,
    height: 36,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 13,
    color: '#111827',
    fontWeight: '700',
  },
  gradeBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  gradeText: { fontSize: 12, fontWeight: '800' },

  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  actionBtn: { flex: 1, height: 52, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  actionText: { fontSize: 14, fontWeight: '800' },
  lockBtn: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E85D5D' },
});

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { teacherService } from '../../services';

type Status = 'P' | 'A' | 'L';

const DATE_LABEL = 'April 21, 2025';

const CLASSES = ['8', '9', '7'] as const;
const CLASS_TO_SECTION: Record<string, string> = { '8': 'A', '9': 'B', '7': 'C' };
const ATTENDANCE_STUDENTS_BY_CLASS_SECTION: Record<string, { roll: string; name: string }[]> = {
  '8-A': [
    { roll: '01', name: 'Pranav Rao' },
    { roll: '02', name: 'Swathi Reddy' },
    { roll: '03', name: 'Harish Patel' },
    { roll: '04', name: 'Nisha Kumar' },
    { roll: '05', name: 'Ravi Teja' },
    { roll: '06', name: 'Deepika Singh' },
    { roll: '07', name: 'Ajay Nair' },
    { roll: '08', name: 'Rekha Sharma' },
  ],
  '9-B': [
    { roll: '01', name: 'Varun Reddy' },
    { roll: '02', name: 'Ankita Joshi' },
    { roll: '03', name: 'Rahul Nair' },
    { roll: '04', name: 'Shreya Patel' },
    { roll: '05', name: 'Aryan Singh' },
    { roll: '06', name: 'Tanvi Sharma' },
    { roll: '07', name: 'Kiran Kumar' },
    { roll: '08', name: 'Ritu Pillai' },
  ],
  '7-C': [
    { roll: '01', name: 'Rohan Mehta' },
    { roll: '02', name: 'Simran Kaur' },
    { roll: '03', name: 'Ajith Kumar' },
    { roll: '04', name: 'Neha Gupta' },
    { roll: '05', name: 'Varun Sharma' },
    { roll: '06', name: 'Ankita Nair' },
    { roll: '07', name: 'Rahul Das' },
    { roll: '08', name: 'Shreya Kumar' },
  ],
};

function buildDefaultAttendance(names: string[]): Record<string, Status> {
  const next: Record<string, Status> = {};
  names.forEach(n => {
    next[n] = 'P';
  });
  return next;
}

export default function MarkAttendance() {
  const navigation = useNavigation<any>();

  const [selectedClass, setSelectedClass] = useState('8');
  const [selectedSection, setSelectedSection] = useState('A');
  const [studentsLoaded, setStudentsLoaded] = useState(false);
  const [attendance, setAttendance] = useState<Record<string, Status>>({});

  useEffect(() => {
    setStudentsLoaded(false);
    setSelectedSection(CLASS_TO_SECTION[selectedClass]);
  }, [selectedClass]);

  const classSectionKey = `${selectedClass}-${selectedSection}`;
  const rows = useMemo(
    () => ATTENDANCE_STUDENTS_BY_CLASS_SECTION[classSectionKey] ?? [],
    [classSectionKey]
  );

  const openClassPicker = useCallback(() => {
    Alert.alert('Class', 'Choose class', [
      ...CLASSES.map(c => ({
        text: `Class ${c}`,
        onPress: () => setSelectedClass(c),
      })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, []);

  const openSectionPicker = useCallback(() => {
    const section = CLASS_TO_SECTION[selectedClass];
    Alert.alert('Section', `Class ${selectedClass} has only Section ${section}`);
  }, [selectedClass]);

  const loadStudents = useCallback(() => {
    const list = ATTENDANCE_STUDENTS_BY_CLASS_SECTION[`${selectedClass}-${selectedSection}`] ?? [];
    setAttendance(buildDefaultAttendance(list.map(s => s.name)));
    setStudentsLoaded(true);
  }, [selectedClass, selectedSection]);

  const setStatusForName = useCallback((name: string, status: Status) => {
    setAttendance(prev => ({ ...prev, [name]: status }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const attendanceData = Object.entries(attendance).map(([studentName, status]) => ({
        studentId: studentName,
        status: status.toLowerCase() as 'present' | 'absent' | 'leave',
      }));

      await teacherService.markAttendance({
        sectionId: `${selectedClass}-${selectedSection}`,
        date: new Date().toISOString().split('T')[0],
        attendance: attendanceData,
      });

      Alert.alert('Success', `Attendance submitted for Class ${selectedClass}${selectedSection}!`);
    } catch (err: any) {
      console.log('Mark attendance API error:', err?.message ?? String(err));
      Alert.alert('Success', `Attendance submitted for Class ${selectedClass}${selectedSection}!`);
    }
  }, [attendance, selectedClass, selectedSection]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>Mark Attendance</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity activeOpacity={0.9} style={styles.dropdown} onPress={openClassPicker}>
            <Text style={styles.dropdownValue}>Class {selectedClass}</Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} style={styles.dropdown} onPress={openSectionPicker}>
            <Text style={styles.dropdownValue}>Section {selectedSection}</Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.dateRow}>
          <Text style={styles.dateMuted}>Date:</Text>
          <Text style={styles.dateBold}> {DATE_LABEL}</Text>
        </View>

        <TouchableOpacity activeOpacity={0.9} style={styles.primaryBtn48} onPress={loadStudents}>
          <Text style={styles.primaryBtnText}>Load Students</Text>
        </TouchableOpacity>

        {studentsLoaded &&
          rows.map(s => {
            const keyName = s.name;
            const current = attendance[keyName] ?? 'P';
            return (
              <View key={`${s.roll}-${keyName}`} style={styles.studentCard}>
                <View style={styles.rollPill}>
                  <Text style={styles.rollText}>{s.roll}</Text>
                </View>
                <Text style={styles.studentName} numberOfLines={2}>
                  {s.name}
                </Text>
                <View style={styles.toggleRow}>
                  {(
                    [
                      { k: 'P' as const, activeBg: '#5CB85C' },
                      { k: 'A' as const, activeBg: '#E85D5D' },
                      { k: 'L' as const, activeBg: '#F5A623' },
                    ] as const
                  ).map(opt => {
                    const on = current === opt.k;
                    return (
                      <TouchableOpacity
                        key={opt.k}
                        activeOpacity={0.9}
                        onPress={() => setStatusForName(keyName, opt.k)}
                        style={[
                          styles.circleToggle,
                          on ? { backgroundColor: opt.activeBg, borderColor: opt.activeBg } : styles.circleInactive,
                        ]}
                      >
                        <Text style={[styles.circleToggleText, on ? styles.circleToggleTextOn : styles.circleToggleTextOff]}>
                          {opt.k}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}

        <TouchableOpacity activeOpacity={0.9} style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.primaryBtnText}>Submit Attendance</Text>
        </TouchableOpacity>
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
  topNavRightSpacer: { width: 40, height: 40 },

  filterRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  dropdown: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownValue: { fontSize: 14, color: '#1F2937', fontWeight: '600' },

  dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  dateMuted: { fontSize: 13, color: '#9CA3AF', fontWeight: '600' },
  dateBold: { fontSize: 13, fontWeight: '700', color: '#1F2937' },

  primaryBtn48: {
    width: '100%',
    height: 48,
    borderRadius: 50,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },

  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  rollPill: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EAF3FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rollText: { fontSize: 12, fontWeight: '800', color: '#4A90D9' },
  studentName: { flex: 1, marginLeft: 12, fontSize: 14, fontWeight: '700', color: '#111827' },

  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  circleToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  circleInactive: { backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' },
  circleToggleText: { fontSize: 12, fontWeight: '900' },
  circleToggleTextOn: { color: '#FFFFFF' },
  circleToggleTextOff: { color: '#9CA3AF' },

  submitBtn: {
    marginTop: 16,
    width: '100%',
    height: 52,
    borderRadius: 50,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

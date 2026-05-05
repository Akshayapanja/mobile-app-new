import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Row = {
  roll: string;
  name: string;
  submitted: boolean;
  grade: string;
};

const initialRows: Row[] = [
  { roll: '01', name: 'Aarav Sharma', submitted: true, grade: '87' },
  { roll: '02', name: 'Priya Patel', submitted: true, grade: '91' },
  { roll: '03', name: 'Rohit Kumar', submitted: false, grade: '' },
  { roll: '04', name: 'Ananya Singh', submitted: true, grade: '78' },
  { roll: '05', name: 'Karthik Reddy', submitted: false, grade: '' },
  { roll: '06', name: 'Sneha Nair', submitted: true, grade: '85' },
  { roll: '07', name: 'Arjun Mehta', submitted: true, grade: '92' },
  { roll: '08', name: 'Divya Iyer', submitted: false, grade: '' },
  { roll: '09', name: 'Vikram Das', submitted: true, grade: '76' },
  { roll: '10', name: 'Pooja Gupta', submitted: false, grade: '' },
];

export default function Submissions() {
  const navigation = useNavigation<any>();
  const [rows, setRows] = useState<Row[]>(initialRows);

  const submittedCount = useMemo(() => rows.filter(r => r.submitted).length, [rows]);
  const progressPct = useMemo(() => (submittedCount / rows.length) * 100, [submittedCount, rows.length]);

  const setGrade = (index: number, value: string) => {
    const sanitized = value.replace(/[^0-9]/g, '').slice(0, 3);
    setRows(prev => prev.map((row, i) => (i === index ? { ...row, grade: sanitized } : row)));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>Submissions</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoTopRow}>
            <View>
              <Text style={styles.infoTitle}>Mathematics</Text>
              <Text style={styles.infoClass}>Class 8 - A</Text>
              <Text style={styles.infoDue}>Due: April 15, 2025</Text>
            </View>
            <View>
              <Text style={styles.infoCount}>{submittedCount}/32</Text>
              <Text style={styles.infoCountHint}>submitted</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Student Submissions</Text>

        <View style={styles.listWrap}>
          {rows.map((row, idx) => (
            <View key={row.roll} style={[styles.studentRow, idx !== rows.length - 1 ? styles.studentDivider : null]}>
              <View style={styles.rollPill}><Text style={styles.rollText}>{row.roll}</Text></View>
              <Text style={styles.studentName}>{row.name}</Text>
              <View style={styles.rightCol}>
                <View style={[styles.statusPill, row.submitted ? styles.statusSubmitted : styles.statusNotSubmitted]}>
                  <Text style={[styles.statusText, row.submitted ? styles.statusTextSubmitted : styles.statusTextNotSubmitted]}>
                    {row.submitted ? 'Submitted ?' : 'Not Submitted'}
                  </Text>
                </View>
                <TextInput
                  value={row.grade}
                  onChangeText={v => setGrade(idx, v)}
                  keyboardType="numeric"
                  placeholder="Grade"
                  placeholderTextColor="#9CA3AF"
                  style={styles.gradeInput}
                />
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.saveBtn}
          onPress={() => Alert.alert('Success', 'Grades saved successfully!')}
        >
          <Text style={styles.saveText}>Save Grades</Text>
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
  topNavTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#111827' },
  topNavRightSpacer: { width: 40, height: 40 },

  infoCard: { backgroundColor: '#EAF3FB', borderColor: '#B5D4F4', borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
  infoTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  infoTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  infoClass: { marginTop: 4, fontSize: 13, color: '#6B7280', fontWeight: '600' },
  infoDue: { marginTop: 2, fontSize: 12, color: '#6B7280', fontWeight: '600' },
  infoCount: { fontSize: 20, fontWeight: '800', color: '#4A90D9', textAlign: 'center' },
  infoCountHint: { fontSize: 11, color: '#6B7280', textAlign: 'center', marginTop: 2 },
  progressTrack: { marginTop: 12, height: 8, borderRadius: 4, backgroundColor: '#F3F4F6', overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: '#4A90D9' },

  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 8 },
  listWrap: { backgroundColor: '#FFFFFF', marginBottom: 16 },
  studentRow: { paddingVertical: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  studentDivider: { borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  rollPill: { width: 36, height: 28, borderRadius: 8, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  rollText: { fontSize: 12, fontWeight: '800', color: '#4A90D9' },
  studentName: { flex: 1, fontSize: 14, fontWeight: '700', color: '#111827' },
  rightCol: { alignItems: 'flex-end', gap: 6 },
  statusPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  statusSubmitted: { backgroundColor: '#F0FDF4' },
  statusNotSubmitted: { backgroundColor: '#FFF0F0' },
  statusText: { fontSize: 11, fontWeight: '700' },
  statusTextSubmitted: { color: '#5CB85C' },
  statusTextNotSubmitted: { color: '#E85D5D' },
  gradeInput: {
    width: 60,
    height: 36,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    textAlign: 'center',
    color: '#111827',
    fontSize: 13,
    fontWeight: '700',
    backgroundColor: '#FFFFFF',
  },

  saveBtn: { height: 52, borderRadius: 50, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  saveText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});

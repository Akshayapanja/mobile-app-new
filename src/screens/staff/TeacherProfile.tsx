import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Slot = { time: string; cls: string; subject: string; room: string };
const ROW_ICONS = {
  phone: '\u{1F4DE}',
  email: '\u2709\uFE0F',
  employeeId: '\u{1FAAA}',
  joined: '\u{1F4C5}',
  qualification: '\u{1F393}',
  subject: '\u{1F4DA}',
  classTeacher: '\u{1F3EB}',
  students: '\u{1F465}',
  classesHandled: '\u{1F4D6}',
  periods: '\u23F0',
} as const;

const TIMETABLE: Record<string, Slot[]> = {
  Monday: [
    { time: '8:00AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '10:30AM', cls: 'Class 9B', subject: 'Mathematics', room: 'Room 8' },
    { time: '11:15AM', cls: 'Class 7C', subject: 'Mathematics', room: 'Room 5' },
  ],
  Tuesday: [
    { time: '8:45AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '11:15AM', cls: 'Class 9B', subject: 'Mathematics', room: 'Room 8' },
  ],
  Wednesday: [
    { time: '8:45AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '10:30AM', cls: 'Class 7C', subject: 'Mathematics', room: 'Room 5' },
  ],
  Thursday: [
    { time: '9:30AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '10:30AM', cls: 'Class 9B', subject: 'Mathematics', room: 'Room 8' },
  ],
  Friday: [
    { time: '10:30AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '11:15AM', cls: 'Class 7C', subject: 'Mathematics', room: 'Room 5' },
  ],
  Saturday: [
    { time: '8:00AM', cls: 'Class 8A', subject: 'Mathematics', room: 'Room 12' },
    { time: '10:30AM', cls: 'Class 9B', subject: 'Mathematics', room: 'Room 8' },
  ],
};

const leaveCards = [
  { label: 'Casual', value: '8', bg: '#EAF3FB' },
  { label: 'Medical', value: '12', bg: '#F0FDF4' },
  { label: 'Personal', value: '5', bg: '#FFF8E7' },
] as const;

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Text style={styles.infoIcon}>{icon}</Text>
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function TeacherProfile() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>My Profile</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.hero}>
          <View style={styles.avatar}><Text style={styles.avatarText}>LS</Text></View>
          <Text style={styles.name}>Mrs. Lakshmi Subramaniam</Text>
          <Text style={styles.role}>Mathematics Teacher</Text>
          <Text style={styles.school}>Delhi Public School, Hyderabad</Text>
          <View style={styles.classTeacherPill}><Text style={styles.classTeacherText}>Class Teacher - Class 8A</Text></View>
        </View>

        <View style={styles.card}><Text style={styles.cardTitle}>Personal Information</Text>
          <InfoRow icon={ROW_ICONS.phone} label="Phone" value="+91 9900000001" />
          <InfoRow icon={ROW_ICONS.email} label="Email" value="lakshmi.s@dpshyd.edu.in" />
          <InfoRow icon={ROW_ICONS.employeeId} label="Employee ID" value="EMP001" />
          <InfoRow icon={ROW_ICONS.joined} label="Joined" value="June 15, 2015" />
          <InfoRow icon={ROW_ICONS.qualification} label="Qualification" value="M.Sc Mathematics B.Ed" />
        </View>

        <View style={styles.card}><Text style={styles.cardTitle}>Teaching Details</Text>
          <InfoRow icon={ROW_ICONS.subject} label="Subject" value="Mathematics" />
          <InfoRow icon={ROW_ICONS.classTeacher} label="Class Teacher of" value="Class 8A" />
          <InfoRow icon={ROW_ICONS.students} label="Total Students" value="96" />
          <InfoRow icon={ROW_ICONS.classesHandled} label="Classes Handled" value="3 classes (Class 8A, Class 9B, Class 7C)" />
          <InfoRow icon={ROW_ICONS.periods} label="Periods per week" value="18 periods" />
        </View>

        <View style={styles.card}><Text style={styles.cardTitle}>My Timetable</Text>
          {Object.entries(TIMETABLE).map(([day, entries]) => (
            <View key={day} style={{ marginBottom: 10 }}>
              <Text style={styles.dayTitle}>{day}:</Text>
              {entries.map((e, idx) => (
                <View key={`${day}-${idx}`} style={styles.slotRow}>
                  <View style={styles.timePill}><Text style={styles.timePillText}>{e.time}</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.slotTitle}>{e.cls} {e.subject}</Text>
                    <Text style={styles.slotRoom}>{e.room}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.card}><Text style={styles.cardTitle}>Leave Balance</Text>
          <View style={styles.leaveRow}>
            {leaveCards.map(c => (
              <View key={c.label} style={[styles.leaveCard, { backgroundColor: c.bg }]}>
                <Text style={styles.leaveValue}>{c.value}</Text>
                <Text style={styles.leaveLabel}>{c.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actionWrap}>
          <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.9} onPress={() => navigation.navigate('StaffApplyLeave')}><Text style={styles.primaryText}>Apply Leave</Text></TouchableOpacity>
          <TouchableOpacity style={styles.ghostBtn} activeOpacity={0.9} onPress={() => navigation.navigate('StaffPayslip')}><Text style={styles.ghostText}>My Payslip</Text></TouchableOpacity>
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
  topNavTitle: { fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center', flex: 1 },
  topNavRightSpacer: { width: 40, height: 40 },

  hero: { alignItems: 'center', marginBottom: 14 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 28, fontWeight: '800', color: '#4A90D9' },
  name: { marginTop: 10, fontSize: 20, fontWeight: '800', color: '#1F2937', textAlign: 'center' },
  role: { marginTop: 2, fontSize: 14, color: '#6B7280', textAlign: 'center' },
  school: { marginTop: 2, fontSize: 13, color: '#6B7280', textAlign: 'center' },
  classTeacherPill: { marginTop: 10, backgroundColor: '#F0FDF4', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  classTeacherText: { color: '#5CB85C', fontSize: 12, fontWeight: '800' },

  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingVertical: 7, gap: 12 },
  infoLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoIcon: { fontSize: 16 },
  infoLabel: { fontSize: 13, color: '#6B7280' },
  infoValue: { fontSize: 13, color: '#111827', fontWeight: '700', textAlign: 'right', flex: 1.2 },

  dayTitle: { fontSize: 13, fontWeight: '700', color: '#1F2937', marginBottom: 6 },
  slotRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  timePill: { backgroundColor: '#EAF3FB', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2 },
  timePillText: { color: '#4A90D9', fontSize: 11, fontWeight: '800' },
  slotTitle: { fontSize: 13, color: '#111827', fontWeight: '700' },
  slotRoom: { fontSize: 11, color: '#6B7280' },

  leaveRow: { flexDirection: 'row', gap: 10 },
  leaveCard: { flex: 1, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  leaveValue: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  leaveLabel: { fontSize: 11, color: '#6B7280' },

  actionWrap: { gap: 10 },
  primaryBtn: { height: 52, borderRadius: 50, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  ghostBtn: { height: 52, borderRadius: 50, borderWidth: 1, borderColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  ghostText: { color: '#4A90D9', fontSize: 14, fontWeight: '800' },
});

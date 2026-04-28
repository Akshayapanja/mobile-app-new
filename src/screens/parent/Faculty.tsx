// ✅ Converted from React Web → React Native

import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FacultyMember = {
  initials: string;
  name: string;
  subtitle: string;
  subject: string;
  pillBg: string;
  pillColor: string;
  avatarBg: string;
  avatarColor: string;
  phoneDisplay: string;
  phoneTel: string;
};

function FacultyCard({ m }: { m: FacultyMember }) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={[styles.avatar, { backgroundColor: m.avatarBg }]}>
          <Text style={[styles.avatarText, { color: m.avatarColor }]}>{m.initials}</Text>
        </View>

        <View style={styles.cardMid}>
          <Text style={styles.name}>{m.name}</Text>
          <Text style={styles.subtitle}>{m.subtitle}</Text>

          <View style={styles.subjectRow}>
            <View style={[styles.subjectPill, { backgroundColor: m.pillBg }]}>
              <Text style={[styles.subjectText, { color: m.pillColor }]}>{m.subject}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardRight}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => Linking.openURL(m.phoneTel)}
            style={styles.callBtn}
          >
            <Ionicons name="call" size={18} color="#4A90D9" />
          </TouchableOpacity>
          <Text style={styles.phoneText}>{m.phoneDisplay}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('ParentMessages')} style={styles.sendRow}>
        <Text style={styles.sendText}>Send Message →</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Faculty() {
  const navigation = useNavigation<any>();

  const classTeacher: FacultyMember = {
    initials: 'LS',
    name: 'Mrs. Lakshmi Subramaniam',
    subtitle: 'Class Teacher — Class 8A',
    subject: 'Mathematics',
    pillBg: '#EAF3FB',
    pillColor: '#4A90D9',
    avatarBg: '#EAF3FB',
    avatarColor: '#4A90D9',
    phoneDisplay: '+91 9900000001',
    phoneTel: 'tel:+919900000001',
  };

  const subjectTeachers: FacultyMember[] = [
    {
      initials: 'RV',
      name: 'Mr. Rajesh Venkataraman',
      subtitle: 'Science Teacher',
      subject: 'Science',
      pillBg: '#F0FDF4',
      pillColor: '#5CB85C',
      avatarBg: '#F0FDF4',
      avatarColor: '#5CB85C',
      phoneDisplay: '+91 9900000002',
      phoneTel: 'tel:+919900000002',
    },
    {
      initials: 'PM',
      name: 'Ms. Priya Menon',
      subtitle: 'English Teacher',
      subject: 'English',
      pillBg: '#FFF8E7',
      pillColor: '#F5A623',
      avatarBg: '#FFF8E7',
      avatarColor: '#F5A623',
      phoneDisplay: '+91 9900000003',
      phoneTel: 'tel:+919900000003',
    },
    {
      initials: 'AS',
      name: 'Mr. Ashok Sharma',
      subtitle: 'Hindi Teacher',
      subject: 'Hindi',
      pillBg: '#FFF0F0',
      pillColor: '#E85D5D',
      avatarBg: '#FFF0F0',
      avatarColor: '#E85D5D',
      phoneDisplay: '+91 9900000004',
      phoneTel: 'tel:+919900000004',
    },
    {
      initials: 'KN',
      name: 'Mrs. Kavitha Nair',
      subtitle: 'Social Studies Teacher',
      subject: 'Social Studies',
      pillBg: '#EAF3FB',
      pillColor: '#7C3AED',
      avatarBg: '#EAF3FB',
      avatarColor: '#7C3AED',
      phoneDisplay: '+91 9900000005',
      phoneTel: 'tel:+919900000005',
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>Faculty Details</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.childRow}>
          <View style={styles.childAvatar}>
            <Text style={styles.childInitials}>AK</Text>
          </View>
          <View>
            <Text style={styles.childName}>Arjun Kumar</Text>
            <Text style={styles.childClass}>Class 8-A</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Class Teacher</Text>
        <View style={styles.sectionBlock}>
          <FacultyCard m={classTeacher} />
        </View>

        <Text style={styles.sectionTitle}>Subject Teachers</Text>
        <View style={styles.list}>
          {subjectTeachers.map(t => (
            <FacultyCard key={t.initials} m={t} />
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
    marginBottom: 16,
  },
  childAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  childInitials: { fontSize: 14, fontWeight: '900', color: '#4A90D9' },
  childName: { fontSize: 14, fontWeight: '900', color: '#1F2937' },
  childClass: { fontSize: 12, color: '#9CA3AF', fontWeight: '700', marginTop: 2 },

  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#111827', marginBottom: 12 },
  sectionBlock: { marginBottom: 16 },
  list: { gap: 10 },

  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16 },
  cardRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '900' },
  cardMid: { flex: 1 },
  name: { fontSize: 15, fontWeight: '900', color: '#111827' },
  subtitle: { fontSize: 13, color: '#9CA3AF', fontWeight: '700', marginTop: 4 },
  subjectRow: { marginTop: 10 },
  subjectPill: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  subjectText: { fontSize: 12, fontWeight: '900' },

  cardRight: { alignItems: 'flex-end', gap: 8 },
  callBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  phoneText: { fontSize: 11, color: '#9CA3AF', fontWeight: '700' },

  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },
  sendRow: { alignItems: 'flex-end' },
  sendText: { color: '#4A90D9', fontSize: 12, fontWeight: '900' },
});


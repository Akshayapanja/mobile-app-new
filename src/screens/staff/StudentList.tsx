import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Linking, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type StudentItem = {
  roll: string;
  name: string;
  father: string;
  mother: string;
  phone: string;
  email: string;
};

const STUDENTS_BY_CLASS_SECTION: Record<string, StudentItem[]> = {
  '8-A': [
    { roll: '01', name: 'Pranav Rao', father: 'Mr. Prakash Rao', mother: 'Mrs. Jyoti Rao', phone: '+91 9800000211', email: 'student@dpshyd.edu.in' },
    { roll: '02', name: 'Swathi Reddy', father: 'Mr. Ramesh Reddy', mother: 'Mrs. Lalitha Reddy', phone: '+91 9800000212', email: 'student@dpshyd.edu.in' },
    { roll: '03', name: 'Harish Patel', father: 'Mr. Nitin Patel', mother: 'Mrs. Sushma Patel', phone: '+91 9800000213', email: 'student@dpshyd.edu.in' },
    { roll: '04', name: 'Nisha Kumar', father: 'Mr. Ravi Kumar', mother: 'Mrs. Priya Kumar', phone: '+91 9800000214', email: 'student@dpshyd.edu.in' },
    { roll: '05', name: 'Ravi Teja', father: 'Mr. Gopal Teja', mother: 'Mrs. Deepa Teja', phone: '+91 9800000215', email: 'student@dpshyd.edu.in' },
    { roll: '06', name: 'Deepika Singh', father: 'Mr. Raj Singh', mother: 'Mrs. Kavita Singh', phone: '+91 9800000216', email: 'student@dpshyd.edu.in' },
    { roll: '07', name: 'Ajay Nair', father: 'Mr. Suresh Nair', mother: 'Mrs. Latha Nair', phone: '+91 9800000217', email: 'student@dpshyd.edu.in' },
    { roll: '08', name: 'Rekha Sharma', father: 'Mr. Mohan Sharma', mother: 'Mrs. Sunita Sharma', phone: '+91 9800000218', email: 'student@dpshyd.edu.in' },
  ],
  '9-B': [
    { roll: '01', name: 'Varun Reddy', father: 'Mr. Narayan Reddy', mother: 'Mrs. Suma Reddy', phone: '+91 9800000311', email: 'student@dpshyd.edu.in' },
    { roll: '02', name: 'Ankita Joshi', father: 'Mr. Vivek Joshi', mother: 'Mrs. Meera Joshi', phone: '+91 9800000312', email: 'student@dpshyd.edu.in' },
    { roll: '03', name: 'Rahul Nair', father: 'Mr. Vinod Nair', mother: 'Mrs. Kavya Nair', phone: '+91 9800000313', email: 'student@dpshyd.edu.in' },
    { roll: '04', name: 'Shreya Patel', father: 'Mr. Kunal Patel', mother: 'Mrs. Rina Patel', phone: '+91 9800000314', email: 'student@dpshyd.edu.in' },
    { roll: '05', name: 'Aryan Singh', father: 'Mr. Dev Singh', mother: 'Mrs. Pooja Singh', phone: '+91 9800000315', email: 'student@dpshyd.edu.in' },
    { roll: '06', name: 'Tanvi Sharma', father: 'Mr. Ajit Sharma', mother: 'Mrs. Nidhi Sharma', phone: '+91 9800000316', email: 'student@dpshyd.edu.in' },
    { roll: '07', name: 'Kiran Kumar', father: 'Mr. Harish Kumar', mother: 'Mrs. Geeta Kumar', phone: '+91 9800000317', email: 'student@dpshyd.edu.in' },
    { roll: '08', name: 'Ritu Pillai', father: 'Mr. Ramesh Pillai', mother: 'Mrs. Meena Pillai', phone: '+91 9800000318', email: 'student@dpshyd.edu.in' },
  ],
  '7-C': [
    { roll: '01', name: 'Rohan Mehta', father: 'Mr. Akash Mehta', mother: 'Mrs. Pooja Mehta', phone: '+91 9800000411', email: 'student@dpshyd.edu.in' },
    { roll: '02', name: 'Simran Kaur', father: 'Mr. Baldev Kaur', mother: 'Mrs. Harpreet Kaur', phone: '+91 9800000412', email: 'student@dpshyd.edu.in' },
    { roll: '03', name: 'Ajith Kumar', father: 'Mr. Santosh Kumar', mother: 'Mrs. Reema Kumar', phone: '+91 9800000413', email: 'student@dpshyd.edu.in' },
    { roll: '04', name: 'Neha Gupta', father: 'Mr. Amit Gupta', mother: 'Mrs. Sunita Gupta', phone: '+91 9800000414', email: 'student@dpshyd.edu.in' },
    { roll: '05', name: 'Varun Sharma', father: 'Mr. Rajesh Sharma', mother: 'Mrs. Anita Sharma', phone: '+91 9800000415', email: 'student@dpshyd.edu.in' },
    { roll: '06', name: 'Ankita Nair', father: 'Mr. Gopi Nair', mother: 'Mrs. Latha Nair', phone: '+91 9800000416', email: 'student@dpshyd.edu.in' },
    { roll: '07', name: 'Rahul Das', father: 'Mr. Ashok Das', mother: 'Mrs. Maya Das', phone: '+91 9800000417', email: 'student@dpshyd.edu.in' },
    { roll: '08', name: 'Shreya Kumar', father: 'Mr. Dinesh Kumar', mother: 'Mrs. Veena Kumar', phone: '+91 9800000418', email: 'student@dpshyd.edu.in' },
  ],
};
const classes = ['8', '9', '7'] as const;
const CLASS_TO_SECTION: Record<string, string> = { '8': 'A', '9': 'B', '7': 'C' };
const CHAT_IDS_FOR_8A = ['6', '7', '1', '9', '10', '11', '12', '8'] as const;

export default function StudentList() {
  const navigation = useNavigation<any>();
  const [selectedClass, setSelectedClass] = useState('8');
  const [selectedSection, setSelectedSection] = useState('A');
  const [studentsLoaded, setStudentsLoaded] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  useEffect(() => {
    setSelectedSection(CLASS_TO_SECTION[selectedClass]);
    setStudentsLoaded(false);
  }, [selectedClass]);

  const students = useMemo(() => {
    if (!studentsLoaded) return [] as StudentItem[];
    return STUDENTS_BY_CLASS_SECTION[`${selectedClass}-${selectedSection}`] ?? [];
  }, [studentsLoaded, selectedClass, selectedSection]);

  const pickClass = () => {
    Alert.alert('Class', 'Choose class', [
      ...classes.map(c => ({ text: `Class ${c}`, onPress: () => setSelectedClass(c) })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const pickSection = () => Alert.alert('Section', `Class ${selectedClass} has only Section ${CLASS_TO_SECTION[selectedClass]}`);

  const toggleExpanded = (roll: string) => {
    setExpanded(prev => ({ ...prev, [roll]: !prev[roll] }));
  };

  const call = (phone: string) => Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`);
  const closeBroadcastModal = () => {
    setShowBroadcastModal(false);
    setBroadcastMessage('');
  };
  const applyTemplate = (message: string) => setBroadcastMessage(message);
  const sendBroadcast = () => {
    if (!broadcastMessage.trim()) {
      Alert.alert('Error', 'Please type a message first');
      return;
    }
    setShowBroadcastModal(false);
    setBroadcastMessage('');
    Alert.alert('Sent!', `Message sent to all Class ${selectedClass}${selectedSection} parents successfully!`);
  };
  const getChatId = (index: number) => {
    if (selectedClass === '8' && selectedSection === 'A') return CHAT_IDS_FOR_8A[index] ?? '1';
    return String(index + 1);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>Student Details</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.9} onPress={pickClass}>
            <Text style={styles.dropdownValue}>Class {selectedClass}</Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.9} onPress={pickSection}>
            <Text style={styles.dropdownValue}>Section {selectedSection}</Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loadBtn} activeOpacity={0.9} onPress={() => setStudentsLoaded(true)}>
          <Text style={styles.loadBtnText}>Load Students</Text>
        </TouchableOpacity>

        <View style={{ gap: 10 }}>
          {students.map((s, idx) => {
            const open = !!expanded[s.roll];
            return (
              <View key={s.roll} style={styles.studentCard}>
                <TouchableOpacity style={styles.studentHead} activeOpacity={0.9} onPress={() => toggleExpanded(s.roll)}>
                  <View style={styles.rollPill}><Text style={styles.rollText}>{s.roll}</Text></View>
                  <Text style={styles.studentName}>{s.name}</Text>
                  <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color="#9CA3AF" />
                </TouchableOpacity>

                {open && (
                  <View style={styles.expandedWrap}>
                    <Text style={styles.parentTitle}>Parent Details</Text>

                    <View style={styles.parentRow}>
                      <Text style={styles.parentName}>{s.father}</Text>
                      <View style={styles.parentRight}><Text style={styles.phone}>{s.phone}</Text><TouchableOpacity onPress={() => call(s.phone)}><Ionicons name="call-outline" size={16} color="#4A90D9" /></TouchableOpacity></View>
                    </View>

                    <View style={styles.parentRow}>
                      <Text style={styles.parentName}>{s.mother}</Text>
                      <View style={styles.parentRight}><Text style={styles.phone}>{s.phone}</Text><TouchableOpacity onPress={() => call(s.phone)}><Ionicons name="call-outline" size={16} color="#4A90D9" /></TouchableOpacity></View>
                    </View>

                    <Text style={styles.email}>Email: {s.email}</Text>

                    <View style={styles.btnRow}>
                      <TouchableOpacity style={styles.msgBtn} activeOpacity={0.9} onPress={() => navigation.navigate('StaffChat', { chatId: getChatId(idx), studentName: s.name })}>
                        <Text style={styles.msgBtnText}>Send Message</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.wholeClassGhost} activeOpacity={0.9} onPress={() => Alert.alert('Sent', 'Message sent to all parents!')}>
                        <Text style={styles.wholeClassGhostText}>Send to Whole Class</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.wholeClassBtn}
          activeOpacity={0.9}
          onPress={() => setShowBroadcastModal(true)}
        >
          <Text style={styles.wholeClassBtnText}>Send Message to Whole Class</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showBroadcastModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeBroadcastModal}
      >
        <View style={styles.broadcastOverlay}>
          <View style={styles.broadcastSheet}>
            <Text style={styles.broadcastTitle}>{`Message to Class ${selectedClass}${selectedSection} Parents`}</Text>
            <Text style={styles.broadcastSubtitle}>{`All Class ${selectedClass}${selectedSection} parents will receive this message`}</Text>

            <View style={styles.recipientPill}>
              <Text style={styles.recipientPillText}>{`All Class ${selectedClass}${selectedSection} Parents`}</Text>
            </View>

            <TextInput
              style={styles.broadcastInput}
              multiline
              placeholder={`Type your message to all Class ${selectedClass}${selectedSection} parents...`}
              placeholderTextColor="#9CA3AF"
              value={broadcastMessage}
              onChangeText={setBroadcastMessage}
              textAlignVertical="top"
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.templateRow}>
              <TouchableOpacity
                style={styles.templatePill}
                activeOpacity={0.85}
                onPress={() =>
                  applyTemplate('Dear Parents, fee payment is due. Please pay at earliest to avoid late charges.')
                }
              >
                <Text style={styles.templatePillText}>Fee Reminder</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.templatePill}
                activeOpacity={0.85}
                onPress={() =>
                  applyTemplate('Dear Parents, Parent Teacher Meeting is scheduled. Please attend to discuss your child progress.')
                }
              >
                <Text style={styles.templatePillText}>PTM Notice</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.templatePill}
                activeOpacity={0.85}
                onPress={() =>
                  applyTemplate('Dear Parents, please ensure your child completes pending homework and submits on time.')
                }
              >
                <Text style={styles.templatePillText}>Homework Alert</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.templatePill}
                activeOpacity={0.85}
                onPress={() =>
                  applyTemplate('Dear Parents, school will remain closed tomorrow. Classes will resume next day.')
                }
              >
                <Text style={styles.templatePillText}>Holiday Notice</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.broadcastBtnRow}>
              <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.9} onPress={closeBroadcastModal}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendAllBtn} activeOpacity={0.9} onPress={sendBroadcast}>
                <Text style={styles.sendAllBtnText}>Send to All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

  filterRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  dropdown: { flex: 1, height: 48, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dropdownValue: { fontSize: 14, color: '#1F2937', fontWeight: '700' },

  loadBtn: { height: 48, borderRadius: 50, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  loadBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },

  studentCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, overflow: 'hidden' },
  studentHead: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  rollPill: { width: 36, height: 28, borderRadius: 8, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  rollText: { color: '#4A90D9', fontSize: 12, fontWeight: '800' },
  studentName: { flex: 1, marginLeft: 12, fontSize: 14, fontWeight: '700', color: '#111827' },

  expandedWrap: { backgroundColor: '#F9FAFB', borderTopWidth: 1, borderTopColor: '#F3F4F6', padding: 14 },
  parentTitle: { fontSize: 12, fontWeight: '800', color: '#6B7280', marginBottom: 8 },
  parentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  parentName: { fontSize: 13, color: '#1F2937', fontWeight: '600' },
  parentRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  phone: { color: '#4A90D9', fontSize: 13, fontWeight: '700' },
  email: { marginTop: 2, fontSize: 12, color: '#6B7280' },

  btnRow: { marginTop: 10, flexDirection: 'row', gap: 10 },
  msgBtn: { borderRadius: 999, backgroundColor: '#EAF3FB', paddingHorizontal: 16, paddingVertical: 8 },
  msgBtnText: { color: '#4A90D9', fontSize: 12, fontWeight: '800' },
  wholeClassGhost: { borderRadius: 999, borderWidth: 1, borderColor: '#5CB85C', paddingHorizontal: 16, paddingVertical: 8 },
  wholeClassGhostText: { color: '#5CB85C', fontSize: 12, fontWeight: '800' },

  wholeClassBtn: { marginTop: 16, height: 52, borderRadius: 50, backgroundColor: '#5CB85C', alignItems: 'center', justifyContent: 'center' },
  wholeClassBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },

  broadcastOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  broadcastSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 40 },
  broadcastTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  broadcastSubtitle: { fontSize: 13, color: '#6B7280', marginTop: 4, marginBottom: 16 },
  recipientPill: { alignSelf: 'flex-start', backgroundColor: '#EAF3FB', borderRadius: 50, paddingVertical: 6, paddingHorizontal: 14, marginBottom: 16 },
  recipientPillText: { color: '#4A90D9', fontSize: 13, fontWeight: '700' },
  broadcastInput: { height: 120, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, fontSize: 14, color: '#1F2937', marginBottom: 16 },
  templateRow: { gap: 8, marginBottom: 16 },
  templatePill: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 50, paddingVertical: 6, paddingHorizontal: 12 },
  templatePillText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
  broadcastBtnRow: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, height: 48, borderRadius: 50, borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  cancelBtnText: { color: '#6B7280', fontSize: 14, fontWeight: '700' },
  sendAllBtn: { flex: 1, height: 48, borderRadius: 50, backgroundColor: '#5CB85C', alignItems: 'center', justifyContent: 'center' },
  sendAllBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});

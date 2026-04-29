import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const templates: Record<string, string> = {
  'Fee Reminder': 'Dear Parents, This is a reminder\nthat fee payment is due. Please\npay at the earliest to avoid\nlate charges.',
  'PTM Notice': 'Dear Parents, Parent Teacher\nMeeting is scheduled. Please\nattend to discuss your child\nprogress.',
  'Homework Alert': 'Dear Parents, Please ensure\nyour child completes the pending\nhomework and submits on time.',
  'Holiday Notice': 'Dear Parents, School will remain\nclosed tomorrow due to holiday.\nClasses will resume next day.',
  'Exam Schedule': 'Dear Parents, Final examinations\nbegin next week. Please ensure\nyour child is well prepared.',
};

export default function BroadcastMessage() {
  const navigation = useNavigation<any>();
  const [message, setMessage] = useState('');

  const send = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please type a message first');
      return;
    }
    Alert.alert('Sent!', '? Message sent to all 32\nparents of Class 8A!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>Broadcast Message</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.recipientCard}>
          <Text style={styles.people}>??</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.recipientTitle}>All Class 8A Parents</Text>
            <Text style={styles.recipientSub}>32 parents will receive this message</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            multiline
            textAlignVertical="top"
            style={styles.input}
            placeholder={'Type your message\nto all Class 8A parents...'}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <Text style={styles.templatesTitle}>Quick Templates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.templatesRow}>
          {Object.keys(templates).map(name => (
            <TouchableOpacity key={name} style={styles.templatePill} activeOpacity={0.9} onPress={() => setMessage(templates[name])}>
              <Text style={styles.templatePillText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>??</Text>
          <Text style={styles.infoText}>Message will be sent to all{`\n`}32 parents of Class 8A via{`\n`}app notification and SMS.</Text>
        </View>

        <TouchableOpacity style={styles.sendBtn} activeOpacity={0.9} onPress={send}>
          <Text style={styles.sendText}>?? Send to All Parents</Text>
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

  recipientCard: { backgroundColor: '#EAF3FB', borderWidth: 1, borderColor: '#B5D4F4', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  people: { fontSize: 24 },
  recipientTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  recipientSub: { marginTop: 2, fontSize: 13, color: '#6B7280' },

  field: { marginBottom: 10 },
  label: { fontSize: 13, color: '#6B7280', fontWeight: '700', marginBottom: 8 },
  input: { height: 150, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, fontSize: 14, color: '#1F2937' },

  templatesTitle: { fontSize: 13, color: '#6B7280', fontWeight: '800', marginBottom: 8 },
  templatesRow: { gap: 8, paddingBottom: 4, marginBottom: 10 },
  templatePill: { borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', borderRadius: 50, paddingHorizontal: 14, paddingVertical: 6 },
  templatePillText: { color: '#6B7280', fontSize: 12, fontWeight: '700' },

  infoCard: { backgroundColor: '#EAF3FB', borderWidth: 1, borderColor: '#B5D4F4', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  infoIcon: { fontSize: 16 },
  infoText: { color: '#4A90D9', fontSize: 12, fontWeight: '700', lineHeight: 18, flex: 1 },

  sendBtn: { height: 52, borderRadius: 50, backgroundColor: '#5CB85C', alignItems: 'center', justifyContent: 'center' },
  sendText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});

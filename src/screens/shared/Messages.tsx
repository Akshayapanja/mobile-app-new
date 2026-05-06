import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser } from '../../lib/session';
import { parentService, teacherService } from '../../services';

type Role = 'parent' | 'staff';

type Conversation = {
  id: string;
  initials: string;
  avatarBg: string;
  avatarFg: string;
  name: string;
  subtitle: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

type Contact = { id: string; name: string; subtitle: string; broadcast?: boolean };

const PARENT_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    initials: 'LK',
    avatarBg: '#EAF3FB',
    avatarFg: '#4A90D9',
    name: 'Mrs. Lakshmi Subramaniam',
    subtitle: 'Mathematics Teacher',
    lastMessage: "Arjun did well in today's class...",
    time: '10:30 AM',
    unread: true,
  },
  {
    id: '2',
    initials: 'RV',
    avatarBg: '#F0FDF4',
    avatarFg: '#5CB85C',
    name: 'Mr. Rajesh Venkataraman',
    subtitle: 'Science Teacher',
    lastMessage: 'Please ensure lab assignment...',
    time: 'Yesterday',
    unread: true,
  },
  {
    id: '3',
    initials: 'SP',
    avatarBg: '#FFF8E7',
    avatarFg: '#F5A623',
    name: 'School Principal',
    subtitle: 'Administration',
    lastMessage: 'Regarding PTM on April 20th...',
    time: 'Mon',
    unread: false,
  },
  {
    id: '4',
    initials: 'SR',
    avatarBg: '#FFF0F0',
    avatarFg: '#E85D5D',
    name: 'Mrs. Sunitha Rao',
    subtitle: 'English Teacher',
    lastMessage: 'Great improvement in essay...',
    time: 'Sun',
    unread: false,
  },
];

const STAFF_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    initials: 'PK',
    avatarBg: '#EAF3FB',
    avatarFg: '#4A90D9',
    name: 'Mrs. Priya Kumar',
    subtitle: "Arjun's Mother",
    lastMessage: 'How is Arjun performing in Math?',
    time: '10:30 AM',
    unread: true,
  },
  {
    id: '2',
    initials: 'MS',
    avatarBg: '#F0FDF4',
    avatarFg: '#5CB85C',
    name: 'Mrs. Meena Sharma',
    subtitle: "Sneha's Mother",
    lastMessage: 'Can you share last test marks?',
    time: 'Yesterday',
    unread: true,
  },
  {
    id: '3',
    initials: 'RP',
    avatarBg: '#FFF8E7',
    avatarFg: '#F5A623',
    name: 'Mr. Rajesh Principal',
    subtitle: 'Principal',
    lastMessage: 'Please submit marks by Friday',
    time: 'Mon',
    unread: false,
  },
];

const PARENT_CONTACTS: Contact[] = [
  { id: '1', name: 'Mrs. Lakshmi Subramaniam', subtitle: 'Mathematics Teacher' },
  { id: '2', name: 'Mr. Rajesh Venkataraman', subtitle: 'Science Teacher' },
  { id: '3', name: 'Ms. Priya Menon', subtitle: 'English Teacher' },
  { id: '4', name: 'Mr. Ashok Sharma', subtitle: 'Hindi Teacher' },
  { id: '5', name: 'Mrs. Kavitha Nair', subtitle: 'Social Studies Teacher' },
  { id: '6', name: 'School Principal', subtitle: 'Administration' },
];

const STAFF_CONTACTS: Contact[] = [
  { id: '1', name: 'Mrs. Priya Kumar', subtitle: 'Parent — Arjun Kumar Class 8A' },
  { id: '2', name: 'Mrs. Meena Sharma', subtitle: 'Parent — Sneha Sharma Class 5B' },
  { id: '3', name: 'Mr. Rajesh Principal', subtitle: 'Principal' },
  { id: '6', name: 'Mrs. Sunita Sharma', subtitle: 'Parent — Aarav Sharma Class 8A' },
  { id: '7', name: 'Mrs. Meena Patel', subtitle: 'Parent — Priya Patel Class 8A' },
  { id: '8', name: 'Mrs. Radha Iyer', subtitle: 'Parent — Divya Iyer Class 8A' },
  { id: 'broadcast', name: 'All Class 8A Parents', subtitle: 'Send to whole class', broadcast: true },
];

export default function Messages() {
  const navigation = useNavigation<any>();
  const parentNav = navigation.getParent?.();
  const canGoBack = navigation.canGoBack();
  const [role, setRole] = useState<Role>('parent');
  const [q, setQ] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const [contactQ, setContactQ] = useState('');
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      const u = await getUser();
      const r = (u as any)?.role === 'staff' ? 'staff' : 'parent';
      if (alive) setRole(r);
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    loadConversations();
  }, [role]);

  const loadConversations = async () => {
    try {
      const user = await getUser();
      let response: any;
      if ((user as any)?.role === 'staff') {
        response = await teacherService.getConversations();
      } else {
        response = await parentService.getConversations();
      }
      if ((response as any)?.data || response) {
      }
    } catch (err: any) {
      // TODO: handle error
    }
  };

  const conversations = role === 'parent' ? PARENT_CONVERSATIONS : STAFF_CONVERSATIONS;
  const convFiltered = useMemo(
    () => conversations.filter(c => c.name.toLowerCase().includes(q.trim().toLowerCase())),
    [conversations, q],
  );

  const contacts = role === 'parent' ? PARENT_CONTACTS : STAFF_CONTACTS;
  const contactsFiltered = useMemo(
    () => contacts.filter(c => c.name.toLowerCase().includes(contactQ.trim().toLowerCase())),
    [contacts, contactQ],
  );

  const openChat = (chatId: string) => {
    if (role === 'parent') parentNav?.navigate('ParentChat', { chatId });
    else parentNav?.navigate('StaffChat', { chatId });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        {canGoBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search conversations..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionLabel}>RECENT CONVERSATIONS</Text>

        <View style={styles.listCard}>
          {convFiltered.map((c, idx) => (
            <View key={c.id}>
              <TouchableOpacity onPress={() => openChat(c.id)} style={styles.row}>
                <View style={[styles.avatar, { backgroundColor: c.avatarBg }]}>
                  <Text style={[styles.avatarText, { color: c.avatarFg }]}>{c.initials}</Text>
                </View>

                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={styles.rowTop}>
                    <Text style={styles.name} numberOfLines={1}>
                      {c.name}
                    </Text>
                    <Text style={styles.time}>{c.time}</Text>
                  </View>
                  <Text style={styles.subtitle} numberOfLines={1}>
                    {c.subtitle}
                  </Text>
                  <Text style={styles.last} numberOfLines={1}>
                    {c.lastMessage}
                  </Text>
                </View>

                {c.unread ? <View style={styles.unreadDot} /> : <View style={{ width: 8 }} />}
              </TouchableOpacity>

              {idx < convFiltered.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          setContactQ('');
          setComposeOpen(true);
        }}
        style={styles.fab}
        activeOpacity={0.9}
      >
        <Text style={styles.fabText}>✏</Text>
      </TouchableOpacity>

      <Modal visible={composeOpen} animationType="slide" transparent onRequestClose={() => setComposeOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Message</Text>
              <TouchableOpacity onPress={() => setComposeOpen(false)} hitSlop={10} style={styles.modalClose}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchWrap}>
              <Ionicons name="search-outline" size={18} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                value={contactQ}
                onChangeText={setContactQ}
                placeholder="Search contacts..."
                placeholderTextColor="#9CA3AF"
                style={styles.searchInput}
              />
            </View>

            <ScrollView style={{ minHeight: 300 }} showsVerticalScrollIndicator={false}>
              {contactsFiltered.map(c => (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => {
                    setComposeOpen(false);
                    if (c.broadcast) {
                      setBroadcastMessage('');
                      setTimeout(() => {
                        setShowBroadcastModal(true);
                      }, 300);
                      return;
                    }
                    openChat(c.id);
                  }}
                  style={styles.contactRow}
                >
                  <View style={[styles.avatar, { backgroundColor: '#F9FAFB' }]}>
                    <Text style={[styles.avatarText, { color: '#4A90D9' }]}>{c.name.split(' ').slice(0, 2).map(x => x[0]).join('').toUpperCase()}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.contactName} numberOfLines={1}>
                      {c.name}
                    </Text>
                    <Text style={styles.contactSubtitle} numberOfLines={1}>
                      {c.subtitle}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showBroadcastModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBroadcastModal(false)}
      >
        <View style={styles.broadcastOverlay}>
          <View style={styles.broadcastSheet}>
            <Text style={styles.broadcastTitle}>Message to Class 8A Parents</Text>
            <Text style={styles.broadcastSubtitle}>All 32 parents will receive this message</Text>

            <View style={styles.recipientPill}>
              <Text style={styles.recipientPillText}>All Class 8A Parents (32)</Text>
            </View>

            <TextInput
              style={styles.broadcastInput}
              multiline
              placeholder="Type your message to all Class 8A parents..."
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
                  setBroadcastMessage(
                    'Dear Parents, fee payment is due. Please pay at earliest to avoid late charges.',
                  )
                }
              >
                <Text style={styles.templatePillText}>Fee Reminder</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.templatePill}
                activeOpacity={0.85}
                onPress={() =>
                  setBroadcastMessage(
                    'Dear Parents, PTM is scheduled. Please attend to discuss your child progress.',
                  )
                }
              >
                <Text style={styles.templatePillText}>PTM Notice</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.templatePill}
                activeOpacity={0.85}
                onPress={() =>
                  setBroadcastMessage(
                    'Dear Parents, please ensure child completes pending homework on time.',
                  )
                }
              >
                <Text style={styles.templatePillText}>Homework Alert</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.templatePill}
                activeOpacity={0.85}
                onPress={() =>
                  setBroadcastMessage(
                    'Dear Parents, school will remain closed tomorrow. Classes resume next day.',
                  )
                }
              >
                <Text style={styles.templatePillText}>Holiday Notice</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.broadcastBtnRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                activeOpacity={0.9}
                onPress={() => {
                  setShowBroadcastModal(false);
                  setBroadcastMessage('');
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sendAllBtn}
                activeOpacity={0.9}
                onPress={() => {
                  if (!broadcastMessage.trim()) {
                    Alert.alert('Error', 'Please type a message first');
                    return;
                  }
                  setShowBroadcastModal(false);
                  setBroadcastMessage('');
                  Alert.alert('Sent!', 'Message sent to all 32 Class 8A parents!');
                }}
              >
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center' },
  container: { paddingHorizontal: 20, paddingTop: 8 },

  searchWrap: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#111827' },

  sectionLabel: { fontSize: 11, letterSpacing: 1.2, color: '#9CA3AF', fontWeight: '800', marginBottom: 10 },

  listCard: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#FFFFFF' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 14, gap: 12 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginLeft: 14, marginRight: 14 },

  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '800' },

  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  name: { flex: 1, fontSize: 14, fontWeight: '700', color: '#1F2937' },
  time: { fontSize: 11, fontWeight: '700', color: '#9CA3AF' },
  subtitle: { fontSize: 12, color: '#6B7280', marginTop: 2, fontWeight: '600' },
  last: { fontSize: 12, color: '#6B7280', marginTop: 4, fontWeight: '600' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4A90D9' },

  fab: { position: 'absolute', bottom: 90, right: 20, width: 52, height: 52, borderRadius: 26, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  fabText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 18, borderTopRightRadius: 18, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 24, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  modalTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  modalClose: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  modalCloseText: { fontSize: 18, color: '#111827', fontWeight: '800' },

  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  contactName: { fontSize: 14, fontWeight: '700', color: '#111827' },
  contactSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 2, fontWeight: '600' },

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

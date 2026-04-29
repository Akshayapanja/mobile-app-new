import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addSentHomework, SentHomework } from '../../lib/session';

type BotMode = 'simplify' | 'mcq' | 'workflow';
type InputTab = 'type' | 'upload';

type TopicResponses = {
  simplify: string;
  mcq?: string;
  workflow?: string;
};
const TAB_ICONS = {
  type: '\u270F\uFE0F',
  upload: '\u{1F4CE}',
} as const;

const responses: Record<string, TopicResponses> = {
  photosynthesis: {
    simplify: `Photosynthesis - Simplified\n\nPlants make food using sunlight.\n\nKey Points:\n- Absorb sunlight through leaves\n- Take CO2 from air through pores\n- Absorb water from soil via roots\n- Convert to glucose + oxygen\n\nFormula:\nCO2 + Water + Sunlight ->\nGlucose + Oxygen`,
    mcq: `MCQ - Photosynthesis\n\nQ1. Where does it mainly occur?\nA) Roots  B) Stem\nC) Leaves  D) Flowers\n\nQ2. Gas plants absorb?\nA) Oxygen  B) Nitrogen\nC) CO2  D) Hydrogen\n\nQ3. Byproduct is?\nA) CO2  B) Oxygen\nC) Water  D) Glucose\n\nQ4. What absorbs sunlight?\nA) Chlorophyll  B) Roots\nC) Stem  D) Bark\n\nQ5. Product of photosynthesis?\nA) Water  B) CO2\nC) Glucose  D) Minerals`,
    workflow: `Photosynthesis Steps\n\nStep 1: Roots absorb water\nStep 2: Leaves absorb CO2\nStep 3: Chlorophyll captures sun\nStep 4: Converts to glucose\nStep 5: Releases oxygen`,
  },
  'water cycle': {
    simplify: `Water Cycle - Simplified\n\n4 Main Stages:\n1. Evaporation - Sun heats water\n2. Condensation - Forms clouds\n3. Precipitation - Rain/Snow falls\n4. Collection - Rivers and oceans\n\nFun Fact: Water you drink may have\nbeen drunk by dinosaurs.`,
    mcq: `MCQ - Water Cycle\n\nQ1. What causes evaporation?\nA) Wind  B) Sun\nC) Moon  D) Rain\n\nQ2. Condensation forms?\nA) Rain  B) Clouds\nC) Ice  D) Snow\n\nQ3. Precipitation means?\nA) Evaporation\nB) Cloud formation\nC) Rain/Snow falling\nD) Water storage`,
  },
  newton: {
    simplify: `Newton Laws - Simplified\n\nLaw 1 - Inertia:\nObjects stay still unless force acts.\nExample: Ball stays till kicked\n\nLaw 2 - F = ma:\nMore force = faster movement\nExample: Pushing car vs bicycle\n\nLaw 3 - Action Reaction:\nEvery action has equal opposite.\nExample: Rocket launches`,
  },
  digestive: {
    simplify: `Digestive System\n\nFood Journey:\nMouth - chewed + saliva\nOesophagus - travels down\nStomach - digestive juices\nSmall Intestine - nutrients absorbed\nLarge Intestine - water absorbed\nRectum - waste removed\n\nKey: Small intestine = 6 metres`,
  },
  'french revolution': {
    simplify: `French Revolution\n\nWhen: 1789 to 1799\n\nWhy:\n- People starving, king lavish\n- Heavy taxes on poor\n- No freedom or equality\n\nWhat happened:\n- Revolted against King Louis XVI\n- Stormed Bastille July 14 1789\n- King executed\n- New government formed\n\nResult: Liberty Equality Fraternity`,
  },
  'solar system': {
    simplify: `Solar System\n\n8 Planets in order:\n1. Mercury - closest to Sun\n2. Venus - brightest\n3. Earth - our home\n4. Mars - red planet\n5. Jupiter - largest\n6. Saturn - has rings\n7. Uranus - rotates sideways\n8. Neptune - farthest\n\nMemory trick:\nMy Very Educated Mother\nJust Served Us Nachos`,
  },
};

const defaultMessage = `Topic not recognized.\n\nTry these topics:\n- photosynthesis\n- water cycle\n- newton laws\n- digestive system\n- french revolution\n- solar system\n\nType topic and choose action.`;

const classes = ['8', '9', '7'] as const;
const CLASS_TO_SECTION: Record<string, string> = { '8': 'A', '9': 'B', '7': 'C' };

function detectKeyword(input: string): string {
  const text = input.toLowerCase();
  if (text.includes('photosynthesis')) return 'photosynthesis';
  if (text.includes('water cycle') || text.includes('water')) return 'water cycle';
  if (text.includes('newton')) return 'newton';
  if (text.includes('digestive') || text.includes('digestion')) return 'digestive';
  if (text.includes('french revolution') || text.includes('french')) return 'french revolution';
  if (text.includes('solar system') || text.includes('solar')) return 'solar system';
  return '';
}

function titleCaseTopic(topic: string): string {
  if (!topic) return 'General Topic';
  return topic
    .split(' ')
    .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ');
}

export default function HomeworkBot() {
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState<InputTab>('type');
  const [topicText, setTopicText] = useState('');
  const [fileName, setFileName] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [detectedTopic, setDetectedTopic] = useState('');
  const [selectedClass, setSelectedClass] = useState('8');
  const [selectedSection, setSelectedSection] = useState('A');

  useEffect(() => {
    setSelectedSection(CLASS_TO_SECTION[selectedClass]);
  }, [selectedClass]);

  const sourceText = useMemo(() => (tab === 'type' ? topicText : fileName), [tab, topicText, fileName]);

  const runGeneration = (mode: BotMode) => {
    const keyword = detectKeyword(sourceText);
    setDetectedTopic(keyword || 'general topic');

    if (!keyword) {
      setGeneratedContent(defaultMessage);
      return;
    }

    const contentByTopic = responses[keyword];
    const fallback = contentByTopic.simplify;
    const content = contentByTopic[mode] || fallback;
    setGeneratedContent(content);
  };

  const openMockFilePicker = () => {
    Alert.alert('Info', 'File upload: keyword detected from filename for demo', [
      { text: 'photosynthesis_chapter8.pdf', onPress: () => setFileName('photosynthesis_chapter8.pdf') },
      { text: 'water_cycle_notes.jpg', onPress: () => setFileName('water_cycle_notes.jpg') },
      { text: 'newton_laws.png', onPress: () => setFileName('newton_laws.png') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const chooseClass = () => {
    Alert.alert('Class', 'Choose class', [
      ...classes.map(c => ({ text: c, onPress: () => setSelectedClass(c) })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const chooseSection = () => {
    Alert.alert('Section', `Class ${selectedClass} has only Section ${CLASS_TO_SECTION[selectedClass]}`);
  };

  const sendHomework = async () => {
    if (!generatedContent) return;
    const topic = titleCaseTopic(detectedTopic);

    const payload: SentHomework = {
      id: String(Date.now()),
      subject: topic,
      title: `AI: ${topic}`,
      content: generatedContent,
      class: selectedClass,
      section: selectedSection,
      sentBy: 'Mrs. Lakshmi Subramaniam',
      sentAt: new Date().toLocaleDateString(),
      type: 'AI Generated',
      dueDate: new Date().toLocaleDateString(),
    };

    await addSentHomework(payload);
    Alert.alert('Sent!', `Homework sent to Class ${selectedClass}\nSection ${selectedSection} parents.`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>AI Homework Bot</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <Text style={styles.subtitle}>Generate homework from{`\n`}topics or uploads</Text>

        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'type' ? styles.tabBtnActive : styles.tabBtnInactive]}
            activeOpacity={0.9}
            onPress={() => setTab('type')}
          >
            <View style={styles.tabInner}>
              <Text style={[styles.tabEmoji, tab === 'type' ? styles.tabTextActive : styles.tabTextInactive]}>{TAB_ICONS.type}</Text>
              <Text style={[styles.tabText, tab === 'type' ? styles.tabTextActive : styles.tabTextInactive]}>Type Topic</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'upload' ? styles.tabBtnActive : styles.tabBtnInactive]}
            activeOpacity={0.9}
            onPress={() => setTab('upload')}
          >
            <View style={styles.tabInner}>
              <Text style={[styles.tabEmoji, tab === 'upload' ? styles.tabTextActive : styles.tabTextInactive]}>{TAB_ICONS.upload}</Text>
              <Text style={[styles.tabText, tab === 'upload' ? styles.tabTextActive : styles.tabTextInactive]}>Upload File</Text>
            </View>
          </TouchableOpacity>
        </View>

        {tab === 'type' ? (
          <TextInput
            value={topicText}
            onChangeText={setTopicText}
            multiline
            textAlignVertical="top"
            placeholder={`Type a topic...\nExample: Photosynthesis Class 8,\nNewton Laws, Water Cycle`}
            placeholderTextColor="#9CA3AF"
            style={styles.topicInput}
          />
        ) : (
          <View style={styles.uploadBox}>
            <Text style={styles.uploadEmoji}>U</Text>
            <Text style={styles.uploadTitle}>Upload textbook photo or PDF</Text>
            <Text style={styles.uploadHint}>Supports JPG PNG PDF</Text>
            <TouchableOpacity style={styles.chooseFileBtn} activeOpacity={0.9} onPress={openMockFilePicker}>
              <Text style={styles.chooseFileText}>Choose File</Text>
            </TouchableOpacity>
            {!!fileName && <Text style={styles.fileName}>{fileName}</Text>}
          </View>
        )}

        <View style={styles.actions3}>
          <TouchableOpacity style={[styles.action3Btn, { backgroundColor: '#3BAFDA' }]} activeOpacity={0.9} onPress={() => runGeneration('simplify')}>
            <Text style={styles.action3Text}>Simplify</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.action3Btn, { backgroundColor: '#7C3AED' }]} activeOpacity={0.9} onPress={() => runGeneration('mcq')}>
            <Text style={styles.action3Text}>Make MCQs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.action3Btn, { backgroundColor: '#EA580C' }]} activeOpacity={0.9} onPress={() => runGeneration('workflow')}>
            <Text style={styles.action3Text}>Workflow</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.outputWrap}>
          {generatedContent ? (
            <ScrollView nestedScrollEnabled style={styles.outputScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.outputText}>{generatedContent}</Text>
            </ScrollView>
          ) : (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>Content will appear here...</Text>
            </View>
          )}
        </View>

        {!!generatedContent && (
          <View>
            <Text style={styles.sendLabel}>Send to Students</Text>
            <View style={styles.sendFilters}>
              <TouchableOpacity style={styles.dropdown} activeOpacity={0.9} onPress={chooseClass}>
                <Text style={styles.dropdownValue}>Class {selectedClass}</Text>
                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdown} activeOpacity={0.9} onPress={chooseSection}>
                <Text style={styles.dropdownValue}>Section {selectedSection}</Text>
                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.sendBtn} activeOpacity={0.9} onPress={sendHomework}>
              <Text style={styles.sendBtnText}>Send as Homework</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 80 },

  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  topNavBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  topNavTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#111827' },
  topNavRightSpacer: { width: 40, height: 40 },

  subtitle: { textAlign: 'center', fontSize: 13, color: '#6B7280', lineHeight: 18, marginBottom: 14 },

  tabsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  tabBtn: { flex: 1, height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  tabBtnActive: { backgroundColor: '#4A90D9' },
  tabBtnInactive: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' },
  tabInner: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tabEmoji: { fontSize: 16 },
  tabText: { fontSize: 13, fontWeight: '700' },
  tabTextActive: { color: '#FFFFFF' },
  tabTextInactive: { color: '#6B7280' },

  topicInput: {
    height: 120,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#111827',
    marginBottom: 12,
  },

  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#B5D4F4',
    borderRadius: 8,
    backgroundColor: '#EAF3FB',
    padding: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadEmoji: { fontSize: 32, marginBottom: 8 },
  uploadTitle: { fontSize: 14, fontWeight: '700', color: '#1F2937', textAlign: 'center' },
  uploadHint: { marginTop: 6, fontSize: 12, color: '#6B7280' },
  chooseFileBtn: { marginTop: 12, backgroundColor: '#4A90D9', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8 },
  chooseFileText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  fileName: { marginTop: 10, fontSize: 12, fontWeight: '700', color: '#1F2937' },

  actions3: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  action3Btn: { flex: 1, height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  action3Text: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', textAlign: 'center' },

  outputWrap: {
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    padding: 12,
    marginBottom: 12,
  },
  outputScroll: { maxHeight: 260 },
  outputText: { fontSize: 13, lineHeight: 20, color: '#1F2937', fontWeight: '600' },
  emptyWrap: { minHeight: 176, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 13, fontStyle: 'italic', color: '#9CA3AF' },

  sendLabel: { fontSize: 13, fontWeight: '700', color: '#6B7280', marginBottom: 8 },
  sendFilters: { flexDirection: 'row', gap: 10, marginBottom: 12 },
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
    backgroundColor: '#FFFFFF',
  },
  dropdownValue: { fontSize: 14, color: '#1F2937', fontWeight: '700' },

  sendBtn: { height: 52, borderRadius: 50, backgroundColor: '#5CB85C', alignItems: 'center', justifyContent: 'center' },
  sendBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});

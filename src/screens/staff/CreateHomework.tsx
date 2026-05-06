import React, { useEffect, useMemo, useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { teacherService } from '../../services';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createHomeworkSchema, type CreateHomeworkFormData } from '../../lib/validations';

function fmtDateLabel(d: Date) {
  const month = d.toLocaleString('en-US', { month: 'long' });
  return `${month} ${d.getDate()}, ${d.getFullYear()}`;
}

function monthLabel(base: Date, monthOffset: number) {
  const d = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  const m = d.toLocaleString('en-US', { month: 'long' });
  return `${m} ${d.getFullYear()}`;
}

function daysInMonth(base: Date, monthOffset: number) {
  const d = new Date(base.getFullYear(), base.getMonth() + monthOffset + 1, 0);
  return d.getDate();
}

function startDow(base: Date, monthOffset: number) {
  const d = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  return d.getDay();
}

const CLASSES = ['8', '9', '7'] as const;
const CLASS_TO_SECTION: Record<string, string> = { '8': 'A', '9': 'B', '7': 'C' };

type FormState = {
  cls: string;
  sec: string;
  subject: string;
  title: string;
  desc: string;
  due: Date;
  maxMarks: string;
};

const initialForm = (): FormState => ({
  cls: '8',
  sec: 'A',
  subject: 'Mathematics',
  title: '',
  desc: '',
  due: new Date(2025, 3, 20),
  maxMarks: '100',
});

export default function CreateHomework() {
  const navigation = useNavigation<any>();
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateHomeworkFormData>({
    resolver: zodResolver(createHomeworkSchema),
    defaultValues: {
      title: '',
      description: '',
      subject: 'Mathematics',
      dueDate: '',
      maxMarks: '100',
    },
  });

  const [showDuePicker, setShowDuePicker] = useState(false);
  const [pickerMonthOffset, setPickerMonthOffset] = useState(0);
  const [tempSelectedDay, setTempSelectedDay] = useState<number | null>(null);

  const pickerBase = useMemo(() => new Date(2025, 3, 1), []);
  const pickerLabel = useMemo(() => monthLabel(pickerBase, pickerMonthOffset), [pickerBase, pickerMonthOffset]);
  const pickerDays = useMemo(() => daysInMonth(pickerBase, pickerMonthOffset), [pickerBase, pickerMonthOffset]);
  const pickerStart = useMemo(() => startDow(pickerBase, pickerMonthOffset), [pickerBase, pickerMonthOffset]);
  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    setForm(f => ({ ...f, sec: CLASS_TO_SECTION[f.cls], subject: 'Mathematics' }));
    setValue('subject', 'Mathematics');
  }, [form.cls, setValue]);

  const openDuePicker = () => {
    setPickerMonthOffset(0);
    setTempSelectedDay(null);
    setShowDuePicker(true);
  };

  const closeDuePicker = () => {
    setShowDuePicker(false);
    setTempSelectedDay(null);
  };

  const confirmDuePicker = () => {
    const day = tempSelectedDay;
    if (!day) return;
    const chosen = new Date(pickerBase.getFullYear(), pickerBase.getMonth() + pickerMonthOffset, day);
    setForm(f => ({ ...f, due: chosen }));
    setValue('dueDate', chosen.toISOString().split('T')[0], { shouldValidate: true });
    closeDuePicker();
  };

  const openClassPicker = () => {
    Alert.alert('Class', 'Choose class', [
      ...CLASSES.map(c => ({ text: `Class ${c}`, onPress: () => setForm(f => ({ ...f, cls: c })) })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openSectionPicker = () => {
    Alert.alert('Section', `Class ${form.cls} has only Section ${CLASS_TO_SECTION[form.cls]}`);
  };

  const onSubmit = async (_data: CreateHomeworkFormData) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await teacherService.createHomework({
        title: form.title,
        subject: form.subject || 'Mathematics',
        description: form.desc,
        dueDate: form.due.toISOString().split('T')[0],
        sectionId: `${form.cls}-${form.sec}`,
        maxMarks: parseInt(form.maxMarks, 10) || 100,
      });
    } catch (err: any) {
      // TODO: handle error
    } finally {
      setSubmitting(false);
      setSuccess(true);
    }
  };

  const resetForm = () => {
    setForm(initialForm());
    setSuccess(false);
  };

  const goHomeworkList = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Staff',
          state: {
            routes: [
              {
                name: 'StaffTabs',
                state: {
                  routes: [
                    {
                      name: 'StaffHomeworkTab',
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>Create Homework</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('StaffHomeworkBot')}
            style={styles.botBtn}
          >
            <Text style={styles.botEmoji}>🤖</Text>
          </TouchableOpacity>
        </View>

        {success ? (
          <View style={styles.successCard}>
            <Text style={styles.successTitle}>✅ Homework Created Successfully!</Text>
            <Text style={styles.successBody}>
              Class {form.cls} · Subject {form.subject}
              {'\n'}
              Due {fmtDateLabel(form.due)}
            </Text>
            <Text style={styles.successMuted}>
              Homework assigned to students.{'\n'}
              Parents will be notified.
            </Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.ghostBtn} onPress={resetForm}>
              <Text style={styles.ghostBtnText}>Create Another</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.primaryWide} onPress={goHomeworkList}>
              <Text style={styles.primaryWideText}>View Homework List</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ gap: 16 }}>
            <View style={styles.field}>
              <Text style={styles.label}>Class</Text>
              <TouchableOpacity activeOpacity={0.9} style={styles.dropdown} onPress={openClassPicker}>
                <Text style={styles.dropdownValue}>{form.cls}</Text>
                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Section</Text>
              <TouchableOpacity activeOpacity={0.9} style={styles.dropdown} onPress={openSectionPicker}>
                <Text style={styles.dropdownValue}>{form.sec}</Text>
                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                value={form.subject}
                editable={false}
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Title</Text>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={t => {
                      setForm(f => ({ ...f, title: t }));
                      onChange(t);
                    }}
                    placeholder="Homework title"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                  />
                )}
              />
              {errors.title ? <Text style={styles.errorText}>{errors.title.message}</Text> : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Description</Text>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={t => {
                      setForm(f => ({ ...f, desc: t }));
                      onChange(t);
                    }}
                    placeholder="Homework details..."
                    placeholderTextColor="#9CA3AF"
                    style={styles.textarea}
                    multiline
                    textAlignVertical="top"
                  />
                )}
              />
              {errors.description ? <Text style={styles.errorText}>{errors.description.message}</Text> : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Due Date</Text>
              <TouchableOpacity activeOpacity={0.9} style={styles.dropdown} onPress={openDuePicker}>
                <Text style={styles.dropdownValue}>{fmtDateLabel(form.due)}</Text>
                <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
              </TouchableOpacity>
              {errors.dueDate ? <Text style={styles.errorText}>{errors.dueDate.message}</Text> : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Max Marks</Text>
              <Controller
                control={control}
                name="maxMarks"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={t => {
                      setForm(f => ({ ...f, maxMarks: t }));
                      onChange(t);
                    }}
                    keyboardType="numeric"
                    style={styles.input}
                  />
                )}
              />
              {errors.maxMarks ? <Text style={styles.errorText}>{errors.maxMarks.message}</Text> : null}
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              disabled={submitting}
              style={[styles.submitBtn, submitting ? styles.submitBtnDisabled : null]}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitText}>{submitting ? 'Creating...' : 'Create Homework'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Modal visible={showDuePicker} transparent animationType="fade" onRequestClose={closeDuePicker}>
        <View style={styles.pickerOverlay}>
          <View style={styles.pickerSheet}>
            <Text style={styles.pickerTitle}>Select Date</Text>

            <View style={styles.pickerMonthRow}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => setPickerMonthOffset(v => v - 1)} style={styles.monthArrowBtn}>
                <Text style={styles.monthArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.monthLabel}>{pickerLabel}</Text>
              <TouchableOpacity activeOpacity={0.85} onPress={() => setPickerMonthOffset(v => v + 1)} style={styles.monthArrowBtn}>
                <Text style={styles.monthArrow}>→</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateGrid}>
              {Array.from({ length: pickerStart }).map((_, i) => (
                <View key={`sp-${i}`} style={styles.dateCell} />
              ))}
              {Array.from({ length: pickerDays }).map((_, i) => {
                const day = i + 1;
                const isSelected = tempSelectedDay === day;
                const isToday =
                  today.getFullYear() === pickerBase.getFullYear() &&
                  today.getMonth() === pickerBase.getMonth() + pickerMonthOffset &&
                  today.getDate() === day;

                return (
                  <TouchableOpacity
                    key={`d-${day}`}
                    activeOpacity={0.85}
                    onPress={() => setTempSelectedDay(day)}
                    style={[
                      styles.dateCell,
                      styles.dateCircle,
                      isSelected ? styles.dateSelected : null,
                      !isSelected && isToday ? styles.dateToday : null,
                    ]}
                  >
                    <Text style={[styles.dateText, isSelected ? styles.dateTextSelected : null]}>{day}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.confirmBtn, !tempSelectedDay ? styles.confirmBtnDisabled : null]}
              disabled={!tempSelectedDay}
              onPress={confirmDuePicker}
            >
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} style={styles.cancelBtn} onPress={closeDuePicker}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
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
  topNavTitle: { fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center', flex: 1 },
  botBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF8E7',
    borderWidth: 1,
    borderColor: '#F5A623',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botEmoji: { fontSize: 18, lineHeight: 20 },

  field: { gap: 8 },
  label: { fontSize: 13, color: '#9CA3AF', fontWeight: '700' },
  dropdown: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownValue: { fontSize: 14, color: '#1F2937', fontWeight: '700' },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  textarea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  errorText: { color: '#E85D5D', fontSize: 12 },

  submitBtn: {
    marginTop: 8,
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#D1D5DB' },
  submitText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },

  successCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#5CB85C',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  successTitle: { fontSize: 15, fontWeight: '900', color: '#5CB85C' },
  successBody: { fontSize: 13, color: '#374151', fontWeight: '700', lineHeight: 18 },
  successMuted: { fontSize: 13, color: '#6B7280', fontWeight: '700', lineHeight: 18 },

  ghostBtn: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ghostBtnText: { fontSize: 13, fontWeight: '900', color: '#374151' },
  primaryWide: {
    backgroundColor: '#4A90D9',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryWideText: { fontSize: 13, fontWeight: '900', color: '#FFFFFF' },

  pickerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  pickerSheet: { width: '100%', maxWidth: 420, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', padding: 16 },
  pickerTitle: { fontSize: 15, fontWeight: '900', color: '#111827', textAlign: 'center', marginBottom: 12 },
  pickerMonthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  monthArrowBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  monthArrow: { fontSize: 16, fontWeight: '900', color: '#4A90D9' },
  monthLabel: { fontSize: 14, fontWeight: '900', color: '#111827' },
  dateGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dateCell: { width: `${100 / 7}%`, height: 44, alignItems: 'center', justifyContent: 'center' },
  dateCircle: { width: 36, height: 36, borderRadius: 18 },
  dateSelected: { backgroundColor: '#4A90D9' },
  dateToday: { borderWidth: 1, borderColor: '#4A90D9' },
  dateText: { fontSize: 12, fontWeight: '900', color: '#111827' },
  dateTextSelected: { color: '#FFFFFF' },
  confirmBtn: { marginTop: 14, width: '100%', height: 44, borderRadius: 22, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  confirmBtnDisabled: { backgroundColor: '#D1D5DB' },
  confirmBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  cancelBtn: { marginTop: 10, width: '100%', height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  cancelBtnText: { color: '#111827', fontSize: 13, fontWeight: '900' },
});

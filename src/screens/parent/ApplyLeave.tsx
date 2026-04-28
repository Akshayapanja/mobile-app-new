// ✅ Converted from React Web → React Native

import React, { useMemo, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  return d.getDay(); // 0..6
}

export default function ApplyLeave() {
  const navigation = useNavigation<any>();

  const child = useMemo(
    () => ({
      initials: 'AK',
      name: 'Arjun Kumar',
      class: '8',
      section: 'A',
    }),
    []
  );

  const [leaveType, setLeaveType] = useState('Medical Leave');
  const [fromDate, setFromDate] = useState<Date>(() => new Date(2025, 3, 16)); // Apr 16, 2025
  const [toDate, setToDate] = useState<Date>(() => new Date(2025, 3, 17)); // Apr 17, 2025
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [pickerMonthOffset, setPickerMonthOffset] = useState(0); // 0 = Apr 2025
  const [tempSelectedDay, setTempSelectedDay] = useState<number | null>(null);
  const [reason, setReason] = useState('Child is unwell with fever and\nneeds rest as per doctor advice');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const durationDays = useMemo(() => {
    const start = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()).getTime();
    const end = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate()).getTime();
    const diff = Math.floor((end - start) / (24 * 60 * 60 * 1000));
    const inclusive = diff + 1;
    return inclusive > 0 ? inclusive : 1;
  }, [fromDate, toDate]);

  const pickerBase = useMemo(() => new Date(2025, 3, 1), []); // Apr 2025
  const pickerLabel = useMemo(() => monthLabel(pickerBase, pickerMonthOffset), [pickerBase, pickerMonthOffset]);
  const pickerDays = useMemo(() => daysInMonth(pickerBase, pickerMonthOffset), [pickerBase, pickerMonthOffset]);
  const pickerStart = useMemo(() => startDow(pickerBase, pickerMonthOffset), [pickerBase, pickerMonthOffset]);
  const today = useMemo(() => new Date(), []);

  const openPicker = (kind: 'from' | 'to') => {
    setPickerMonthOffset(0);
    setTempSelectedDay(null);
    if (kind === 'from') setShowFromPicker(true);
    else setShowToPicker(true);
  };

  const closePicker = () => {
    setShowFromPicker(false);
    setShowToPicker(false);
    setTempSelectedDay(null);
  };

  const confirmPicker = () => {
    const day = tempSelectedDay;
    if (!day) return;
    const chosen = new Date(pickerBase.getFullYear(), pickerBase.getMonth() + pickerMonthOffset, day);

    if (showFromPicker) {
      setFromDate(chosen);
      if (chosen.getTime() > toDate.getTime()) setToDate(chosen);
    } else if (showToPicker) {
      setToDate(chosen);
      if (chosen.getTime() < fromDate.getTime()) setFromDate(chosen);
    }
    closePicker();
  };

  function openLeaveTypePicker() {
    Alert.alert('Leave Type', 'Choose a leave type', [
      { text: 'Medical Leave', onPress: () => setLeaveType('Medical Leave') },
      { text: 'Casual Leave', onPress: () => setLeaveType('Casual Leave') },
      { text: 'Emergency Leave', onPress: () => setLeaveType('Emergency Leave') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }

  function submit() {
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1000);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>Apply Leave</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        {success ? (
          <View style={styles.successCard}>
            <Text style={styles.successTitle}>✅ Leave Request Submitted!</Text>
            <Text style={styles.successText}>
              Leave for {child.name} from{'\n'}
              April 16 to April 17 ({durationDays} days){'\n'}
              has been sent to class teacher.
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.backHomeBtn}
              onPress={() => navigation.navigate('ParentTabs')}
            >
              <Text style={styles.backHomeText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.childSelectorCard}>
              <Text style={styles.childSelectorLabel}>Applying leave for</Text>

              <View style={styles.childSelectorRow}>
                <View style={styles.childLeftRow}>
                  <View style={styles.childAvatar}>
                    <Text style={styles.childInitials}>{child.initials}</Text>
                  </View>
                  <View style={styles.childInfo}>
                    <Text style={styles.childName}>{child.name}</Text>
                    <Text style={styles.childClass}>Class {child.class} - Section {child.section}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.switchChildPill}
                  onPress={() => Alert.alert('Info', 'Child switching coming soon!')}
                >
                  <Text style={styles.switchChildText}>Switch Child</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Leave Type</Text>
                <TouchableOpacity activeOpacity={0.9} style={styles.dropdown} onPress={openLeaveTypePicker}>
                  <Text style={styles.dropdownValue}>{leaveType}</Text>
                  <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>From Date</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.dropdown}
                  onPress={() => openPicker('from')}
                >
                  <Text style={styles.dropdownValue}>{fmtDateLabel(fromDate)}</Text>
                  <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>To Date</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.dropdown}
                  onPress={() => openPicker('to')}
                >
                  <Text style={styles.dropdownValue}>{fmtDateLabel(toDate)}</Text>
                  <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <View style={styles.durationRow}>
                <Text style={styles.durationLabel}>Duration:</Text>
                <View style={styles.durationPill}>
                  <Text style={styles.durationPillText}>{durationDays} days</Text>
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Reason</Text>
                <TextInput
                  value={reason}
                  onChangeText={setReason}
                  style={styles.reasonInput}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Attach Document (Optional)</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.attachRow}
                  onPress={() => Alert.alert('Info', 'File upload coming soon!')}
                >
                  <Ionicons name="attach" size={18} color="#4A90D9" />
                  <Text style={styles.attachName}>medical_certificate.pdf</Text>
                  <Ionicons name="close" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>ℹ️</Text>
              <Text style={styles.infoText}>
                Leave request will be sent to{'\n'}
                class teacher for approval.{'\n'}
                You will be notified once approved.
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              disabled={submitting}
              style={[styles.submitBtn, submitting ? styles.submitBtnDisabled : null]}
              onPress={submit}
            >
              <Text style={styles.submitText}>{submitting ? 'Submitting...' : 'Submit Leave Request'}</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <Modal
        visible={showFromPicker || showToPicker}
        transparent
        animationType="fade"
        onRequestClose={closePicker}
      >
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
              onPress={confirmPicker}
            >
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} style={styles.cancelBtn} onPress={closePicker}>
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
  topNavRightSpacer: { width: 40, height: 40 },

  childSelectorCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, marginBottom: 16 },
  childSelectorLabel: { fontSize: 12, color: '#9CA3AF', fontWeight: '700', marginBottom: 10 },
  childSelectorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  childLeftRow: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  childAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  childInitials: { fontSize: 14, fontWeight: '900', color: '#4A90D9' },
  childInfo: { flex: 1 },
  childName: { fontSize: 14, fontWeight: '900', color: '#1F2937', marginBottom: 2 },
  childClass: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  switchChildPill: { backgroundColor: '#EAF3FB', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  switchChildText: { fontSize: 12, fontWeight: '800', color: '#4A90D9' },

  form: { gap: 16, marginBottom: 16 },
  field: { gap: 8 },
  fieldLabel: { fontSize: 13, color: '#9CA3AF', fontWeight: '700' },
  dropdown: { height: 52, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dropdownValue: { fontSize: 14, color: '#1F2937', fontWeight: '700' },

  durationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  durationLabel: { fontSize: 13, color: '#9CA3AF', fontWeight: '700' },
  durationPill: { backgroundColor: '#EAF3FB', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6 },
  durationPillText: { color: '#4A90D9', fontSize: 12, fontWeight: '900' },

  reasonInput: { height: 100, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, fontSize: 14, color: '#1F2937', fontWeight: '600' },

  attachRow: {
    height: 52,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#B5D4F4',
    backgroundColor: '#EAF3FB',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  attachName: { flex: 1, fontSize: 13, fontWeight: '800', color: '#4A90D9' },

  infoCard: { backgroundColor: '#EAF3FB', borderWidth: 1, borderColor: '#B5D4F4', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 16 },
  infoIcon: { fontSize: 16, marginTop: 1 },
  infoText: { flex: 1, fontSize: 12, color: '#4A90D9', fontWeight: '700', lineHeight: 16 },

  submitBtn: { width: '100%', height: 52, borderRadius: 26, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  submitBtnDisabled: { backgroundColor: '#D1D5DB' },
  submitText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },

  successCard: { backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#5CB85C', borderRadius: 12, padding: 16 },
  successTitle: { fontSize: 15, fontWeight: '900', color: '#5CB85C', marginBottom: 10 },
  successText: { fontSize: 13, color: '#6B7280', fontWeight: '700', lineHeight: 18 },
  backHomeBtn: { marginTop: 14, backgroundColor: '#EAF3FB', borderRadius: 999, paddingVertical: 12, alignItems: 'center' },
  backHomeText: { color: '#4A90D9', fontSize: 13, fontWeight: '900' },

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

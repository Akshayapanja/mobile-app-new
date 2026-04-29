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
  return d.getDay();
}

export default function StaffApplyLeave() {
  const navigation = useNavigation<any>();

  const [leaveType, setLeaveType] = useState('Medical Leave');
  const [fromDate, setFromDate] = useState<Date>(new Date(2025, 3, 16));
  const [toDate, setToDate] = useState<Date>(new Date(2025, 3, 17));
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [pickerMonthOffset, setPickerMonthOffset] = useState(0);
  const [tempSelectedDay, setTempSelectedDay] = useState<number | null>(null);

  const pickerBase = useMemo(() => new Date(2025, 3, 1), []);
  const pickerLabel = useMemo(() => monthLabel(pickerBase, pickerMonthOffset), [pickerBase, pickerMonthOffset]);
  const pickerDays = useMemo(() => daysInMonth(pickerBase, pickerMonthOffset), [pickerBase, pickerMonthOffset]);
  const pickerStart = useMemo(() => startDow(pickerBase, pickerMonthOffset), [pickerBase, pickerMonthOffset]);

  const durationDays = useMemo(() => {
    const start = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()).getTime();
    const end = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate()).getTime();
    return Math.max(1, Math.floor((end - start) / (24 * 60 * 60 * 1000)) + 1);
  }, [fromDate, toDate]);

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
    if (!tempSelectedDay) return;
    const chosen = new Date(pickerBase.getFullYear(), pickerBase.getMonth() + pickerMonthOffset, tempSelectedDay);
    if (showFromPicker) {
      setFromDate(chosen);
      if (chosen.getTime() > toDate.getTime()) setToDate(chosen);
    } else {
      setToDate(chosen);
      if (chosen.getTime() < fromDate.getTime()) setFromDate(chosen);
    }
    closePicker();
  };

  const openLeaveTypePicker = () => {
    Alert.alert('Leave Type', 'Choose leave type', [
      { text: 'Medical Leave', onPress: () => setLeaveType('Medical Leave') },
      { text: 'Casual Leave', onPress: () => setLeaveType('Casual Leave') },
      { text: 'Personal Leave', onPress: () => setLeaveType('Personal Leave') },
      { text: 'Emergency Leave', onPress: () => setLeaveType('Emergency Leave') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const submit = () => {
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

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

        <View style={styles.staffCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>LS</Text></View>
          <View>
            <Text style={styles.staffName}>Mrs. Lakshmi Subramaniam</Text>
            <Text style={styles.staffRole}>Mathematics Teacher</Text>
          </View>
        </View>

        <View style={styles.balanceRow}>
          <View style={[styles.balanceCard, { backgroundColor: '#EAF3FB' }]}><Text style={[styles.balanceNum, { color: '#4A90D9' }]}>8</Text><Text style={styles.balanceLabel}>Casual</Text></View>
          <View style={[styles.balanceCard, { backgroundColor: '#F0FDF4' }]}><Text style={[styles.balanceNum, { color: '#5CB85C' }]}>12</Text><Text style={styles.balanceLabel}>Medical</Text></View>
          <View style={[styles.balanceCard, { backgroundColor: '#FFF8E7' }]}><Text style={[styles.balanceNum, { color: '#F5A623' }]}>5</Text><Text style={styles.balanceLabel}>Personal</Text></View>
        </View>

        {success ? (
          <View style={styles.successCard}>
            <Text style={styles.successTitle}>? Leave Request Submitted!</Text>
            <Text style={styles.successMsg}>Your leave request sent to HR.{`\n`}Expected response within 24 hours.</Text>
            <TouchableOpacity style={styles.backBtn} activeOpacity={0.9} onPress={() => navigation.navigate('StaffTabs')}>
              <Text style={styles.backBtnText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formWrap}>
            <View style={styles.field}><Text style={styles.label}>Leave Type</Text><TouchableOpacity style={styles.dropdown} activeOpacity={0.9} onPress={openLeaveTypePicker}><Text style={styles.dropdownValue}>{leaveType}</Text><Ionicons name="chevron-down" size={18} color="#9CA3AF" /></TouchableOpacity></View>

            <View style={styles.field}><Text style={styles.label}>From Date</Text><TouchableOpacity style={styles.dropdown} activeOpacity={0.9} onPress={() => openPicker('from')}><Text style={styles.dropdownValue}>{fmtDateLabel(fromDate)}</Text><Ionicons name="calendar-outline" size={18} color="#9CA3AF" /></TouchableOpacity></View>

            <View style={styles.field}><Text style={styles.label}>To Date</Text><TouchableOpacity style={styles.dropdown} activeOpacity={0.9} onPress={() => openPicker('to')}><Text style={styles.dropdownValue}>{fmtDateLabel(toDate)}</Text><Ionicons name="calendar-outline" size={18} color="#9CA3AF" /></TouchableOpacity></View>

            <View style={styles.durationRow}><Text style={styles.durationLabel}>Duration:</Text><View style={styles.durationPill}><Text style={styles.durationPillText}>{durationDays} days</Text></View></View>

            <View style={styles.field}><Text style={styles.label}>Reason</Text><TextInput value={reason} onChangeText={setReason} placeholder="Reason for leave..." placeholderTextColor="#9CA3AF" multiline textAlignVertical="top" style={styles.reasonInput} /></View>

            <TouchableOpacity style={[styles.submitBtn, submitting ? styles.submitBtnDisabled : null]} disabled={submitting} activeOpacity={0.9} onPress={submit}><Text style={styles.submitBtnText}>{submitting ? 'Submitting...' : 'Submit Leave Request'}</Text></TouchableOpacity>
          </View>
        )}

        <Text style={styles.historyTitle}>My Leave History</Text>
        <View style={{ gap: 10 }}>
          <View style={styles.historyCard}><View><Text style={styles.hType}>Medical Leave</Text><Text style={styles.hDate}>April 1-3, 2025</Text><Text style={styles.hDays}>3 days</Text></View><View style={[styles.hPill, { backgroundColor: '#F0FDF4' }]}><Text style={[styles.hPillText, { color: '#5CB85C' }]}>Approved</Text></View></View>
          <View style={styles.historyCard}><View><Text style={styles.hType}>Casual Leave</Text><Text style={styles.hDate}>March 15, 2025</Text><Text style={styles.hDays}>1 day</Text></View><View style={[styles.hPill, { backgroundColor: '#F0FDF4' }]}><Text style={[styles.hPillText, { color: '#5CB85C' }]}>Approved</Text></View></View>
          <View style={styles.historyCard}><View><Text style={styles.hType}>Personal Leave</Text><Text style={styles.hDate}>February 20, 2025</Text><Text style={styles.hDays}>1 day</Text></View><View style={[styles.hPill, { backgroundColor: '#FFF0F0' }]}><Text style={[styles.hPillText, { color: '#E85D5D' }]}>Rejected</Text></View></View>
        </View>
      </ScrollView>

      <Modal visible={showFromPicker || showToPicker} transparent animationType="fade" onRequestClose={closePicker}>
        <View style={styles.pickerOverlay}>
          <View style={styles.pickerSheet}>
            <Text style={styles.pickerTitle}>Select Date</Text>
            <View style={styles.pickerMonthRow}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => setPickerMonthOffset(v => v - 1)} style={styles.monthArrowBtn}><Text style={styles.monthArrow}>?</Text></TouchableOpacity>
              <Text style={styles.monthLabel}>{pickerLabel}</Text>
              <TouchableOpacity activeOpacity={0.85} onPress={() => setPickerMonthOffset(v => v + 1)} style={styles.monthArrowBtn}><Text style={styles.monthArrow}>?</Text></TouchableOpacity>
            </View>
            <View style={styles.dateGrid}>
              {Array.from({ length: pickerStart }).map((_, i) => <View key={`sp-${i}`} style={styles.dateCell} />)}
              {Array.from({ length: pickerDays }).map((_, i) => {
                const day = i + 1;
                const isSelected = tempSelectedDay === day;
                return (
                  <TouchableOpacity key={`d-${day}`} activeOpacity={0.85} onPress={() => setTempSelectedDay(day)} style={[styles.dateCell, styles.dateCircle, isSelected ? styles.dateSelected : null]}>
                    <Text style={[styles.dateText, isSelected ? styles.dateTextSelected : null]}>{day}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity activeOpacity={0.9} style={[styles.confirmBtn, !tempSelectedDay ? styles.confirmBtnDisabled : null]} disabled={!tempSelectedDay} onPress={confirmPicker}><Text style={styles.confirmBtnText}>Confirm</Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.cancelBtn} onPress={closePicker}><Text style={styles.cancelBtnText}>Cancel</Text></TouchableOpacity>
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

  staffCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '800', color: '#4A90D9' },
  staffName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  staffRole: { marginTop: 2, fontSize: 13, color: '#6B7280', fontWeight: '600' },

  balanceRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  balanceCard: { flex: 1, borderRadius: 12, padding: 12, alignItems: 'center' },
  balanceNum: { fontSize: 20, fontWeight: '800' },
  balanceLabel: { marginTop: 2, fontSize: 11, color: '#6B7280', fontWeight: '600' },

  formWrap: { gap: 16, marginBottom: 16 },
  field: { gap: 8 },
  label: { fontSize: 13, color: '#9CA3AF', fontWeight: '700' },
  dropdown: { height: 52, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dropdownValue: { fontSize: 14, color: '#1F2937', fontWeight: '700' },
  durationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  durationLabel: { fontSize: 13, color: '#9CA3AF', fontWeight: '700' },
  durationPill: { borderRadius: 999, backgroundColor: '#EAF3FB', paddingHorizontal: 12, paddingVertical: 6 },
  durationPillText: { fontSize: 12, color: '#4A90D9', fontWeight: '800' },
  reasonInput: { height: 100, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, fontSize: 14, color: '#111827' },

  submitBtn: { height: 52, borderRadius: 50, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  submitBtnDisabled: { backgroundColor: '#D1D5DB' },
  submitBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },

  successCard: { backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#5CB85C', borderRadius: 12, padding: 16, marginBottom: 14 },
  successTitle: { color: '#5CB85C', fontSize: 15, fontWeight: '900' },
  successMsg: { marginTop: 8, color: '#6B7280', fontSize: 13, lineHeight: 18, fontWeight: '600' },
  backBtn: { marginTop: 14, height: 44, borderRadius: 999, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  backBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },

  historyTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 10 },
  historyCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  hType: { fontSize: 14, fontWeight: '700', color: '#111827' },
  hDate: { marginTop: 2, fontSize: 12, color: '#6B7280' },
  hDays: { marginTop: 2, fontSize: 11, color: '#6B7280' },
  hPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  hPillText: { fontSize: 11, fontWeight: '800' },

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
  dateText: { fontSize: 12, fontWeight: '900', color: '#111827' },
  dateTextSelected: { color: '#FFFFFF' },
  confirmBtn: { marginTop: 14, width: '100%', height: 44, borderRadius: 22, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  confirmBtnDisabled: { backgroundColor: '#D1D5DB' },
  confirmBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  cancelBtn: { marginTop: 10, width: '100%', height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  cancelBtnText: { color: '#111827', fontSize: 13, fontWeight: '900' },
});

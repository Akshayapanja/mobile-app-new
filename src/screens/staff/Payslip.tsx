import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function monthLabel(base: Date, offset: number) {
  const d = new Date(base.getFullYear(), base.getMonth() + offset, 1);
  const month = d.toLocaleString('en-US', { month: 'long' });
  return `${month} ${d.getFullYear()}`;
}

export default function Payslip() {
  const navigation = useNavigation<any>();
  const [monthOffset, setMonthOffset] = useState(0);
  const baseMonth = useMemo(() => new Date(2025, 3, 1), []);
  const monthText = monthLabel(baseMonth, monthOffset);

  const earnings = [
    { label: 'Basic Salary', amount: 45000 },
    { label: 'HRA', amount: 9000 },
    { label: 'Transport Allowance', amount: 2000 },
    { label: 'Medical Allowance', amount: 1500 },
  ];
  const deductions = [
    { label: 'PF', amount: 5400 },
    { label: 'Professional Tax', amount: 200 },
  ];

  const totalEarnings = earnings.reduce((a, b) => a + b.amount, 0);
  const totalDeductions = deductions.reduce((a, b) => a + b.amount, 0);
  const netPay = totalEarnings - totalDeductions;

  const amount = (n: number) => `\u20B9${n.toLocaleString('en-IN')}`;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>My Payslip</Text>
          <View style={styles.topNavRightSpacer} />
        </View>

        <View style={styles.monthRow}>
          <TouchableOpacity style={styles.monthArrowBtn} onPress={() => setMonthOffset(v => v - 1)} activeOpacity={0.85}>
            <Ionicons name="chevron-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{monthText}</Text>
          <TouchableOpacity style={styles.monthArrowBtn} onPress={() => setMonthOffset(v => v + 1)} activeOpacity={0.85}>
            <Ionicons name="chevron-forward" size={20} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <View style={styles.staffInfoCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>LS</Text></View>
          <View>
            <Text style={styles.staffName}>Mrs. Lakshmi Subramaniam</Text>
            <Text style={styles.staffRole}>Mathematics Teacher</Text>
            <Text style={styles.staffEmp}>EMP001</Text>
          </View>
        </View>

        <View style={styles.salaryCard}>
          <Text style={styles.sectionTitle}>Gross Earnings</Text>
          <View style={styles.sectionBlock}>
            {earnings.map(item => (
              <View key={item.label} style={styles.rowBetween}><Text style={styles.rowLabel}>{item.label}</Text><Text style={styles.rowValue}>{amount(item.amount)}</Text></View>
            ))}
            <View style={styles.divider} />
            <View style={styles.rowBetween}><Text style={styles.totalLabel}>Total Earnings</Text><Text style={styles.totalEarn}>{amount(totalEarnings)}</Text></View>
          </View>

          <Text style={styles.sectionTitle}>Deductions</Text>
          <View style={styles.sectionBlock}>
            {deductions.map(item => (
              <View key={item.label} style={styles.rowBetween}><Text style={styles.rowLabel}>{item.label}</Text><Text style={styles.rowValue}>{amount(item.amount)}</Text></View>
            ))}
            <View style={styles.divider} />
            <View style={styles.rowBetween}><Text style={styles.totalLabel}>Total Deductions</Text><Text style={styles.totalDed}>{amount(totalDeductions)}</Text></View>
          </View>

          <View style={styles.thickDivider} />
          <View style={styles.rowBetween}><Text style={styles.netLabel}>Net Pay</Text><Text style={styles.netValue}>{amount(netPay)}</Text></View>
        </View>

        <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.9} onPress={() => Alert.alert('Downloaded', `Payslip for ${monthText} downloaded!`)}>
          <Text style={styles.downloadText}>Download Payslip</Text>
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
  topNavTitle: { fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center', flex: 1 },
  topNavRightSpacer: { width: 40, height: 40 },

  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  monthArrowBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  monthArrow: { fontSize: 18, fontWeight: '800', color: '#4A90D9' },
  monthText: { fontSize: 15, fontWeight: '700', color: '#1F2937' },

  staffInfoCard: { backgroundColor: '#EAF3FB', borderWidth: 1, borderColor: '#B5D4F4', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '800', color: '#4A90D9' },
  staffName: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  staffRole: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  staffEmp: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  salaryCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, marginBottom: 14 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1F2937', marginBottom: 8 },
  sectionBlock: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 12, marginBottom: 12, gap: 8 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLabel: { fontSize: 13, color: '#6B7280' },
  rowValue: { fontSize: 14, color: '#1F2937', fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 2 },
  totalLabel: { fontSize: 14, color: '#1F2937', fontWeight: '700' },
  totalEarn: { fontSize: 16, color: '#5CB85C', fontWeight: '800' },
  totalDed: { fontSize: 16, color: '#E85D5D', fontWeight: '800' },
  thickDivider: { height: 2, backgroundColor: '#E5E7EB', marginVertical: 8 },
  netLabel: { fontSize: 18, color: '#1F2937', fontWeight: '800' },
  netValue: { fontSize: 24, color: '#4A90D9', fontWeight: '900' },

  downloadBtn: { height: 52, borderRadius: 50, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center' },
  downloadText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});

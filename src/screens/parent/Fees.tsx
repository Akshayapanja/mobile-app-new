// ✅ Converted from React Web → React Native

import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getUser } from '../../lib/session';
import { CHILDREN } from '../../lib/mockData';

const PENDING = [
  { name: 'Term 2 Tuition Fee', amount: 3000, due: 'April 30 2025' },
  { name: 'Computer Lab Fee', amount: 500, due: 'April 30 2025' },
  { name: 'Sports Fee', amount: 1000, due: 'April 30 2025' },
];

const PAID = [
  { name: 'Term 1 Tuition Fee', amount: 3000, paidOn: 'March 1 2025' },
  { name: 'Annual Fee', amount: 2000, paidOn: 'June 1 2024' },
];

export default function Fees() {
  const navigation = useNavigation<any>();
  const [child, setChild] = React.useState<any>(null);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      const u = await getUser();
      const firstId = u?.childIds?.[0] || 'c1';
      const c = CHILDREN[firstId];
      if (mounted) setChild(c || null);
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const totalOutstanding = 4500;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.topNavBtn}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.topNavTitle}>Fee Details</Text>

          <View style={styles.topNavRightSpacer} />
        </View>

        {child ? (
          <View style={styles.childRow}>
            <View style={styles.childAvatar}>
              <Text style={styles.childInitials}>{child.initials}</Text>
            </View>

            <View style={styles.childInfo}>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.childClass}>Class {child.class} - Section {child.section}</Text>
            </View>

            <View style={styles.yearPill}>
              <Text style={styles.yearPillText}>2024-25</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.totalDueCard}>
          <Text style={styles.totalAmount}>₹{totalOutstanding.toLocaleString()}</Text>
          <Text style={styles.totalSubtitle}>Total Outstanding Amount</Text>

          <View style={styles.totalDivider} />

          <View style={styles.totalBottomRow}>
            <Text style={styles.totalDueText}>Due before April 30 2025</Text>
            <Text style={styles.totalPendingText}>2 items pending</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Fee Breakdown</Text>
        <View style={styles.feeList}>
          {PENDING.map(p => (
            <View key={p.name} style={styles.feeCard}>
              <View style={styles.feeTopRow}>
                <View style={styles.feeLeft}>
                  <Text style={styles.feeName}>{p.name}</Text>
                  <Text style={styles.feeDue}>Due: {p.due}</Text>
                </View>

                <View style={styles.feeRight}>
                  <Text style={styles.feeAmount}>₹{p.amount.toLocaleString()}</Text>
                  <View style={styles.pendingPill}>
                    <Text style={styles.pendingPillText}>Pending</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.invoiceBtn}
          onPress={() => Alert.alert('Success', 'Fee invoice downloaded successfully!')}
        >
          <Text style={styles.invoiceBtnText}>⬇ Download Fee Invoice</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Payment History</Text>
        <View style={styles.paymentList}>
          {PAID.map(p => (
            <View key={p.name} style={styles.paymentCard}>
              <View style={styles.paymentRow}>
                <View style={styles.paymentLeft}>
                  <Text style={styles.paymentName}>{p.name}</Text>
                  <Text style={styles.paymentMeta}>Paid on: {p.paidOn}</Text>
                </View>

                <View style={styles.paymentRight}>
                  <Text style={styles.paymentAmount}>₹{p.amount.toLocaleString()}</Text>
                  <View style={styles.paidPill}>
                    <Text style={styles.paidPillText}>Paid ✓</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Payments processed securely{'\n'}via Razorpay. Receipt sent after payment.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.payNowBtn}
          onPress={() => Alert.alert('Payment', 'Redirecting to Razorpay payment gateway...')}
        >
          <Text style={styles.payNowText}>Pay Now ₹{totalOutstanding.toLocaleString()}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 80,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  topNavBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topNavTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    flex: 1,
  },
  topNavRightSpacer: {
    width: 40,
    height: 40,
  },
  childRow: {
    backgroundColor: '#EAF3FB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  childAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childInitials: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4A90D9',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 2,
  },
  childClass: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  yearPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B5D4F4',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  yearPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4A90D9',
  },
  totalDueCard: {
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 18,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '900',
    color: '#E85D5D',
  },
  totalSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 6,
    fontWeight: '600',
  },
  totalDivider: {
    height: 1,
    backgroundColor: '#FECACA',
    alignSelf: 'stretch',
    marginVertical: 14,
  },
  totalBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  totalDueText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  totalPendingText: {
    fontSize: 12,
    color: '#E85D5D',
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  feeList: {
    gap: 10,
    marginBottom: 14,
  },
  feeCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
  },
  feeTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  feeLeft: {
    flex: 1,
  },
  feeName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  feeDue: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  feeRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  feeAmount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
  },
  pendingPill: {
    backgroundColor: '#FFF0F0',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pendingPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E85D5D',
  },
  invoiceBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4A90D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  invoiceBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4A90D9',
  },
  paymentList: {
    gap: 10,
    marginBottom: 14,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  paymentLeft: {
    flex: 1,
  },
  paymentName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  paymentMeta: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  paymentRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#5CB85C',
  },
  paidPill: {
    backgroundColor: '#F0FDF4',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  paidPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#5CB85C',
  },
  infoCard: {
    backgroundColor: '#EAF3FB',
    borderWidth: 1,
    borderColor: '#B5D4F4',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 14,
  },
  infoIcon: {
    fontSize: 16,
    marginTop: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#4A90D9',
    fontWeight: '700',
    lineHeight: 16,
  },
  payNowBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payNowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});

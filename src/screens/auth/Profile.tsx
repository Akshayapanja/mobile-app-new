import React, { useEffect, useMemo, useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUser, logout } from '../../lib/session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

type UserShape = {
  name: string;
  phone: string;
  email?: string;
  role?: string;
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const lastTwo = parts.slice(-2);
  const raw = lastTwo.map(p => p[0]).join('');
  return (raw || 'P').toUpperCase();
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoIconCircle}>
        <Text style={styles.infoIcon}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function Profile() {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<UserShape | null>(null);
  const rootNav = (navigation as any).getParent?.()?.getParent?.() || (navigation as any).getParent?.() || navigation;

  useEffect(() => {
    let alive = true;
    (async () => {
      const u = await getUser();
      if (!alive) return;
      if (!u) {
        rootNav.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          })
        );
        return;
      }
      setUser(u as any);
    })();
    return () => {
      alive = false;
    };
  }, [navigation]);

  const initials = useMemo(() => initialsFromName(user?.name || ''), [user?.name]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <Text style={styles.topTitle}>Profile</Text>
        </View>

        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{user?.name || 'Parent'}</Text>
          <Text style={styles.role}>Parent</Text>
          <Text style={styles.school}>Delhi Public School, Hyderabad</Text>
        </View>

        <View style={{ gap: 10 }}>
          <InfoRow icon="📞" label="Phone" value={user?.phone ? `+91 ${user.phone}` : '-'} />
          <InfoRow icon="✉" label="Email" value={user?.email || '-'} />
          <InfoRow icon="📅" label="Academic Year" value="2024-25" />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.logoutBtn}
          onPress={() =>
            Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                  try {
                    await logout();
                    await AsyncStorage.multiRemove([
                      'intants_user',
                      'intants_school_selected',
                      'login_phone',
                      'sentHomework',
                    ]);
                  } catch (e) {
                    console.log('Logout cleanup error:', e);
                  } finally {
                    await new Promise(resolve => setTimeout(resolve, 150));
                    rootNav.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Auth' }],
                      })
                    );
                  }
                },
              },
            ])
          }
        >
          <Text style={styles.logoutBtnText}>→ Logout</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Powered by Intants</Text>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 0 },

  topNav: { alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginBottom: 8 },
  topTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },

  header: { alignItems: 'center', marginBottom: 18 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 28, fontWeight: '800', color: '#4A90D9' },
  name: { marginTop: 12, fontSize: 20, fontWeight: '800', color: '#1F2937', textAlign: 'center' },
  role: { marginTop: 4, fontSize: 14, color: '#6B7280', fontWeight: '600', textAlign: 'center' },
  school: { marginTop: 4, fontSize: 13, color: '#6B7280', fontWeight: '600', textAlign: 'center' },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EAF3FB', alignItems: 'center', justifyContent: 'center' },
  infoIcon: { fontSize: 18 },
  infoLabel: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
  infoValue: { marginTop: 2, fontSize: 14, fontWeight: '800', color: '#1F2937' },

  logoutBtn: { marginTop: 12, height: 52, borderRadius: 50, borderWidth: 1, borderColor: '#E85D5D', alignItems: 'center', justifyContent: 'center' },
  logoutBtnText: { color: '#E85D5D', fontWeight: '800', fontSize: 14 },

  footer: { marginTop: 18, textAlign: 'center', color: '#9CA3AF', fontSize: 12, fontWeight: '600' },
});

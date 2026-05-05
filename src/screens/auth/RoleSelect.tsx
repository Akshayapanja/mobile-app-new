// ✅ Converted from React Web → React Native

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Nav = {
  goBack: () => void;
  reset: (state: any) => void;
};

export default function RoleSelect() {
  const navigation = useNavigation<Nav>();

  const setActiveRole = async (role: 'parent' | 'staff') => {
    try {
      const raw = await AsyncStorage.getItem('intants_user');
      if (!raw) return;
      const parsed = JSON.parse(raw) as any;
      const roles =
        Array.isArray(parsed?.roles) && parsed.roles.length > 0
          ? parsed.roles
          : parsed?.phone === '9900000001'
            ? (['staff', 'parent'] as const)
            : ([parsed?.role].filter(Boolean) as any[]);

      await AsyncStorage.setItem(
        'intants_user',
        JSON.stringify({
          ...parsed,
          roles,
          role,
        })
      );
    } catch {
      // ignore: role switching should still navigate
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>

        <View style={styles.brand}>
          <Text style={styles.logo}>Intants</Text>
          <Text style={styles.subtitle}>School ERP</Text>
        </View>

        <Text style={styles.heading}>Select Your Role</Text>
        <Text style={styles.desc}>
          You have access to multiple roles.{'\n'}How would you like to continue today?
        </Text>

        <View style={styles.cards}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={async () => {
              await setActiveRole('staff');
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Staff',
                    state: {
                      routes: [{ name: 'StaffTabs' }],
                    },
                  },
                ],
              });
            }}
            style={[styles.card, styles.staffCard]}
          >
            <Text style={styles.emoji}>👨‍🏫</Text>
            <Text style={styles.cardTitle}>Continue as Staff</Text>
            <Text style={styles.cardText}>
              Access attendance, homework,{'\n'}marks and more
            </Text>
            <Text style={[styles.arrow, styles.arrowBlue]}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={async () => {
              await setActiveRole('parent');
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Parent',
                    state: {
                      routes: [{ name: 'ParentTabs' }],
                    },
                  },
                ],
              });
            }}
            style={[styles.card, styles.parentCard]}
          >
            <Text style={styles.emoji}>👨‍👩‍👧</Text>
            <Text style={styles.cardTitle}>Continue as Parent</Text>
            <Text style={styles.cardText}>
              View your child progress,{'\n'}fees and attendance
            </Text>
            <Text style={[styles.arrow, styles.arrowGray]}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.flexSpacer} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by Intants</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 18,
  },
  brand: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4A90D9',
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginTop: 6,
  },
  desc: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    textAlign: 'center',
  },
  cards: {
    marginTop: 22,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  staffCard: {
    borderWidth: 2,
    borderColor: '#4A90D9',
  },
  parentCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emoji: {
    fontSize: 48,
    lineHeight: 52,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  cardText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    color: '#6B7280',
    textAlign: 'center',
  },
  arrow: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: '800',
  },
  arrowBlue: {
    color: '#4A90D9',
  },
  arrowGray: {
    color: '#9CA3AF',
  },
  flexSpacer: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});


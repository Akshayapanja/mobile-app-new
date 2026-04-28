import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser } from '../lib/session';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth screens
import Login from '../screens/auth/Login';
import OTPVerify from '../screens/auth/OTPVerify';
import SchoolSelector from '../screens/auth/SchoolSelector';
import RoleSelect from '../screens/auth/RoleSelect';
import ProfileScreen from '../screens/auth/Profile';

// Parent screens
import ParentDashboard from '../screens/parent/Dashboard';
import ParentChildrenScreen from '../screens/parent/Children';
import ParentChildProfileScreen from '../screens/parent/ChildProfile';
import ParentNotificationsScreen from '../screens/parent/Notifications';
import ParentFeesScreen from '../screens/parent/Fees';
import ParentAttendanceScreen from '../screens/parent/Attendance';
import ParentTimetableScreen from '../screens/parent/Timetable';
import ParentHomeworkScreen from '../screens/parent/Homework';
import ParentResultsScreen from '../screens/parent/Results';
import ParentApplyLeaveScreen from '../screens/parent/ApplyLeave';
import ParentFacultyScreen from '../screens/parent/Faculty';
import ParentBusTrackingScreen from '../screens/parent/BusTracking';
import ParentCalendarScreen from '../screens/parent/AcademicCalendar';
import AnnouncementsScreen from '../screens/shared/Announcements';
import MessagesScreen from '../screens/shared/Messages';
import ChatScreen from '../screens/shared/Chat';

// Staff screens
import StaffDashboard from '../screens/staff/Dashboard';
// NOTE: many staff screens are still web versions (AppShell/lucide-react imports).
// Keep staff stack bundle-safe by using ComingSoon until converted.

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTPVerify" component={OTPVerify} />
      <Stack.Screen name="SchoolSelector" component={SchoolSelector} />
      <Stack.Screen name="RoleSelect" component={RoleSelect} />
    </Stack.Navigator>
  );
}

function ParentTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4A90D9',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F3F4F6',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home-outline';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Children') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Fees') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={ParentDashboard} />
      <Tab.Screen name="Children" component={ParentChildrenScreen} />
      <Tab.Screen name="Fees" component={ParentFeesScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function ParentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParentTabs" component={ParentTabNavigator} />
      <Stack.Screen name="ParentChildren" component={ParentChildrenScreen} />
      <Stack.Screen name="ParentChildProfile" component={ParentChildProfileScreen} />
      <Stack.Screen name="ParentAttendance" component={ParentAttendanceScreen} />
      <Stack.Screen name="ParentTimetable" component={ParentTimetableScreen} />
      <Stack.Screen name="ParentHomework" component={ParentHomeworkScreen} />
      <Stack.Screen name="ParentResults" component={ParentResultsScreen} />
      <Stack.Screen name="ParentFees" component={ParentFeesScreen} />
      <Stack.Screen name="ParentApplyLeave" component={ParentApplyLeaveScreen} />
      <Stack.Screen name="ParentNotifications" component={ParentNotificationsScreen} />
      <Stack.Screen name="ParentFaculty" component={ParentFacultyScreen} />
      <Stack.Screen name="ParentBusTracking" component={ParentBusTrackingScreen} />
      <Stack.Screen name="ParentCalendar" component={ParentCalendarScreen} />
      <Stack.Screen name="ParentChat" component={ChatScreen} />
      <Stack.Screen name="ParentAnnouncements" component={AnnouncementsScreen} />
      <Stack.Screen name="ParentMessages" component={MessagesScreen} />
    </Stack.Navigator>
  );
}

function StaffTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4A90D9',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F3F4F6',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home-outline';
          if (route.name === 'StaffHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'StaffAttendanceTab') {
            iconName = focused ? 'checkbox' : 'checkbox-outline';
          } else if (route.name === 'StaffHomeworkTab') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'StaffMessagesTab') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'StaffProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarLabel: ({}) => {
          const labels: Record<string, string> = {
            StaffHome: 'Home',
            StaffAttendanceTab: 'Attendance',
            StaffHomeworkTab: 'Homework',
            StaffMessagesTab: 'Messages',
            StaffProfileTab: 'Profile',
          };
          return labels[route.name] || route.name;
        },
      })}
    >
      <Tab.Screen name="StaffHome" component={StaffDashboard} />
      <Tab.Screen name="StaffAttendanceTab" component={ComingSoon} />
      <Tab.Screen name="StaffHomeworkTab" component={ComingSoon} />
      <Tab.Screen name="StaffMessagesTab" component={MessagesScreen} />
      <Tab.Screen name="StaffProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function StaffStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StaffTabs" component={StaffTabNavigator} />
      <Stack.Screen name="StaffCreateHomework" component={ComingSoon} />
      <Stack.Screen name="StaffSubmissions" component={ComingSoon} />
      <Stack.Screen name="StaffMarksEntry" component={ComingSoon} />
      <Stack.Screen name="StaffApplyLeave" component={ComingSoon} />
      <Stack.Screen name="StaffPayslip" component={ComingSoon} />
      <Stack.Screen name="StaffHomeworkBot" component={ComingSoon} />
      <Stack.Screen name="StaffTeacherProfile" component={ComingSoon} />
      <Stack.Screen name="StaffTimetable" component={ComingSoon} />
      <Stack.Screen name="StaffStudentList" component={ComingSoon} />
      <Stack.Screen name="StaffNotifications" component={ComingSoon} />
      <Stack.Screen name="StaffBroadcast" component={ComingSoon} />
      <Stack.Screen name="StaffChat" component={ChatScreen} />
      <Stack.Screen name="StaffAnnouncements" component={AnnouncementsScreen} />
      <Stack.Screen name="StaffAttendance" component={ComingSoon} />
      <Stack.Screen name="StaffHomework" component={ComingSoon} />
    </Stack.Navigator>
  );
}

type UserRole = null | 'parent' | 'staff';

export function AppNavigator() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function checkUser() {
      const user = await getUser();
      if (!alive) return;
      const nextRole = user ? ((user as any).role as UserRole) : null;
      setUserRole(prev => (prev === nextRole ? prev : nextRole));
      setLoading(false);
    }
    checkUser();

    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A90D9" />
      </View>
    );
  }

  const initialRouteName = userRole === 'parent' ? 'Parent' : userRole === 'staff' ? 'Staff' : 'Auth';

  return (
    <NavigationContainer
      onStateChange={() => {
        // Re-check role after login/logout navigation inside AuthStack,
        // so we switch to Parent/Staff stacks and all route names resolve.
        getUser().then(user => {
          const nextRole = user ? ((user as any).role as UserRole) : null;
          setUserRole(prev => (prev === nextRole ? prev : nextRole));
        });
      }}
    >
      <Stack.Navigator key={initialRouteName} initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Parent" component={ParentStack} />
        <Stack.Screen name="Staff" component={StaffStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ComingSoon({ route }: any) {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 48 }}>🚧</Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#1F2937',
          marginTop: 16,
          textAlign: 'center',
        }}
      >
        Coming Soon
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#6B7280',
          marginTop: 8,
          textAlign: 'center',
        }}
      >
        This screen is being built
      </Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 24,
          backgroundColor: '#4A90D9',
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 50,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


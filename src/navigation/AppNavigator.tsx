import React, { useEffect, useState } from 'react';
import { NavigationContainer, type NavigationContainerRef, useNavigation } from '@react-navigation/native';
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
import StaffMarkAttendanceScreen from '../screens/staff/MarkAttendance';
import StaffHomeworkScreen from '../screens/staff/StaffHomework';
import StaffCreateHomeworkScreen from '../screens/staff/CreateHomework';
import StaffSubmissionsScreen from '../screens/staff/Submissions';
import StaffMarksEntryScreen from '../screens/staff/MarksEntry';
import StaffHomeworkBotScreen from '../screens/staff/HomeworkBot';
import StaffApplyLeaveScreen from '../screens/staff/StaffApplyLeave';
import StaffPayslipScreen from '../screens/staff/Payslip';
import StaffTeacherProfileScreen from '../screens/staff/TeacherProfile';
import StaffTimetableScreen from '../screens/staff/StaffTimetable';
import StaffStudentListScreen from '../screens/staff/StudentList';
import StaffNotificationsScreen from '../screens/staff/StaffNotifications';
import StaffBroadcastScreen from '../screens/staff/BroadcastMessage';
import StaffCalendarScreen from '../screens/staff/StaffCalendar';

// Driver screens
import DriverDashboardScreen from '../screens/driver/Dashboard';
import DriverMyRouteScreen from '../screens/driver/MyRoute';
import DriverStudentListScreen from '../screens/driver/StudentPickupList';
import DriverMarkAttendanceScreen from '../screens/driver/MarkAttendance';
import DriverGPSScreen from '../screens/driver/GPSTracking';
import DriverTripScreen from '../screens/driver/TripManagement';
import DriverVehicleScreen from '../screens/driver/MyVehicle';
import DriverNotificationsScreen from '../screens/driver/Notifications';
import DriverProfileScreen from '../screens/driver/Profile';

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
      <Stack.Screen name="RoleSelect" component={RoleSelect} />
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
      })}
    >
      <Tab.Screen name="StaffHome" component={StaffDashboard} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="StaffAttendanceTab" component={StaffMarkAttendanceScreen} options={{ tabBarLabel: 'Attendance' }} />
      <Tab.Screen name="StaffHomeworkTab" component={StaffHomeworkScreen} options={{ tabBarLabel: 'Homework' }} />
      <Tab.Screen name="StaffMessagesTab" component={MessagesScreen} options={{ tabBarLabel: 'Messages' }} />
      <Tab.Screen name="StaffProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

function StaffStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StaffTabs" component={StaffTabNavigator} />
      <Stack.Screen name="RoleSelect" component={RoleSelect} />
      <Stack.Screen name="StaffCreateHomework" component={StaffCreateHomeworkScreen} />
      <Stack.Screen name="StaffSubmissions" component={StaffSubmissionsScreen} />
      <Stack.Screen name="StaffMarksEntry" component={StaffMarksEntryScreen} />
      <Stack.Screen name="StaffApplyLeave" component={StaffApplyLeaveScreen} />
      <Stack.Screen name="StaffPayslip" component={StaffPayslipScreen} />
      <Stack.Screen name="StaffHomeworkBot" component={StaffHomeworkBotScreen} />
      <Stack.Screen name="StaffTeacherProfile" component={StaffTeacherProfileScreen} />
      <Stack.Screen name="StaffTimetable" component={StaffTimetableScreen} />
      <Stack.Screen name="StaffStudentList" component={StaffStudentListScreen} />
      <Stack.Screen name="StaffNotifications" component={StaffNotificationsScreen} />
      <Stack.Screen name="StaffBroadcast" component={StaffBroadcastScreen} />
      <Stack.Screen name="StaffChat" component={ChatScreen} />
      <Stack.Screen name="StaffAnnouncements" component={AnnouncementsScreen} />
      <Stack.Screen name="StaffAttendance" component={ComingSoon} />
      <Stack.Screen name="StaffHomework" component={StaffHomeworkScreen} />
      <Stack.Screen name="StaffCalendar" component={StaffCalendarScreen} />
    </Stack.Navigator>
  );
}

function DriverTabNavigator() {
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
          if (route.name === 'DriverHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'DriverRouteTab') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'DriverAttendanceTab') {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          } else if (route.name === 'DriverProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="DriverHome" component={DriverDashboardScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="DriverRouteTab" component={DriverMyRouteScreen} options={{ tabBarLabel: 'Route' }} />
      <Tab.Screen
        name="DriverAttendanceTab"
        component={DriverMarkAttendanceScreen}
        options={{ tabBarLabel: 'Attendance' }}
      />
      <Tab.Screen name="DriverProfileTab" component={DriverProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

function DriverStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriverTabs" component={DriverTabNavigator} />
      <Stack.Screen name="DriverStudentList" component={DriverStudentListScreen} />
      <Stack.Screen name="DriverGPS" component={DriverGPSScreen} />
      <Stack.Screen name="DriverTrip" component={DriverTripScreen} />
      <Stack.Screen name="DriverVehicle" component={DriverVehicleScreen} />
      <Stack.Screen name="DriverNotifications" component={DriverNotificationsScreen} />
      <Stack.Screen name="DriverMarkAttendance" component={DriverMarkAttendanceScreen} />
    </Stack.Navigator>
  );
}

type UserRole = null | 'parent' | 'staff' | 'driver';

export function AppNavigator({ navigationRef }: { navigationRef?: NavigationContainerRef<any> }) {
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

  const initialRouteName =
    userRole === 'parent' ? 'Parent' : userRole === 'staff' ? 'Staff' : userRole === 'driver' ? 'Driver' : 'Auth';

  return (
    <NavigationContainer
      ref={navigationRef as any}
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
        <Stack.Screen name="Driver" component={DriverStack} />
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




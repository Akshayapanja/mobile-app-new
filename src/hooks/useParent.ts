import { useQuery } from '@tanstack/react-query';
import { parentService } from '../services';

export const useParentDashboard = () => {
  return useQuery({
    queryKey: ['parentDashboard'],
    queryFn: () => parentService.getDashboard(),
    retry: 0,
    staleTime: 2 * 60 * 1000,
  });
};

export const useChildren = () => {
  return useQuery({
    queryKey: ['children'],
    queryFn: () => parentService.getChildren(),
    retry: 0,
  });
};

export const useChildById = (id: string) => {
  return useQuery({
    queryKey: ['child', id],
    queryFn: () => parentService.getChildById(id),
    enabled: !!id,
    retry: 0,
  });
};

export const useAttendance = (studentId?: string) => {
  return useQuery({
    queryKey: ['attendance', studentId],
    queryFn: () => parentService.getAttendance({ studentId }),
    enabled: !!studentId,
    retry: 0,
  });
};

export const useHomework = (sectionId: string) => {
  return useQuery({
    queryKey: ['homework', sectionId],
    queryFn: () => parentService.getHomework(sectionId),
    enabled: !!sectionId,
    retry: 0,
  });
};

export const useFeeInvoices = (studentId: string) => {
  return useQuery({
    queryKey: ['fees', studentId],
    queryFn: () => parentService.getFeeInvoices(studentId),
    enabled: !!studentId,
    retry: 0,
  });
};

export const useConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: () => parentService.getConversations(),
    retry: 0,
    refetchInterval: 30000,
  });
};

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => parentService.getNotifications(),
    retry: 0,
    refetchInterval: 60000,
  });
};


import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { teacherService } from '../services';

export const useTeacherDashboard = () => {
  return useQuery({
    queryKey: ['teacherDashboard'],
    queryFn: () => teacherService.getDashboard(),
    retry: 0,
    staleTime: 2 * 60 * 1000,
  });
};

export const useTeacherHomework = (sectionId: string) => {
  return useQuery({
    queryKey: ['teacherHomework', sectionId],
    queryFn: () => teacherService.getHomework(sectionId),
    enabled: !!sectionId,
    retry: 0,
  });
};

export const useStudents = (params?: { classId?: string; sectionId?: string }) => {
  return useQuery({
    queryKey: ['students', params],
    queryFn: () => teacherService.getStudents(params),
    retry: 0,
  });
};

export const useTeacherNotifications = () => {
  return useQuery({
    queryKey: ['teacherNotifications'],
    queryFn: () => teacherService.getNotifications(),
    retry: 0,
    refetchInterval: 60000,
  });
};

export const useCreateHomework = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => teacherService.createHomework(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherHomework'] });
    },
  });
};

export const useMarkAttendance = () => {
  return useMutation({
    mutationFn: (data: any) => teacherService.markAttendance(data),
  });
};

export const useSubmitMarks = () => {
  return useMutation({
    mutationFn: (data: any) => teacherService.submitMarks(data),
  });
};


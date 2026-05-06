import { useMutation, useQuery } from '@tanstack/react-query';
import { driverService } from '../services';

export const useDriverDashboard = () => {
  return useQuery({
    queryKey: ['driverDashboard'],
    queryFn: async () => {
      const [stats, route] = await Promise.all([
        driverService.getTransportStats(),
        driverService.getMyRoute(),
      ]);
      return { stats, route };
    },
    retry: 0,
    staleTime: 2 * 60 * 1000,
  });
};

export const useMyRoute = () => {
  return useQuery({
    queryKey: ['myRoute'],
    queryFn: () => driverService.getMyRoute(),
    retry: 0,
  });
};

export const useStudentsOnRoute = () => {
  return useQuery({
    queryKey: ['studentsOnRoute'],
    queryFn: () => driverService.getStudentsOnRoute(),
    retry: 0,
  });
};

export const useMarkTransportAttendance = () => {
  return useMutation({
    mutationFn: (data: any) => driverService.markBulkAttendance(data),
  });
};

export const useUpdateGPS = () => {
  return useMutation({
    mutationFn: ({ vehicleId, data }: { vehicleId: string; data: any }) =>
      driverService.updateGPSLocation(vehicleId, data),
  });
};


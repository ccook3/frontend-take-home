import { renderHook, waitFor } from '@testing-library/react';
import useSWR from 'swr';
import {
  API_BASE_URL,
  useRoles,
  useUserRole,
  useUsers,
} from '../../services/api';

jest.mock('swr');

describe('API Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useUsers', () => {
    it('should fetch users and roles and combine them', async () => {
      const mockUsersData = {
        data: [
          { id: '1', name: 'John Doe', roleId: 'role1' },
          { id: '2', name: 'Jane Smith', roleId: 'role2' },
        ],
        total: 2,
      };

      const mockRolesData = {
        data: [
          {
            id: 'role1',
            name: 'Admin',
            description: 'Description of Admin role',
          },
          {
            id: 'role2',
            name: 'User',
            description: 'Description of User role',
          },
        ],
      };

      useSWR.mockImplementation((url) => {
        if (url.includes('/users')) {
          return {
            data: mockUsersData,
            error: undefined,
            isLoading: false,
            mutate: jest.fn(),
          };
        }
        if (url.includes('/roles')) {
          return {
            data: mockRolesData,
            error: undefined,
            isLoading: false,
          };
        }
        return {};
      });

      const { result } = renderHook(() => useUsers(1, ''));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual({
        ...mockUsersData,
        completeUsers: [
          {
            id: '1',
            name: 'John Doe',
            roleId: 'role1',
            role: {
              id: 'role1',
              name: 'Admin',
              description: 'Description of Admin role',
            },
          },
          {
            id: '2',
            name: 'Jane Smith',
            roleId: 'role2',
            role: {
              id: 'role2',
              name: 'User',
              description: 'Description of User role',
            },
          },
        ],
      });

      // Verify SWR was called with the correct URLs
      expect(useSWR).toHaveBeenCalledWith(
        `${API_BASE_URL}/users?search=&page=1`,
        expect.any(Function)
      );
      expect(useSWR).toHaveBeenCalledWith(
        `${API_BASE_URL}/roles`,
        expect.any(Function)
      );
    });

    it('should handle loading state correctly', async () => {
      useSWR.mockImplementation((url) => {
        if (url.includes('/users')) {
          return {
            data: undefined,
            error: undefined,
            isLoading: true,
            mutate: jest.fn(),
          };
        }
        if (url.includes('/roles')) {
          return {
            data: undefined,
            error: undefined,
            isLoading: true,
          };
        }
        return {};
      });

      const { result } = renderHook(() => useUsers(1));

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBe(null);
    });

    it('should handle errors correctly', async () => {
      const testError = new Error('There was an error');

      // Mock SWR to return an error
      useSWR.mockImplementation((url) => {
        if (url.includes('/users')) {
          return {
            data: undefined,
            error: testError,
            isLoading: false,
            mutate: jest.fn(),
          };
        }
        if (url.includes('/roles')) {
          return {
            data: undefined,
            error: undefined,
            isLoading: false,
          };
        }
        return {};
      });

      const { result } = renderHook(() => useUsers(1));

      expect(result.current.error).toBe(testError);
      expect(result.current.data).toBe(null);
    });
  });

  describe('useRoles', () => {
    it('should fetch roles correctly', async () => {
      // Mock data
      const mockRolesData = {
        data: [
          {
            id: 'role1',
            name: 'Admin',
            description: 'Description of Admin role',
          },
          {
            id: 'role2',
            name: 'User',
            description: 'Description of User role',
          },
        ],
        total: 2,
      };

      useSWR.mockReturnValue({
        data: mockRolesData,
        error: undefined,
        isLoading: false,
      });

      const { result } = renderHook(() => useRoles());

      expect(result.current.data).toEqual(mockRolesData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();

      expect(useSWR).toHaveBeenCalledWith(
        `${API_BASE_URL}/roles`,
        expect.any(Function)
      );
    });

    it('should construct URL with search parameter when provided', async () => {
      // Mock SWR implementation
      useSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: true,
      });

      // Render the hook with search text
      renderHook(() => useRoles('admin'));

      // Verify SWR was called with the correct URL including search parameter
      expect(useSWR).toHaveBeenCalledWith(
        `${API_BASE_URL}/roles?search=admin`,
        expect.any(Function)
      );
    });
  });

  describe('useUserRole', () => {
    it('should fetch user role by id', async () => {
      const mockRoleData = {
        data: [
          {
            id: 'role1',
            name: 'Admin',
            description: 'Description of Admin role',
          },
        ],
      };

      useSWR.mockReturnValue({
        data: mockRoleData,
        error: undefined,
        isLoading: false,
      });

      const { result } = renderHook(() => useUserRole('role1'));

      expect(result.current.data).toEqual(mockRoleData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();

      expect(useSWR).toHaveBeenCalledWith(
        `${API_BASE_URL}/roles?id=role1`,
        expect.any(Function)
      );
    });

    it('should not fetch when roleId is not provided', async () => {
      // Mock SWR implementation
      useSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: false,
      });

      renderHook(() => useUserRole(''));
      expect(useSWR).toHaveBeenCalledWith(null, expect.any(Function));
    });
  });
});

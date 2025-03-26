import useSWR from 'swr';
import { Role } from '../types/Role';
import { User } from '../types/User';

export const API_BASE_URL = 'http://localhost:3002';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error with network response');
  }
  return response.json();
};

export function useUsers(currentPage: number, searchText: string = '') {
  const usersUrl = `${API_BASE_URL}/users?search=${searchText}&page=${currentPage}`;
  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
    mutate,
  } = useSWR(usersUrl, fetcher);

  const rolesUrl = `${API_BASE_URL}/roles`;
  const {
    data: rolesData,
    error: rolesError,
    isLoading: rolesLoading,
  } = useSWR(rolesUrl, fetcher);

  // Combine users with their roles when both are available
  const completeUsers =
    usersData && rolesData
      ? usersData.data.map((user: User) => {
          const role = rolesData.data.find(
            (role: Role) => role.id === user.roleId
          );
          return { ...user, role };
        })
      : [];

  const isLoading = usersLoading || rolesLoading;
  const error = usersError || rolesError;

  return {
    data: usersData ? { ...usersData, completeUsers } : null,
    isLoading,
    error,
    mutate,
  };
}

export function useRoles(searchText = '') {
  const rolesUrl = `${API_BASE_URL}/roles${searchText ? `?search=${searchText}` : ''}`;
  const { data, isLoading, error } = useSWR(rolesUrl, fetcher);

  return {
    data,
    isLoading,
    error,
  };
}

export function useUserRole(roleId: string) {
  const { data, isLoading, error } = useSWR(
    roleId ? `${API_BASE_URL}/roles?id=${roleId}` : null,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
}

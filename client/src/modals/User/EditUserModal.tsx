import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
  Select,
} from '@radix-ui/themes';
import { User } from '../../types/User';
import { formatDate } from '../../util/formatDate';
import { API_BASE_URL, useRoles } from '../../services/api';
import { mutate } from 'swr';
import { Role } from '../../types/Role';

const EditUserModal = ({
  user,
  isOpen,
  onClose,
}: {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      first: user?.first || '',
      last: user?.last || '',
      roleId: user?.roleId || '',
    },
  });

  // We need this to track the Select component value
  const roleIdValue = watch('roleId');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch available roles
  const { data: rolesData, isLoading: rolesLoading } = useRoles();

  const onSubmit = async (data: Partial<User>) => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      const updatedUser = await response.json();
      mutate(`${API_BASE_URL}/users/${user.id}`, updatedUser);
      mutate(
        (key) =>
          typeof key === 'string' && key.startsWith(`${API_BASE_URL}/users?`)
      );

      onClose();
    } catch (err: unknown) {
      // This seems overkill but the type checking is being very specific
      // here so I've set the error messages accordingly
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'An error occurred while updating the user';

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit User</Dialog.Title>

        {error && (
          <Text color="red" size="2" mb="3">
            {error}
          </Text>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                First Name
              </Text>
              <TextField.Root {...register('first')} placeholder="First name" />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Last Name
              </Text>
              <TextField.Root {...register('last')} placeholder="Last name" />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Role
              </Text>
              <Select.Root
                value={roleIdValue}
                onValueChange={(value) => setValue('roleId', value)}
                disabled={rolesLoading}
              >
                <Select.Trigger />
                <Select.Content>
                  {rolesData?.data.map((role: Role) => (
                    <Select.Item key={role.id} value={role.id}>
                      {role.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Created
              </Text>
              <TextField.Root
                value={formatDate(user?.createdAt)}
                readOnly
                disabled
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Button
              type="button"
              variant="soft"
              color="gray"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditUserModal;

import React, { useState } from 'react';
import { ErrorOption, useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
  Select,
  TextArea,
} from '@radix-ui/themes';
import { User } from '../../types/User';
import { formatDate } from '../../util/formatDate';
import { API_BASE_URL, useRoles } from '../../services/api';
import { mutate } from 'swr';
import { Role } from '../../types/Role';

const EditRoleModal = ({
  role,
  isOpen,
  onClose,
}: {
  role: Role;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: role?.name || '',
      description: role?.description || '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: Partial<Role>) => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/roles/${role.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update role');
      }

      mutate(
        (key) =>
          typeof key === 'string' && key.startsWith(`${API_BASE_URL}/roles`)
      );
      mutate(`${API_BASE_URL}/roles`);

      onClose();
    } catch (err: unknown) {
      // This seems overkill but the type checking is being very specific
      // here so I've set the error messages accordingly
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'An error occurred while updating the role';

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
                Role
              </Text>
              <TextField.Root {...register('name')} placeholder="Role name" />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextArea
                {...register('description')}
                placeholder="Role desctiption"
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Created
              </Text>
              <TextField.Root
                value={formatDate(role?.createdAt)}
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
              area-label="Cancel"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              area-label={isSubmitting ? 'Saving...' : 'Save'}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditRoleModal;

import React, { useState } from 'react';
import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { Role } from '../../types/Role';
import { API_BASE_URL } from '../../services/api';
import { mutate } from 'swr';

const DeleteRoleModal: React.FC<any> = ({
  role,
  isOpen,
  onClose,
}: {
  role: Role;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/roles/${role.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete role');
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
          : 'An error occurred while deleting the role';

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Delete role</Dialog.Title>
        {error && (
          <Text color="red" size="2" mb="3">
            {error}
          </Text>
        )}
        <Dialog.Description>
          <Text>Are you sure? The role </Text>
          <Text weight="bold">{role.name} </Text>
          <Text>will be perminently deleted.</Text>
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            color="ruby"
            variant="surface"
            disabled={isSubmitting}
            onClick={() => onSubmit()}
          >
            Delete role
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteRoleModal;

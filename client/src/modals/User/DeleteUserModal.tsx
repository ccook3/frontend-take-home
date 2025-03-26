import React, { useState } from 'react';
import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { User } from '../../types/User';
import { API_BASE_URL } from '../../services/api';
import { mutate } from 'swr';

const DeleteUserModal: React.FC<any> = ({
  user,
  isOpen,
  onClose,
}: {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }

      mutate(
        (key) =>
          typeof key === 'string' && key.startsWith(`${API_BASE_URL}/users`)
      );

      mutate(`${API_BASE_URL}/users`);

      onClose();
    } catch (err: unknown) {
      // This seems overkill but the type checking is being very specific
      // here so I've set the error messages accordingly
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'An error occurred while deleting the user';

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Delete user</Dialog.Title>
        {error && (
          <Text color="red" size="2" mb="3">
            {error}
          </Text>
        )}
        <Dialog.Description>
          {user ? (
            <>
              <Text>Are you sure? The user </Text>
              <Text weight="bold">
                {user.first} {user.last}{' '}
              </Text>
              <Text>will be permanently deleted.</Text>
            </>
          ) : (
            <Text>Are you sure you want to delete this user?</Text>
          )}
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" area-label="Cancel">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            color="ruby"
            variant="surface"
            disabled={isSubmitting}
            onClick={() => onSubmit()}
            area-label="Delete user"
          >
            Delete user
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteUserModal;

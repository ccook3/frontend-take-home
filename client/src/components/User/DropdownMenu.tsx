import React, { useState } from 'react';
import '@radix-ui/themes/styles.css';
import { IconButton, DropdownMenu } from '@radix-ui/themes';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { User } from '../../types/User';
import EditUserModal from '../../modals/User/EditUserModal';
import DeleteUserModal from '../../modals/User/DeleteUserModal';

const DropDownMenu: React.FC<any> = ({ user }: { user: User }) => {
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);

  const onCloseEditUser = () => setOpenEditUserModal(false);
  const onCloseDeleteUser = () => setOpenDeleteUserModal(false);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton radius="full" variant="ghost">
            <DotsHorizontalIcon width="18" height="18" />
          </IconButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item
            shortcut="⌘ E"
            onClick={() => setOpenEditUserModal(true)}
            area-label="Edit user"
          >
            Edit user
          </DropdownMenu.Item>
          <DropdownMenu.Item
            shortcut="⌘ D"
            onClick={() => setOpenDeleteUserModal(true)}
            area-label="Delete user"
          >
            Delete user
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <EditUserModal
        user={user}
        isOpen={openEditUserModal}
        onClose={onCloseEditUser}
      />
      <DeleteUserModal
        user={user}
        isOpen={openDeleteUserModal}
        onClose={onCloseDeleteUser}
      />
    </>
  );
};

export default DropDownMenu;

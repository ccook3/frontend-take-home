import React, { useState } from 'react';
import '@radix-ui/themes/styles.css';
import { IconButton, DropdownMenu } from '@radix-ui/themes';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Role } from '../../types/Role';
import EditRoleModal from '../../modals/Role/EditRoleModal';
import DeleteRoleModal from '../../modals/Role/DeleteRoleModal';

// Catie - Type checking isn't working properly on this parameter intake
// - it allowed me to pass in a role id, not the whole role
const DropDownMenu: React.FC<any> = ({ role }: { role: Role }) => {
  const [openEditRoleModal, setOpenEditRoleModal] = useState(false);
  const [openDeleteRoleModal, setOpenDeleteRoleModal] = useState(false);

  const onCloseEditRole = () => setOpenEditRoleModal(false);
  const onCloseDeleteRole = () => setOpenDeleteRoleModal(false);

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
            onClick={() => setOpenEditRoleModal(true)}
          >
            Edit role
          </DropdownMenu.Item>
          <DropdownMenu.Item
            shortcut="⌘ D"
            onClick={() => setOpenDeleteRoleModal(true)}
          >
            Delete role
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <EditRoleModal
        role={role}
        isOpen={openEditRoleModal}
        onClose={onCloseEditRole}
      />
      <DeleteRoleModal
        role={role}
        isOpen={openDeleteRoleModal}
        onClose={onCloseDeleteRole}
      />
    </>
  );
};

export default DropDownMenu;

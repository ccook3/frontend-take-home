import React, { ChangeEvent, useEffect, useState } from 'react';
import '@radix-ui/themes/styles.css';
import { Box, Button, Flex, Table, TextField } from '@radix-ui/themes';
import { useRoles } from '../../hooks/api';
import DropDownMenu from './DropdownMenu';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import SkeletonTable from '../SkeletonTable';
import AddRoleModal from '../../modals/Role/AddRoleModal';

interface RoleResponse {
  createdAt: Date;
  name: string;
  id: string;
  isDefault: string;
  updatedAt: Date;
  description: string;
}

const RolesTable: React.FC<any> = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  // Modal control
  const [openAddRoleModal, setOpenAddRoleModal] = useState(false);
  const onCloseAddRoleModal = () => setOpenAddRoleModal(false);

  // I looked this up - I needed to submit by typing but get
  // the table to pause reload until the user finishes their search
  // Adding a 300 ms timeour before the search text sets worked
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Catie - add error handling
  const { data, isLoading, error } = useRoles(debouncedSearch);
  const roles = data?.data;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <Flex gap="2" my="24px" width="100%" align="center">
        <Box width="100%">
          <TextField.Root
            size="2"
            placeholder="Search by role name or description..."
            value={searchText}
            onChange={handleSearchChange}
            style={{ width: '100%' }}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        {/* Catie - add functionality */}
        <Button
          color="iris"
          style={{ backgroundColor: 'var(--accent-9)' }}
          onClick={() => setOpenAddRoleModal(true)}
        >
          + Add Role
        </Button>
      </Flex>
      <Box
        style={{
          border: '2px solid var(--gray-a5)',
          borderRadius: 'var(--radius-4)',
        }}
      >
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
              {/* Catie - add in screen reader label for actions */}
              <Table.ColumnHeaderCell />
            </Table.Header>

            <Table.Body>
              {roles?.map((role: RoleResponse) => (
                <Table.Row key={role.id}>
                  <Table.RowHeaderCell>{role.name}</Table.RowHeaderCell>
                  {/* Catie - add in max width or character cut off */}
                  <Table.Cell>{role.description}</Table.Cell>
                  <Table.Cell>
                    <DropDownMenu role={role} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Box>
      <AddRoleModal isOpen={openAddRoleModal} onClose={onCloseAddRoleModal} />
    </>
  );
};

export default RolesTable;

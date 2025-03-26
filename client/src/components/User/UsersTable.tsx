import React, { ChangeEvent, useEffect, useState } from 'react';
import '@radix-ui/themes/styles.css';
import { Table, Box, Button, Flex, Avatar, TextField } from '@radix-ui/themes';
import DropDownMenu from './DropdownMenu';
import { formatDate } from '../../util/formatDate';
import { User } from '../../types/User';
import PaginationButtons from '../PaginationButtons';
import { useUsers } from '../../services/api';
import SkeletonTable from '../SkeletonTable';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import AddUserModal from '../../modals/User/AddUserModal';

const UserTable: React.FC<any> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Modal control
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const onCloseAddUserModal = () => setOpenAddUserModal(false);

  // I looked this up - I needed to submit by typing but get
  // the table to pause reload until the user finishes their search
  // Adding a 300 ms timeour before the search text sets worked
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const { data, isLoading, error } = useUsers(currentPage, debouncedSearch);
  const users = data?.completeUsers;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (data) {
      setHasNextPage(data.pages > currentPage);
    }
  }, [data, currentPage]);

  return (
    <>
      <Flex gap="2" my="24px" width="100%">
        <Box width="100%">
          <TextField.Root
            size="2"
            placeholder="Search by name…"
            value={searchText}
            onChange={handleSearchChange}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <Button
          color="iris"
          style={{ backgroundColor: 'var(--accent-9)' }}
          onClick={() => setOpenAddUserModal(true)}
          area-label="Add user"
        >
          + Add User
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
            <Table.Header style={{ background: 'var(--gray-a2)' }}>
              <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell />
            </Table.Header>

            <Table.Body>
              {users?.map((user: User) => (
                <Table.Row key="{user.id}">
                  <Table.Cell>
                    <Flex gap="2" align="center">
                      <Avatar
                        src={user.photo}
                        fallback={user.first.charAt(0)}
                        radius="full"
                        size="2"
                      />
                      {user.first} {user.last}
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>{user.role.name}</Table.Cell>
                  <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
                  <Table.Cell>
                    <DropDownMenu user={user} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}

        {data && data.pages > 1 && (
          <PaginationButtons
            onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onNext={() =>
              setCurrentPage((prev) => (hasNextPage ? prev + 1 : prev))
            }
            hasPrevious={currentPage > 1}
            hasNext={hasNextPage}
          />
        )}
      </Box>

      <AddUserModal isOpen={openAddUserModal} onClose={onCloseAddUserModal} />
    </>
  );
};

export default UserTable;

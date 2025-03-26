import React, { useState, ChangeEvent } from 'react';
import '@radix-ui/themes/styles.css';
import { Tabs } from '@radix-ui/themes';
import UserTable from '../components/User/UsersTable';
import RolesTable from '../components/Role/RolesTable';

// Catie's notes for optomization
// High priority:
// * add mobile functionality
// * add more accessibility coverage
// * add success toast notificaitons

// Medium priority:
// * better UX on error handling
// * add ability to upload or edit avatar image
// * add empty state for search if search returns no results on tables
const UserRoleManager: React.FC<any> = () => {
  return (
    <Tabs.Root defaultValue="user">
      <Tabs.List
        size={{
          initial: '1',
          xs: '1',
        }}
      >
        <Tabs.Trigger value="user">Users</Tabs.Trigger>
        <Tabs.Trigger value="role">Roles</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="user">
        <UserTable />
      </Tabs.Content>
      <Tabs.Content value="role">
        <RolesTable />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default UserRoleManager;

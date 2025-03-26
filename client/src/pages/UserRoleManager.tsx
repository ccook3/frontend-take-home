import React, { useState, ChangeEvent } from 'react';
import '@radix-ui/themes/styles.css';
import { Tabs } from '@radix-ui/themes';
import UserTable from '../components/User/UsersTable';
import RolesTable from '../components/Role/RolesTable';

const UserRoleManager: React.FC<any> = () => {
  return (
    <Tabs.Root defaultValue="user">
      <Tabs.List>
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

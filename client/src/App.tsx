import React from 'react';
import '@radix-ui/themes/styles.css';
import './App.css';
import { Container } from '@radix-ui/themes';
import UserRoleManager from './pages/UserRoleManager';

function App() {
  return (
    <Container size="3" minWidth="850px" my="2em">
      <UserRoleManager />
    </Container>
  );
}

export default App;

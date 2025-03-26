import React, { useEffect, useState } from 'react';
import '@radix-ui/themes/styles.css';
import { Button, Flex, Text } from '@radix-ui/themes';

interface PaginationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  onPrevious,
  onNext,
  hasPrevious,
}) => {
  return (
    <Flex justify="end" align="end" gap="2" p="2">
      <Button onClick={onPrevious} disabled={!hasPrevious}>
        Previous
      </Button>
      <Button color="gray" variant="outline" onClick={onNext}>
        <Text style={{ color: 'var(--gray-12)' }}>Next</Text>
      </Button>
    </Flex>
  );
};

export default PaginationButtons;

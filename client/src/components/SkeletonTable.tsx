import { Avatar, Flex, Skeleton, Table } from '@radix-ui/themes';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

const SkeletonTable: React.FC<any> = ({}: {}) => {
  return (
    <>
      <Table.Root>
        <Table.Header style={{ background: 'var(--gray-a2)' }}>
          <Table.ColumnHeaderCell>
            <Skeleton>User</Skeleton>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Skeleton>Role</Skeleton>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Skeleton>Joined</Skeleton>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell />
        </Table.Header>
        <Table.Body>
          {Array.from({ length: 10 }).map((_, index) => (
            <Table.Row>
              <Table.Cell>
                <Flex gap="2" align="center">
                  <Skeleton>
                    <Avatar src={''} fallback={'C'} radius="full" size="2" />
                    First Last
                  </Skeleton>
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Engineering</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>Jun 10, 1992</Skeleton>
              </Table.Cell>
              <Table.Cell>
                <Skeleton>
                  <DotsHorizontalIcon width="18" height="18" />
                </Skeleton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default SkeletonTable;

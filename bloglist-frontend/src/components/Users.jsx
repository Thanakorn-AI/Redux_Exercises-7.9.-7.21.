// bloglist-frontend/src/components/Users.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../store/reducers/userReducer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Container, 
  Card, 
  Title, 
  Table, 
  Tr, 
  Th, 
  Td,
  Badge,
  Link as StyledLink
} from '../styles/StyledComponents';

const UsersContainer = styled(Container)`
  max-width: 800px;
`;

const UserLink = styled(StyledLink)`
  font-weight: 500;
`;

const BlogCount = styled(Badge)`
  min-width: 2.5rem;
  text-align: center;
`;

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <UsersContainer>
      <Card>
        <Title>Users</Title>
        
        <Table>
          <thead>
            <Tr>
              <Th>User</Th>
              <Th>Blogs Created</Th>
            </Tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <UserLink to={`/users/${user.id}`}>{user.name}</UserLink>
                </Td>
                <Td>
                  <BlogCount>{user.blogs.length}</BlogCount>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </UsersContainer>
  );
};

export default Users;
// bloglist-frontend/src/components/User.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Add Link
import { initializeUsers } from '../store/reducers/userReducer';
import styled from 'styled-components';
import { 
  Container, 
  Card, 
  Title, 
  Subtitle, 
  List, 
  ListItem,
  Link
} from '../styles/StyledComponents';

const UserContainer = styled(Container)`
  max-width: 800px;
`;

const BlogListItem = styled(ListItem)`
  transition: background-color ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.light};
  }
`;


const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);
  const user = users.find((u) => u.id === id);

  useEffect(() => {
    if (!users.length) dispatch(initializeUsers());
  }, [dispatch, users]);

  if (!user) return null;

  return (
    <UserContainer>
      <Card>
        <Title>{user.name}</Title>
        
        <Subtitle>Added Blogs</Subtitle>
        
        <List>
          {user.blogs.map((blog) => (
            <BlogListItem key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </BlogListItem>
          ))}
        </List>
      </Card>
    </UserContainer>
  );
};

export default User;
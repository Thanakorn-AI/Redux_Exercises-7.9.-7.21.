// bloglist-frontend/src/components/BlogView.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initializeBlogs, addComment, updateBlog, deleteBlog } from '../store/reducers/blogReducer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Container,
  Card,
  Title,
  Subtitle,
  Text,
  Button,
  IconButton,
  Input,
  Flex,
  List,
  ListItem,
  Badge
} from '../styles/StyledComponents';

const BlogContainer = styled(Container)`
  max-width: 800px;
`;

const BlogUrl = styled.a`
  display: block;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const LikesCounter = styled(Flex)`
  background-color: ${props => props.theme.colors.light};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const LikesCount = styled.span`
  font-weight: 600;
  margin-right: ${props => props.theme.spacing.md};
`;

const UserInfo = styled(Text)`
  font-style: italic;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CommentForm = styled.form`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CommentInput = styled(Input)`
  margin-right: ${props => props.theme.spacing.sm};
  margin-bottom: 0;
`;

const CommentsList = styled(List)`
  background-color: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm};
`;

const CommentItem = styled(ListItem)`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const BlogView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const currentUser = useSelector((state) => state.user.currentUser); // Get logged-in user
  const blog = blogs.find((b) => b.id === id);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!blogs.length) dispatch(initializeBlogs());
  }, [dispatch, blogs]);

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(addComment(id, comment));
    setComment('');
  };

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }; // Strip user to ID
    dispatch(updateBlog(id, updatedBlog));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(id));
      // Optionally redirect to homepage after deletion
      navigate('/');
    }
  };

  if (!blog) return null;

  // Ensure comments is an array, default to empty if undefined
  const comments = blog.comments || [];
  console.log('currentUser:', currentUser);
  const showDeleteButton = currentUser && blog.user.id === currentUser.id; // Compare IDs
  console.log('blog:', blog);
  console.log('blog.user:', blog.user);
  console.log('currentUser.id:', currentUser?.id);
  console.log('blog.user.id:', blog.user?.id);
  console.log('showDeleteButton:', showDeleteButton);



  return (
    <BlogContainer>
      <Card>
        <Title>{blog.title}</Title>
        
        <BlogUrl href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </BlogUrl>
        
        <LikesCounter>
          <LikesCount>{blog.likes} likes</LikesCount>
          <Button onClick={handleLike} data-testid={`like-button-${blog.id}`} size="sm">Like</Button>
        </LikesCounter>
        
        <UserInfo>Added by {blog.user.name}</UserInfo>
        
        {showDeleteButton && (
          <Button 
            onClick={handleDelete} 
            variant="secondary" 
            style={{ marginBottom: '2rem' }}
            data-testid="delete-button"
          >
            Delete
          </Button>
        )}
        
        <Subtitle>Comments</Subtitle>
        
        <CommentForm onSubmit={handleComment}>
          <Flex>
            <CommentInput 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              placeholder="Write a comment..."
              required
            />
            <Button type="submit" size="sm">Add Comment</Button>
          </Flex>
        </CommentForm>
        
        <CommentsList>
          {comments.map((comment, index) => (
            <CommentItem key={index}>
              {comment}
            </CommentItem>
          ))}
        </CommentsList>
      </Card>
    </BlogContainer>
  );
};

export default BlogView;
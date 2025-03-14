// bloglist-frontend/src/components/Blog.jsx
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Flex, Text, Link as StyledLink } from '../styles/StyledComponents';

const BlogCard = styled(Card)`
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const BlogTitle = styled(Text)`
  font-weight: 600;
  margin-bottom: 0;
`;

const BlogAuthor = styled.span`
  color: #666;
  font-style: italic;
`;

const Blog = ({ blog, user }) => {
  return (
    <BlogCard as={StyledLink} to={`/blogs/${blog.id}`}>
      <Flex justify="space-between" align="center">
        <BlogTitle>
          {blog.title} <BlogAuthor>by {blog.author}</BlogAuthor>
        </BlogTitle>
      </Flex>
    </BlogCard>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
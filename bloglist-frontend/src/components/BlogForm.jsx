// bloglist-frontend/src/components/BlogForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Card,
  Subtitle,
  FormGroup,
  Label,
  Input,
  Button,
  Flex,
} from '../styles/StyledComponents';

const FormCard = styled(Card)`
  max-width: 600px;
  margin: 0 auto ${(props) => props.theme.spacing.xl};
`;

const ButtonsContainer = styled(Flex)`
  gap: ${(props) => props.theme.spacing.md};
`;

const BlogForm = ({ createBlog, cancelForm }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <FormCard>
      <Subtitle>Create New Blog</Subtitle>

      <form onSubmit={handleBlogSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
            placeholder="Enter title"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
            placeholder="Enter author"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
            placeholder="Enter URL"
            required
          />
        </FormGroup>

        <ButtonsContainer justify="flex-end">
          <Button type="button" variant="secondary" onClick={cancelForm}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </ButtonsContainer>
      </form>
    </FormCard>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,
};

export default BlogForm;

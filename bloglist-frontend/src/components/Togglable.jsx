// bloglist-frontend/src/components/Togglable.jsx
import { useState, forwardRef, useImperativeHandle, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../styles/StyledComponents';

const ToggleContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ContentContainer = styled.div`
  padding: ${props => props.theme.spacing.md} 0;
`;

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  // Clone the child element and pass the toggleVisibility function as a prop
  const childrenWithProps = cloneElement(props.children, {
    cancelForm: toggleVisibility
  });

  return (
    <ToggleContainer>
      {!visible && (
        <Button onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      )}
      
      {visible && (
        <ContentContainer>
          {childrenWithProps}
        </ContentContainer>
      )}
    </ToggleContainer>
  );
});

Togglable.displayName = 'Togglable'; // Fixes "Component definition is missing display name" warning

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;

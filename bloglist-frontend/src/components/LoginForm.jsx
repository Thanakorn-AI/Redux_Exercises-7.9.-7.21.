// bloglist-frontend/src/components/LoginForm.jsx
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
  Container, 
  Card, 
  Title, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Flex 
} from '../styles/StyledComponents';

const LoginContainer = styled(Container)`
  max-width: 400px;
  margin-top: ${props => props.theme.spacing.xl};
`;

const LoginCard = styled(Card)`
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const LoginTitle = styled(Title)`
  text-align: center;
`;

// Maintain the original functionality exactly as it was
const LoginForm = ({ onLogin }) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    await onLogin({ username, password });
    event.target.username.value = '';
    event.target.password.value = '';
  };

  return (
    <LoginContainer data-testid="login-form">
      <LoginCard>
        <LoginTitle>Start Blogging Today!</LoginTitle>
        
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              data-testid="username"
              placeholder="Enter your username"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              data-testid="password"
              placeholder="Enter your password"
              required
            />
          </FormGroup>
          
          <Flex justify="center" style={{ marginTop: '2rem' }}>
            <Button 
              type="submit" 
              data-testid="login-button"
              style={{ width: '100%' }}
            >
              Login
            </Button>
          </Flex>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginForm;
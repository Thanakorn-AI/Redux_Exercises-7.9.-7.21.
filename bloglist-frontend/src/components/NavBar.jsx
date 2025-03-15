// Redux_Exercises-7.9.-7.21./bloglist-frontend/src/components/NavBar.jsx
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
  NavBar, 
  NavContainer, 
  NavBrand, 
  NavLink, 
  Button, 
  Flex 
} from '../styles/StyledComponents';

const UserInfo = styled.span`
  color: ${props => props.theme.colors.white};
  margin-right: ${props => props.theme.spacing.md};
`;

const LogoutButton = styled(Button)`
  background-color: transparent;
  border-color: ${props => props.theme.colors.white};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Navigation = ({ user, onLogout }) => {
    return (
      <NavBar>
        <NavContainer>
          <Flex>
            <NavBrand to="/">BlogApp</NavBrand>
            {user && (
              <>
                <NavLink to="/">Blogs</NavLink>
                <NavLink to="/users">Users</NavLink>
              </>
            )}
          </Flex>
          
          {user && (
            <Flex>
              <UserInfo>{user.name} logged in</UserInfo>
              <LogoutButton onClick={onLogout} size="sm">Logout</LogoutButton>
            </Flex>
          )}
        </NavContainer>
      </NavBar>
    );
  };
  
  Navigation.propTypes = {
    user: PropTypes.object,
    onLogout: PropTypes.func
  };
  
  export default Navigation;
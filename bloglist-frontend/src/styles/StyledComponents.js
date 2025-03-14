// Redux_Exercises-7.9.-7.21./bloglist-frontend/src/styles/StyledComponents.js
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

// Layout Components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.lg};
`;

export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: ${(props) => props.theme.shadows.sm};
  padding: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.gray};
  transition:
    transform ${(props) => props.theme.transitions.default},
    box-shadow ${(props) => props.theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'center'};
  gap: ${(props) => props.gap || props.theme.spacing.md};
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
  width: ${(props) => props.width || 'auto'};
`;

// Typography Components
export const Title = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const Text = styled.p`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

// Form Elements
export const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-family: ${(props) => props.theme.fonts.main};
  margin-bottom: ${(props) => props.theme.spacing.md};
  transition: border-color ${(props) => props.theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-family: ${(props) => props.theme.fonts.main};
  margin-bottom: ${(props) => props.theme.spacing.md};
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  font-weight: 500;
`;

export const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

// Button Components
export const Button = styled.button`
  background-color: ${(props) =>
    props.variant === 'secondary'
      ? props.theme.colors.white
      : props.theme.colors.primary};
  color: ${(props) =>
    props.variant === 'secondary'
      ? props.theme.colors.primary
      : props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  padding: ${(props) =>
    props.size === 'sm'
      ? `${props.theme.spacing.xs} ${props.theme.spacing.sm}`
      : `${props.theme.spacing.sm} ${props.theme.spacing.lg}`};
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color ${(props) => props.theme.transitions.default},
    color ${(props) => props.theme.transitions.default},
    transform ${(props) => props.theme.transitions.default};

  &:hover {
    background-color: ${(props) =>
      props.variant === 'secondary'
        ? props.theme.colors.light
        : props.theme.colors.secondary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.gray};
    border-color: ${(props) => props.theme.colors.gray};
    color: #999;
    cursor: not-allowed;
  }
`;

export const IconButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.xs};
`;

// Navigation Components
export const Link = styled(RouterLink)`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  transition: color ${(props) => props.theme.transitions.default};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const NavBar = styled.nav`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

export const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLink = styled(RouterLink)`
  color: ${(props) => props.theme.colors.white};
  margin-left: ${(props) => props.theme.spacing.md};
  font-weight: 500;
  transition: opacity ${(props) => props.theme.transitions.default};

  &:hover {
    opacity: 0.8;
    color: ${(props) => props.theme.colors.white};
  }
`;

export const NavBrand = styled(RouterLink)`
  color: ${(props) => props.theme.colors.white};
  font-size: 1.5rem;
  font-weight: 700;

  &:hover {
    color: ${(props) => props.theme.colors.white};
  }
`;

// Table Components
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const Th = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-bottom: 2px solid ${(props) => props.theme.colors.primary};
`;

export const Td = styled.td`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

export const Tr = styled.tr`
  &:hover {
    background-color: ${(props) => props.theme.colors.light};
  }
`;

// Notification Components
export const NotificationContainer = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-weight: 500;

  background-color: ${(props) => {
    if (props.type === 'error') return 'rgba(255, 51, 51, 0.1)';
    if (props.type === 'success') return 'rgba(51, 204, 102, 0.1)';
    return props.theme.colors.light;
  }};

  color: ${(props) => {
    if (props.type === 'error') return props.theme.colors.error;
    if (props.type === 'success') return props.theme.colors.success;
    return props.theme.colors.black;
  }};

  border-left: 4px solid
    ${(props) => {
      if (props.type === 'error') return props.theme.colors.error;
      if (props.type === 'success') return props.theme.colors.success;
      return props.theme.colors.primary;
    }};
`;

// List Components
export const List = styled.ul`
  list-style: none;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const ListItem = styled.li`
  padding: ${(props) => props.theme.spacing.md};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};

  &:last-child {
    border-bottom: none;
  }
`;

// Badge
export const Badge = styled.span`
  display: inline-block;
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
`;
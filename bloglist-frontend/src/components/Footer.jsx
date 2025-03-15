// bloglist-frontend/src/components/Footer.jsx
import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: auto;
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  font-size: 0.85rem;
  color: black;
  border-top: 1px solid ${props => props.theme.colors.gray};
  background-color: #f5f5f5;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      © {currentYear} Thanakorn Kitviriya. All rights reserved. This blog application is an educational project. 
      No part of the source code may be used, copied, or distributed without prior written consent from the author.
    </FooterContainer>
  );
};

export default Footer;
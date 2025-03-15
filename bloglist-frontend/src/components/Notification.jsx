// bloglist-frontend/src/components/Notification.jsx
import PropTypes from 'prop-types';
import { NotificationContainer } from '../styles/StyledComponents'; 

const Notification = ({ message, type }) => (
  message ? (
    <NotificationContainer data-testid="notification" type={type}>
      {message}
    </NotificationContainer>
  ) : null
);

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success']),
};

export default Notification;
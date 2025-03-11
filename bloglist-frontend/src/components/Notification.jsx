// bloglist-frontend/src/components/Notification.jsx
import PropTypes from 'prop-types';

const Notification = ({ message, type }) => (
  message && (
    <div
      data-testid="notification"
      style={{ color: type === 'error' ? 'red' : 'green', padding: '10px' }}
    >
      {message}
    </div>
  )
);

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success']),
};

export default Notification;
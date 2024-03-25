import { PropTypes } from "prop-types";
import "../styles/home.css";

export const Home = ({ isLoggedIn }) => {
  return (
    <div className="container">
      {isLoggedIn ? (
        <>
          <div className="library">
            <h2 className="title-header">Library</h2>
          </div>
          <div className="study">
            <h2 className="title-header">Today's Study</h2>
          </div>
          <div className="reminder">
            <h2 className="title-header">Reminders</h2>
          </div>
        </>
      ) : (
        <h2>You are not logged in</h2>
      )}
    </div>
  );
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

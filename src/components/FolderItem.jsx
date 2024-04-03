import PropTypes from "prop-types";
import FolderImg from "../images/folder.png";
import "../styles/create.css";

const FolderItem = ({ folder, onClick }) => {
  return (
    <div className="folder-item" onClick={onClick}>
      <img src={FolderImg} alt="Folder" className="folder-image" />
      <p className="folder-name">{folder.name}</p>
    </div>
  );
};

FolderItem.propTypes = {
  folder: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FolderItem;

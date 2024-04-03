import { useState } from "react";
import "../styles/modal-create-folder.css";

const ModalCreateFolder = ({ isOpen, onClose, onSubmit }) => {
  const [folderName, setFolderName] = useState("");

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(folderName);
    setFolderName("");
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal">
            <div className="modal-content">
              <h2>Create Folder</h2>
              <input
                type="text"
                placeholder="Folder Name"
                value={folderName}
                onChange={handleInputChange}
                className="input"
              />
              <button onClick={handleSubmit} className="button">
                Create
              </button>
              <button onClick={onClose} className="button">
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalCreateFolder;

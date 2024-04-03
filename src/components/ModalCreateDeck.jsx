import { useState } from "react";
import "../styles/modal-create-folder.css";

const ModalCreateDeck = ({ isOpen, onClose, onSubmit, folders }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFolderChange = (e) => {
    setSelectedFolder(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ title, description, folderId: parseInt(selectedFolder) });
    setTitle("");
    setDescription("");
    setSelectedFolder("");
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal">
            <div className="modal-content">
              <h2>Create Deck</h2>
              <input
                type="text"
                placeholder="Deck Title"
                value={title}
                onChange={handleTitleChange}
                className="input"
              />
              <input
                type="text"
                placeholder="Deck Description"
                value={description}
                onChange={handleDescriptionChange}
                className="input"
              />
              <select value={selectedFolder} onChange={handleFolderChange}>
                <option value="">Select Folder</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
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

export default ModalCreateDeck;

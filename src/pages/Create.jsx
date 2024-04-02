import { useEffect, useState } from "react";
import "../styles/create.css";
import FolderImg from "../images/folder.png";
import DeckImg from "../images/paper-stack.png";
import CardImg from "../images/flash-cards.png";
import ModalCreateFolder from "../components/ModalCreateFolder"; // Import the modal component

export const Create = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateFolder = async (folderName) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      // Handle case where token is not available
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      const userId = tokenPayload.userId; // Extract userId from JWT payload

      const response = await fetch("http://localhost:8080/api/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: folderName,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create folder");
      }

      console.log("Folder created successfully");
      // Close the modal after submitting
      closeModal();
      // Refresh folders after creating a new one
      fetchFolders();
    } catch (error) {
      console.error("Error creating folder:", error);
      // Handle error
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/folders");
      if (!response.ok) {
        throw new Error("Failed to fetch folders");
      }
      const foldersData = await response.json();
      setFolders(foldersData);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div className="container-create">
      <>
        <div className="create">
          <h2 className="title-header-create">Create</h2>
          <div className="create-options">
            <div className="create-option" onClick={openModal}>
              <img src={FolderImg} alt="Folder" className="create-image" />
              <p>Folder</p>
            </div>
            <div className="create-option">
              <img src={DeckImg} alt="Deck" className="create-image" />
              <p>Deck</p>
            </div>
            <div className="create-option">
              <img src={CardImg} alt="Card" className="create-image" />
              <p>Card</p>
            </div>
          </div>
        </div>
        <div className="library-create">
          <h2 className="title-header-create">Library</h2>
          <div className="folders-container">
            {folders.map((folder) => (
              <div key={folder.id} className="folder-item">
                <img src={FolderImg} alt="Folder" className="folder-image" />
                <p className="folder-name">{folder.name}</p>
              </div>
            ))}
          </div>
        </div>
      </>
      {/* Render the modal */}
      <ModalCreateFolder
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleCreateFolder}
      />
    </div>
  );
};

export default Create;

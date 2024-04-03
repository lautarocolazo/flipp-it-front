import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import FolderItem from "../components/FolderItem";
import ModalFolderDecks from "../components/ModalFolderDecks";
import "../styles/home.css";

export const Home = ({ isLoggedIn }) => {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const handleFolderClick = (folderId) => {
    setSelectedFolderId(folderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFolderId(null);
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <>
          <div className="library">
            <h2 className="title-header">Library</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="folders-container">
                {folders.map((folder) => (
                  <FolderItem
                    key={folder.id}
                    folder={folder}
                    onClick={() => handleFolderClick(folder.id)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="study">
            <h2 className="title-header">Today's Study</h2>
          </div>
          <div className="reminder">
            <h2 className="title-header">Reminders</h2>
          </div>
          <ModalFolderDecks
            isOpen={isModalOpen}
            folderId={selectedFolderId}
            onClose={closeModal}
          />
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

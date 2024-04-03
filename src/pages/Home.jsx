import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import FolderItem from "../components/FolderItem";
import ModalFolderDecks from "../components/ModalFolderDecks";
import FlashcardItem from "../components/FlashcardItem"; // Import the FlashcardItem component
import "../styles/home.css";

export const Home = ({ isLoggedIn }) => {
  const [folders, setFolders] = useState([]);
  const [flashcards, setFlashcards] = useState([]); // State variable to store flashcards
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

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const userId = tokenPayload.userId;

        const response = await fetch(
          `http://localhost:8080/api/flashcards/users/${userId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch flashcards");
        }

        const flashcardsData = await response.json();
        setFlashcards(flashcardsData);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchFlashcards();
    }
  }, [isLoggedIn]);

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
            {/* Render the flashcards */}
            {flashcards.map((flashcard) => (
              <FlashcardItem key={flashcard.id} flashcard={flashcard} />
            ))}
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

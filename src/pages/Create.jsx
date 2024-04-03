import { useEffect, useState } from "react";
import "../styles/create.css";
import FolderImg from "../images/folder.png";
import DeckImg from "../images/paper-stack.png";
import CardImg from "../images/flash-cards.png";
import ModalCreateFolder from "../components/ModalCreateFolder";
import ModalCreateDeck from "../components/ModalCreateDeck";
import ModalCreateFlashcard from "../components/ModalCreateFlashcard";

export const Create = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Initial value of folders:", folders);

  useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("folders length:", folders.length);
  }, [isLoading, folders]);

  const openModal = () => setIsModalOpen(true);
  const openDeckModal = () => setIsDeckModalOpen(true);
  const openFlashcardModal = () => setIsFlashcardModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeDeckModal = () => setIsDeckModalOpen(false);
  const closeFlashcardModal = () => setIsFlashcardModalOpen(false);

  const handleCreateFolder = async (folderName) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.userId;

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
      closeModal();
      fetchFolders();
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const fetchFolders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.userId;

      const response = await fetch(
        `http://localhost:8080/api/folders/users/${userId}`,
      );
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

  const fetchDecks = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.userId;

      const response = await fetch(
        `http://localhost:8080/api/decks/users/${userId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch folders");
      }
      const decks = await response.json();
      setDecks(decks);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
    fetchDecks();
  }, []);

  const handleDeleteFolder = async (folderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this folder?",
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/folders/${folderId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to delete folder");
      }
      fetchFolders();
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleCreateDeck = async (deckData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.userId;

      const response = await fetch("http://localhost:8080/api/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...deckData,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create deck");
      }

      console.log("Deck created successfully");
      closeDeckModal();
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  const handleCreateFlashcard = async (flashcardData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.userId;

      const response = await fetch("http://localhost:8080/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...flashcardData,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create flashcard");
      }

      console.log("Flashcard created successfully");
      closeFlashcardModal();
    } catch (error) {
      console.error("Error creating flashcard:", error);
    }
  };

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
            <div className="create-option" onClick={openDeckModal}>
              <img src={DeckImg} alt="Deck" className="create-image" />
              <p>Deck</p>
            </div>
            <div className="create-option" onClick={openFlashcardModal}>
              <img src={CardImg} alt="Card" className="create-image" />
              <p>Card</p>
            </div>
          </div>
        </div>
        <div className="library-create">
          <h2 className="title-header-create">Library</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : folders.length === 0 ? (
            <p className="no-folders-message">No folders created yet.</p>
          ) : (
            <div className="folders-container">
              {folders.map((folder) => (
                <div key={folder.id} className="folder-item">
                  <img src={FolderImg} alt="Folder" className="folder-image" />
                  <p className="folder-name">{folder.name}</p>
                  <span
                    className="delete-folder"
                    onClick={() => handleDeleteFolder(folder.id)}
                  >
                    ❌
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
      <ModalCreateFolder
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleCreateFolder}
      />
      <ModalCreateDeck
        isOpen={isDeckModalOpen}
        onClose={closeDeckModal}
        onSubmit={handleCreateDeck}
        folders={folders}
      />

      <ModalCreateFlashcard
        isOpen={isFlashcardModalOpen}
        onClose={closeFlashcardModal}
        onSubmit={handleCreateFlashcard}
        decks={decks}
      />
    </div>
  );
};

export default Create;

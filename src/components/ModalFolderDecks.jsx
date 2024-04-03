import { useState, useEffect } from "react";
import "../styles/modal-folder-decks.css";

const ModalFolderDecks = ({ isOpen, folderId, onClose }) => {
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/decks/folders/${folderId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch decks for the folder");
        }
        const decksData = await response.json();
        setDecks(decksData);
      } catch (error) {
        console.error("Error fetching decks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchDecks();
    }
  }, [isOpen, folderId]);

  // Reset decks and isLoading when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setDecks([]);
      setIsLoading(true);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <div className="modal-overlay" onClick={onClose}></div>
          <div className="modal">
            <div className="modal-content">
              <h2>Decks in Folder</h2>
              {isLoading ? (
                <p>Loading...</p>
              ) : decks.length === 0 ? (
                <p>No decks yet</p>
              ) : (
                <ul>
                  {decks.map((deck) => (
                    <li key={deck.id}>{deck.title}</li>
                  ))}
                </ul>
              )}
              <button onClick={onClose} className="button">
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalFolderDecks;

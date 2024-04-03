import { useState } from "react";
import "../styles/modal-create-folder.css";

const ModalCreateFlashcard = ({ isOpen, onClose, onSubmit, decks }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedDeck, setSelectedDeck] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleDeckChange = (e) => {
    setSelectedDeck(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ question, answer, deckId: parseInt(selectedDeck) });
    setQuestion("");
    setAnswer("");
    setSelectedDeck("");
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal">
            <div className="modal-content">
              <h2>Create Flashcard</h2>
              <input
                type="text"
                placeholder="Question"
                value={question}
                onChange={handleQuestionChange}
                className="input"
              />
              <input
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={handleAnswerChange}
                className="input"
              />
              <select value={selectedDeck} onChange={handleDeckChange}>
                <option value="">Select Deck</option>
                {decks.map((deck) => (
                  <option key={deck.id} value={deck.id}>
                    {deck.title}
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

export default ModalCreateFlashcard;

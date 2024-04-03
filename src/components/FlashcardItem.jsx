import "../styles/flashcard-item.css"; // Import the CSS file with the styles

const FlashcardItem = ({ flashcard }) => {
  const createdDate = new Date(flashcard.createdAt);

  const formattedDate = createdDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flashcard-item">
      <h3>{flashcard.question}</h3>
      <p>Created on: {formattedDate}</p>
    </div>
  );
};

export default FlashcardItem;

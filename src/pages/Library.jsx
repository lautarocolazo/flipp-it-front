import React from 'react';
import FolderImg from "../images/folder.png";
import DeckImg from "../images/paper-stack.png";
import CardImg from "../images/flash-cards.png";

const Library = ({ selectedItems }) => {
  return (
    <div>
      <h2>Library</h2>
      {selectedItems.length > 0 ? (
        <ul>
          {selectedItems.map((item, index) => (
            <li key={index}>
              <div>
                <img
                  src={renderLibraryImage(item.type)}
                  alt={`Library ${item.type}`}
                  style={{ width: 50 }}
                />
              </div>
              <div>
                <p>{item.type}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the library.</p>
      )}
    </div>
  );
};

const renderLibraryImage = (option) => {
  switch (option) {
    case 'folder':
      return FolderImg;
    case 'deck':
      return DeckImg;
    case 'card':
      return CardImg;
    default:
      return null;
  }
};

export default Library;

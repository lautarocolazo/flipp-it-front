// StudyPage.js
import React, { useState, useEffect } from 'react';
import ReviewImg from '../images/review.png';
import SchedulesImg from '../images/schedules.png';
import RemindersImg from '../images/reminder.png';
import Library from './Library';

const Study = ({ selectedItems }) => {
  const [newItem, setNewItem] = useState({ type: '', title: '', description: '' });

  useEffect(() => {
    setNewItem({ type: '', title: '', description: '' });
  }, [selectedItems]);

  const handleOptionClick = (option) => {
    const newItem = {
      type: option,
      title: '',
      description: '',
    };
   
  };

  const handleLibraryItemClick = (item) => {
    console.log(`Clicked on ${item.type}`);
    // Add any other logic you want to perform on item click
  };

  const renderLibraryImage = (option) => {
    switch (option) {
      case 'review':
        return <img src={ReviewImg} alt={`Library ${option}`} style={{ width: 100 }} />;
      case 'schedules':
        return <img src={SchedulesImg} alt={`Library ${option}`} style={{ width: 100 }} />;
      case 'reminder':
        return <img src={RemindersImg} alt={`Library ${option}`} style={{ width: 100 }} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.StudyPage}>
      <div className={`${styles.box} ${styles.StudyBox}`}>
        <h1>Study</h1>
        <div className={styles.option} onClick={() => handleOptionClick('review')}>
          <img src={ReviewImg} alt="Review" style={{ width: 50 }} />
          <span>Review</span>
        </div>
        <div className={styles.option} onClick={() => handleOptionClick('schedules')}>
          <img src={SchedulesImg} alt="Schedules" style={{ width: 50 }} />
          <span>Schedules</span>
        </div>
        <div className={styles.option} onClick={() => handleOptionClick('reminder')}>
          <img src={RemindersImg} alt="Reminder" style={{ width: 50 }} />
          <span>Reminder</span>
        </div>
      </div>

      <div className={`${styles.box} ${styles.libraryBox}`}>
        <Library selectedItems={selectedItems} />
      </div>
    </div>
  );
};

export default Study;

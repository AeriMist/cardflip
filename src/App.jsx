import { useState, useEffect } from 'react';
import './App.css';
import ReactCardFlip from 'react-card-flip';

// Import images from the assets folder (now .png)
import front1 from './assets/front1.png';
import back1 from './assets/back1.png';
import front2 from './assets/front2.png';
import back2 from './assets/back2.png';
import front3 from './assets/front3.png';
import back3 from './assets/back3.png';
import front4 from './assets/front4.png';
import back4 from './assets/back4.png';

// Import audio from the assets folder
import mrSnowman from './assets/Snowman.mp3';

function App() {
  const [flippedStates, setFlippedStates] = useState([false, false, false, false]);

  // Define the images for the front and back of each card
  const cardImages = [
    {
      front: front1,
      back: back1
    },
    {
      front: front2,
      back: back2
    },
    {
      front: front3,
      back: back3
    },
    {
      front: front4,
      back: back4
    }
  ];

  function flipCard(index) {
    const newFlippedStates = [...flippedStates];
    newFlippedStates[index] = !newFlippedStates[index];
    setFlippedStates(newFlippedStates);
  }

  // Snowflake generation logic
  useEffect(() => {
    const numberOfSnowflakes = 100;
    const snowflakeContainer = document.body;

    for (let i = 0; i < numberOfSnowflakes; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.innerHTML = '❄'; // Snowflake character
      snowflake.style.left = `${Math.random() * 100}vw`; // Random horizontal position
      snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random falling speed
      snowflake.style.animationDelay = `${Math.random() * 5}s`; // Random delay before start
      snowflakeContainer.appendChild(snowflake);
    }
  }, []);

  return (
    <div>
      {/* Add Audio Element */}
      <audio autoPlay loop>
        <source src={mrSnowman} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className="card-container">
        {cardImages.map((card, index) => (
          <ReactCardFlip
            key={index}
            flipDirection="horizontal"
            isFlipped={flippedStates[index]}
          >
            <div
              className="card"
              onClick={() => flipCard(index)}
            >
              <img
                src={card.front}  // Use the front image for this card
                alt={`Front ${index + 1}`}
                className="card-image"
              />
            </div>
            <div
              className="card card-back"
              onClick={() => flipCard(index)}
            >
              <img
                src={card.back}  // Use the back image for this card
                alt={`Back ${index + 1}`}
                className="card-image"
              />
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </div>
  );
}

export default App;

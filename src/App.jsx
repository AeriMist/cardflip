import { useState, useEffect } from 'react';
import './App.css';
import ReactCardFlip from 'react-card-flip';

// Import images from the assets folder (now .png)
import front1 from './assets/Front1.png';
import back1 from './assets/Back1.png';
import front2 from './assets/Front2.png';
import back2 from './assets/Back2.png';
import front3 from './assets/Front3.png';
import back3 from './assets/Back3.png';
import front4 from './assets/Front4.png';
import back4 from './assets/Back4.png';

// Import audio from the assets folder
import mrSnowman from './assets/Snowman.mp3';

function App() {
  const [flippedStates, setFlippedStates] = useState([false, false, false, false]);
  const [isPlaying, setIsPlaying] = useState(true);  // State to control music playback

  // Define the images for the front and back of each card
  const cardImages = [
    { front: front1, back: back1 },
    { front: front2, back: back2 },
    { front: front3, back: back3 },
    { front: front4, back: back4 }
  ];

  function flipCard(index) {
    const newFlippedStates = [...flippedStates];
    newFlippedStates[index] = !newFlippedStates[index];
    setFlippedStates(newFlippedStates);
  }

  // Snowflake generation and audio autoplay logic
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

    // Autoplay audio
    const audio = document.getElementById('snowmanAudio');
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error('Autoplay failed:', error);
      });
    }

    return () => {
      // Clean up snowflakes on component unmount
      const snowflakes = document.querySelectorAll('.snowflake');
      snowflakes.forEach((flake) => flake.remove());
    };
  }, []);

  // Toggle music play/pause
  const toggleMusic = () => {
    const audio = document.getElementById('snowmanAudio');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);  // Toggle playback state
  };

  return (
    <div>
      {/* Add Audio Element */}
      <audio id="snowmanAudio" loop>
        <source src={mrSnowman} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className="card-container">
        {cardImages.map((card, index) => (
          <ReactCardFlip key={index} flipDirection="horizontal" isFlipped={flippedStates[index]}>
            <div className="card" onClick={() => flipCard(index)}>
              <img src={card.front} alt={`Front ${index + 1}`} className="card-image" />
            </div>
            <div className="card card-back" onClick={() => flipCard(index)}>
              <img src={card.back} alt={`Back ${index + 1}`} className="card-image" />
            </div>
          </ReactCardFlip>
        ))}
      </div>

      {/* Cute Music Icon Button */}
      <button className="music-button" onClick={toggleMusic}>
        {isPlaying ? '🎶' : '❌'} {/* Music note icon when playing, cross when paused */}
      </button>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';


const Game = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [round, setRound] = useState(1);
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winner, setWinner] = useState('');

  const choices = ['Stone', 'Paper', 'Scissors'];

  const determineWinner = () => {
    if (player1Choice === player2Choice) return 'Tie';
    if (
      (player1Choice === 'Stone' && player2Choice === 'Scissors') ||
      (player1Choice === 'Scissors' && player2Choice === 'Paper') ||
      (player1Choice === 'Paper' && player2Choice === 'Stone')
    ) {
      setPlayer1Score(player1Score + 1);
      return player1;
    } else {
      setPlayer2Score(player2Score + 1);
      return player2;
    }
  };

  const handleNextRound = () => {
    const roundWinner = determineWinner();
    setWinner(roundWinner);
    if (round < 6) {
      setRound(round + 1);
    } else {
      // Save game data to the backend
      axios.post('http://localhost:5000/api/games', {
        player1,
        player2,
        player1Score,
        player2Score,
        winner: player1Score > player2Score ? player1 : player2,
      });
    }
  };

  return (
    <div className="game-container">
      <h1>Stone Paper Scissors</h1>
      <div className="player-input">
        <input
          placeholder="Player 1 Name"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
        <input
          placeholder="Player 2 Name"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
      </div>

      <div className="round-display">Round {round}</div>

      <div>
        <h3>{player1}'s Turn</h3>
        {choices.map((choice) => (
          <button className="choice-button" onClick={() => setPlayer1Choice(choice)} key={choice}>
            {choice}
          </button>
        ))}
      </div>

      <div>
        <h3>{player2}'s Turn</h3>
        {choices.map((choice) => (
          <button className="choice-button" onClick={() => setPlayer2Choice(choice)} key={choice}>
            {choice}
          </button>
        ))}
      </div>

      <button className="next-round-button" onClick={handleNextRound}>
        Next Round
      </button>

      {winner && <div className="winner-display">Winner of this round: {winner}</div>}
      <div className="score-display">
        {player1}: {player1Score} - {player2}: {player2Score}
      </div>
    </div>
  );
};

export default Game;

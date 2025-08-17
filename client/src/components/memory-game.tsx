
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GameCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const GAME_EMOJIS = ['🎂', '🎁', '🎉', '🎊', '🎈', '🕯️', '🥳', '🍰'];

export function MemoryGame() {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeGame = () => {
    const gameCards: GameCard[] = [];
    const shuffledEmojis = [...GAME_EMOJIS, ...GAME_EMOJIS]
      .sort(() => Math.random() - 0.5);

    shuffledEmojis.forEach((emoji, index) => {
      gameCards.push({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
    setGameStarted(true);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      setTimeout(() => {
        const [firstId, secondId] = newFlippedCards;
        const firstCard = cards[firstId];
        const secondCard = cards[secondId];

        if (firstCard.emoji === secondCard.emoji) {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true }
              : card
          ));
        } else {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false }
              : card
          ));
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameWon(true);
    }
  }, [cards]);

  if (!gameStarted) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-dark-secondary via-dark-primary to-dark-accent" data-testid="memory-game-intro">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-dancing font-bold bg-gradient-to-r from-neon-cyan to-neon-gold bg-clip-text text-transparent mb-6">
            🎮 Memory Game
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Test your memory with this fun birthday-themed card matching game! 
            Flip cards to find matching pairs of birthday emojis.
          </p>
          <Button
            onClick={initializeGame}
            className="bg-gradient-to-r from-neon-cyan to-neon-gold text-dark-primary text-lg px-8 py-3 rounded-full font-bold hover:scale-105 transition-all duration-300"
          >
            🎯 Start Game
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-dark-secondary via-dark-primary to-dark-accent" data-testid="memory-game">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-dancing font-bold bg-gradient-to-r from-neon-cyan to-neon-gold bg-clip-text text-transparent mb-4">
            🎮 Memory Game
          </h2>
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-gold">{moves}</div>
              <div className="text-sm text-gray-300">Moves</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-cyan">
                {cards.filter(card => card.isMatched).length / 2}/{GAME_EMOJIS.length}
              </div>
              <div className="text-sm text-gray-300">Pairs Found</div>
            </div>
          </div>
          <Button
            onClick={initializeGame}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-medium hover:scale-105 transition-all duration-300"
          >
            🔄 New Game
          </Button>
        </div>

        {gameWon && (
          <Card className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 border-none">
            <CardContent className="pt-6">
              <div className="text-center text-white">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                <p className="text-lg">You completed the game in {moves} moves!</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg 
                flex items-center justify-center text-3xl cursor-pointer
                transition-all duration-300 hover:scale-105 border-2
                ${card.isFlipped || card.isMatched 
                  ? 'bg-gradient-to-br from-neon-cyan to-neon-gold border-neon-gold' 
                  : 'border-gray-600 hover:border-neon-cyan'
                }
                ${card.isMatched ? 'opacity-75' : ''}
              `}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '?'}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            💡 Tip: Click two cards to flip them and find matching pairs!
          </p>
        </div>
      </div>
    </section>
  );
}

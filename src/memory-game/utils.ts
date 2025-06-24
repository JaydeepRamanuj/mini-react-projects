export const generateTileNumbers = (gridSize: number = 6) => {
  const grid: number[][] = Array.from({ length: gridSize }, () => []);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (!grid[i][j]) grid[i][j] = generateRandomEmoji();
    }
  }

  return grid;
};

const emojis = [
  "😂",
  "❤️",
  "🤣",
  "👍",
  "😭",
  "🙏",
  "😘",
  "🥰",
  "😍",
  "😊",
  "🎉",
  "😁",
  "💕",
  "🥺",
  "😅",
  "🔥",
  "☺️",
  "🤦",
  "♥️",
  "🤷",
  "🙄",
  "😆",
  "🤗",
  "😉",
  "🎂",
];

const generateRandomEmoji = () => {
  const randomNumber = Math.round(Math.random() * 24);
  const randomEmoji = emojis[randomNumber];
  return randomEmoji;
};

export type TileType = {
  id: number;
  value: string;
  showValue: boolean;
  isMatched: boolean;
};

export type Grid = TileType[];

export const generateRandomValuesForGrid = (gridSize: number) => {
  const grid = [];

  for (let i = 0; i < gridSize ** 2; i += 2) {
    const generatedEmoji = generateRandomEmoji();
    if (!grid[i] && !grid[i + 1]) {
      grid[i] = {
        id: i,
        value: generatedEmoji,
        showValue: false,
        isMatched: false,
      };
      grid[i + 1] = {
        id: i + 1,
        value: generatedEmoji,
        showValue: false,
        isMatched: false,
      };
    }
  }
  const shuffledGrid = grid.sort(() => Math.random() - 0.5);

  return shuffledGrid;
};

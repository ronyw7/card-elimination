export interface LayoutType {
  board: string[];
  elimNum: number;
  costs?: number[][];
}

const minCostDefault = 0;
const maxCostDefault = 3;
const seedDefault = 2010;

// Updated to accept and update the seed
function mulberry32(seed: number): () => number {
  return function () {
    var t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getRandInt(
  min: number,
  max: number,
  seed: number
): [number, number] {
  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);
  const randFunc = mulberry32(seed);
  const rand = randFunc();
  const nextSeed = seed + 1;
  const randInt = Math.floor(rand * (maxNum - minNum + 1)) + minNum;
  return [randInt, nextSeed];
}

export function getCostMat(
  board: string[],
  minCost: number = minCostDefault,
  maxCost: number = maxCostDefault,
  initialSeed: number = seedDefault,
): number[][] {
  let seed = initialSeed;
  return board.map((row) =>
    Array.from(row, () => {
      const [randInt, updatedSeed] = getRandInt(minCost, maxCost, seed);
      seed = updatedSeed;
      return randInt;
    })
  );
}

export const layouts: LayoutType[] = [
  // Index: [0]
  // Easy Layout: Max Hand Used is 3 if following a good strategy, 8 if just randomly selecting the cards
  {
    board: ["321424", "132413", "421331", "314242"],
    elimNum: 3,
  },

  // Index: [1]
  {
    board: ["131242", "412323", "142243", "443131"],
    elimNum: 3,
  },

  // Index: [2]
  // Yellow + Red cards trick ppl into selecting suboptimal strategy that gives max length 4. Optimal is 3.
  // If randomly selecting the cards the expected # is 6 - 9.
  {
    board: ["315343", "241114", "423145", "235134"],
    elimNum: 3,
  },

  {
    board: ["131242", "412323", "142243", "443131"],
    elimNum: 3,
  },
  {
    board: ["2414151", "4245233", "2245234"],
    elimNum: 3,
  },

  // Demo Layout
  {
    board: ["1322", "2314", "4431"],
    elimNum: 3,
  },

  {
    board: ["2414151", "4245233", "2245234"],
    elimNum: 3,
  },

  // Optimal: Eliminate the two red cards in the first row and the red card in the bottom row - 3
  // Intuitive: Eliminate the blue cards in the bottom - 4
  {
    board: ["421331", "441224", "221433", "214313"],
    elimNum: 3,
  },

  {
    board: ["341111", "421432", "323434", "334422"],
    elimNum: 3,
  },

  // eliminate red first or green first
  {
    board: ["333341", "414311", "232412", "412432", "321442", "421213"],
    elimNum: 3,
  },
];

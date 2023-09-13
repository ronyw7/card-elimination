export interface LayoutType {
  board: string[];
  elimNum: number;
}

export const layouts: LayoutType[] = [
  {
    board:
    [
      '131242',
      '412323',
      '142243',
      '443131',
    ],
    elimNum: 3
  },
  {
    board:
    [
      '2414151',
      '4245233',
      '2245234',
    ],
    elimNum: 3
  },
  
  // Demo Layout
  {
    board:
    [
      '1322',
      '2314',
      '4431',
    ],
    elimNum: 3
  },
]
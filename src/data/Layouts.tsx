export interface LayoutType {
  board: string[];
  elimNum: number;
}

export const layouts: LayoutType[] = [
  {
    //
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

  {
    board:
    [
      '2414151', 
      '4245233',
      '2245234',
    ],
    elimNum: 3
  },

  // eliminate green first or red first
  {
    board:
    ['333341', '232412', '412432', '321442', '421213', '414311'],
    elimNum: 3
  },

    // eliminate red first or green first
    {
      board:
      ['333341', '414311', '232412', '412432', '321442', '421213'],
      elimNum: 3
    },
  

  
  

]
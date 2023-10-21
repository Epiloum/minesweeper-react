import * as lodash from 'lodash';
import { OPEN, GAMEOVER } from "../actions";

class Cell {
  mine: boolean = false;
  opened: boolean = false;
  count: number = 0;

  open(): boolean {
    if(this.opened) {
      return false;
    } else {
      this.opened = true;
      return true;
    }
  }

  layMine(): boolean {
    if(this.mine) {
      return false;
    } else {
      this.mine = true;
      return true;
    }
  }

  setCount(v: number): number {
    this.count = v;
    return v;
  }
}


// ========================================
// Initializing
// ========================================
const mineCount = 99;
const cellWidth = 30;
const cellHeight = 16;

let initialState = {
  count: 0,
  cells: Array.from({ length: cellWidth * cellHeight }, () => new Cell()),
  width: cellWidth,
  height: cellHeight,
  gameover: false
};

// Lay mines
for(let i=0; i < mineCount; i++) {
  const idx = Math.floor(Math.random() * cellWidth * cellHeight);
  if(!initialState.cells[idx].layMine()) {
    --i;
  }
}

// calc count
for(let i=0; i < cellWidth * cellHeight; i++) {
  const top = (i < cellWidth);
  const left = (i % cellWidth === 0);
  const bottom = (Math.floor(i / cellWidth) === cellHeight - 1);
  const right = (i % cellWidth === cellWidth - 1);

  let count = 0;

  if(!top) {
    count += initialState.cells[i - cellWidth].mine? 1: 0;
    if(!left) { count += initialState.cells[i - 1 - cellWidth].mine? 1: 0; }
    if(!right) { count += initialState.cells[i + 1 - cellWidth].mine? 1: 0; }
  }
  
  if(!left) { count += initialState.cells[i - 1].mine? 1: 0; }
  if(!right) { count += initialState.cells[i + 1].mine? 1: 0; }

  if(!bottom) {
    count += initialState.cells[i + cellWidth].mine? 1: 0;
    if(!left) { count += initialState.cells[i - 1 + cellWidth].mine? 1: 0; }
    if(!right) { count += initialState.cells[i + 1 + cellWidth].mine? 1: 0; }
  }

  initialState.cells[i].setCount(count);
}


// ========================================
// Define action
// ========================================
const counterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN:      
      const newCells = lodash.cloneDeep(state.cells);
      newCells[action.payload.idx].open();
      return { ...state, cells: newCells };
    case GAMEOVER:
      return { ...state, gameover: !state.gameover };
    default:
      return state;
  }
};

export default counterReducer;

import * as lodash from 'lodash';
import { OPEN, ADJACENT_OPEN, FLAG, GAMEOVER } from "../actions";

class Cell {
  mine: boolean = false;
  flag: number = 0;
  opened: boolean = false;
  count: number = 0;

  open(): boolean {
    if(this.flag === 1 || this.opened) {
      return false;
    } else {
      this.opened = true;
      return true;
    }
  }

  forceOpen(): boolean {
    this.opened = true;
    return !this.mine;
  }

  layMine(): boolean {
    if(this.mine) {
      return false;
    } else {
      this.mine = true;
      return true;
    }
  }
  
  toggleFlag() {
    this.flag = (this.flag + 1) % 3;    
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
// Functions
// ========================================
function openQueue(queue: Array<number>, cells: Array<any>, force: boolean) {
  let idx; 
  let gameover = false;

  while(idx = queue.pop()) {
    if (cells[idx].open() && !cells[idx].mine && cells[idx].count === 0) {
      // Spread!        
      const top = (idx < cellWidth);
      const left = (idx % cellWidth === 0);
      const bottom = (Math.floor(idx / cellWidth) === cellHeight - 1);
      const right = (idx % cellWidth === cellWidth - 1);
      
      if(!top) {
        queue.push(idx - cellWidth);
        if(!left) { queue.push(idx - 1 - cellWidth); }
        if(!right) { queue.push(idx + 1 - cellWidth); }
      }
      
      if(!left) { queue.push(idx - 1); }
      if(!right) { queue.push(idx + 1); }

      if(!bottom) {
        queue.push(idx + cellWidth);
        if(!left) { queue.push(idx - 1 + cellWidth); }
        if(!right) { queue.push(idx + 1 + cellWidth); }
      }
    }
    if(cells[idx].mine) {
      gameover = true;
    }
  }

  return gameover;
}


// ========================================
// Define action
// ========================================
const counterReducer = (state = initialState, action: any) => {
  let newCells = lodash.cloneDeep(state.cells);  
  let gameover: boolean = state.gameover;
  let idx;

  if(state.gameover) {
    // When game is over, do nothing.
    return state;
  }

  switch (action.type) {
    case OPEN: 
      idx = action.payload.idx;
      let queue = [action.payload.idx];
      
      if(state.cells[idx].flag !== 1) {
        gameover = state.cells[idx].mine? true: false
      }

      openQueue(queue, newCells, false);

      return { ...state, cells: newCells, gameover };

    case ADJACENT_OPEN:
      idx = action.payload.idx;
      let adjacentQueue = [];

      // Enqueue Adjacent Cells
      const top = (idx < cellWidth);
      const left = (idx % cellWidth === 0);
      const bottom = (Math.floor(idx / cellWidth) === cellHeight - 1);
      const right = (idx % cellWidth === cellWidth - 1);
      
      if(!top) {
        adjacentQueue.push(idx - cellWidth);
        if(!left) { adjacentQueue.push(idx - 1 - cellWidth); }
        if(!right) { adjacentQueue.push(idx + 1 - cellWidth); }
      }
      
      if(!left) { adjacentQueue.push(idx - 1); }
      if(!right) { adjacentQueue.push(idx + 1); }

      if(!bottom) {
        adjacentQueue.push(idx + cellWidth);
        if(!left) { adjacentQueue.push(idx - 1 + cellWidth); }
        if(!right) { adjacentQueue.push(idx + 1 + cellWidth); }
      }

      // Compare counting number
      let flagCount = 0;
      for(const v of adjacentQueue) {
        flagCount += newCells[v].flag? 1: 0;
      }

      // Open all of adjacent cells without a flag
      if (flagCount == newCells[idx].count) {        
        gameover = openQueue(adjacentQueue, newCells, true);
      }

      return { ...state, cells: newCells, gameover: gameover };

    case FLAG:
      idx = action.payload.idx;
      newCells[idx].toggleFlag();
      return { ...state, cells: newCells }

    case GAMEOVER:
      return { ...state, gameover: !state.gameover };
      
    default:
      return state;
  }
};

export default counterReducer;

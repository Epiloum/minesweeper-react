export const GAMEOVER = "GAMEOVER";
export const OPEN = "OPEN"
export const FLAG = "FLAG"

export const gameover = () => ({ type: GAMEOVER });
export const open = (idx: number) => ({ 
    type: OPEN,
    payload: { idx }
});
export const flag = (idx: number) => ({ 
    type: FLAG,
    payload: { idx }
});
export const GAMEOVER = "GAMEOVER";
export const OPEN = "OPEN"

export const gameover = () => ({ type: GAMEOVER });
export const open = (idx: number) => ({ 
    type: OPEN,
    payload: { idx }
});
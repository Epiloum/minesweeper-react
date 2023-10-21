import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { open, flag } from "../actions";

function Cell(props: any) {
    const idx = props.idx;
    const cell = useSelector((state: any) => state.cells[props.idx]);
    const gameover = useSelector((state: any) => state.gameover);
    
    const dispatch = useDispatch();
    const actOpen = (e: any) => {
        if(e.button === 0) {
            dispatch(open(idx))
        }
    };
    const actFlag = (e: any) => {
        e.preventDefault();
        dispatch(flag(idx));
    };

    return (
        <div className="cell" data-flag={cell.flag} data-mine={cell.mine && gameover? 1: 0} data-opened={cell.opened? 1: 0} data-count={cell.opened? cell.count: ''}>
            {cell.opened? cell.count: ''}
            <button onClick={actOpen} onContextMenu={actFlag}></button>
        </div>
    );
};

export default Cell;
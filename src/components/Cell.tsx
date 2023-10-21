import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { open } from "../actions";

function Cell(props: any) {
    const idx = props.idx;
    const cell = useSelector((state: any) => state.cells[props.idx]);
    const gameover = useSelector((state: any) => state.gameover);
    
    const dispatch = useDispatch();
    const actOpen = () => dispatch(open(idx));

    return (
        <div className="cell" data-mine={cell.mine && gameover? 1: 0} data-opened={cell.opened? 1: 0} data-count={cell.opened? cell.count: ''}>
            {cell.opened? cell.count: ''}
            <button onClick={actOpen}></button>
        </div>
    );
};

export default Cell;
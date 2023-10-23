import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { open, flag, adjacent_open } from "../actions";

function Cell(props: any) {
    const idx = props.idx;
    const cell = useSelector((state: any) => state.cells[props.idx]);
    const gameover = useSelector((state: any) => state.gameover);
    let clickedBothSides = false;
    
    const dispatch = useDispatch();
    const actStopMenu = (e: any) => {
        e.preventDefault();
    }
    const actClickBothSide = (e: any) => {
        e.preventDefault();

        if(e.buttons === 3) {
            clickedBothSides = true;
        }
    }
    const actAdjacentOpen = (e: any) => {
        e.preventDefault();
        
        if(clickedBothSides) {
            dispatch(adjacent_open(idx))            
            clickedBothSides = false;
        }
    }


    const actOpen = (e: any) => {
        e.preventDefault();

        if(e.button === 0) {
            dispatch(open(idx))
        } 
    };

    const actFlag = (e: any) => {
        e.preventDefault();
        dispatch(flag(idx));
    };

    return (
        <div className="cell" data-flag={cell.flag} data-mine={cell.mine && gameover? 1: 0} data-opened={cell.opened? 1: 0} data-count={cell.opened? cell.count: '' } onContextMenu={actStopMenu} onMouseDown={actClickBothSide} onMouseUp={actAdjacentOpen}>
            {cell.opened? cell.count: ''}
            <button onMouseUp={actOpen} onContextMenu={actFlag}></button>
        </div>
    );
};

export default Cell;
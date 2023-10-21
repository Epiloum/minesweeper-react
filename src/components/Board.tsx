import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { gameover } from "../actions";
import Cell from "./Cell";

function Board(props: any) {
    let components: Array<any> = [];
    const cells = useSelector((state: any) => state.cells);
    const width = useSelector((state: any) => state.width);

    const dispatch = useDispatch();
    const actGameover = () => dispatch(gameover());

    return (
        <div className="board">
            {Array(cells.length).fill(null).map((_, index) => 
                <Cell key={index} idx={index} />
            )}
            <button onClick={actGameover}>Game over toggle</button>
        </div>
    );
};

export default Board;
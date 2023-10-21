import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { gameover } from "../actions";
import Cell from "./Cell";

function Board(props: any) {
    let components: Array<any> = [];
    const cells = useSelector((state: any) => state.cells);
    const width = useSelector((state: any) => state.width);
    const gameover = useSelector((state: any) => state.gameover);

    return (
        <div className="board" data-gameover={gameover? 1: 0}>
            {Array(cells.length).fill(null).map((_, index) => 
                <Cell key={index} idx={index} />
            )}
        </div>
    );
};

export default Board;
import React from 'react'
import * as FilterTypes from "../actionTypes";

const Filter = () => (
    <p>
        <Link fllter={FilterTypes.ALL}>{FilterTypes.ALL}</Link>
        <Link fllter={FilterTypes.COMPLETED}>{FilterTypes.COMPLETED}</Link>
        <Link fllter={FilterTypes.UNCOMPLETED}>{FilterTypes.UNCOMPLETED}</Link>
    </p>
)

export default Filter;
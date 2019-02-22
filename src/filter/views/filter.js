import React from 'react'
import { filterTypes } from "../filterTypes";
import Link from './link';

const Filter = () => (
    <p>
        <Link filter={filterTypes.ALL}>{filterTypes.ALL}</Link>
        <Link filter={filterTypes.COMPLETED}>{filterTypes.COMPLETED}</Link>
        <Link filter={filterTypes.UNCOMPLETED}>{filterTypes.UNCOMPLETED}</Link>
    </p>
)

export default Filter;
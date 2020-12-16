import React from 'react';
import ItemLatest from './ItemLatest';

export default function DietLatest() {
    const item = (item) => <span>
        <span className="w25"><b>Carbs:</b> { item.carbs }g </span>
        <span className="w27"><b>Protein:</b> { item.protein }g </span>
        <span className="w18"><b>Fat:</b> { item.fat }g </span>
        <span className="w30"><b>Calories:</b> { item.carbs*4 + item.protein*4 + item.fat*9 } </span>
    </span>

    return <ItemLatest route="diet" section="diet" item={ item } />
}

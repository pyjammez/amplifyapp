import React from 'react';
import { List } from 'semantic-ui-react';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import { Link } from 'react-router-dom';
import ItemByDate from './ItemByDate';

export default function DietByDate() {
    const footer = (itemsFromAPI) => {
        var totals = {carbs: 0, protein: 0, fat: 0};

        itemsFromAPI.forEach((nameObj) => {
            nameObj.items.forEach((item) => {
                totals['carbs'] += parseInt(item.var1);
                totals['protein'] += parseInt(item.var2);
                totals['fat'] += parseInt(item.var3);
            });
        });

        return (
            <div className="diet-macros-totals w100 float-right">
                Totals:
                <span className="">{ totals['carbs'] } carbs</span>
                <span className="">{ totals['protein'] } protein</span>
                <span className="">{ totals['fat'] } fat</span>
                <span className="">{ totals['carbs']*4 + totals['protein']*4 + totals['fat']*9 } kcalories</span>
            </div>
        )
    }

    const item = (item) => <div>
        <span className="diet-macros-per-meal">
            <span className="w20">{ item.var1 }c </span>
            <span className="w20">{ item.var2 }p </span>
            <span className="w20">{ item.var3 }f </span>
            <span className="w40">{ item.var1*4 + item.var2*4 + item.var3*9 }cal </span>
        </span>           
    </div>

    return <ItemByDate section="diet" route="diet" item={ item } footer={ footer } />
}

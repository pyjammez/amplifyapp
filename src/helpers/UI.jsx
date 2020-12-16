import React from 'react';
import { Link } from 'react-router-dom';
import StringHelper from './StringHelper';
import DateTimeFormatter from './DateTimeFormatter';
import { List, Grid, Header } from 'semantic-ui-react';
import { DashboardQuickButtons } from './Buttons';


export const SegmentNameLabel = (props) => (
    <Link to={`/backend/${ props.route }/by-name/${encodeURIComponent(props.name)}`}
        className="segment-label">
        { StringHelper.ucWords(props.name) }
    </Link>
);

export const SegmentDateLabel = (props) => (
    <Link to={`/backend/${ props.route }/by-date/${ props.date }`}
        className="segment-label">
        <DateTimeFormatter value={ props.date } date />
    </Link>
);

export const SectionHeader = (props) => (
    <Grid>
        <Grid.Row columns="equal">
            <Grid.Column>
                <Link to={`/backend/${ props.route }`}>
                    <Header as="h3">{ props.name }</Header>
                </Link>
                
                { props.description ? <p>{ props.description }</p> : "" }
            </Grid.Column>

            <Grid.Column>
                <DashboardQuickButtons 
                    new={ props.new }
                    save={ props.save }
                    route={ props.route }
                    reset={ props.reset }
                    latest={ props.latest }
                    plan={ props.plan }
                    editPlan={ props.editPlan }
                    settings={ props.settings }
                />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export const ItemList = (props) => {
    return props.items.map((item) => (
        <List.Item key={ item.id }>
            { props.name ?
                <Link
                    to={`/backend/${ props.route }/by-name/${encodeURIComponent(item.name)}`}>
                    { StringHelper.ucWords(item.name) }: &nbsp;&nbsp;
                </Link>
                : ""
            }

            <Link to={`/backend/${ props.route }/${ item.id }/edit`}>
                <ItemViews item={ item } section={ props.section } />
                <DateTimeFormatter floatright format="hh:mm:ss" time value={ item.datetime } />
            </Link>
        </List.Item>
    ));
}

export const ItemViews = (props) => {
    let item = props.item;
    let section = props.section;

    return section === "exercise" ?
        <span>{ item.var1 } x { item.var2}</span>
    : section === "diet" ?
        <span>{ item.var1 }c, { item.var2 }p, { item.var3 }f, { item.var1*4 + item.var2*4 + item.var3*9 }cal </span>
    : section === "supplement" ?
        <span>{ item.var1 } serving/volume</span>
    : section === "measurement" ?
        <span>{ item.var1 } units</span>
    : section === "photo" ?
        <span>{ item.var1 }</span>
    : section === "injury" ?
        <span>{ item.var1 } - { item.var2}</span>
    : section === "illness" ?
        <span>{ item.var1 } - { item.var2}</span>
    : "";
}

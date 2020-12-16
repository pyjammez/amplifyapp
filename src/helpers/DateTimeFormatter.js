import React from 'react';
import moment from 'moment';

export default class DateTimeFormatter extends React.Component{
    constructor(props) {
        super(props);
    
        this.dateformat = sessionStorage.getItem('dateformat') || 'dayfirst';
        this.twelvehour = sessionStorage.getItem('twelvehour') || 12;

        this.dateMapping = {
            dayfirst: 'ddd Do MMMM YYYY',
            date: 'YYYY-MM-DD',
            american: 'MM-DD-YYYY',
            australian: 'DD-MM-YYYY'
        };

        this.timeMapping = {
            12: 'h:mm:ss a',
            24: 'HHmm'
        };
    }

    render() {
        let formatString = [];

        if (this.props.date) formatString.push(this.dateMapping[this.dateformat]);
        if (this.props.time) formatString.push(this.timeMapping[this.twelvehour]);
        if (this.props.seconds) formatString.push('ss');

        let format = this.props.format ? this.props.format
            : /\d{4}-\d{2}-\d{2}$/.test(this.props.value) ? "YYYY-MM-DD"
            : /\d{4}-\d{2}-\d{2} \d\d:\d\d:\d\d/.test(this.props.value) ? "YYYY-MM-DD HH:mm:ss"
            : '';

        return (
            <span className={`datetime-formatted ${this.props.floatright ? "float-right" : ""}`}>
                { moment(this.props.value, format).format(formatString.join(' ')) }
            </span>
        )
    }
}

import React from 'react';
import { Button, List, Input, Form } from 'semantic-ui-react';

export const DateTime = ({f}) => (
    <Form.Group>
        <Form.Field>
            <label>Date</label>
            <Input
            name="date"
            placeholder="Date"
            value={f.formData.date}
            iconPosition="left"
            icon="calendar"
            onChange={e => f.setFormData({ ...f.formData, 'date': e.target.value})} />
        </Form.Field>

        <Form.Field>
            <label>Time</label>
            <Input
            name="time"
            placeholder="Time HH:MM:SS"
            value={f.formData.time}
            iconPosition="left"
            icon="clock"
            onChange={e => f.setFormData({ ...f.formData, 'time': e.target.value})} />
        </Form.Field>
    </Form.Group>
);

export const FInput = ({name, label, f}) => (
    <Form.Input
    fluid
    label={label}
    autoComplete="off"
    value={f.formData[name]}
    onChange={e => f.setFormData({ ...f.formData, [name]: e.target.value})}
    name={name}
    placeholder={label} />
);

/*
export const FTextArea = ({name, placeholder, formData, label}) => (
    <Form.TextArea
    autoComplete="off"
    label={label}
    value={formData[name]}
    onChange={countdown}
    name={name}
    placeholder={placeholder} />
);
*/

export const FormGroup = (props) => (
    <Form.Group widths="equal">
        <FInput name="var1" label={ props.var1Label } f={props.f} />
        { props.var2Label ? <FInput name="var2" label={ props.var2Label } f={props.f} /> : "" }
        { props.var3Label ? <FInput name="var3" label={ props.var3Label } f={props.f} /> : "" }
    </Form.Group>
);

export const SaveAndDelete = ({create, deleteAndReturn, action}) => (
    <div>
        <Button.Group className="w-100">
            <Button onClick={() => create('back')}>Save & Back</Button>
            <Button.Or />
            <Button onClick={() => create('stay')}>Save & Stay</Button>
            <Button.Or />
            <Button onClick={() => create('list')}>Save & Home</Button>
        </Button.Group>

        { action === "Edit" && 
            <List className="text-center mt-40">
                <List.Item onClick={ deleteAndReturn } className="color-red f-12 underline cursor-pointer">Delete</List.Item>
            </List>
        }
    </div>
);

/* Alternative way of doing this is
 *
function DateTime({formData, setFormData}) { 
    return (
    <Form.Group>
        <Form.Field>
            <label>Date</label>
            <Input
            name="date"
            dateFormat="YYYY-MM-DD"
            popupPosition="bottom left"
            placeholder="Date"
            dateFormat="yyyy-mm-dd"
            value={formData.date}
            iconPosition="left"
            icon="calendar"
            onChange={e => setFormData({ ...formData, 'date': e.target.value})} />
        </Form.Field>

        <Form.Field>
            <label>Time</label>
            <Input
            name="time"
            placeholder="Time HH:MM:SS"
            value={formData.time}
            iconPosition="left"
            icon="clock"
            onChange={e => setFormData({ ...formData, 'time': e.target.value})} />
        </Form.Field>
    </Form.Group>
    );
}

export { DateTime };
*/

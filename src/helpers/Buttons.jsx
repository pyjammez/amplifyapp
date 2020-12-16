import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const DashboardQuickButtons = (props) => (
    <Menu compact size="tiny" text icon="labeled" className="dashboard-quick-buttons float-right">
        {props.editPlan &&
            <Menu.Item as={Link} icon to={`/backend/${ props.route }/plan/edit`}>
                <Icon name="pencil" />
                <span>Edit</span>
            </Menu.Item>
        }

        {props.new &&
            <Menu.Item as={Link} icon to={`/backend/${ props.route }/new${props.name ? "?name="+props.name : ""}`}>
                <Icon name="plus" />
                <span>Add</span>
            </Menu.Item>
        }

        {props.plan &&
            <Menu.Item as={Link} icon to={`/backend/${ props.route }/plan`}>
                <Icon name="list ul" />
                <span>Plan</span>
            </Menu.Item>
        }

        {props.latest &&
            <Menu.Item as={Link} icon to={`/backend/${ props.route }/latest`}>
                <Icon name="clock" />
                <span>Latest</span>
            </Menu.Item>
        }

        {/*props.settings &&
            <Menu.Item as={Link} icon to={`/backend/${ props.route }/settings`}>
                <Icon name="ellipsis vertical" />
                <span>Settings</span>
            </Menu.Item>
        */}

        {props.save &&
            <Menu.Item icon onClick={ props.save }>
                <Icon name="save" />
                <span>Save</span>
            </Menu.Item>
        }

        {props.reset &&
            <Menu.Item icon onClick={ props.reset }>
                <Icon name="trash" />
                <span>Reset</span>
            </Menu.Item>
        }
    </Menu>
)

export const ExerciseSet = (props) => (
    <Link
        className="exercise-set"
        to={`/backend/exercises/${ props.set.id }/edit`} key={ props.set.key ? props.set.key : '' }>
        { props.set.var1 }x{ props.set.var2 }
    </Link>
)

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

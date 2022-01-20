import * as React from 'react';
import {
    ArrayField,
    BooleanField,
    CloneButton,
    ChipField,
    Datagrid,
    DateField,
    EditButton,
    NumberField,
    ReferenceArrayField,
    ReferenceManyField,
    RichTextField,
    SelectField,
    ShowView,
    SingleFieldList,
    Tab,
    TabbedShowLayout,
    TextField,
    UrlField,
    useShowController,
} from 'react-admin';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const CreateRelatedComment = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: '/comments/create',
            state: { record: { post_id: record.id } },
        }}
    >
        Add comment
    </Button>
);

const PostShow = props => {
    const controllerProps = useShowController(props);
    return (
        <ShowView {...controllerProps} title={props.title}>
            <TabbedShowLayout>
                <Tab label="اطلاعات واحد اندازه گیری">
                    <TextField source="id" />
                    <TextField source="unit_code" />
                    <TextField source="unit_name" />
                </Tab>
            </TabbedShowLayout>
        </ShowView>
    );
};

export default PostShow;

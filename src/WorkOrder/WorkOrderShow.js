import * as React from "react";
import { Fragment } from 'react';
import {
    Datagrid,
    TextField,
    ReferenceField,
    useShowController,
    TabbedShowLayout,
    ReferenceManyField,
    Tab,
    Show,
    TopToolbar,
    NumberField,
    EditButton,
    ExportButton,
    ListButton,
    List,
    downloadCSV,
    SelectField,
    useMutation,
    useRefresh,
    useNotify,
    useUnselectAll,
    BulkDeleteButton,
    Button,
}
from 'react-admin';

import { makeStyles } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

import ScrollDialog from './NewSpareTask';
import ScrollDialogP from './NewPersonTask';
import SettingsInputSvideoOutlinedIcon from '@material-ui/icons/SettingsInputSvideoOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';



const AddTaskSpareButton = ({ selectedIds }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => () => {
        setOpen(true);
    };

    return (
        <Fragment>
            <Button
                label="افزودن قطعه‌یدکی"
                onClick={handleClickOpen()}
            >
                <SettingsInputSvideoOutlinedIcon />
            </Button>
            {open ? <ScrollDialog open={open} setOpen={setOpen} taskSelectedIds={selectedIds} /> : null}
        </Fragment>
    );
};

const AddTaskPersonnelButton = ({ selectedIds }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => () => {
        setOpen(true);
    };

    return (
        <Fragment>
            <Button
                label="افزودن پرسنل"
                onClick={handleClickOpen()}
            >
                <PermIdentityOutlinedIcon />
            </Button>
            {open ? <ScrollDialogP open={open} setOpen={setOpen} taskSelectedIds={selectedIds} /> : null}
        </Fragment>
    );
};

const TaskBulkActionButtons = props => (
    <Fragment>
        <AddTaskPersonnelButton {...props} />
        <AddTaskSpareButton {...props} />
        <BulkDeleteButton {...props} />
    </Fragment>
);


const useStyles = makeStyles({
    head: {
        display: 'none',
    },
    sho: {'& label': { fontSize: '20px', color:'rgb(36 50 97)' }},
    ex: {
        fontFamily: 'inherit',
    }
});



const WOTaskList = (props) => {

    const {
        record
    } = useShowController(props);

    const classes = useStyles();

    return(
        <Show actions={null} {...props} title={false}>
            <TabbedShowLayout syncWithLocation={false}>
                <Tab label="قطعات یدکی" path="PMWorks/WOSparePart">
                    <ReferenceManyField
                        addLabel={false}
                        reference="PMWorks/WOSparePart"
                        target="WOTaskID"
                        filter={{ WOTaskID: record.id }}
                    >
                    <List empty={false} actions={false}>
                        <Datagrid>
                            <TextField label="کد قطعه" textAlgin="right" source="id" />
                        </Datagrid>
                        </List>
                    </ReferenceManyField>
                </Tab>
                <Tab label="پرسنل" path="PMWorks/WOPersonnel">
                    <ReferenceManyField
                        addLabel={false}
                        reference="PMWorks/WOPersonnel"
                        target="WOTaskID"
                        filter={{ WOTaskID: record.id }}
                    >
                    <List empty={false} actions={false}>
                        <Datagrid>
                            <TextField label="کد قطعه" textAlgin="right" source="id" />
                        </Datagrid>
                    </List>
                    </ReferenceManyField>
                </Tab>
            </TabbedShowLayout>
        </Show>
    );
};


const WorkOrderShow = (props) => {

    const {
        record
    } = useShowController(props);

    const classes = useStyles();
    return(
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="فعالیت ها" path="PMWorks/WOTask">
                <ReferenceManyField
                    addLabel={false}
                    reference="PMWorks/WOTask"
                    target="WorkOrderID"
                    filter={{ WorkOrderID: record.id }}
                >
                <List bulkActionButtons={<TaskBulkActionButtons />} empty={false} actions={false}>
                    <Datagrid expand={<WOTaskList />}>
                        <TextField label="کد قطعه" textAlgin="right" source="id" />
                    </Datagrid>
                </List>
                </ReferenceManyField>
            </Tab>
   
        </TabbedShowLayout>
    </Show>
);
};

export default WorkOrderShow;

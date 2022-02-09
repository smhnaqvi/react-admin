import React, { Fragment } from "react"
import { List, Datagrid, TextField, CreateButton } from "react-admin"
import ScrollDialog from "./NewPersonnalWorkModal"

const TaskBulkActionButtons = props => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => () => {
        setOpen(true);
    };
    const {selectedIds} = props;
    return (
        <Fragment>
            <CreateButton label="افزودن کار جدید" onClick={handleClickOpen()} />
            {open ? <ScrollDialog open={open} setOpen={setOpen} taskSelectedIds={selectedIds} /> : null}
        </Fragment>
    )
};

const WOTask = (props) => {
    return <List {...props} bulkActionButtons={<TaskBulkActionButtons />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="WorkOrderID" />
            <TextField source="TaskId" />
            <TextField source="WOTaskSituationOfDo" />
        </Datagrid>
    </List>
}


export default WOTask
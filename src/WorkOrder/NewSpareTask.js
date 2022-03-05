import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { TextField, useRefresh, useUnselectAll,
         ReferenceField, Datagrid, List, useMutation, Button,
         useNotify, NumberInput, SimpleForm, ResourceContextProvider } from "react-admin";
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

export default function ScrollDialog(props) {
    const [taskTime, setTaskTime] = React.useState(null);
    const [showPanel, setShowPanel] = useState(false);

    let { open, setOpen, taskSelectedIds } = props;

    //close dialog window
    const handleClose = () => {
        setOpen(false);
    };

    const toggleDrawer = () => setShowPanel((showPanel) => !showPanel);


    const AddButton = ({ selectedIds }) => {
        const refresh = useRefresh();
        const notify = useNotify();
        const unselectAll = useUnselectAll();
        const [mutate] = useMutation();
        const unselectAlll = useUnselectAll();

    
        const onSuccess = () => {
            refresh();
            notify('قطعات اضافه شدند');
            unselectAll('PMWorks/WOTask');
            unselectAlll('PMWorks/SparePart');
        };
    
        const toggleDrawer = () => {{taskSelectedIds.map(taskId => selectedIds.map(personId =>
            mutate({
            type: 'create',
            resource: 'PMWorks/WOSparePart',
            payload: {
                data: {
                WOTaskID: taskId,
                SparePartID: personId,
                SparePartAmount: parseInt(taskTime),
                }
            }
            })
        ))}; onSuccess()};
    
        return (
            <Button
                label='ثبت'
                onClick={toggleDrawer}
            >
                <AddIcon />
            </Button>
        );
    };

    const PersonnelBulkActionButtons = props => {
        return (
            <React.Fragment>
                <AddButton label="تایید فعالیت" {...props} />
            </React.Fragment>
        )
    };


    const PersonnalList = (...props) => {
        return (
        <ResourceContextProvider value="PMWorks/SparePart" {...props}>
            <List syncWithLocation basePath="PMWorks/SparePart" bulkActionButtons={<PersonnelBulkActionButtons />} exporter={false} actions={false} {...props}>
            <Datagrid>
                <TextField textAlgin="right" source="id" />
            </Datagrid>
            </List>
        </ResourceContextProvider>
        );
    };

    return (
        <Dialog
        open={showPanel}
        onClose={toggleDrawer}
        fullWidth={true}
        maxWidth={"md"}
        >
                <SimpleForm toolbar={false}>
                    <NumberInput isRequired={true} label={"تعداد"} source={"SparePartAmount"} value={taskTime} onChange={(e) => setTaskTime(e.target.value)} />
                </SimpleForm>
                <Divider />
                <PersonnalList />
        </Dialog>
    );
}
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { TextField, useRefresh, useUnselectAll,
         ReferenceField, Datagrid, List, useMutation, Button,
         useNotify, NumberInput, SimpleForm, ResourceContextProvider } from "react-admin";
import AddIcon from '@material-ui/icons/Add';

import { DateInput } from "../components/JalaliDatePickerDialog"

export default function ScrollDialog(props) {
    const [taskTime, setTaskTime] = React.useState(null);
    const [taskDate, setTaskDate] = React.useState(null);

    let { open, setOpen, taskSelectedIds } = props;

    //close dialog window
    const handleClose = () => {
        setOpen(false);
    };



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
            unselectAlll('PMWorks/Personnel');
        };
    
        const toggleDrawer = () => {{taskSelectedIds.map(taskId => selectedIds.map(personId =>
            mutate({
            type: 'create',
            resource: 'PMWorks/WOPersonnel',
            payload: {
                data: {
                WOTaskID: taskId,
                PersonnelID: personId,
                WorkDate: taskDate,
                WorkTime: parseInt(taskTime),
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


    const PersonnalList = () => {
        return (
        <ResourceContextProvider value="PMWorks/Personnel" >
            <List syncWithLocation basePath="/PMWorks/Personnel" bulkActionButtons={<PersonnelBulkActionButtons />} exporter={false} actions={false} >
            <Datagrid>
                <TextField textAlgin="right" source="id" />
            </Datagrid>
            </List>
        </ResourceContextProvider>
        );
    };

    const handleInputValue = (date) => {
        setTaskDate(date.format('YYYY-MM-DD'))
    };

    return (
        <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        >
            <React.Fragment>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <SimpleForm toolbar={false}>
                    <DateInput onChangeValue={handleInputValue} options={{ id: "DateInputEl001" }} isRequired={true} label={"تاریخ"} source={"WRDate"} />
                    <NumberInput isRequired={true} label={"تعداد"} source={"SparePartAmount"} value={taskTime} onChange={(e) => setTaskTime(e.target.value)} />
                </SimpleForm>
                <PersonnalList />
                </DialogContentText>
            </DialogContent>
            </React.Fragment>
        </Dialog>
    );
}
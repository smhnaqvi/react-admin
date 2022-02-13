import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Datagrid, TextField, List, useMutation, useNotify, Loading, CreateButton, NumberInput, SimpleForm, ResourceContextProvider } from "react-admin";
import { DateInput } from "./../JalaliDatePicker"
export default function ScrollDialog(props) {
  let { open, setOpen, taskSelectedIds } = props;

  const [personnalSelectedIds, setPersonnalIds] = React.useState();
  const [taskTime, setTaskTime] = React.useState(0);
  const [taskDate, setTaskDate] = React.useState();

  const handleClose = () => {
    setOpen(false);
  };


  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const [mutate, { loading }] = useMutation();
  const notify = useNotify();



  const handleSubmit = () => {

    //Check that the values are not empty
    if (taskTime === null || taskTime === undefined || taskTime === "") return
    if (taskDate === null || taskDate === undefined || taskDate === "") return
    if (taskSelectedIds === null || taskSelectedIds === undefined || taskSelectedIds.length === 0) return
    if (personnalSelectedIds === null || personnalSelectedIds === undefined || personnalSelectedIds.length === 0) return

    //send post request per array indexs  task*person
    taskSelectedIds.map(taskId => personnalSelectedIds.map(personId =>
      mutate({
        type: 'create',
        resource: 'PMWorks/WOPersonnel',
        payload: {
          data: {
            WOTaskID: taskId,
            PersonnelID: personId,
            WorkDate: taskDate,
            WorkTime: taskTime,
          }
        }
      })
    ))
    notify('Changes saved`', { undoable: true });
  };


  const PersonnelBulkActionButtons = props => {
    const { selectedIds } = props;
    setPersonnalIds(selectedIds)
    return (
      <React.Fragment>
        <CreateButton onClick={handleSubmit} label={"ثبت اطلاعات"} />
      </React.Fragment>
    )
  };


  const PersonnalList = () => {
    return (
      <ResourceContextProvider value="PMWorks/Personnel" >
        <List basePath="/PMWorks/Personnel" bulkActionButtons={<PersonnelBulkActionButtons />} exporter={false} >
          <Datagrid>
            <TextField source="id" />
          </Datagrid>
        </List>
      </ResourceContextProvider>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"md"}
    >
      {loading ? <Loading /> :
        <React.Fragment>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <SimpleForm toolbar={false}>
                <DateInput label={"تاریخ"} source={"WRDate"} value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
                <NumberInput label={"زمان"} source={"WRTime"} value={taskTime} onChange={(e) => setTaskTime(e.target.value)} />
              </SimpleForm>
              <PersonnalList />
            </DialogContentText>
          </DialogContent>
        </React.Fragment>
      }
    </Dialog>
  );
}
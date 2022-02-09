import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Datagrid, TextField, List, ResourceContextProvider, useMutation, useNotify, Loading } from "react-admin";
import { TextField as MuiTextField } from "@material-ui/core"
export default function ScrollDialog(props) {
  let { open, setOpen, taskSelectedIds } = props;


  let now = new Date();
  let time = now.getHours() + ":" + now.getMinutes()
  let date = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay()

  const [personnalSelectedIds, setPersonnalIds] = React.useState();
  const [taskTime, setTaskTime] = React.useState(time);
  const [taskDate, setTaskDate] = React.useState(date);

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
      <React.Fragment></React.Fragment>
    )
  };



  const PersonnalList = () => {
    return (
      <ResourceContextProvider value={"PMWorks/Personnel"}>
        <List basePath="PMWorks/Personnel" bulkActionButtons={<PersonnelBulkActionButtons />} >
          <Datagrid>
            <TextField source="id" />
            <TextField source="PersonnelCode" />
            {/* <TextField source="PersonnelName" /> */}
            {/* <TextField source="PersonnelFamily" /> */}
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
              <MuiTextField type={"date"} label="تاریخ" fullWidth value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
              <MuiTextField type={"time"} label="زمان" fullWidth value={taskTime} onChange={(e) => setTaskTime(e.target.value)} />
              <PersonnalList />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              انصراف
            </Button>
            <Button onClick={handleSubmit} color="primary">
              ثبت
            </Button>
          </DialogActions>
        </React.Fragment>
      }
    </Dialog>
  );
}



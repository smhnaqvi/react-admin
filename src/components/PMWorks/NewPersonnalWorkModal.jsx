import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import keyBy from "lodash/keyBy";
import { Datagrid, TextField, useQuery, Loading, ListContextProvider, useList } from "react-admin";

export default function ScrollDialog(props) {
  const [taskSelectedIds, setTaskIds] = React.useState(props.selectedIds);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(25);
  const [sort, setSort] = React.useState({ field: "id", order: "ASC" });

  const { data, total, loading, error } = useQuery({
    type: "getList",
    resource: "PMWorks/Personnel",
    payload: {
      pagination: { page, perPage },
      sort,
      filter: {}
    }
  });

  let { open, setOpen } = props;

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





  if (error) return <p>{error}</p>;
  if (data === undefined) return <p>undefined</p>;



  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {loading ? <Loading /> :
           <PersonnalList data={data}  />
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          انصراف
        </Button>
        <Button onClick={handleClose} color="primary">
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
}


const PersonnalList = ({data}) => {
  return (
      <Datagrid
        data={keyBy(data, 'id')}
        ids={data.map(({ id }) => id)}
        currentSort={{ field: 'id', order: 'ASC' }}
      >
        <TextField source="id" />
      </Datagrid>
  )
}

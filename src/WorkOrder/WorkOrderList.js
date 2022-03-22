import * as React from "react";
import {
    List,
    Datagrid,
    TopToolbar,
    ExportButton,
    Responsive,
    ShowButton,
    SimpleList,
    TextField
}
from 'react-admin';

import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    ex: {
        fontFamily: 'inherit',
    }
});

const WorkOrderList = props => (
    <List  {...props} >
        <Responsive
            small={
                <SimpleList linkType="show" primaryText={record => record.id} />
            }
            medium={
                <Datagrid>
                    <TextField textAlgin="right" source="id" />
                    <ShowButton />
                </Datagrid>
            }
         />
    </List>
);


export default WorkOrderList;

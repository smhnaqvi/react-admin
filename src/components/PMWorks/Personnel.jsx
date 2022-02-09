import React from "react"
import {List, Datagrid, TextField} from "react-admin"
const Personnel = (props) => {
    return <List {...props}>
        <Datagrid>
            <TextField source="id" />
        </Datagrid>
    </List>
}


export default Personnel
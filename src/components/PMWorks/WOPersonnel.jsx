import React from "react"
import { List, Datagrid, TextField } from "react-admin"
const WOPersonnel = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" label={"#"} textAlign={"right"} />
                <TextField source="WorkDate" label={"تاریخ انجام کار"} textAlign={"center"} />
                <TextField source="WorkTime" label={"زمان انجام کار"} textAlign={"center"} />
                <TextField source="PersonnelID" label={"شناسه کاربر"} textAlign={"center"} />
            </Datagrid>
        </List>
    )
}


export default WOPersonnel
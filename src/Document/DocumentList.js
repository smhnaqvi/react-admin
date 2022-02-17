import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    FileField,
    Responsive,
    ShowButton,
    SimpleList,
}
from 'react-admin';
import DocumentFilter from './DocumentFilter';

const DocumentList = props => (
    <List filters={<DocumentFilter />} {...props} title="فایل ها">
        <Responsive
            small={
                <SimpleList linkType="show" primaryText={record => record.DocumentCode} />
            }
            medium={
                <Datagrid>
                    <TextField label="کد فایل" textAlgin="right" source="DocumentCode" />
                    <TextField label="نام فایل" textAlgin="right" source="DocumentName" />
                    <FileField label="فایل" textAlgin="right" source="FileAddress" title="file" />
                    <ShowButton />
                </Datagrid>
            }
         />
    </List>
);


export default DocumentList;

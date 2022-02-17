import * as React from "react";
import {
    SimpleForm,
    TextInput,
    Create,
    FileInput,
    FileField
}
from 'react-admin';

const DocumentCreate = props => (
    <Create {...props} title="ایجاد سند">
        <SimpleForm>
            <TextInput label="کد سند" textAlgin="right" source="DocumentCode" />
            <TextInput label="نام سند" textAlgin="right" source="DocumentName" />
            <TextInput multiline label="توضیحات سند" textAlgin="right" source="DocumentDescription" />
            <FileInput source="FileAddress" label="فایل سند" accept="application/pdf" placeholder={<p>فایل خود را در اینجا بکشید و رها کنید</p>} >
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);


export default DocumentCreate;

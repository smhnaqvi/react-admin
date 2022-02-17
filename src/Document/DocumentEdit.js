import * as React from "react";
import {
    Edit,
    SimpleForm,
    FileInput,
    FileField,
    TextInput,
}
from 'react-admin';
import DocumentTitle from './DocumentTitle';
import RichTextInput from 'ra-input-rich-text';


const DocumentEdit = props => (
    <Edit title={<DocumentTitle />} {...props}>
        <SimpleForm>
            <TextInput label="کد سند" textAlgin="right" source="DocumentCode" />
            <TextInput label="نام سند" textAlgin="right" source="DocumentName" />
            <TextInput multiline label="توضیحات سند" textAlgin="right" source="DocumentDescription" />
            <FileInput source="FileAddress" label="فایل سند" placeholder={<p>فایل خود را در اینجا بکشید و رها کنید</p>} >
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Edit>
);


export default DocumentEdit;

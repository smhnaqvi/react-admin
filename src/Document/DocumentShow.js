import * as React from "react";

import {
    TextField,
    SimpleShowLayout,
    Show,
    FileField,
    RichTextField
}
from 'react-admin';
import DocumentTitle from './DocumentTitle';


const DocumentShow = (props) => (
    <Show title={<DocumentTitle />} {...props}>
        <SimpleShowLayout>
            <TextField label="کد فایل" textAlgin="right" source="DocumentCode" />
            <TextField label="نام فایل" textAlgin="right" source="DocumentName" />
            <RichTextField label="توضیحات سند" textAlgin="right" source="DocumentDescription" />
            <FileField source="FileAddress" src="url" title="desc" />
        </SimpleShowLayout>
    </Show>
);


export default DocumentShow;

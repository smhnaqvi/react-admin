import * as React from "react";
import {
    ReferenceInput,
    SelectInput,
    Filter,
    TextInput
}
from 'react-admin';

const DocumentFilter = (props) => (
    <Filter {...props}>
        <TextInput label="کد سند" textAlgin="right" source="DocumentCode" />
        <TextInput label="نام سند" textAlgin="right" source="DocumentName" />
    </Filter>
);


export default DocumentFilter;

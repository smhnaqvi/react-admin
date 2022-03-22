import * as React from "react";
import {
  SimpleForm,
  TextInput,
  Create,
  ImageInput,
  ImageField
}
  from "react-admin";

const DocumentCreate = props => {
  return (
    <Create {...props} title="ایجاد سند">
      <SimpleForm>
        <TextInput label="کد سند" textAlgin="right" source="DocumentCode" />
        <TextInput label="نام سند" textAlgin="right" source="DocumentName" />
        <TextInput multiline label="توضیحات سند" textAlgin="right" source="DocumentDescription" />
        <ImageInput source="FileAddress" label="فایل سند" accept="application/pdf"  placeholder={<p>فایل خود را در اینجا بکشید و رها کنید</p>}>
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>   
    </Create>
  );
};


export default DocumentCreate;

import * as React from "react";


const DocumentTitle = ({ record }) => {
    return <span> {record ? `"${record.DocumentName}"` : ''}</span>;
};

export default DocumentTitle;

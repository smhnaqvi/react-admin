import BookIcon from '@material-ui/icons/Book';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    Datagrid,
    List,
    TextField,
    ShowButton
} from 'react-admin';

export const PostIcon = BookIcon;

const useStyles = makeStyles(theme => ({
    title: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    hiddenOnSmallScreens: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    publishedAt: { fontStyle: 'italic' },
}));

const PostList = props => {
    const classes = useStyles();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="unit_code" />
                <TextField source="unit_name" />
                <ShowButton basePath="/units" label="نمایش" record={props} />
            </Datagrid>
        </List>
    );
};

export default PostList;

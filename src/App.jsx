import * as React from "react";
import { Admin, Resource, Layout } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import "./styles.css";

import { createTheme } from '@material-ui/core/styles';
import { jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';

import Posts from "./components/Posts"
import { TopMenu } from './components/Menu';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createTheme({
  direction: 'rtl',
});


const dataProvider = jsonServerProvider('http://localhost:7000')


export const CostomLayout = (props) => <Layout {...props} menu={TopMenu} />;

import farsiMessages from 'ra-language-farsi';
import polyglotI18nProvider from 'ra-i18n-polyglot';

const messages = {
    'fa': farsiMessages,
};

const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'fa');

export default function App() {
  return (
      <Admin theme={theme} dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <Resource name="units" {...Posts} />
      </Admin>
  );
}

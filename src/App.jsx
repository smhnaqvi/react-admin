import React from "react"
import { Admin, Resource, Layout } from 'react-admin';
import drfProvider, { fetchJsonWithAuthJWTToken, jwtTokenAuthProvider } from 'ra-data-django-rest-framework';
import "./styles.css";

import { createTheme } from '@material-ui/core/styles';
import { TopMenu } from './components/Menu';

//[page components]
// import WOPersonnel from "./components/PMWorks/WOPersonnel"
import WOTask from "./components/PMWorks/WOTask"

import farsiMessages from 'ra-language-farsi';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import WOPersonnel from "./components/PMWorks/WOPersonnel";


// Configure JSS
// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createTheme({
  direction: 'rtl',
});


// const dataProvider = jsonServerProvider('http://localhost:7000')


export const CostomLayout = (props) => <Layout {...props} menu={TopMenu} />;



const messages = {
  'fa': farsiMessages,
};

const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'fa');



// server data provider
const dataProvider = drfProvider("http://185.231.115.209:8080/", fetchJsonWithAuthJWTToken);
let authProvider = jwtTokenAuthProvider({ obtainAuthTokenUrl: "http://185.231.115.209:8080/PMWorks/token/" });

export default function App() {
  return (
    <Admin theme={theme} dataProvider={dataProvider} i18nProvider={i18nProvider} authProvider={authProvider}>
      <Resource name="PMWorks/WOTask" options={{ label: 'کارها' }} list={WOTask} />
      <Resource name="PMWorks/WOPersonnel" options={{ label: 'کارهای پرسنل' }} list={WOPersonnel} />
    </Admin>
  );
}

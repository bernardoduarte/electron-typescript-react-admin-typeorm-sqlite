import "reflect-metadata";

import { GlobalStyle } from './styles/GlobalStyle'

import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { Dashboard } from './components/Dashboard';
import { authProvider } from './providers/authProvider';
import { useEffect } from "react";

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

export const App = () => {

  useEffect(() => {
    window.Main.on('sqlite-reply', (arg: any) => {
      console.log(arg);
    });
    window.Main.sendMessage('sqlite-message');
  }, []);

  return (
    <>
      <GlobalStyle />
      <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} >
        <Resource name="users" list={ListGuesser} edit={EditGuesser} />
        <Resource name="posts" list={ListGuesser} edit={EditGuesser} />
      </Admin>
    </>
  );
};
import { GlobalStyle } from './styles/GlobalStyle'

import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { Dashboard } from './components/Dashboard';
import { authProvider } from './providers/authProvider';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

export const App = () => (
  <>
    <GlobalStyle />
    <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} >
      <Resource name="users" list={ListGuesser} edit={EditGuesser} />
      <Resource name="posts" list={ListGuesser} edit={EditGuesser} />
    </Admin>
  </>
);
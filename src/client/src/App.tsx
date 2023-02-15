import React, { Suspense } from 'react';
import './App.css';
import { NavigationBar } from './component/NavigationBar';
import { MainPageView } from './component/MainPageView';

import './i18n';

const App: React.FunctionComponent = () => {
  fetch('https://cherryservice.azurewebsites.net/testapi')
    .then(res => res.text())
    .then(res => {
      console.log('res', res);
    })
    .catch(err => err);

  return (
    <div className="App">
      <NavigationBar />
      <MainPageView />
    </div>
  );
};

export default function WrappedApp (): JSX.Element {
  return <Suspense fallback="... is loading">
    <App/>
  </Suspense>;
};

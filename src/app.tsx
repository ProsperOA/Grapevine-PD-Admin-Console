import * as React from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

// FIXME: add tslint rule for disabling unused import
import firebase from './firebase'; firebase
import Auth from './containers/auth/auth.container';
import Console from './containers/console/console.container';

class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route path="/" exact={true} component={Auth} />
        <Route path="/console" component={Console} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default App;

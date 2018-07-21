import * as React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router-dom';

import Auth from './containers/auth/auth.container';

class App extends React.Component<RouteComponentProps<{}>, {}> {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route path="/" exact={true} component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default withRouter(App);

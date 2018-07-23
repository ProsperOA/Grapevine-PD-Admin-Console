import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  Button,
  Form,
  Icon,
  Input,
  notification
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import * as actions from '../../store/actions';
import { AppState } from '../../store/reducers';
import authTokenService from '../../shared/services/auth-token.service';
import axios from '../../shared/axios';

interface AuthProps extends FormComponentProps, RouteComponentProps<{}> {
  isAuth: boolean;
  error: string;
  login: (email: string, password: string) => Dispatch<actions.AuthAction>;
  loginWithToken: (userID: string) => Dispatch<actions.AuthAction>;
}

const FormItem = Form.Item;

class Auth extends React.Component<AuthProps, {}> {
  public componentWillMount(): void {
    const authToken = authTokenService.retrieve();
    if (authToken) {
      const [userID, token] = authToken.split('-');
      axios.defaults.headers = {Authorization: 'Bearer ' + token};

      this.props.loginWithToken(userID);
    }
  }

  public componentWillReceiveProps(nextProps: AuthProps): void {
    const { error } = nextProps;
    if (error && error !== this.props.error) {
      notification.error({
        message: 'An error occurred',
        description: error,
        duration: 2
      });
    }
  }

  public componentDidUpdate(): void {
    if (this.props.isAuth) this.props.history.replace('/dashboard');
  }

  public handleSubmit = (e: any): void => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) return;

      const { email, password } = values;

      this.props.login(email, password);
    });
  };

  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{ width: '35%', transform: 'translate(50%, 50%)', position: 'absolute', bottom: '60%', right: '50%' }}>
        <h1 style={{textAlign: 'center'}}>Grapevine PD Admin Console</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'invalid email' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'password required' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateTopProps = ({ auth }: AppState) => ({
  isAuth: auth.isAuth,
  error: auth.error
});

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthAction>) => ({
  login: (email: string, password: string) => dispatch(actions.login(email, password)),
  loginWithToken: (userID: string) => dispatch(actions.loginWithToken(userID))
});

export default connect(mapStateTopProps, mapDispatchToProps)(Form.create()(Auth));
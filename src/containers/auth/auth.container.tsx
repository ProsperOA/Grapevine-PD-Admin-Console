import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
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

interface AuthProps extends FormComponentProps {
  error: string;
  login: (email: string, password: string) => Dispatch<actions.AuthAction>
}

const FormItem = Form.Item;

class Auth extends React.Component<AuthProps, {}> {
  public componentWillReceiveProps(nextProps: AuthProps): void {
    const { error } = nextProps;
    if (error) {
      notification.error({
        message: 'An error occurred',
        description: error,
        duration: 2
      });
    }
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

const mapStateTopProps = ({ auth }: AppState) => ({ error: auth.error });

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthAction>) => ({
  login: (email: string, password: string) => dispatch(actions.login(email, password))
});

export default connect(mapStateTopProps, mapDispatchToProps)(Form.create()(Auth));
import * as React from 'react';
import {
  Button,
  Form,
  Icon,
  Input
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

const FormItem = Form.Item;

class Auth extends React.Component<FormComponentProps, {}> {
  public handleSubmit = (e: any) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
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

export default Form.create()(Auth);
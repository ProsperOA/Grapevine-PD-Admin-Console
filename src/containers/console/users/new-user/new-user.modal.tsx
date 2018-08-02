import * as React from 'react';
import { Modal } from 'antd';
import {
  Form,
  Input,
  Slider,
  Switch
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

interface AddNewUserModalProps extends FormComponentProps {
  visible: boolean;
  closed: (newUserModalOpen: boolean) => void;
  create: () => void;
}

class AddNewUserModal extends React.Component<AddNewUserModalProps, {}> {
  public formRef: any;
  public nameInputRules = {
    required: true,
    message: 'required',
    whitespace: false,
    max: 20
  };

  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Add New User"
        visible={this.props.visible}
        okText="Create"
        onOk={this.props.create}
        onCancel={() => this.props.closed(false)}>
        <Form ref={ref => this.formRef = ref}>
          <Form.Item label="First Name" colon={false}>
            {getFieldDecorator('firstName', { rules: [this.nameInputRules] })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Last Name" colon={false}>
            {getFieldDecorator('lastName', { rules: [this.nameInputRules] })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Email" colon={false}>
            {getFieldDecorator('email', {
              rules: [
                { type: 'email', message: 'enter a valid email' },
                { required: true, message: 'required' }
              ],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label="Password Length"
            colon={false}
            help="The length of the random password to be assigned to new user"
          >
            {getFieldDecorator('passwordLength', {
              initialValue: 8
            })(
              <Slider min={6} max={50} />
            )}
          </Form.Item>
          <Form.Item label="Email credentials to user?" colon={false}>
            {getFieldDecorator('emailCredentials', { valuePropName: 'checked' })(
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(AddNewUserModal);

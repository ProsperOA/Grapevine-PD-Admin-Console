import * as React from 'react';
import { Modal } from 'antd';
import {
  Form,
  Input,
  Slider
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

interface AddNewUserModalProps extends FormComponentProps {
  visible: boolean;
  closed: (newUserModalOpen: boolean) => void;
  create: () => void;
}

class AddNewUserModal extends React.Component<AddNewUserModalProps, {}> {
  public formRef: any;

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
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [{required: true, message: 'enter a valid email'}],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="Random Password Length">
              {getFieldDecorator('passwordLength', {
                initialValue: 8
              })(
                <Slider min={6} max={50} />
              )}
            </Form.Item>
          </Form>
      </Modal>
    )
  }
}

export default Form.create()(AddNewUserModal);

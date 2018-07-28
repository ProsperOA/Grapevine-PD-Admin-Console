import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Col,
  notification,
  Row
} from 'antd';

import firebase from '../../../firebase';
import AddNewUserModal from './new-user/new-user.modal';
import { randStr } from '../../../shared/utils';

class Users extends React.Component<any, any> {
  public state = {
    newUserModalOpen: false
  };
  public addNewUserFormRef: any;

  public toggleNewUserModal = (newUserModalOpen: boolean): void => {
    this.setState({ newUserModalOpen });
  };

  public onCreateNewUser = (): void => {
    const form = this.addNewUserFormRef.props.form;
    form.validateFields((err: any, values: any) => {
      if (err) return;

      form.resetFields();
      this.setState({ newUserModalOpen: false });

      const { email, passwordLength } = values;
      const password = randStr(passwordLength);

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          /* tslint:disable:no-string-literal */
          notification['success']({
            message: 'User Account Created',
            description: `A user account has been successfully created with email
              address: ${email}`,
            duration: 2.5
          });
          /* tslint:enable:no-string-literal */
        })
        .catch(({ message }: firebase.FirebaseError) => {
          /* tslint:disable:no-string-literal */
          notification['error']({
            message: 'Account Creation Failed',
            description: message,
            duration: 2.5
          });
          /* tslint:enable:no-string-literal */
        });
    });
  };

  public render(): JSX.Element {
    return (
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            style={{float: 'right'}}
            onClick={() => this.toggleNewUserModal(true)}>
            Add New User
          </Button>
        </Col>
        <AddNewUserModal
          wrappedComponentRef={(ref: any) => this.addNewUserFormRef = ref}
          visible={this.state.newUserModalOpen}
          closed={this.toggleNewUserModal}
          create={this.onCreateNewUser} />
      </Row>
    );
  }
}

export default connect()(Users);
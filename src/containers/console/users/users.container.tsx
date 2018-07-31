import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Col,
  notification,
  Row,
} from 'antd';

import * as actions from '../../../store/actions';
import firebase from '../../../firebase';
import AddNewUserModal from './new-user/new-user.modal';
import UsersTable from './users-table-component';
import { AppState } from '../../../store/reducers';
import { Dispatch } from '../../../../node_modules/redux';
import { randStr } from '../../../shared/utils';

interface UsersProps {
  users: any[];
  loading: boolean;
  error: string;
  getUsers: (pageSize?: number, pageIndex?: number) => (
    Dispatch<actions.IGetUsersSuccess | actions.IGetUsersFailed>
  );
}

interface UsersState {
  newUserModalOpen: boolean;
}

class Users extends React.Component<UsersProps, UsersState> {
  public state: Readonly<UsersState> = {
    newUserModalOpen: false
  };
  public addNewUserFormRef: any;

  public componentWillReceiveProps(nextProps: UsersProps): void {
    const { error } = nextProps;
    if (error && error !== this.props.error) {
      notification.error({
        message: 'An error occurred',
        description: error,
        duration: 2
      });
    }
  }

  public componentDidMount(): void {
    this.props.getUsers();
  }

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

  public onDeleteUser = (user: any): void => {
    console.log('deleting', user);
  };

  public render(): JSX.Element {
    const { users } = this.props;

    return (
      <div>
        <Row style={{marginBottom: 25}}>
          <Col span={24}>
            <Button
              type="primary"
              style={{ float: 'left' }}
              onClick={() => this.toggleNewUserModal(true)}>
              Add New User
          </Button>
            <Button
              style={{ float: 'right' }}>
              Reload
          </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {users &&
              <UsersTable
                users={users}
                deleteUser={this.onDeleteUser}
                loading={this.props.loading} />}
          </Col>
        </Row>
        <AddNewUserModal
          wrappedComponentRef={(ref: any) => this.addNewUserFormRef = ref}
          visible={this.state.newUserModalOpen}
          closed={this.toggleNewUserModal}
          create={this.onCreateNewUser} />
      </div>
    );
  }
}

const mapStateToProps = ({ users }: AppState) => ({ ...users });

const mapDispatchToProps = (dispatch: Dispatch<actions.IGetUsersSuccess | actions.IGetUsersFailed>) => ({
  getUsers: (pageSize?: number, pageIndex?: number) => (
    dispatch(actions.getUsers(pageSize, pageIndex))
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
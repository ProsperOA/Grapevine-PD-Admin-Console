import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Col,
  notification,
  Row,
} from 'antd';

import * as actions from '../../../store/actions';
import AddNewUserModal from './new-user/new-user.modal';
import UsersTable from './users-table-component';
import { AppState } from '../../../store/reducers';
import { Dispatch } from '../../../../node_modules/redux';
import { randStr } from '../../../shared/utils';

interface UsersProps {
  currentUser: any;
  users: any[];
  loading: boolean;
  error: string;
  createUser: (user: any) => Dispatch<actions.UsersAction>;
  getUsers: (pageSize?: number, pageIndex?: number) => Dispatch<actions.UsersAction>;
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

      const { currentUser } = this.props;
      const { firstName, lastName, email, passwordLength } = values;

      const password = randStr(passwordLength);
      const user = {
        firstName,
        lastName,
        email,
        password,
        createdBy: `${currentUser.first_name} ${currentUser.last_name}`
      };

      this.props.createUser(user);
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

const mapStateToProps = ({ users, auth }: AppState) => ({
  currentUser: auth.user,
  ...users
});

const mapDispatchToProps = (dispatch: Dispatch<actions.UsersAction>) => ({
  createUser: (user: any) => dispatch(actions.createUser(user)),
  getUsers: (pageSize?: number, pageIndex?: number) => (
    dispatch(actions.getUsers(pageSize, pageIndex))
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
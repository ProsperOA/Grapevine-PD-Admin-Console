import * as React from 'react';
import * as _ from 'lodash';
import {
  Popconfirm,
  Table
} from 'antd';

interface UsersTableProps {
  users: any[];
  loading: boolean;
  deleteUser: (email: string) => void;
}

export default (props: UsersTableProps): JSX.Element => {
  const { users } = props;

  const tableColumns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy'
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn'
    },
    {
      title: 'Action',
      key: 'action',
      render: ({ email }: any) => {
        const index = _.findIndex(users, u => u.email === email);
        const user = users[index];

        return (
          <span>
            <Popconfirm
              title={`Are you sure you want to delete ${user.first_name} ${user.last_name}?`}
              onConfirm={() => props.deleteUser(user)}
              okText="Yes"
              cancelText="No">
              <a>Delete</a>
            </Popconfirm>
          </span>
        );
      },
    }
  ];

  const tableData = users.map((user: any, index: number) => ({
    key: index,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    createdBy: user.created_by,
    createdOn: new Date(user.created_on).toDateString()
  }));

  return (
    <Table
      columns={tableColumns}
      dataSource={tableData}
      loading={props.loading} />
  );
};
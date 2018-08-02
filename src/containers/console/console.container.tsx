import * as React from 'react';
import { Menu, Icon, Layout } from 'antd';
import {
  BrowserRouter,
  Link,
  Route
} from 'react-router-dom';

import Users from './users/users.container';
import Dashboard from './dashboard/dashboard.container';
import Footer from '../../components/footer.component';

const { Header, Content } = Layout;

interface AppLayoutState {
  sidebarCollapsed: boolean;
}

class Console extends React.Component<{}, AppLayoutState> {
  public state: Readonly<AppLayoutState> = {
    sidebarCollapsed: false
  };

  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Sider
            collapsible={true}
            collapsed={this.state.sidebarCollapsed}
            onCollapse={() => this.setState({ sidebarCollapsed: !this.state.sidebarCollapsed })}>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Link to="/console/dashboard">
                  <Icon type="pie-chart" />
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/console/users">
                  <Icon type="team" />
                  <span>Users</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <div style={{ padding: 24, minHeight: 360 }}>
                <Route path="/console/dashboard" component={Dashboard} />
                <Route path="/console/users" component={Users} />
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Console;
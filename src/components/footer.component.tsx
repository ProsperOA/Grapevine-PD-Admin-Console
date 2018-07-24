import * as React from 'react';
import { Layout } from 'antd';

export default (): JSX.Element => (
  <Layout.Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>
    Grapevine PD © {new Date().getFullYear()}
  </Layout.Footer>
);
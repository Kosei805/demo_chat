import React,{ useState } from 'react';
import { Layout } from 'antd';
import SideMenu from './SideMenu';
import MainContents from './MainContents';


function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <SideMenu
        collapsed={collapsed}
      />
      <MainContents
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
    </Layout>
  );
}

export default App;

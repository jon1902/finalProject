import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import ProLayout, {ProSettings} from '@ant-design/pro-layout';
import {HomeOutlined} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from 'antd';
import { useUserContext } from "../../contexts/userContext";



export const DefaultHeader = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(
      localStorage.getItem('theme') === 'dark',
    );

    const [settings] = useState<Partial<ProSettings> | undefined>({
      layout: 'mix',
      contentWidth: 'Fixed',
      fixedHeader: true,
      fixSiderbar: true,
      menu: {
          locale: true,
      },
      title: 'MANAGER IMMO',
      iconfontUrl: '',
      colorPrimary: '#1890ff',
      footerRender: false,
      splitMenus: false,
  });

  const route = {
    path: '/',
    routes: [
        {
            path: '/',
            name: 'Home',
            icon: <HomeOutlined />,
        }
    ]
  }

  const { onLogout } = useUserContext();

  const onChangeTheme = (): void => {
    setIsDarkMode(!isDarkMode);

    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  return <ProLayout
    logo={false}
    route={route}
    fixSiderbar
    menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
    rightContentRender={() => 
    <>
      <Button type={"primary"} danger onClick={onLogout} style={{ marginRight: '8px' }}>Logout</Button>
      <Button onClick={onChangeTheme}>
        Change Theme to {isDarkMode ? "Light" : "Dark"}
      </Button>
    </>
    }
    navTheme={isDarkMode ? 'realDark' : 'light'}
    {...settings}
  >
    {children}
  </ProLayout>
};

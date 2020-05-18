import React from 'react'
import { Layout, Dropdown, Menu } from 'antd'
import { DownOutlined, UserSwitchOutlined } from '@ant-design/icons'

import './index.less'
import LOGO from "@/assets/image/logo.png"

interface IRoute {
  name: string
  path: string
  component?: any
  children?: Array<IRoute>
}

const { Header } = Layout
const { Item } = Menu

// 路由分层级
export default () => {
  const handleExit = () => {
    console.log('退出登录')
  }

  const menuContent = (
    <Menu>
      <Item>
        <a onClick={handleExit}>退出登录</a>
      </Item>
    </Menu>
  )

  return (
    <Header className="header">
      <div className="company">
        <i className="company__logo" style={{ backgroundImage: `url(${LOGO})` }} />
        <span className="company__title">学习小报</span>
      </div>

      <div className="user">
        <UserSwitchOutlined />
        <Dropdown overlay={menuContent}>
          <span className="user__name">赵伟</span>
        </Dropdown>
        <DownOutlined />
      </div>
    </Header>
  )
}

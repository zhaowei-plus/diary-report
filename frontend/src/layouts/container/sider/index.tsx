import React, { useMemo } from 'react'
import { Layout, Menu } from 'antd'
import { useLocation, useHistory } from 'react-router'

import routes from '@/routes'

const { Sider } = Layout
const { SubMenu } = Menu

interface IProps {
  children?: React.ReactNode
  history?: any
  location?: any
}

interface IRoute {
  key?: number
  title?: string
  path?: string
  children?: Array<IRoute>
}

interface IResponse {
  success: boolean
  data: Array<IRoute>
}

export default (props: IProps) => {
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location

  // 选择的菜单项发生改变
  const paths = useMemo(
    () =>
      pathname
        .split('/')
        .filter(Boolean)
        .map(
          (d: any, index: number, arr: any) =>
            `/${arr.slice(0, index + 1).join('/')}`
        ),
    [pathname]
  )

  const handleClick = ({ key }) => {
    if (key !== pathname) {
      history.push(key)
    }
  }

  const renderRoutes = (routes: Array<any>) =>
    routes.map(({ name, path, children = [] }) => {
      if (Array.isArray(children) && children.length > 0) {
        return (
          <SubMenu key={path} title={name}>
            {renderRoutes(children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={path}>{name}</Menu.Item>
    })

  const defaultOpenKeys = routes
    .filter(it => Array.isArray(it.children) && it.children.length > 0)
    .map(d => d.path)

  return (
    <Sider style={{ backgroundColor: '#fff' }}>
      {routes.length > 0 && (
        <Menu
          mode="inline"
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={paths}
          onClick={handleClick}
        >
          {renderRoutes(routes)}
        </Menu>
      )}
    </Sider>
  )
}

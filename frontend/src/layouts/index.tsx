import React from 'react'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import { IRouteComponentProps } from 'umi'
import zhCN from 'antd/es/locale/zh_CN'

// 全局loading配置
import store from '@/store'
import Container from './container'

// 根据后端配置渲染路由信息
export default (props: IRouteComponentProps) => {
  const { history, location } = props
  if (location.pathname === '/login') {
    return props.children
  }

  if (location.pathname === '/') {
    history.push('/home')
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Container>{props.children}</Container>
      </Provider>
    </ConfigProvider>
  )
}

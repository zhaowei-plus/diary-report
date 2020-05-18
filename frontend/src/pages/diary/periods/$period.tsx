import React, { useEffect, useState } from 'react'
import { List, Avatar, PageHeader } from 'antd';
import { useParams } from 'umi';
import request from 'axios';

import { Layout } from '@/components'

import './index.less'

const { Content } = Layout;

interface IItem {
  _id: string
  title: string
  desc: string
  url: string
}

export default (props: any) => {
  const { history, match } = props
  const { period } = match.params
  const [dataSource, setDataSource] = useState([])

  const fetchInfo = (period: number) => {
    request.get('/api/diary/getByWeek', {
      params: {
        period,
      }
    }).then((res: any) => {
      setDataSource(res.data.data)
    })
  }

  useEffect(() => {
    fetchInfo(period)
  }, [])

  return (
    <Layout>
      <PageHeader
        title={`第${period}期小报`}
        subTitle={`共${dataSource.length}篇精选文章`}
        onBack={history.goBack}
      />
      <Content wrapperClassName="periods">
        <List
          itemLayout="horizontal"
          dataSource={dataSource}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href={item.url} target="_blank">{item.title}</a>}
                description={item.desc}
              />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  )
}

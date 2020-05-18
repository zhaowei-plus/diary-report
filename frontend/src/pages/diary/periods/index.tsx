import React, { useEffect, useState, useMemo } from 'react'
import { Card, Button, PageHeader, Space } from 'antd';
import Link from 'umi/link';
import request from 'axios';

import { Layout } from '@/components'
import { useVisible } from '@/hooks'
import AddArticleModal from './components/add-article-modal'

import './index.less'

const { Meta } = Card
const { Content } = Layout

interface IItem {
  _id: string
  title: string
  desc: string
  url: string
}

export default () => {
  const addArticleModal = useVisible();
  const [dataSource, setDataSource] = useState([])

  const fetchPeriods = () => {
    request.get('/api/diary/getByWeeks').then((res: any) => {
      setDataSource(res.data.data)
    })
  }

  useEffect(() => {
    fetchPeriods()
  }, [])

  const newPeriod = useMemo(() => {
    if (dataSource.length > 0) {
      return dataSource[dataSource.length - 1].period
    }
  }, [dataSource])

  return (
    <Layout>
      <PageHeader
        title="前端小报"
        subTitle={`已经更新到第${newPeriod}期啦，欢迎提交分享精选文章，共同学习与进步`}
        extra={(<Button onClick={addArticleModal.open}>新增分享</Button>)}
      />
      <Content wrapperClassName="periods">
        <Space>
          {
            dataSource.map((item: any) => (
              <Link
                to={`/diary/periods/${item.period}`}
                key={item.period}
              >
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt={`第${item.period}期`}
                      src="http://y0.ifengimg.com/a/2015_48/50c550c4904856c.jpg"
                    />
                  }
                >
                  <Meta title={`第${item.period}期`} description={`小报第${item.period}期，一共收录${item.article}篇精选文章`} />
                </Card>
              </Link>
            ))
          }
        </Space>
        {
          addArticleModal.visible && (
            <AddArticleModal
              onCancel={addArticleModal.close}
              onOk={() => {
                fetchPeriods()
                addArticleModal.close()
              }}
            />
          )
        }
      </Content>
    </Layout>
  )
}

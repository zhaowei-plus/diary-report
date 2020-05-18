import React, { useMemo, useState } from 'react'
import { Modal, Button, message } from 'antd'
import request from 'axios'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  createFormActions,
} from '@formily/antd'

interface IProps {
  onCancel: () => void
  onOk: () => void
}

export default (props: IProps) => {
  const { onOk, onCancel } = props

  const onSubmit = (params: any) => {
    console.log('params:', params)
    request.post('/api/diary/add', params).then((res: any) => {
      const result = res.data
      if (result.success) {
        message.success('提交成功')
        onOk()
      } else {
        message.error('提交失敗')
      }
    })
  }

  const actions = useMemo(() => createFormActions(), [])

  return (
    <Modal
      visible
      centered
      title="我的分享"
      footer={null}
      onCancel={onCancel}
    >
      <SchemaForm
        labelCol={7}
        wrapperCol={12}
        actions={actions}
        onSubmit={onSubmit}
        defaultValue={{
          userId: '5ebe007791d1e921cc25916c',
        }}
      >
        <Field
          type="string"
          title="URL"
          name="url"
          x-props={{
            placeholder: '请输入链接'
          }}
        />
        <Field
          type="string"
          title="标题"
          name="title"
          x-props={{
            placeholder: '请输入标题'
          }}
        />
        <Field
          type="string"
          title="分类"
          name="category"
          enum={[
            { label: 'html', value: 1 },
            { label: 'css', value: 2 },
            { label: 'js', value: 3 },
            { label: 'react', value: 4 },
            { label: 'vue', value: 5 },
            { label: 'angular', value: 6 },
            { label: 'egg', value: 7 },
            { label: 'webpack', value: 8 },
            { label: 'Umi', value: 9 },
            { label: 'nodejs', value: 10 },
            { label: 'deno', value: 11 },
          ]}
          x-props={{
            placeholder: '请选择分类'
          }}
        />
        <Field
          type="textarea"
          title="描述"
          name="desc"
          x-props={{
            placeholder: '请输入描述',
            autoSize: {
              minRows: 4,
            },
          }}
        />
        <FormButtonGroup align="right">
          <Submit>提交</Submit>
          <Button onClick={onCancel}>取消</Button>
        </FormButtonGroup>
      </SchemaForm>
    </Modal>
  )
}

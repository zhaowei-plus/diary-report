/************************全局状态定义*****************************/
export const STATUS = [
  { label: '停用', value: 0 },
  { label: '启用', value: 1 },
]

/************************全局类型定义*****************************/
export interface IStore {
  loading: boolean
}
// 通用response 返回类型
export interface IResponse {
  code: number
  success: boolean
  data?: object
  msg?: string
}

// 页面Search返回的搜索栏配置项
export interface IParams {
  flag: number
  name: string
  type: number
  key: string
  mapValue?: object
}

export interface ISearchResponse {
  success: boolean
  data: Array<IParams>
}

// 表单注册类型
export interface IField {
  value: string
  mutators: {
    change: (params: any) => void
  }
  editable?: boolean
}

export interface IForm {
  value: string
  disabled?: boolean
  placeholder: string
  onChange: (params: any) => void
  [key: string]: any
}

// 表单提交类型
export interface ISubmit {
  [key: string]: any
}

// 枚举配置
export interface IItem {
  label?: string
  value?: number | string
  [key: string]: string | number
}

// 列表搜索时的参数项
export interface ITableParams {
  key: string
  value: number | string
}

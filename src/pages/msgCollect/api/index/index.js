import axios from '@/util/axios'

// 发送验证验 // 后端黄伟雄
const sendCodeApi = (obj) => axios('post', '/subCustomerApp/sendVerificationCodeToUser', obj)

// 提交 // 后端黄伟雄
const submitApi = (obj) => axios('post', '/subCustomerApp/subCustomerRegister', obj)

// 查询 // 后端黄伟雄
const searchApi = (obj) => axios('post', '/subCustomerApp/subCustomerAddressInfo', obj)

// 新增地址 // 后端黄伟雄
const addAddressApi = (obj) => axios('post', '/subCustomerApp/subCustomerAddressInsert', obj)

export { sendCodeApi, submitApi, searchApi, addAddressApi }

import axios from '@/util/axios'

// 发送验证验
const sendCodeApi = (obj) => axios('post', '/subCustomerApp/sendVerificationCodeToUser', obj)

// 提交
const submitApi = (obj) => axios('post', '/subCustomerApp/subCustomerRegister', obj)

// 查询
const searchApi = (obj) => axios('post', '/subCustomerApp/subCustomerAddressInfo', obj)

// 新增地址
const addAddressApi = (obj) => axios('post', '/subCustomerApp/subCustomerAddressInsert', obj)

export { sendCodeApi, submitApi, searchApi, addAddressApi }

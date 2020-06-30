import axios from '@/util/axios'

// 获取省市区
const getAddressList = (obj) => axios('post', '/subCustomerApp/selectCityInfo', obj)

export {
	getAddressList
}
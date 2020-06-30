<template>
	<div class="msg-detail">
        <template v-if="!isAdd">
            <van-panel title="供应商信息" desc="" status="">
                <template #header>
                    <div class="register">
                        <van-button class="register-btn" size="mini" @click="registerFun">去注册</van-button>
                    </div>
                    <van-field
                            v-model="formData.phone"
                            type="tel"
                            label="手机号码"
                            placeholder="手机号码"
                            :rules="[{ required: true, message: '请填写手机号码' }]"
                        />
                    <van-field
                        v-model="sms"
                        center
                        clearable
                        label="短信验证码"
                        placeholder="请输入短信验证码"
                        >
                        <template slot="button">
                            <van-button class="send-code" size="small" type="primary" native-type="button" @click="sendCodeFun">{{msgText}}</van-button>
                        </template>
                    </van-field>
                    <van-button class="search-btn" round size="large" type="primary" :loading="isLoading" @click="searchFun">查询</van-button>
                </template>
                <template v-if="searched">
                    <template v-if="detailMsg.length > 0">
                        <van-cell-group v-for="(item, key) in detailMsg" :key="key">
                            <van-cell title="供应商名称" :value="item.company" />
                            <van-cell title="供应商编码" :value="item.subCustomerNo">
                                <template #extra>
                                    <van-button size="mini" type="primary" v-clipboard:copy="item.subCustomerNo" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                        复制
                                    </van-button>
                                </template>
                            </van-cell>
                            <van-cell title="联系人" :value="item.contractName" />
                            <van-cell title="手机号码" :value="item.phone" />
                            <van-cell-group class="time-address" v-for="(value, index) in item.addressList" :key="index">
                                <van-cell title="高峰时间段" :value="`${value.startTime}点-${value.endTime}点`" />
                                <van-cell title="地址" :value="`${value.province}${value.city}${value.district}${value.address}`" />
                            </van-cell-group>
                            <div class="address-part" v-if="searched">
                                <van-button size="small" class="btn" @click="showAdd(item.subCustomerNo)">添加地址</van-button>
                            </div>
                            <van-divider v-if="key != detailMsg.length -1" dashed class="dashed-divider"></van-divider>
                        </van-cell-group>
                    </template>
                    <template v-else>
                        <van-empty image="error" description="暂无数据" />
                    </template>
                </template>
            </van-panel>
        </template>
        <template v-else>
            <time-address @onConfirmTime="onConfirmTime" @onConfirmProvince="onConfirmProvince" @onBlurAddress="onBlurAddress" />
            <van-button class="submit-address" type="primary" size="large" round :loading="isLoading" @click="submitFun">提交</van-button>
            <van-button class="cancel-btn" type="primary" size="large" round @click="cancelAdd">取消</van-button>
        </template>
	</div>
</template>
<script>
import * as fetchData from '../../api/index'
import Vue from 'vue'
import '@/util/lib';
import md5 from 'js-md5';
import VueClipboard from 'vue-clipboard2'
import { Panel, Field, Button, CellGroup, Cell, Divider, Empty, Toast } from 'vant';
import TimeAddress from '../../../../components/timeAddress'
Vue.use(Panel)
    .use(Field)
    .use(Button)
    .use(CellGroup)
    .use(Cell)
    .use(Divider)
    .use(Empty)
    .use(VueClipboard)
    .use(Toast)
let phoneReg = /^1\d{10}$/
export default {
    components: {
        TimeAddress
    },
	data() {
		return {
            searched: false, // 查询结果
            isAdd: false, // 新增地址
			isLoading: false,
            msgText: '发送验证码',
            msgLoading: false,
            sms: '',
            validateSms: '', // 存后端返回的验证码，提交时进行校验验证码
			formData: {
				phone: '' // 联系方式
            },
            detailMsg: [],
            addressList: [],
            monthCardNo: '', // 月结卡号
            subCustomerNo: '' // 供应商编码
		}
	},
    mounted() {
        if (location.search) {
            let searchData = location.search.split('?')[1].split('&')
            this.monthCardNo = searchData.filter((val) => {
                console.log(val)
                return val.indexOf('monthCardNo') != -1
            })[0].split('=')[1] // 月结卡号
        }
    },
	methods: {
        onCopy(e) {
            console.log(e)
        },
        onError() {
            console.log('复制失败')
        },
        sendCodeFun() {
            if (this.msgLoading) {
                return
            }
            if (!this.formData.phone) {
                Toast('手机号码为空')
                return
            }
            if (!phoneReg.test(this.formData.phone)) {
                Toast('请正确输入手机号码')
                return
            }
            this.msgLoading = true
            fetchData.sendCodeApi(this.getSendParam()).then((res) => {
                if (res.status) {
                    this.validateSms = res.data.resCode
                    let count = 60
                    let timer
                    clearInterval(timer)
                    timer = setInterval(() => {
                        this.msgText = `${count}s后发送`
                        count--
                        if (count <= 0) {
                            clearInterval(timer)
                            this.msgText = '发送验证码'
                            this.msgLoading = false
                        }
                    }, 1000);
                } else {
                    this.msgLoading = false
                    Toast(res.message)
                }
            }).catch(() => {
                this.msgLoading = false
            })
        },
        registerFun() {
            window.location.href = `/msgCollect/module/index/index.html?monthCardNo=${this.monthCardNo}`
        },
        getSendParam() {
            let params = {}
            params.signType = 'MD5'
            params.timestamp = new Date().getTime()
            params.phone = this.formData.phone
            params.sign = md5(params.timestamp.toString() + this.formData.phone.toString()) // timestamp+phone拼接进行MD5加密
            return params
        },
        searchFun() {
            if (!this.formData.phone) {
                Toast('手机号码为空')
                return
            }
            if (!phoneReg.test(this.formData.phone)) {
                Toast('请正确输入手机号码')
                return
            }
            if (!this.sms) {
                Toast('验证码为空')
                return
            }
            if (this.sms != this.validateSms) {
                Toast('验证码有误,请重新获取验证码')
                return
            }
            this.isLoading = true
            fetchData.searchApi(this.getSendParam()).then((res) => {
                if (res.status) {
                    this.searched = true
                    this.detailMsg = res.data
                } else {
                    Toast(res.message)
                }
                this.isLoading = false
            }).catch(() => {
                this.isLoading = false
            })
        },
        cancelAdd() {
            this.isAdd = false
        },
        onConfirmTime(val) {
            this.addressList = val
        },
        onConfirmProvince(val) {
            this.addressList = val
        },
        onBlurAddress(val) {
            this.addressList = val
        },
        submitFun() {
            if (this.addressList.length < 1) {
                Toast('至少填写一条地址信息')
                return
            }
            let flag = true
            this.addressList.map((item) => {
                Object.values(item).map((val) => {
                    if (!val) {
                        flag = false
                    }
                    return val
                })
                return item
            })
            if (!flag) {
                Toast('请正确填写地址信息')
                return
            }
            let param = {}
            param.monthCardNo = this.monthCardNo
            param.subCustomerNo = this.subCustomerNo
            let timestamp = new Date().getTime()
            let sign = md5(timestamp.toString()) // timestamp+phone拼接进行MD5加密
            let sendAddressObj = JSON.parse(JSON.stringify(this.addressList))
            sendAddressObj.map((item) => { // 将高峰时段转为int类型传值
                Object.keys(item).map((index) => {
                    if (index === 'startTime' || index === 'endTime') {
                        item[index] = parseInt(item[index])
                    }
                    return index
                })
                return item
            })
            param.data = sendAddressObj

            param.signType = 'MD5'
            param.timestamp = timestamp
            param.sign = sign
            this.isLoading = true
			fetchData.addAddressApi(param).then((res) => {
                if (res.status) {
                    this.isAdd = false
                    this.searchFun()
                    // window.location.href = `/msgCollect/module/successPage/index.html?subCustomerNo=${res.data.subCustomerNo}`
                } else {
                    Toast(res.message)
                }
                this.isLoading = false
			}).catch(() => {
                this.isLoading = false
            })
		},
        showAdd(subCustomerNo) {
            this.subCustomerNo = subCustomerNo
            this.isAdd = true
        }
	}
}
</script>
<style lang="sass">
	@import "./index.scss"
</style>

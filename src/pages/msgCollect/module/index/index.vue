<template>
	<div class="msg-collect">
		<div class="msg-collect-title">供应商编码注册</div>
		<div>
			<div>
                <van-form>
                    <van-field
                        label-width="90px"
                        v-model="formData.company"
                        label="公司名称"
                        placeholder="公司名称"
                    />
                    <van-field
                        label-width="90px"
                        v-model="formData.contractName"
                        label="联系人"
                        placeholder="联系人"
                    />
                    <van-field
                        label-width="90px"
                        v-model="formData.phone"
                        type="tel"
                        label="手机号码"
                        placeholder="手机号码"
                    />
                    <van-field
                        label-width="90px"
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
                    <time-address @onConfirmTime="onConfirmTime" @onConfirmProvince="onConfirmProvince" @onBlurAddress="onBlurAddress" />
                    <div class="footer">
                        <van-button :loading="isLoading" @click="submitFun" round block type="primary" native-type="button" size="large">
                            提交
                        </van-button>
                        <van-button class="go-detail" @click="goMsgDetail" round block type="primary" native-type="button" size="large">
                            去查询
                        </van-button>
                    </div>
                </van-form>
			</div>
		</div>
	</div>
</template>
<script>
import * as fetchData from '../../api/index'
import Vue from 'vue'
import '@/util/lib';
import md5 from 'js-md5';
import { Form, Field, Button, Toast } from 'vant';
import TimeAddress from './../../../../components/timeAddress'
let phoneReg = /^1\d{10}$/
Vue.use(Form).use(Field).use(Button).use(Toast)
export default {
    components: {
        TimeAddress
    },
	data() {
		return {
            monthCardNo: '',
			isLoading: false,
            msgText: '发送验证码',
            msgLoading: false,
            sms: '',
            validateSms: '', // 存后端返回的验证码，提交时进行校验验证码
			formData: {
				company: '', // 公司名称
				contractName: '', // 联系人
				phone: '' // 联系方式
            },
            addressList: []
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
            let params = {}
            params.signType = 'MD5'
            params.timestamp = new Date().getTime()
            params.sign = md5(params.timestamp.toString() + this.formData.phone.toString()) // timestamp+phone拼接进行MD5加密
            params.phone = this.formData.phone
            fetchData.sendCodeApi(params).then((res) => {
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
            if (!this.formData.company) {
                Toast('公司名称为空')
                return
            }
            if (!this.formData.contractName) {
                Toast('联系人为空')
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
            if (!this.sms) {
                Toast('验证码为空')
                return
            }
            if (this.sms != this.validateSms) {
                Toast('验证码有误,请重新获取验证码')
                return
            }
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
            let timestamp = new Date().getTime()
            let sign = md5(timestamp.toString() + this.formData.phone.toString()) // timestamp+phone拼接进行MD5加密
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
            this.formData.data = sendAddressObj

            param.signType = 'MD5'
            param.timestamp = timestamp
            param.sign = sign
            this.isLoading = true
			fetchData.submitApi({ ...this.formData, ...param }).then((res) => {
                if (res.status) {
                    window.location.href = `/msgCollect/module/successPage/index.html?subCustomerNo=${res.data.subCustomerNo}&monthCardNo=${this.monthCardNo}`
                } else {
                    this.isLoading = false
                    Toast(res.message)
                }
			}).catch(() => {
                this.isLoading = false
            })
		},
        goMsgDetail() {
            window.location.href = `/msgCollect/module/msgDetail/index.html?monthCardNo=${this.monthCardNo}`
        }
	}
}
</script>
<style lang="sass">
	@import "./index.scss"
</style>

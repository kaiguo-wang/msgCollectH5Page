<template>
	<div class="success-page">
        <van-empty description="">
            <template #description>
                <van-row>
                    <van-col span="24" class="txt-center">提交成功</van-col>
                    <van-col span="24" class="txt-center sub-customer-no-part">供应商编码:
                        <span class="sub-customer-no">{{subCustomerNo}}</span>
                        <van-button size="mini" type="primary" v-clipboard:copy="subCustomerNo" v-clipboard:success="onCopy" v-clipboard:error="onError">
                            复制
                        </van-button>
                    </van-col>
                </van-row>
            </template>
            <van-button @click="goMsgDetail" type="primary" size="small" class="bottom-button">
                返回
            </van-button>
        </van-empty>
	</div>
</template>
<script>
import Vue from 'vue'
import { Empty, Button, Col, Row } from 'vant';
import 'vant/lib/index.css';
import VueClipboard from 'vue-clipboard2'
Vue.use(Empty)
    .use(Button)
    .use(Col)
    .use(Row)
    .use(VueClipboard)
export default {
	data() {
		return {
           subCustomerNo: '', // 供应商编码
           monthCardNo: '' // 月结卡号

        }
	},
    mounted() {
        if (location.search) {
            let searchData = location.search.split('?')[1].split('&')
            console.log(searchData)
            this.subCustomerNo = searchData.filter((val) => {
                console.log(val)
                return val.indexOf('subCustomerNo') != -1
            })[0].split('=')[1]
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
        goMsgDetail() {
            window.location.href = `/msgCollect/module/index/index.html?monthCardNo=${this.monthCardNo}`
        }
	}
}
</script>
<style lang="sass">
	@import "./index.scss"
</style>

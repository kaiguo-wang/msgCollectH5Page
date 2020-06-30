<template>
    <div>
        <van-panel title="">
            <div class="panel" v-for="(item, key) in addressList" :key="key">
                <div class="address-part" v-if="addressList.length != 1">
                    <van-button size="mini" @click="deleteAddressFun(key)">删除</van-button>
                </div>
                <div class="time-group">
                    <van-field
                        readonly
                        clickable
                        label-width="90px"
                        :value="item.startTime"
                        label="高峰时间段"
                        placeholder="开始时间"
                        @click="showPickerFun('start', key)"
                    />
                    <van-field
                        readonly
                        clickable
                        input-align="center"
                        label-width="20px"
                        :value="item.endTime"
                        label="至"
                        placeholder="结束时间"
                        @click="showPickerFun('end', key)"
                    />
                </div>
                <van-field
                    readonly
                    clickable
                    label-width="90px"
                    :value="item.provinceCityDistrict"
                    label="地区选择"
                    placeholder="点击选择省市区"
                    @click="showAreaFun(key)"
                    :columns-placeholder="['请选择', '请选择', '请选择']"
                />
                <van-field
                    label-width="90px"
                    v-model="item.address"
                    label="详细地址"
                    placeholder="详细地址"
                    @blur="onBlurAddressFun"
                />
            </div>
            <van-popup v-model="showPicker" position="bottom">
                <van-picker
                    title=""
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirmTimeFun"
                    @cancel="showPicker = false"
                />
            </van-popup>
            <van-popup v-model="showArea" position="bottom">
                <van-area
                    :area-list="areaList"
                    @confirm="onConfirmProvinceFun"
                    @cancel="showArea = false"
                    @change="changeAddress"
                />
            </van-popup>
        </van-panel>
        <div class="address-part">
            <van-button size="small" type="primary" class="btn" @click="addAddressFun">添加地址</van-button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import md5 from 'js-md5';
import { Field, Picker, Area, Popup, Button, Panel, Toast } from 'vant'
import 'vant/lib/index.css';
import { getAddressList } from './api'
Vue.use(Field)
    .use(Picker)
    .use(Area)
    .use(Popup)
    .use(Button)
    .use(Panel)
    .use(Toast)
export default {
    data() {
        return {
            addressList: [
                {
                    provinceCityDistrict: '', // 省市区
                    province: '', // 省
                    provinceId: '',
                    cityId: '', // 城市ID
                    city: '', // 城市
                    districtId: '',	// 区县Id
                    district: '',	// 区县
                    address: '', // 地址
                    startTime: '', // 高峰时间段开始时间
                    endTime: '' // 高峰时间段结束时间
                }
            ],
            showPicker: false, // 时间选择
            showPickerCount: 0,
            showArea: false, // 省市区选择
            showAreaCount: 0,
            selectedAreaCode: '', // 保存省市区选中的值，下次弹出出现设置初始值
            columns: [
                '0点',
                '1点',
                '2点',
                '3点',
                '4点',
                '5点',
                '6点',
                '7点',
                '8点',
                '9点',
                '10点',
                '11点',
                '12点',
                '13点',
                '14点',
                '15点',
                '16点',
                '17点',
                '18点',
                '19点',
                '20点',
                '21点',
                '22点',
                '23点'],
            areaList: {
                province_list: {},
                city_list: {},
                county_list: {}
            }, // 数据格式见 Area 组件文档
            areaListSession: {
                province_list: {},
                city_list: {},
                county_list: {}
            }, // 用于缓存
            timeType: 'start'
        }
    },
    props: {
        onConfirmTime: {
            type: Function
        },
        onConfirmProvince: {
            type: Function
        },
        onBlurAddress: {
            type: Function
        },
        goMsgDetail: {
            type: Function
        }
    },
    mounted() {
        this.getAddressListFun()
    },
    methods: {
        changeAddress(picker, values, index) {
            let parentId
            if (index === 0) {
               Object.keys(this.areaListSession.province_list).map((item) => {
                   if (this.areaListSession.province_list[item] === values[index].name) {
                       parentId = item
                   }
                   return item
               })
            } else {
                Object.keys(this.areaListSession.city_list).map((item) => {
                   if (this.areaListSession.city_list[item] === values[index].name) {
                       parentId = item
                   }
                   return item
               })
            }
            if (index === 2) { // 区改变时不需要再请求地址接口
                return
            }
            if (!parentId) { // 改变省、市时，若为‘请选择’不发请求
                return
            }
            this.getAddressListFun(index, parentId, values[index].code)
        },
        getAddressListFun(index, parentId, code) {
            let type
            if (index === 0) { // index === 0时是获取市列表
                type = 2
            } else if (index === 1) { // index === 1时是获取区列表
                type = 3
            } else { // index没有时是获取省列表
                type = 1
            }
            getAddressList(this.getSendData(type, parentId)).then((res) => {
                if (res.status) {
                    let p = 10
                    let city = 10
                    let c = 10
                    if (type === 1) { // 省
                        this.areaList.province_list = {}
                        // 此处必须设置第一项为‘请选择’，不然第一次进去无法获取下一级列表
                        this.areaList.province_list[`${p++}0000`] = '请选择'
                        res.data.map((item) => {
                            this.areaList.province_list[`${p++}0000`] = item.cityName
                            this.areaListSession.province_list[`${item.id}`] = item.cityName
                            return item
                        })
                    } else if (type === 2) { // 市
                        this.areaList.city_list = {}
                        // 此处必须设置第一项为‘请选择’，若市为直辖市时只有一项无法触发van-area的change事件
                        this.areaList.city_list[`${code.substr(0, 2)}${city++}00`] = '请选择'
                        res.data.map((item) => {
                            this.areaList.city_list[`${code.substr(0, 2)}${city++}00`] = item.cityName
                            this.areaListSession.city_list[`${item.id}`] = item.cityName
                            return item
                        })
                    } else { // 区
                        this.areaList.county_list = {}
                        // this.areaList.county_list[`${code.substr(0, 4)}${c++}`] = '请选择'
                        res.data.map((item) => {
                            this.areaList.county_list[`${code.substr(0, 4)}${c++}`] = item.cityName
                            this.areaListSession.county_list[`${item.id}`] = item.cityName
                            return item
                        })
                    }
                } else {
                    Toast(res.message)
                }
            })
        },
        getSendData(type = 1, parentId = '') {
            let param = {}
            param.timestamp = new Date().getTime() // 时间戳,精确到秒
            param.signType = 'MD5' // 加密类型,暂时只支持MD5
            param.sign = md5(param.timestamp.toString()) // 签名,timestamp进行MD5加密
            param.type = type // 类型,1 省份，2 城市，3区县
            param.parentId = parentId || '' // 上级ID
            return param
        },
        showPickerFun(type, key) {
            this.timeType = type
            this.showPickerCount = key
            this.showPicker = true
        },
        showAreaFun(key) {
            this.showAreaCount = key
            this.showArea = true
        },
        onConfirmTimeFun(time) {
            if (this.timeType === 'start') {
                this.addressList[this.showPickerCount].startTime = time
            } else {
                this.addressList[this.showPickerCount].endTime = time
            }
            this.showPicker = false
            this.$emit('onConfirmTime', this.addressList)
        },
        onConfirmProvinceFun(values) {
            if (values[0]) {
                this.addressList[this.showAreaCount].province = values[0].name != '请选择' ? values[0].name : ''
                this.addressList[this.showAreaCount].provinceCityDistrict = values[0].name != '请选择' ? values[0].name : ''
                Object.keys(this.areaListSession.province_list).map((item) => {
                    if (this.areaListSession.province_list[item] === values[0].name) {
                         this.addressList[this.showAreaCount].provinceId = item
                    }
                    return item
                })
            }
            if (values[1]) {
                this.addressList[this.showAreaCount].city = values[1].name != '请选择' ? values[1].name : ''
                this.addressList[this.showAreaCount].provinceCityDistrict += values[1].name != '请选择' ? `/${values[1].name}` : ''
                Object.keys(this.areaListSession.city_list).map((item) => {
                    if (this.areaListSession.city_list[item] === values[1].name) {
                         this.addressList[this.showAreaCount].cityId = item
                    }
                    return item
                })
            }
            if (values[2]) {
                this.addressList[this.showAreaCount].district = values[2].name != '请选择' ? values[2].name : ''
                this.addressList[this.showAreaCount].provinceCityDistrict += values[2].name != '请选择' ? `/${values[2].name}` : ''
                Object.keys(this.areaListSession.county_list).map((item) => {
                    if (this.areaListSession.county_list[item] === values[2].name) {
                         this.addressList[this.showAreaCount].districtId = item
                    }
                    return item
                })
            }
            this.showArea = false;
            this.$emit('onConfirmProvince', this.addressList)
        },
        onBlurAddressFun() {
            this.$emit('onBlurAddress', this.addressList)
        },
        addAddressFun() {
            this.addressList.push({
                provinceCityDistrict: '', // 省市区
                province: '', // 省
                provinceId: '',
                cityId: '', // 城市ID
                city: '', // 城市
                districtId: '',	// 区县Id
                district: '',	// 区县
                address: '', // 地址
                startTime: '', // 高峰时间段开始时间
                endTime: '' // 高峰时间段结束时间
            })
        },
        deleteAddressFun(index) {
            this.addressList.splice(index, 1)
        }
    }
}
</script>
<style lang="scss">
    @import '../../assets/scss/reset.scss';
    .panel {
        margin-top: px2rem(5);
        border: 1px solid #ebedf0;
        .time-group {
            display: flex;
            width: 100%;
        }
    }
    .van-cell:not(:last-child)::after {
        border-bottom: 0;
    }
    .address-part {
        display: flex;
        justify-content:flex-end;
        .btn {
            margin-top: px2rem(30);
        }
    }
</style>
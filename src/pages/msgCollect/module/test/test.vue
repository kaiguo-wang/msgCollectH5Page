<template>
    <div>
        模仿购物淘宝选择产品：

        <div>
            <button v-for="item in colorArr" :key="item.name" :class="color == item.name ? 'selected' : ''" @click="getColor(item.name)">{{item.name}}</button>
        </div>
        <div>
            <button :class="changeClass && type == '布' ? 'notChoice' : ''" @click="getType('布')">布</button>
            <button :class="changeClass && type == '纯棉' ? 'notChoice' : ''" @click="getType('纯棉')">纯棉</button>
            <button :class="changeClass && type == '16安纯棉' ? 'notChoice' : ''" @click="getType('16安纯棉')">16安纯棉</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            colorArr: [], // 颜色按钮
            color: '',
            type: '',
            data: {
                attrMap: [
                    {
                        "attr": [{
                            "name": "白色"
                        }, {
                            "name": "黑色"
                        }],
                        "id": 16,
                        "name": "颜色"
                    }, {
                        "attr": [{
                            "name": "布"
                        }, {
                            "name": "纯棉"
                        }, {
                            "name": "16安纯棉"
                        }],
                        "id": 15,
                        "name": "材质"
                    }, {
                        "attr": [{
                            "name": "40cm*34cm"
                        }],
                        "id": 20,
                        "name": "尺寸"
                    }
                ],
                specs: [
                    {
                        "id": 354,
                        "attr_value": ["白色", "布"],
                        "attr_id": ["16", "15"],
                        "attr_price": "0.01",
                        "image": "https://cfdz-test-oss.oss-cn-beijing.aliyuncs.com/store/goods/2020-05-14/e095a1d9056255b885b1dbef100571a6.jpg",
                        "stock": 50,
                        "goods_id": 187,
                        "attr_value_map": {
                            "颜色": "白色",
                            "材质": "布"
                        },
                        "priceFormat": ["0", "01"]
                    }, {
                        "id": 355,
                        "attr_value": ["白色", "纯棉"],
                        "attr_id": ["16", "15"],
                        "attr_price": "0.01",
                        "image": "https://cfdz-test-oss.oss-cn-beijing.aliyuncs.com/store/goods/2020-05-14/828aaf8228eae566f933059bf345b508.jpg",
                        "stock": 50,
                        "goods_id": 187,
                        "attr_value_map": {
                            "颜色": "白色",
                            "材质": "纯棉"
                        },
                        "priceFormat": ["0", "01"]
                    }, {
                        "id": 352,
                        "attr_value": ["黑色", "布"],
                        "attr_id": ["16", "15"],
                        "attr_price": "19.90",
                        "image": "https://cfdz-test-oss.oss-cn-beijing.aliyuncs.com/store/goods/2020-05-14/f7e660231019bea2a42805845b3990d1.jpg",
                        "stock": 50,
                        "goods_id": 187,
                        "attr_value_map": {
                            "颜色": "黑色",
                            "材质": "布"
                        },
                        "priceFormat": ["19", "90"]
                    }, {
                        "id": 353,
                        "attr_value": ["黑色", "纯棉"],
                        "attr_id": ["16", "15"],
                        "attr_price": "19.90",
                        "image": "https://cfdz-test-oss.oss-cn-beijing.aliyuncs.com/store/goods/2020-05-14/8dee1b07b657be8bc95f3a4612177839.jpg",
                        "stock": 50,
                        "goods_id": 187,
                        "attr_value_map": {
                            "颜色": "黑色",
                            "材质": "纯棉"
                        },
                        "priceFormat": ["19", "90"]
                    }, {
                        "id": 440,
                        "attr_value": ["40cm*34cm", "白色", "16安纯棉"],
                        "attr_id": ["20", "16", "15"],
                        "attr_price": "0.01",
                        "image": "https://cfdz-test-oss.oss-cn-beijing.aliyuncs.com/store/goods/2020-05-22/e1d22da1ffa619243874d96c625e7966.png",
                        "stock": 937,
                        "goods_id": 207,
                        "attr_value_map": {
                            "尺寸": "40cm*34cm",
                            "颜色": "白色",
                            "材质": "16安纯棉"
                        },
                        "priceFormat": ["0", "01"]
                    }
                ]
            },
            colorTypeObj: {}, // 初始化数据：将颜色值作为key（数组）,把相关的材质push进去
            changeClass: false // 根据判断结果修改按钮样式 
        }
    },
    created() {
        this.getColorAndType()
    },
    methods: {
        // 选择颜色
        getColor (color) {
            this.color = color
            this.changeClass = false
        },
        // 选择类型
        getType (type) {
            this.changeClass = false
            this.type = type
            this.deal()
        },
        // 对颜色、类型进行判断公共方法
        deal () {
            if (!this.color) {
                alert('请选择颜色')
                return
            }
            if (this.colorTypeObj[this.color].indexOf(this.type) == -1) {
                this.changeClass = true
                return
            }
            console.log(`您选择了${this.type}`)
        },
        // 对白色，黑色 包含种类分类处理
        getColorAndType () {
            this.data.attrMap.map((item) => {
                if (item.name == '颜色') {
                    this.colorArr = item.attr
                }
            })
            this.data.specs.map((item) => {
                if (!this.colorTypeObj[item.attr_value_map['颜色']]) {
                    this.colorTypeObj[item.attr_value_map['颜色']] = []
                    this.colorTypeObj[item.attr_value_map['颜色']].push(item.attr_value_map['材质'])
                } else {
                    this.colorTypeObj[item.attr_value_map['颜色']].push(item.attr_value_map['材质'])
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .selected {
        background: red;
        color: #fff;
    }
    .notChoice {
        background: black;
        color: #ffff;
    }
</style>
<template>
    <div id="scroll-container" :class="{ 'transition': isTransition }" @touchstart.stop="handlerTouchStart"
        @touchmove.stop="handlerTouchMove" @touchend.stop="handlerTouchEnd" ref="scrollContainer">
        <!-- 添加刷新图片 -->
        <!-- 根据isDisplay.refresh动态隐藏显示 -->
        <div class="refresh" :class="{ 'display': 'isDisplay.refresh' }">
            <!-- 添加isShrinked 加载和 箭头相互转换 -->
            <!-- 添加rotate类， 反转箭头 下箭头和上箭头相互转换 -->
            <img :src="isShrinked ? ' loadImg' : 'refreshImg'" :class="{ 'rotate': 'isRotate' }" alt="">
        </div>
        <slot></slot>
        <!-- 添加加载图片 -->
        <div :class="['load', { display: isDisplay.load }]">
            <img :src="loadImg">
        </div>
    </div>
</template>

<script>
// 拖拽状态true，下拉 false
var SCROLLSTATUS;
export default {

    props: {
        maxDistance: {
            style: Number,
            default: 300
        },
        triggerDistance: {
            style: Number,
            default: 100
        }
    },
    data() {
        return {
            startLocation: '',     //记录鼠标点击的位置
            moveDistance: 0,       //记录移动的位置
            distance: '',         //记录移动的距离
            isTransition: false,
            isDisplay: {
                refresh: true,
                load: true
            },
            // 把图片地址抽离出来 方便动态切换
            loadImg: '@/assets/R.jpg',
            refreshImg: '@/assets/R.jpg',
            isRotate: false, // 是否选择箭头
            isShrinked: false,// 是否收缩完成

            // 添加emit缓存数组，并以undefinded填充
            emitEvents: new Array(2).fill(undefined),

        }
    },
    methods: {
        // 获取手指触屏时的屏幕y轴位置
        handlerTouchStart(e) {
            console.log(e)
            this.startLocation = e.touchend[0].pageY
            this.isTransition = false
            // 重置箭头反转
            this.isRotate = false
            // 重置箭头
            this.isShrinked = false
        },
        // 获取手指移动的距离
        handlerTouchMove(e) {
            if (this.moveDistance > this.maxDistance + 1) {
                this.isRotate = true
                return
            }
            this.moveDistance = Math.floor(e.touches[0].pageY - this.startLocation)
            this.$refs.scrollContainer.style.transform = `translateY(${this.moveDistance}px)`
            // 显示加载  刷新图片
            if (this.moveDistance > this.triggerDistance && this.isDisplay.refresh) {
                this.isDisplay.refresh = false
            } else if (this.moveDistance < -this.triggerDistance && this.isDisplay.load) {
                this.isDisplay.load = false

            }

            // 缓存刷新的emit
            if (this.moveDistance > this.triggerDistance && !this.emitEvents[0]) {
                this.emitEvents[0] = function () {
                    this.$emit('refresh', this.displayDiv)
                }

            }
            // 缓存加载的emit
            if (this.moveDistance < -this.triggerDistance && !this.emitEvents[1]) {
                this.emitEvents[1] = function () { this.$emit('load', this.displayDiv) }

            }
            // console.log('this.moveDistance :', this.moveDistance, ' this.$refs.scrollContainer.style.transform:', this.$refs.scrollContainer.style.transform)
        },
        // 获取手指松开的Y轴位置
        handlerTouchEnd(e) {

            // 记录拖拽状态是上拉还是下拉
            SCROLLSTATUS = this.moveDistance > 0
            if (Math.abs(this.moveDistance) < this.triggerDistance) {
                return this.moveDistance = 0
            }
            // 清除已移动的距离
            this.moveDistance = 0
            // 恢复原位
            this.$refs.scrollContainer.style.transform = 'translateY(0px)'
            this.isTransition = true // 开启transition
            // console.log('this.moveDistance:', this.moveDistance, 'this.$refs.scrollContainer.style.transform :', this.$refs.scrollContainer.style.transform)

            // 拖拽距离是否大于指定的触发长度
            // 容器位置恢复后触发
            setTimeout(() => {
                this.shrinked()
            }, 700)

            // 遍历emit并执行
            this.emitEvents.forEach((fn, index) => {
                if (!fn) return
                this.emitEvents[index] = undefined
                fn.apply(this)
            })
            console.log(this.emitEvents,'12222222')

        },
        shrinked() {
            if (SCROLLSTATUS) {
                // 下拉刷新业务逻辑
                // 已经恢复完，箭头转为加载
                this.isShrinked = true
                // // 隐藏刷新加载
                // this.isDisplay.refresh=true
                // this.isDisplay.load=true

            } else {
                // 上拉加载业务逻辑

            }

        },
        // 该方法通过$emit()传给外部组件调用  然后隐藏刷新，加载的gif图片
        displayDiv() {
            this.isDisplay.refresh = true
            this.isDisplay.load = true
        }

    }
}
</script> 
<style scoped lang="scss">
#scroll-container {
    background-color: lightblue;
}

.transition {
    transition: all .7s;
}

/* -----添加新样式------ */
.load,
.refresh {
    text-align: center;
}

.refresh {

    img {
        height: 20px;
        width: 30px;


    }
}

.load img,
.refresh img {
    width: 20px;
}

/* -----添加新样式------ */
</style>
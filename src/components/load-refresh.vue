<template>
    <div>
        <div id="scroll-container" :class="{ 'transition': isTransition }" @touchstart.stop="handlerTouchStart"
            @touchmove.stop="handlerTouchMove" @touchend.stop="handlerTouchEnd" ref="scrollContainer">
            <!-- 3.添加刷新图片 -->
            <div class="refresh">
                <img src="@/assets/R.jpg"
                    alt="">

            </div>
            <slot></slot>
            <!-- 3.添加加载图片 -->
            <div class="load">
                <img src="@/assets/R.jpg" alt="">

            </div>
        </div>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            startLocation: '', // 记录鼠标点击的位置
            moveDistance: 0,  // 记录移动的位置
            distance: '', // 记录移动的距离
            isTransition: false//是否启动transition

        }
    },
    methods: {
        // 获取手指触屏时的屏幕Y轴位置
        handlerTouchStart(e) {
            this.startLocation = e.touches[0].pageY
            this.isTransition = false
        },
        // 获取手指移动的距离
        handlerTouchMove(e) {
            this.moveDistance = Math.floor(e.touches[0].pageY - this.startLocation)
            this.$refs.scrollContainer.style.transform = `translateY(${this.moveDistance}px)`
        },
        // 获取手指松开的Y轴位置
        handlerTouchEnd(e) {
            // 清除已移动的距离
            this.moveDistance = 0
            // 恢复原位
            this.$refs.scrollContainer.style.transform = 'translateY(0px)'
            this.isTransition = true
        }
    }
}
</script>
<style scoped lang="scss">
#scroll-container {
    background-color: yellow;
}

.transition {
    transition: all 1s;
}

/* -----添加新样式------ */
.load,.refresh {
    text-align: center;
    img{
        width: 20px;
        height: 20px;
    }
}

// .load img,
// .refresh img {
//     width: 20px;
// }
</style>

<template>
    <div class="load-refresh">

        <LoadRefresh @refresh="refresh" @load="load" :maxDistance="300" :triggerDistance="100">
            <div v-for="(item, index) in list" :key="index">
                {{ item.name }}
            </div>
        </LoadRefresh>




    </div>
</template>

<script>
import LoadRefresh from '@/components/LoadRefresh.vue';
export default {
    components: {
        LoadRefresh
    },
    data() {
        return {
            list: [
                {
                    name: '张三'
                },
                {
                    name: '李四'
                },
                {
                    name: '王五'
                },
                {
                    name: '赵六'
                }
            ],

            timer: '',
            data: '',
            show: false
        }
    },
    methods: {
        refresh(done) {
            console.log(done)
            if (this.timer) clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                console.log('refresh')
                done()
            }, 2000)
        },
        load(done) {
            if (this.timer) clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                done()
                this.list = this.list.concat([{
                    name: '新增的' + Math.ceil(Math.random() * 10)
                }, {
                    name: '新增的' + Math.ceil(Math.random() * 10)
                }, {
                    name: '新增的' + Math.ceil(Math.random() * 10)
                }])
            }, 1000)
            console.log(this.list)
                }

    }

}
</script> 
<style scoped lang="scss"></style>
<template>
    <div class="count">
        <div @click="sub" :class="(islight ? 'light' : '') + ' sub'">-</div>
        <div class="num">1</div>
        <!-- {{books.count}} -->
        <div class="add" @click="add">+</div>
    </div>
</template>

<script>
    export default {
        data() {
            let count1 = books.count;
            return {
                count1: 1,
                islight: true,
            }
        },
        created() {
            if (this.count > 0) {
                this.count1 = this.count
            }
            this.islight = this.lightFunc()
        },
        props: {
            count: {
                type: Number,
                default: 1
            },
        },
        methods: {
            // 减少数量
            sub: function() {
                if (this.count1 < 2) {
                    return
                }
                this.count1--
                    this.islight = this.lightFunc()
            },
            // 增加数量
            add: function() {
                this.count1++
                    this.islight = this.lightFunc()
            },
            lightFunc() {
                if (this.count1 < 2) {
                    return true
                } else {
                    return false
                }
            }
        }

    }
</script>
<style scoped>
    .count {
        color: #36282B;
        font-size: 28rpx;
        min-width: 150rpx;
        height: 28rpx;
        position: relative;
        margin-top: 153rpx;
        display: flex;
        justify-content: space-between;
    }
    
    .sub,
    .add,
    .num {
        height: 100%;
        line-height: 28rpx;
        text-align: center;
    }
    
    .sub,
    .add {
        width: 20rpx;
        /* transform: scale(1.5, 1.5) translateY(-0.3vw); */
    }
    
    .num {
        border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        padding: 0 2rpx;
        font-weight: 50rpx;
    }
</style>
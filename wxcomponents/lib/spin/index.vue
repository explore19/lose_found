<template>
<uni-shadow-root class="lib-spin-index"><view :class="'wux-class '+(classes.wrap)">
    <wux-animation-group :wux-class="classes.anim" :in="spinVisible" :classNames="classNames">
        <view :class="classes.dots">
            <view :class="classes.dot">dot</view>
            <view :class="classes.dot">dot</view>
            <view :class="classes.dot">dot</view>
            <view :class="classes.dot">dot</view>
        </view>
        <view :class="classes.tip" v-if="tip">{{ tip }}</view>
    </wux-animation-group>
    <view :class="classes.container" v-if="nested">
        <slot></slot>
    </view>
</view></uni-shadow-root>
</template>

<script>
import WuxAnimationGroup from '../animation-group/index.vue'
global['__wxVueOptions'] = {components:{'wux-animation-group': WuxAnimationGroup}}

global['__wxRoute'] = 'lib/spin/index'
"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames3=_interopRequireDefault(require("../helpers/classNames"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}(0,_baseComponent.default)({properties:{prefixCls:{type:String,value:"wux-spin"},classNames:{type:null,value:"wux-animate--fadeIn"},tip:{type:String,value:""},size:{type:String,value:"default"},spinning:{type:Boolean,value:!0,observer:"updated"},nested:{type:Boolean,value:!1}},data:{spinVisible:!0},computed:{classes:["prefixCls, size, nested, tip, spinVisible",function(e,t,n,a,i){var s;return{wrap:(0,_classNames3.default)(e,(_defineProperty(s={},"".concat(e,"--").concat(t),t),_defineProperty(s,"".concat(e,"--nested"),n),_defineProperty(s,"".concat(e,"--show-text"),a),s)),anim:"".concat(e,n?"__spinning--nested":"__spinning"),dots:"".concat(e,"__dots"),dot:"".concat(e,"__dot"),tip:"".concat(e,"__tip"),container:(0,_classNames3.default)("".concat(e,"__container"),_defineProperty({},"".concat(e,"__container--blur"),i))}}]},methods:{updated:function(e){this.data.nested&&this.setData({spinVisible:e})}}});
export default global['__wxComponents']['lib/spin/index']
</script>
<style platform="mp-weixin">
.wux-spin{position:relative;display:inline-block}.wux-spin__spinning{opacity:1;position:static;display:inline-block;vertical-align:middle;text-align:center;font-size:28rpx;line-height:1.5;color:#108ee9}.wux-spin__spinning--nested{vertical-align:middle;text-align:center;font-size:28rpx;line-height:1.5;color:#108ee9;display:block;position:absolute;height:100%;max-height:640rpx;width:100%;z-index:4}.wux-spin--nested{display:block}.wux-spin--nested .wux-spin__tip{position:absolute;top:50%;width:100%;padding-top:12rpx;text-shadow:0 2rpx 4rpx #fff}.wux-spin__dots{width:40rpx;height:40rpx;overflow:hidden;display:inline-block;transform:rotate(45deg);animation:rotate 1.2s infinite linear}.wux-spin--nested .wux-spin__dots{position:absolute;top:50%;left:50%;margin:-20rpx}.wux-spin__dot{width:18rpx;height:18rpx;border-radius:100%;background-color:#108ee9;transform:scale(.75);display:block;position:absolute;opacity:.3;animation:spinMove 1s infinite linear alternate;transform-origin:50% 50%;text-indent:-999em}.wux-spin__dot:first-child{left:0;top:0}.wux-spin__dot:nth-child(2){right:0;top:0;animation-delay:.4s}.wux-spin__dot:nth-child(3){right:0;bottom:0;animation-delay:.8s}.wux-spin__dot:nth-child(4){left:0;bottom:0;animation-delay:1.2s}.wux-spin--show-text.wux-spin--nested .wux-spin__dots{margin-top:-40rpx}.wux-spin__container{position:relative;transition:opacity .3s;zoom:1}.wux-spin__container--blur{overflow:hidden;opacity:.5;filter:blur(1rpx);transform:translateZ(0)}.wux-spin--small .wux-spin__tip{padding-top:6rpx}.wux-spin--small .wux-spin__dots{width:28rpx;height:28rpx}.wux-spin--small.wux-spin--nested .wux-spin__dots{margin:-14rpx}.wux-spin--small .wux-spin__dot{width:12rpx;height:12rpx}.wux-spin--small.wux-spin--show-text.wux-spin--nested .wux-spin__dots{margin-top:-34rpx}.wux-spin--large .wux-spin__tip{padding-top:24rpx}.wux-spin--large .wux-spin__dots{width:64rpx;height:64rpx}.wux-spin--large.wux-spin--nested .wux-spin__dots{margin:-32rpx}.wux-spin--large .wux-spin__dot{width:28rpx;height:28rpx}.wux-spin--large.wux-spin--show-text.wux-spin--nested .wux-spin__dots{margin-top:-52rpx}@keyframes rotate{to{transform:rotate(405deg)}}@keyframes spinMove{to{opacity:1}}
</style>
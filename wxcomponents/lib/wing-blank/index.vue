<template>
<uni-shadow-root class="lib-wing-blank-index"><view :class="'wux-class '+(classes.wrap)" :style="extStyle">
    <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'lib/wing-blank/index'
"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames2=_interopRequireDefault(require("../helpers/classNames")),_styleToCssString=_interopRequireDefault(require("../helpers/styleToCssString"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}(0,_baseComponent.default)({properties:{prefixCls:{type:String,value:"wux-wingblank"},size:{type:String,value:"default"},bodyStyle:{type:[String,Object],value:"",observer:function(e){this.setData({extStyle:(0,_styleToCssString.default)(e)})}}},data:{extStyle:""},computed:{classes:["prefixCls, size",function(e,t){return{wrap:(0,_classNames2.default)(e,_defineProperty({},"".concat(e,"--").concat(t),t))}}]}});
export default global['__wxComponents']['lib/wing-blank/index']
</script>
<style platform="mp-weixin">
.wux-wingblank--small{margin-left:10rpx;margin-right:10rpx}.wux-wingblank--default{margin-left:20rpx;margin-right:20rpx}.wux-wingblank--large{margin-left:30rpx;margin-right:30rpx}
</style>
/* eslint-disable */
import Vue from 'vue';
import VClickOutside from "v-click-outside"
import { IMaskDirective } from 'vue-imask'
Vue.use(VClickOutside)
Vue.directive('imask',IMaskDirective)
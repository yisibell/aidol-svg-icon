import Vue from "vue";
import SvgIcon from "@/svg-icon"; // svg component

// register globally
Vue.component("svg-icon", SvgIcon);

// require svg files
const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext =>
  requireContext.keys().forEach(requireContext);
requireAll(req);

<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  ></div>
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "AiSvgIcon",
  props: {
    // 图标名称
    iconClass: {
      type: String,
      required: true
    },
    // 附加类名
    className: {
      type: String,
      default: ""
    }
  },
  computed: {
    isExternal() {
      return this.isOutLinks(this.iconClass);
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`
      };
    }
  },
  methods: {
    isOutLinks(path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>

//在Echarts.vue文件中
<template>
  <div :style="{backgroundImage: 'url(' + img + ')'}">
    <div style="text-align:center;color:white;font-weight:bold">
      本月热门搜索
      <v-ThisMonthHotShearch />
    </div>
    <div style="margin-top:2%;text-align:center">
      <v-HotShearch />
    </div>
  </div>
</template>

<script>
import ThisMonthHotShearch from '@/components/Table/ThisMonthHotShearch'
import HotShearch from '@/components/Table/HotShearch'
export default {
  name: 'HotSearch',
  components: {
    'v-ThisMonthHotShearch': ThisMonthHotShearch,
    'v-HotShearch': HotShearch
  },
  data() {
    return {
      img: require('@/assets/preview.jpg')
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style>

</style>

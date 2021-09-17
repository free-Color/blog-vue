<template>
  <div id="china_map_box">
      <div id="china_map"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts4/map/js/china.js'
export default {
  data() {
    return {
      echarts: null,
      //echart 配制option
      mapOptions: {},
      barOptions: {},
      currentOption: null,
      //echart data
      data: [
        {
          name: "南海诸岛",
          value: 0,
          eventTotal:100,
          specialImportant:10,
          import:10,
          compare:10,
          common:40,
          specail:20
        },
        {
          name: "北京",
          value: 0
        },
        {
          name: "天津",
          value: 0
        },
        {
          name: "上海",
          value: 0
        },
        {
          name: "重庆",
          value: 0
        },
        {
          name: "河北",
          value: 0
        },
        {
          name: "河南",
          value: 0
        },
        {
          name: "云南",
          value: 0
        },
        {
          name: "辽宁",
          value: 0
        },
        {
          name: "黑龙江",
          value: 0
        },
        {
          name: "湖南",
          value: 0
        },
        {
          name: "安徽",
          value: 0
        },
        {
          name: "山东",
          value: 0
        },
        {
          name: "新疆",
          value: 0
        },
        {
          name: "江苏",
          value: 0
        },
        {
          name: "浙江",
          value: 0
        },
        {
          name: "江西",
          value: 0
        },
        {
          name: "湖北",
          value: 0
        },
        {
          name: "广西",
          value: 0
        },
        {
          name: "甘肃",
          value: 0
        },
        {
          name: "山西",
          value: 0
        },
        {
          name: "内蒙古",
          value: 0
        },
        {
          name: "陕西",
          value: 0
        },
        {
          name: "吉林",
          value: 0
        },
        {
          name: "福建",
          value: 0
        },
        {
          name: "贵州",
          value: 0
        },
        {
          name: "广东",
          value: 0
        },
        {
          name: "青海",
          value: 0
        },
        {
          name: "西藏",
          value: 0
        },
        {
          name: "四川",
          value: 0
        },
        {
          name: "宁夏",
          value: 0
        },
        {
          name: "海南",
          value: 0
        },
        {
          name: "台湾",
          value: 0
        },
        {
          name: "香港",
          value: 0
        },
        {
          name: "澳门",
          value: 0
        }
      ]
    };
  },
  methods: {
    //初始化中国地图
    initEchartMap() {
      this.echarts = echarts.init(document.getElementById('china_map'))
      this.data.sort((a, b) => a.value - b.value)
      this.mapOptions = {
        tooltip: {
          triggerOn: "mousemove",   //mousemove、click
          padding:8,
          borderWidth:1,
          borderColor:'#409eff',
          backgroundColor:'rgba(255,255,255,0.7)',
          textStyle:{
            color:'#000000',
            fontSize:13
          },
          formatter: (e, t, n) => {
            let data = e.data;

            return `
               <div>
                 <p><b style="font-size:15px;">${data.name}</b>(2021年访问量)</p>
                 <p class="tooltip_style"><span class="tooltip_left">访问总量</span><span class="tooltip_right">${data.value}</span></p>
               </div>`
          }
        },
        visualMap: {
          show:true,
          left: 26,
          bottom: 40,
          showLabel:true,
          pieces: [
            {
              gte: 100,
              label: ">= 1000",
              color: "#1f307b"
            },
            {
              gte: 500,
              lt: 999,
              label: "500 - 999",
              color: "#3c57ce"
            },
            {
              gte: 100,
              lt:499,
              label: "100 - 499",
              color: "#6f83db"
            },
            {
              gte: 10,
              lt: 99,
              label: "10 - 99",
              color: "#9face7"
            },
            {
              lt:10,
              label:'<10',
              color: "#bcc5ee"
            }
          ]
        },
        geo: {
          map: "china",
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1,
          top: 120,
          label: {
            normal: {
              show:true,
              fontSize: "14",
              color: "rgba(0,0,0,0.7)"
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: "#f2d5ad",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: {
          name: "突发事件",
          type: "map",
          geoIndex: 0,
          data:[],
          universalTransition: true
        }
      }
      this.barOptions = {
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: this.data.map(item => item.name)
        },
        visualMap: {
          show:true,
          right: 100,
          bottom: 100,
          showLabel:true,
          pieces: [
            {
              gte: 100,
              label: ">= 1000",
              color: "#1f307b"
            },
            {
              gte: 500,
              lt: 999,
              label: "500 - 999",
              color: "#3c57ce"
            },
            {
              gte: 100,
              lt:499,
              label: "100 - 499",
              color: "#6f83db"
            },
            {
              gte: 10,
              lt: 99,
              label: "10 - 99",
              color: "#9face7"
            },
            {
              lt:10,
              label:'<10',
              color: "#bcc5ee"
            }
          ]
        },
        series: {
          type: 'bar',
          id: 'population',
          data: this.data.map(item => this.colorMapper(item.value)),
          universalTransition: true
        }
      };
    },
    colorMapper(value){
      var color = "#9face7"
      if(value >= 1000) color = "#1f307b"
      else if(value >= 500) color = "#3c57ce"
      else if(value >= 100) color = "#6f83db"
      return {value: value, itemStyle: {color: color}}
    },
    getData(){
      this.$axios({
        method: 'get',
        url: '/log/findIp'
      }).then(res => {
        res.data.data
      })
    }
  },
  created() {
    this.$axios.get('/log/findIp')
        .then(res => {
      this.data = res.data.data
      this.data.push({name: "南海诸岛",
        value: 0,
        eventTotal:100,
        specialImportant:10,
        import:10,
        compare:10,
        common:40,
        specail:20})
      this.mapOptions.series.data = this.data
      this.data.sort((a, b) => a.value - b.value)
      this.barOptions.yAxis.data = this.data.map(item => item.name)
      this.barOptions.series.data = this.data.map(item => this.colorMapper(item.value))
      this.currentOption = this.currentOption === this.barOptions ? this.barOptions : this.mapOptions
      if(this.echarts !==null )
        this.echarts.setOption(this.currentOption, true)
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchartMap()
      this.mapOptions.series.data = this.data
      this.echarts.setOption(this.mapOptions)
      this.echarts.on('click', () => {
        this.currentOption = this.currentOption === this.barOptions ? this.mapOptions : this.barOptions
        this.echarts.setOption(this.currentOption, true)
      })
    })
  }
}
</script>

<style scoped>
    #china_map_box {
        height: 100%;
        position: relative;
    }
    #china_map_box #china_map{
        height: 100%;
    }
     #china_map_box .china_map_logo{
        position: absolute;
        top: 0;
        left: 0;
        width:45px;
     }
</style>

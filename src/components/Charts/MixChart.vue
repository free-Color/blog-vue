<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>

import {param} from "@/utils";

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      option: {
        backgroundColor: '#344b58',
        title: {
          text: '用户访问时间分析',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['female', 'male', 'average']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: null
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [0],
          bottom: 30,
          start: 0,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'
          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: 'average',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: null
        }]
      },
      year: null,
      months: {},
      days: {},
      index: {
        year: '',
        month: '1',
        day: '1'
      },
      axis: {
        year: [],
        month: [],
        day: []
      },
      mode: 0   //0: year, 1: month, 2: day
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.on('dataZoom', param => {
        if(param.batch[0].end-param.batch[0].start==100){
          if(this.mode === 2) this.setMonth(this.index.month)
          else if(this.mode === 1) this.setYear()
        }
      })
      this.chart.on('click', param => {
        if(this.mode === 0) this.setMonth(JSON.stringify(param.dataIndex + 1))
        else if(this.mode === 1) this.setDay(JSON.stringify(param.dataIndex))
      })
      this.setYear()
    },
    setYear(){
      if(this.year == null){
        this.year = [1,2,3,4,5,10,0,4]
      }
      if(this.axis.year.length !== 12){
        for (let i = 1; i < 13; i++) {
          this.axis.year.push(i)
        }
      }
      this.option.series[0].data = this.year
      this.option.xAxis[0].data = this.axis.year
      this.chart.setOption(this.option)
    },
    setMonth(index){
      this.mode = 1
      this.index.month = index
      if(this.months[index] == undefined){
        this.months[index] = [1,2,3,4,5,10,0,4,0,0,0,0,3,6,8,1]
      }
      if(this.axis.month.length !== 31){
        for (let i = 1; i < 32; i++) {
          this.axis.month.push(i)
        }
      }
      this.option.series[0].data = this.months[index]
      this.option.xAxis[0].data = this.axis.month
      this.chart.setOption(this.option)
    },
    setDay(index){
      // this.$message(JSON.stringify(2))
      this.mode = 2
      this.index.day = index
      if(this.days[this.index.month] == undefined){
        this.days[this.index.month] = {}
      }
      if(this.days[this.index.month][index] == undefined){
        this.days[this.index.month][index] = []
        this.days[this.index.month][index] = [1,2,3,4,5,10,0,4]
      }
      if(this.axis.day.length !== 24){
        for (let i = 1; i < 24; i++) {
          this.axis.day.push(i)
        }
      }
      this.option.series[0].data = this.days[this.index.month][index]
      this.option.xAxis[0].data = this.axis.day
      this.chart.setOption(this.option)
    },
  }
}
</script>

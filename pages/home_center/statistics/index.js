// miniprogram/pages/home_center/switch/index.js.js
import { getDevFunctions, getDeviceDetails, deviceControl } from '../../../utils/api/device-api'
import { getElectricity, getHourElectricity, getDayElectricity, getWeekElectricity, getMonthElectricity } from '../../../utils/api/device-api'
import wxMqtt from '../../../utils/mqtt/wxMqtt'

const lineChart = require('./line-chart/index.js');
let chart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 3,

    device_name: '',
    titleItem: {
      name: '',
      value: '',
    },
    roDpList: {}, //只上报功能点
    rwDpList: {}, //可上报可下发功能点
    isRoDpListShow: false,
    isRwDpListShow: false,
    forest: '../../../image/forest@2x.png',

    current_A: 0,
    current_V: 0,
    current_P: 0,
    today_electrics: 0,
    total_electrics: 0,
    deviceStatisticsList: {
      x: ['5-5', '5-6', '5-7', '5-8', '5-9', '5-10', '5-11'],
      y: [0, 0, 0, 0, 0, 0, 0],
    },
    ele_month_day: '',
    ele_month_day: '',
  },

  showWeek() {
    let { device_id, deviceStatisticsList, ele_week_day } = this.data
    console.log(deviceStatisticsList)
    deviceStatisticsList.x.length = 0
    deviceStatisticsList.y.length = 0
    console.log(deviceStatisticsList)
    // const device_id = '327508562cf43233d0ca'
    //当前日期
    let currentTime=new Date()
    currentTime=currentTime.getFullYear() + (currentTime.getMonth()> 9 ? (currentTime.getMonth() + 1) : "0" + (currentTime.getMonth() + 1)) + (currentTime.getDate()> 9 ? (currentTime.getDate()) : "0" + (currentTime.getDate()));
    console.log(currentTime,'这是当前日期，格式为20100101')
    // 一周前日期
    let week_time=(new Date).getTime()-7*24*60*60*1000;
    let aWeekAgoTime=new Date(week_time);
    aWeekAgoTime=aWeekAgoTime.getFullYear() + (aWeekAgoTime.getMonth()> 9 ? (aWeekAgoTime.getMonth() + 1) : "0" + (aWeekAgoTime.getMonth() + 1)) + (aWeekAgoTime.getDate()> 9 ? (aWeekAgoTime.getDate()) : "0" + (aWeekAgoTime.getDate()));
    console.log(aWeekAgoTime,'这是一周前日期，格式为20100101')
    // 一月前日期
    let month_time=(new Date).getTime()-30*24*60*60*1000;
    let aMonthAgoTime=new Date(month_time);
    aMonthAgoTime=aMonthAgoTime.getFullYear() + (aMonthAgoTime.getMonth()> 9 ? (aMonthAgoTime.getMonth() + 1) : "0" + (aMonthAgoTime.getMonth() + 1)) + (aMonthAgoTime.getDate()> 9 ? (aMonthAgoTime.getDate()) : "0" + (aMonthAgoTime.getDate()));
    console.log(aMonthAgoTime,'这是一月前日期，格式为20100101')

    // console.log(device_id, aWeekAgoTime, currentTime)
    // const tmp_ele_day = getDayElectricity(device_id, 'add_ele', aWeekAgoTime, currentTime)
    // console.log(tmp_ele_day)

    // let deviceStatisticsList = {
    //   x: [],
    //   y: []
    // }
    for(var key in ele_week_day.days){
      deviceStatisticsList.x.push(key);
      deviceStatisticsList.y.push(ele_week_day.days[key]);
    }
    console.log(deviceStatisticsList)

    chart = lineChart.init('chart', {
      tipsCtx: 'chart-tips',
      width: 320,                     // canvas的宽度
      height: 200,                    // canvas的高度
      labelColor: '#888888',          // label的颜色
      axisColor: '#d0d0d0',           // 轴的颜色
      xUnit: '',                      // x轴label的单位
      yUnit: 'KWh',                   // y轴label的单位
      xAxis: deviceStatisticsList.x,                    // x轴label数组
      lines: [{
          color: '#1296db',             // x轴label数组
          points: deviceStatisticsList.y  // 线的y轴值
      }],
      margin: 20,                     // 内容与边界的距离
      fontSize: 12                    // 文字大小 
    });
    chart.draw();

    this.setData(deviceStatisticsList)
  },

  showMonth() {
    let { device_id, deviceStatisticsList, ele_month_day } = this.data
    console.log(deviceStatisticsList)
    deviceStatisticsList.x.length = 0
    deviceStatisticsList.y.length = 0
    console.log(deviceStatisticsList)
    // const device_id = '327508562cf43233d0ca'
    //当前日期
    let currentTime=new Date()
    currentTime=currentTime.getFullYear() + (currentTime.getMonth()> 9 ? (currentTime.getMonth() + 1) : "0" + (currentTime.getMonth() + 1)) + (currentTime.getDate()> 9 ? (currentTime.getDate()) : "0" + (currentTime.getDate()));
    console.log(currentTime,'这是当前日期，格式为20100101')
    // 一月前日期
    let month_time=(new Date).getTime()-30*24*60*60*1000;
    let aMonthAgoTime=new Date(month_time);
    aMonthAgoTime=aMonthAgoTime.getFullYear() + (aMonthAgoTime.getMonth()> 9 ? (aMonthAgoTime.getMonth() + 1) : "0" + (aMonthAgoTime.getMonth() + 1)) + (aMonthAgoTime.getDate()> 9 ? (aMonthAgoTime.getDate()) : "0" + (aMonthAgoTime.getDate()));
    console.log(aMonthAgoTime,'这是一月前日期，格式为20100101')

    for(var key in ele_month_day.days){
      deviceStatisticsList.x.push(key);
      deviceStatisticsList.y.push(ele_month_day.days[key]);
    }
    console.log(deviceStatisticsList)

    chart = lineChart.init('chart', {
      tipsCtx: 'chart-tips',
      width: 320,                     // canvas的宽度
      height: 200,                    // canvas的高度
      labelColor: '#888888',          // label的颜色
      axisColor: '#d0d0d0',           // 轴的颜色
      xUnit: '',                      // x轴label的单位
      yUnit: 'KWh',                   // y轴label的单位
      xAxis: deviceStatisticsList.x,                    // x轴label数组
      lines: [{
          color: '#1296db',             // x轴label数组
          points: deviceStatisticsList.y  // 线的y轴值
      }],
      margin: 20,                     // 内容与边界的距离
      fontSize: 12                    // 文字大小 
    });
    chart.draw();

    this.setData(deviceStatisticsList)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { device_id } = options
    this.setData({ device_id })

    // mqtt消息监听
    wxMqtt.on('message', (topic, newVal) => {
      const { status } = newVal
      console.log(newVal)
      this.updateStatus(status)

      //更新界面显示的current_A, current_V, current_P
      const { device_id } = this.data
      const { functions = [] } = getDevFunctions(device_id)
      const { roDpList, rwDpList, current_A, current_V, current_P } = this.reducerDpList(status, functions)
      console.log(current_A, current_V, current_P)
      if (current_V == 0) {
        this.setData({ current_A, current_P })
      } else {
        this.setData({ current_A, current_V, current_P })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    const { device_id } = this.data
    const [{ name, status, icon }, { functions = [] }] = await Promise.all([
      getDeviceDetails(device_id),
      getDevFunctions(device_id),
    ]);

    const ele_total = await getElectricity(device_id, 'add_ele')
    console.log('ele_total',ele_total)
    console.log(ele_total.total)
    let total_electrics = ele_total.total
    // const ele_month = await getMonthElectricity(device_id, 'add_ele', '202104', '202105')
    // console.log('ele_month',ele_month)
    // const ele_hour = await getHourElectricity(device_id, 'add_ele', '2021051510', '2021051516')
    // console.log(ele_hour.hours)
    // var dt = new Date()
    // var year = dt.getFullYear()  //年
    // if (dt.getMonth() + 1 in [11, 12]) {
    //   var month = (dt.getMonth() + 1).toString();
    // } else {
    //   var month = '0' + (dt.getMonth() + 1).toString();
    // }
    //当前日期
    var currentTime=new Date()
    currentTime=currentTime.getFullYear() + (currentTime.getMonth()> 9 ? (currentTime.getMonth() + 1) : "0" + (currentTime.getMonth() + 1)) + (currentTime.getDate()> 9 ? (currentTime.getDate()) : "0" + (currentTime.getDate()));
    console.log(currentTime,'这是当前日期，格式为20100101')
    // 一周前日期
    var time=(new Date).getTime()-7*24*60*60*1000;
    var aWeekAgoTime=new Date(time);
    var month=aWeekAgoTime.getMonth();
    var day=aWeekAgoTime.getDate();
    aWeekAgoTime=aWeekAgoTime.getFullYear() + (aWeekAgoTime.getMonth()> 9 ? (aWeekAgoTime.getMonth() + 1) : "0" + (aWeekAgoTime.getMonth() + 1)) + (aWeekAgoTime.getDate()> 9 ? (aWeekAgoTime.getDate()) : "0" + (aWeekAgoTime.getDate()));
    console.log(aWeekAgoTime,'这是一周前日期，格式为20100101')
    // 一月前日期
    var time=(new Date).getTime()-30*24*60*60*1000;
    var aMonthAgoTime=new Date(time);
    var month=aMonthAgoTime.getMonth();
    var day=aMonthAgoTime.getDate();
    aMonthAgoTime=aMonthAgoTime.getFullYear() + (aMonthAgoTime.getMonth()> 9 ? (aMonthAgoTime.getMonth() + 1) : "0" + (aMonthAgoTime.getMonth() + 1)) + (aMonthAgoTime.getDate()> 9 ? (aMonthAgoTime.getDate()) : "0" + (aMonthAgoTime.getDate()));
    console.log(aMonthAgoTime,'这是一周前日期，格式为20100101')
    
    const ele_week_day = await getDayElectricity(device_id, 'add_ele', aWeekAgoTime, currentTime)
    const ele_month_day = await getDayElectricity(device_id, 'add_ele', aMonthAgoTime, currentTime)
    console.log('ele_day',ele_month_day)
    console.log(ele_month_day.days)

    let today_electrics = ele_month_day.days[currentTime]
    console.log(ele_month_day.days[currentTime])
    let deviceStatisticsList = {
      x: [],
      y: []
    }
    for(var key in ele_month_day.days){
      var tmp_month = key.slice(4,5)==0 ? key.slice(5,6) : key.slice(4,6)
      var tmp_day = key.slice(6,7)==0 ? key.slice(7,8) : key.slice(6,8)
      // console.log(tmp_month)
      // console.log(tmp_day)
      deviceStatisticsList.x.push(tmp_month + '-' + tmp_day);
      deviceStatisticsList.y.push(ele_month_day.days[key]);
    }

    const { roDpList, rwDpList, current_A, current_V, current_P } = this.reducerDpList(status, functions)


    // 获取头部展示功能点信息
    let titleItem = {
      name: '',
      value: '',
    };
    if (Object.keys(roDpList).length > 0) {
      let keys = Object.keys(roDpList)[0];
      titleItem = roDpList[keys];
    } else {
      let keys = Object.keys(rwDpList)[0];
      titleItem = rwDpList[keys];
    }

    const roDpListLength = Object.keys(roDpList).length
    const isRoDpListShow = Object.keys(roDpList).length > 0
    const isRwDpListShow = Object.keys(rwDpList).length > 0

    chart = lineChart.init('chart', {
      tipsCtx: 'chart-tips',
      width: 320,                     // canvas的宽度
      height: 200,                    // canvas的高度
      labelColor: '#888888',          // label的颜色
      axisColor: '#d0d0d0',           // 轴的颜色
      xUnit: '',                      // x轴label的单位
      yUnit: 'KWh',                   // y轴label的单位
      // xAxis: ['5-5', '5-6', '5-7', '5-8', '5-9', '5-10', '5-11'],                    // x轴label数组
      xAxis: deviceStatisticsList.x,                    // x轴label数组
      lines: [{
          color: '#1296db',             // x轴label数组
          // points: [0, 0, 0, 0, 0, 0.1, 0.1]  // 线的y轴值
          points: deviceStatisticsList.y  // 线的y轴值
      }],
      margin: 20,                     // 内容与边界的距离
      fontSize: 12                    // 文字大小 
    });
    chart.draw();

    this.setData({ titleItem, roDpList, rwDpList, device_name: name, isRoDpListShow, isRwDpListShow, roDpListLength, icon, deviceStatisticsList, today_electrics, total_electrics, current_A, current_V, current_P, ele_week_day, ele_month_day })
  },

  tipsStart: function(e) {
    let x = e.changedTouches[0].x;

    this.chartTipsShowing = true;
    chart.tipsByX(x);
  },

  tipsMove: function(e) {
    let x = e.changedTouches[0].x;

    if (this.chartTipsShowing) {
        chart.tipsByX(x);
    }
  },

  tipsEnd: function() {
    this.chartTipsShowing = false;
    chart.clearTips();
  },

  // tabbar 切换
  onChange(e) {
    this.setData({
      active: e.detail
    })
  },

  switchTap(e) {

  },

  // 分离只上报功能点，可上报可下发功能点
  reducerDpList: function (status, functions) {
    // 处理功能点和状态的数据
    let roDpList = {};
    let rwDpList = {};
    let current_V = 0;
    let current_P = 0;
    let current_A = 0;
    if (status && status.length) {
      status.map((item) => {
        const { code, value } = item;
        let isExit = functions.find(element => element.code == code);
        if (isExit) {
          let rightvalue = value
          // 兼容初始拿到的布尔类型的值为字符串类型
          if (isExit.type === 'Boolean') {
            rightvalue = value == 'true'
          }

          rwDpList[code] = {
            code,
            value: rightvalue,
            type: isExit.type,
            values: isExit.values,
            name: isExit.name,
          };
        } else {
          roDpList[code] = {
            code,
            value,
            name: code,
          };
          if (code == "cur_voltage") {
            current_V = value;
          } else if (code == "cur_power") {
            current_P = value;
          } else if (code == "cur_current") {
            current_A = value;
          }
        }
      });
    }
    return { roDpList, rwDpList, current_A, current_V, current_P }
  },

  sendDp: async function (e) {
    const { dpCode, value } = e.detail
    const { device_id } = this.data

    const { success } = await deviceControl(device_id, dpCode, value)
  },

  updateStatus: function (newStatus) {
    let { roDpList, rwDpList, titleItem, current_A, current_V, current_P } = this.data
 
    newStatus.forEach(item => {
      const { code, value } = item

      if (typeof roDpList[code] !== 'undefined') {
        roDpList[code]['value'] = value;
        // 更新current_AVP
        if (roDpList[code] == "cur_current") {
          current_A = value;
        } else if (roDpList[code] == "cur_voltage") {
          current_V = value;
        } else if (roDpList[code] == "cur_power") { 
          current_P = value;
        }
      } else if (rwDpList[code]) {
        rwDpList[code]['value'] = value;
      }
    })

    // if (!roDpList) {
    //   let current_P = roDpList["cur_power"]
    //   let current_V = roDpList["cur_voltage"]
    //   console.log(current_V)
    // }

    // 更新titleItem
    if (Object.keys(roDpList).length > 0) {
      let keys = Object.keys(roDpList)[0];
      titleItem = roDpList[keys];
    } else {
      let keys = Object.keys(rwDpList)[0];
      titleItem = rwDpList[keys];
    }
 
    this.setData({ titleItem, roDpList: { ...roDpList }, rwDpList: { ...rwDpList }, current_A, current_V, current_P })
  },

  jumpTodeviceEditPage: function(){
    console.log('jumpTodeviceEditPage')
    const { icon, device_id, device_name } = this.data
    wx.navigateTo({
      url: `/pages/home_center/device_manage/index?device_id=${device_id}&device_name=${device_name}&device_icon=${icon}`,
    })
  },

  jumpToSwitchPage: function(){
    console.log('jumpToSwitchPage')
    const { icon, device_id, device_name } = this.data
    wx.redirectTo({
      url: `/pages/home_center/switch/index?device_id=${device_id}&device_name=${device_name}&device_icon=${icon}`,
    })
  },

  jumpToTimingPage: function(){
    console.log('jumpToTimingPage')
    const { icon, device_id, device_name } = this.data
    wx.redirectTo({
      url: `/pages/home_center/timing/index?device_id=${device_id}&device_name=${device_name}&device_icon=${icon}`,
    })
  },

  jumpToCountdownPage: function(){
    console.log('jumpToCountdownPage')
    const { icon, device_id, device_name } = this.data
    wx.redirectTo({
      url: `/pages/home_center/count_down/index?device_id=${device_id}&device_name=${device_name}&device_icon=${icon}`,
    })
  },

  jumpToStatisticsPage: function(){
    console.log('jumpToStatisticsPage')
    const { icon, device_id, device_name } = this.data
    wx.redirectTo({
      url: `/pages/home_center/statistics/index?device_id=${device_id}&device_name=${device_name}&device_icon=${icon}`,
    })
  }
})
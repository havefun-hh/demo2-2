// miniprogram/pages/home_center/switch/index.js.js
import { getDevFunctions, getDeviceDetails, deviceControl } from '../../../utils/api/device-api'
import wxMqtt from '../../../utils/mqtt/wxMqtt'
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import { addTimingTask } from '../../../utils/api/device-api'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,

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

    show_setting: false,
    show_time_setting: false,
    show_switch_setting: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } 
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    columns_switch: ['开', '关'],
    columns_date: [
      {
        values: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
        className: '月',
      },
      {
        values: ['01日', '02日', '03日', '04日', '05日', '06日', '07日', '08日', '09日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17', '18', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日'],
        className: '日',
        defaultIndex: 2,
      },
      {
        values: ['0小时', '01小时', '02小时', '03小时', '04小时', '05小时', '06小时', '07小时', '08小时', '09小时', '10小时', '11小时', '12小时', '13小时', '14小时', '15小时', '16小时', '17小时', '18小时', '19小时', '20小时', '21小时', '22小时', '23小时'],
        className: '小时',
        defaultIndex: 3,
      },
      {
        values: ['00分钟', '01分钟', '02分钟', '03分钟', '04分钟', '05分钟', '06分钟', '07分钟', '08分钟', '09分钟', '10分钟', '11分钟', '12分钟', '13分钟', '14分钟', '15分钟', '16分钟', '17分钟', '18分钟', '19分钟', '20分钟', '21分钟', '22分钟', '23分钟', '24分钟', '25分钟', '26分钟', '27分钟', '28分钟', '29分钟', '30分钟', '31分钟', '32分钟', '33分钟', '34分钟', '35分钟', '36分钟', '37分钟', '38分钟', '39分钟', '40分钟', '41分钟', '42分钟', '43分钟', '44分钟', '45分钟', '46分钟', '47分钟', '48分钟', '49分钟', '50分钟', '51分钟', '52分钟', '53分钟', '54分钟', '55分钟', '56分钟', '57分钟', '58分钟', '59分钟'],
        className: '分钟',
        defaultIndex: 4,
      },
    ],
    switch_status: false,
    timeTask: '',
  },

  // Popup 弹出层
  showSettingPopup() {
    this.setData({ show_setting: true });
  },

  showTimeSettingPopup() {
    this.setData({ show_time_setting: true });
  },

  showSwitchSettingPopup() {
    this.setData({ show_switch_setting: true });
  },

  onClose() {
    this.setData({ show_setting: false, show_time_setting: false, show_switch_setting: false });
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },

  timeConfirm: function () {
    Toast('确认');
    var datetime_picker = this.selectComponent('#datetime-picker')
    let timeTask = this.data
    const datetime = datetime_picker.getValues()
    console.log(datetime)
    timeTask = datetime[0].slice(0,2) + datetime[1].slice(0,2) + datetime[2].slice(0,2) + datetime[3].slice(0,2)
    this.setData({ show_time_setting: false, timeTask });
  },
  
  timeCancel: function () {
    Toast('取消');
    this.setData({ show_time_setting: false });
  },

  switchConfirm: function () {
    Toast('确认');
    var switch_picker = this.selectComponent('#switch-picker')
    let switch_status = this.data
    if (switch_picker.getValues()[0] == "开") {
      switch_status = true
    } else {
      switch_status = false
    }
    // const switch_status = switch_picker.getValues()
    console.log(switch_status)
    this.setData({ show_switch_setting: false, switch_status });
  },
  
  switchCancel: function () {
    Toast('取消');
    this.setData({ show_switch_setting: false });
  },

  confirmButton: function() {
    Toast('设置成功')
    let { device_id, timeTask } = this.data
    let dt = new Date()
    let year = dt.getFullYear()  //年
    let customDate = year + timeTask.slice(0,4)
    let customTime = timeTask.slice(4,6) + ":" + timeTask.slice(6,8)
    console.log(customDate, customTime)
    // const timingTaskRes = addTimingTask(device_id, customDate, customTime)
    // console.log(timingTaskRes)
    this.setData({ show_setting: false, show_time_setting: false, show_switch_setting: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    
  },

  // tabbar 切换
  onChange(e) {
    this.setData({
      active: e.detail
    })
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
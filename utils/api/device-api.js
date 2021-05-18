import request from '../request'
// request 做了自动向params中添加uid的操作，因此可以不带入uid

// 获取mqtt配置
export const getMqttconfig = () => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.openHubConfig',
      params: {
        link_id: Math.random()
          .toString(10)
          .substring(2, 11),
        link_type: 'websocket'
      }
    }
  })
}

// 获取设备列表 
export const getDeviceList = () => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.getDeviceList',
      params: {}
    }
  })
}

// 获取设备最新状态
export const getDeviceStatus = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.status',
      params: {
        device_id
      }
    }
  })
}

// 获取设备指令集
export const getDeviceSpecifications = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.specifications',
      params: {
        device_id
      }
    }
  })
}

// 获取设备指令集(带中文dp名称)
export const getDevFunctions = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.functions',
      params: {
        device_id
      }
    }
  })
}

// 获取设备指令集(带中文dp名称)
export const getDeviceDetails = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.details',
      params: {
        device_id
      }
    }
  })
}


// 指令下发
export const deviceControl = (device_id, code, value) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.control',
      params: {
        device_id,
        commands: [
          {
            code,
            value
          }
        ]
      }
    }
  })
}

// 获取 ticket
export const reqTicket = () =>
  request({
    name: 'ty-service',
    data: {
      action: 'system.userTicket',
      params: {}
    }
  });

// 获取设备用电量
// export const getDeviceStatistics = (device_id) => {
//   return request({
//     name: 'ty-service',
//     data: {
//       action: "statistics.days",
//       "params": {
//         "device_id":device_id,
//         "code":"electricity",
//         "start_day":"20210505",
//         "end_day":"20210512"
//       }
//     }
//   })
// }

export const getElectricity = (device_id,code) => {
  return request({
    name: 'ty-service',
    data: {
      action: "statistics.total",
      "params": {
        device_id,
        code
      }
    }
  })
}

export const getHourElectricity = (device_id,code,start_hour,end_hour) => {
  return request({
    name: 'ty-service',
    data: {
      action: "statistics.hours",
      "params": {
        device_id,
        code,
        start_hour,
        end_hour
      }
    }
  })
}

export const getDayElectricity = (device_id,code,start_day,end_day) => {
  return request({
    name: 'ty-service',
    data: {
      action: "statistics.days",
      "params": {
        device_id,
        code,
        start_day,
        end_day
      }
    }
  })
}

export const getWeekElectricity = (device_id,code,start_week,end_week) => {
  return request({
    name: 'ty-service',
    data: {
      action: "statistics.weeks",
      "params": {
        device_id,
        code,
        start_week,
        end_week
      }
    }
  })
}

export const getMonthElectricity = (device_id,code,start_month,end_month) => {
  return request({
    name: 'ty-service',
    data: {
      action: "statistics.months",
      "params": {
        device_id,
        code,
        start_month,
        end_month
      }
    }
  })
}

//添加定时
export const addTimingTask = (device_id,value,custonmDate,customTime) => {
  return request({
    name: 'ty-service',
    data: {
      action: "timer.add",
      "params": {
        device_id,
        "loops":"0000000",
        "category":"test",
        "timezone_id":"Asia/Shanghai",
        "time_zone":"+8:00",
        "instruct":[
          {
              "functions":[
                  {
                      "code":"switch",
                      "value":value
                  }
                  // {
                  //   "code":"switch_vertical",
                  //     "value":true
                  // }
              ],
              "date":custonmDate,
              "time":customTime
          }
      ]
      }
    }
  })
}

//查询定时任务
export const getTimingTask = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: "timer.listByCategory",
      "params": {
        device_id,
        "category":"test",
      }
    }
  })
}
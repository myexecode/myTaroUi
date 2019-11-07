import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './down_refresh.scss'

class DownRefresh extends Component {

  config = {
    navigationBarTitleText: '下拉刷新'
  }

  render() {
    return (
      <View className='down_refresh'>
        down_refresh
      </View>
    )
  }

}
export default DownRefresh;
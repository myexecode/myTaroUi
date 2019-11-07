import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CtTabbar from '../../compponents/ct_tabbar/ct_tabbar'

import './tabbar_page.scss'

class TabbarPage extends Component {

  config = {
    navigationBarTitleText: '标签栏'
  }

  render() {
    return (
      <View className='tabbar_page'>
        <CtTabbar />
      </View>
    )
  }

}
export default TabbarPage;
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CtParse from '../../compponents/wxParse/ct_parse'

import './xml_parse.scss'

class XmlParse extends Component {

  config = {
    navigationBarTitleText: '富文本'
  }

  state = {
    data: `<div style='line-height:30px;color:pink;'>
    <p>富文本富文本富文本富文本富文本富文本</p>
    <p>富文本富文本富文本富文本富文本富文本</p>
    <p>富文本富文本富文本富文本富文本富文本</p>
    <p>富文本富文本富文本富文本富文本富文本</p>
    <p>富文本富文本富文本富文本富文本富文本</p>
    <p>富文本富文本富文本富文本富文本富文本</p>
    <p>富文本富文本富文本富文本富文本富文本</p>
    </div>`
  }

  componentDidMount(){

  }
  render() {
    let {data} = this.state;
    return (
      <View className='xml_parse'>
        <CtParse />
      </View>
    )
  }
}
export default XmlParse;
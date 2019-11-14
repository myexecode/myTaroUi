import TaroEmojiViewTmpl from './TaroEmojiViewTmpl'
import TaroParseBrTmpl from './TaroParseBrTmpl'
import TaroParseImgTmpl from './TaroParseImgTmpl'
import TaroParseVideoTmpl from './TaroParseVideoTmpl'
// import TaroParsebcTmpl from './TaroParsebcTmpl'
import { Block, View, Video, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroParsebbTmpl extends Taro.Component {
  static defaultProps = {
    data: null
  }
  componentDidMount(){
    console.log('template is end !!!');
  }
  render() {
    let { data: item } = this.props;
    return (
      <View className=''>template is end !!!</View>
    )
  }

  static options = {
    addGlobalClass: true
  }
}

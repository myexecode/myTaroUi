import { Block, View, Video, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroParseBrTmpl extends Taro.Component {
  render() {
    return (
      <Block>
        <Text>\n</Text>
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}

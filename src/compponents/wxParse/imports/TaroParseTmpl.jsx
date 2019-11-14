import TaroParsezTmpl from './TaroParsezTmpl'
import { Block, View, Video, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroParseTmpl extends Taro.Component {
  render() {
    const {
      data: { wxParseData }
    } = this.props
    return (
      <Block>
        {wxParseData.map((item, index) => {
          return (
            <Block key={item.id || index} taroKey={item.id || index}>
              <TaroParsezTmpl data={item}></TaroParsezTmpl>
            </Block>
          )
        })}
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}

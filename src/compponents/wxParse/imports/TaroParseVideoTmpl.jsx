import { Block, View, Video, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroParseVideoTmpl extends Taro.Component {
  static defaultProps = {
    data: null
  }
  render() {
    const { data: item } = this.props
    return (
      <Block>
        {
          item ?
            <View
              className={item.classStr + ' wxParse-' + item.tag}
              style={item.styleStr}
            >
              <Video
                className={item.classStr + ' wxParse-' + item.tag + '-video'}
                src={item.attr.src}
              ></Video>
            </View>
            : null
        }
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}

import { Block, View, Video, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroEmojiViewTmpl extends Taro.Component {

  static defaultProps = {
    data: {}
  }

  render() {
    let { data: item={} } = this.props
    return (
      <Block>
        {
          item.textArray ?
            <View className="WxEmojiView wxParse-inline" style={item.styleStr}>
              {item.textArray.map((ite, index) => {
                return (
                  <Block key={ite.id || index} taroKey={ite.id || index}>
                    {ite.node == 'text' ? (
                      <Block className={ite.text == '\\n' ? 'wxParse-hide' : ''}>
                        {ite.text}
                      </Block>
                    ) : (
                        ite.node == 'element' && (
                          <Block>
                            <Image
                              className="wxEmoji"
                              src={ite.baseSrc + ite.text}
                            ></Image>
                          </Block>
                        )
                      )}
                  </Block>
                )
              })}
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

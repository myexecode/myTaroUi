import TaroEmojiViewTmpl from './TaroEmojiViewTmpl'
import TaroParseBrTmpl from './TaroParseBrTmpl'
import TaroParseImgTmpl from './TaroParseImgTmpl'
import TaroParseVideoTmpl from './TaroParseVideoTmpl'
import TaroParsebTmpl from './TaroParsebTmpl'
import { Block, View, Video, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroParsezTmpl extends Taro.Component {
  static defaultProps = {
    data: {nodes:[]}
  }
  render() {
    let { data: item={} } = this.props;
    item = {nodes:[],...item};
    return (
      <View>
        {/* 判断是否是标签节点 */}
        {item.node == 'element' ? (
          <View>
            {item.tag == 'button' ? (
              <View>
                <Button type="default" size="mini">
                  {item.nodes && item.nodes.length ?item.nodes.map((ite, index) => {
                    return (
                      <View key={ite.id || index} taroKey={ite.id || index}>
                        <TaroParsebTmpl data={ite}></TaroParsebTmpl>
                      </View>
                    )
                  }):null}
                </Button>
              </View>
            ) : item.tag == 'li' ? (
              <View>
                <View
                  className={item.classStr + ' wxParse-li'}
                  style={item.styleStr}
                >
                  <View className={item.classStr + ' wxParse-li-inner'}>
                    <View className={item.classStr + ' wxParse-li-text'}>
                      <View
                        className={item.classStr + ' wxParse-li-circle'}
                      ></View>
                    </View>
                    <View className={item.classStr + ' wxParse-li-text'}>
                      {item.nodes && item.nodes.length ?item.nodes.map((ite, index) => {
                        return (
                          <View key={ite.id || index} taroKey={ite.id || index}>
                            <TaroParsebTmpl data={ite}></TaroParsebTmpl>
                          </View>
                        )
                      }):null}
                    </View>
                  </View>
                </View>
              </View>
            ) : item.tag == 'video' ? (
              <View>
                <TaroParseVideoTmpl data={item}></TaroParseVideoTmpl>
              </View>
            ) : item.tag == 'img' ? (
              <View>
                <TaroParseImgTmpl data={item}></TaroParseImgTmpl>
              </View>
            ) : item.tag == 'a' ? (
              <View>
                <View
                  onClick={this.wxParseTagATap}
                  className={
                    'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag
                  }
                  data-src={item.attr.href}
                  style={item.styleStr}
                >
                  {item.nodes && item.nodes.length ?item.nodes.map((ite, index) => {
                    return (
                      <View key={ite.id || index} taroKey={ite.id || index}>
                        <TaroParsebTmpl data={ite}></TaroParsebTmpl>
                      </View>
                    )
                  }):null}
                </View>
              </View>
            ) : item.tag == 'table' ? (
              <View>
                <View
                  className={item.classStr + ' wxParse-' + item.tag}
                  style={item.styleStr}
                >
                  {item.nodes && item.nodes.length ?item.nodes.map((ite, index) => {
                    return (
                      <View key={ite.id || index} taroKey={ite.id || index}>
                        <TaroParsebTmpl data={ite}></TaroParsebTmpl>
                      </View>
                    )
                  }):null}
                </View>
              </View>
            ) : item.tag == 'br' ? (
              <View>
                <TaroParseBrTmpl></TaroParseBrTmpl>
              </View>
            ) : item.tagType == 'block' ? (
              <View>
                <View
                  className={item.classStr + ' wxParse-' + item.tag}
                  style={item.styleStr}
                >
                  {item.nodes && item.nodes.length ?item.nodes.map((ite, index) => {
                    return (
                      <View key={ite.id || index} taroKey={ite.id || index}>
                        <TaroParsebTmpl data={ite}></TaroParsebTmpl>
                      </View>
                    )
                  }):null}
                </View>
              </View>
            ) : (
              <View
                className={
                  item.classStr +
                  ' wxParse-' +
                  item.tag +
                  ' wxParse-' +
                  item.tagType
                }
                style={item.styleStr}
              >
                {item.nodes && item.nodes.length ?item.nodes.map((ite, index) => {
                  return (
                    <View key={ite.id || index} taroKey={ite.id || index}>
                      <TaroParsebTmpl data={ite}></TaroParsebTmpl>
                    </View>
                  )
                }):null}
              </View>
            )}
            {/* li类型 */}
            {/* video类型 */}
            {/* img类型 */}
            {/* a类型 */}
            {/* 其他块级标签 */}
            {/* 内联标签 */}
          </View>
        ) : (
          item.node == 'text' && (
            <View>
              <TaroEmojiViewTmpl data={item}></TaroEmojiViewTmpl>
            </View>
          )
        )}
        {/* 判断是否是文本节点 */}
      </View>
    )
  }

  static options = {
    addGlobalClass: true
  }
}

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './ct_tabbar.scss'

class CtTabbar extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      currentIndex: 0,
      positionClassArr: ['','ct_tabbar_fixed_bottom','ct_tabbar_fixed_top']
    };
  }

  // 切换tab
  onClickHandler(item,index){
   
    this.setState({
      currentIndex: index
    })
    this.props.onClickEv&&this.props.onClickEv();
  };

  render() {
    let { currentIndex, positionClassArr } = this.state;
    let { list, color, selectedColor, bgColor, brColor } = this.props;
    return (
      <View
        className={`${positionClassArr[position]} ct_tabbar`}
        style={`border-top-color: ${brColor};background: ${bgColor};`}
      >
        {
          list.length ?
            list.map((item, index) => {
              return (
                <View
                  className={`tb_item ${currentIndex==index?'tb_item_selected':''}`}
                  key={item.id || index}
                  taroKey={item.id || index}
                  style={`color: ${currentIndex==index?selectedColor:color};`}
                  onClick={this.onClickHandler.bind(this,item,index)}
                >
                  <Image className='tb_item_icon' />
                  <Text className='tb_item_txt'>{item.txt}</Text>
                </View>
              )
            })
            : null
        }
      </View>
    )
  }

}
CtTabbar.defaultProps = {
  list: [{txt: '页面一', pagePath: ''}, {txt: '页面二', pagePath: ''}],
  color: '#cccccc', // 默认字体颜色
  selectedColor: '#07c160', // 选中的字体颜色
  bgColor: '#ffffff', // 背景色
  brColor: '#cccccc', // 边框颜色
  onClickEv: null,
  position: 1  // 固定位置 0-不固定，1-固定底部，2-固定头部
};
export default CtTabbar;
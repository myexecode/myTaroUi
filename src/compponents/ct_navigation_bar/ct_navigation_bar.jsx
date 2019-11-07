import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './ct_navigation_bar.scss'

// 自定义导航栏组件
const systemInfo = Taro.getSystemInfoSync();

class CtNavigationBar extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      titleBarHeight: 44
    }
  }

  componentDidMount() {
    let isIpx = systemInfo.system.indexOf('iOS') > -1;
    // ios 中标题栏高度是48PX
    if (isIpx) {
      this.setState({
        titleBarHeight: 48
      })
    }
  }

  // 点击左侧按钮
  onLeftClickHandler = () => {
    this.props.onLeftClicEv&&this.props.onLeftClicEv();
  };

  render() {
    let { leftArrow, leftTxt, name, bgColor, txtColor } = this.props;
    let { titleBarHeight } = this.state;
    return (
      <View
        className='custom_navigation_bar'
        style={`padding-top: ${systemInfo.statusBarHeight}px;background: ${bgColor};color: ${txtColor};`}
      >
        <View className='custom_title_bar flex_box' style={`height: ${titleBarHeight}px;`}>

          <View className='title_bar_left flex_box' onClick={this.onLeftClickHandler}>
            {leftArrow ? <Text className='title_bar_left_arrow'>{'<'}</Text> : null}
            {leftTxt ? <Text className='title_bar_left_txt'>{leftTxt}</Text> : null}
          </View>

          {name ? <View className='title_bar_name_placeholder'> </View> : null}
          {name ? <View className='title_bar_name flex_box'><Text className='title_bar_name_txt single_line_ellipsis'>{name}</Text></View> : null}

          {this.props.children}
        </View>
      </View>
    );
  }
}
CtNavigationBar.defaultProps = {
  leftArrow: false, // 是否使用默认的左箭头
  leftTxt: '',
  name: 'nav',
  bgColor: '#ffffff', // 背景色
  txtColor: '#333333' // 字体色
};
export default CtNavigationBar;
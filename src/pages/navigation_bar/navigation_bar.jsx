import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import CtNavigationBar from '../../compponents/ct_navigation_bar/ct_navigation_bar'

import './navigation_bar.scss'

class NavigationBar extends Component {

  config = {
    navigationStyle: 'custom'
  }

  constructor() {
    super(...arguments);
    this.state = {
      leftArrow: false,
      leftTxt: '返回',
      name: '导航栏',
      bgColor: '#ffffff',
      txtColor: '#333333'
    };
  }

  // 返回
  onLeftClicFn = () => {
    Taro.navigateBack();
  };

  // 改颜色
  onChangeColor1 = () => {
    this.setState({
      bgColor: '#333333',
      txtColor: '#ffffff'
    })
  };
  onChangeColor2 = () => {
    this.setState({
      bgColor: '#ffffff',
      txtColor: '#333333'
    })
  };

  // 改文字
  onChangeText1 = () => {
    this.setState({
      leftArrow: false,
      leftTxt: '返回'
    })
  };
  onChangeText2 = () => {
    this.setState({
      leftArrow: true,
      leftTxt: ''
    })
  };

  render() {
    let {
      leftArrow,
      leftTxt,
      name,
      bgColor,
      txtColor
    } = this.state;
    return (
      <View className='navigation_bar'>
        <CtNavigationBar
          leftTxt={leftTxt}
          name={name}
          bgColor={bgColor}
          txtColor={txtColor}
          leftArrow={leftArrow}
          onLeftClicEv={this.onLeftClicFn}
        />

        <View className='btn_wrap'>
          <Button className='btn' onClick={this.onChangeColor1}>颜色 333 - fff</Button>
          <Button className='btn' onClick={this.onChangeColor2}>颜色 fff - 333</Button>
          
          <Button className='btn' onClick={this.onChangeText2}>left 箭头</Button>
          <Button className='btn' onClick={this.onChangeText1}>left 文字</Button>
        </View>
      </View>
    )
  }

}
export default NavigationBar;
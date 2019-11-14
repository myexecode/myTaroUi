import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './ct_button.scss'

class CtButton extends Component {

  state = {
    isLoding: false
  }

  // 点击
  onClickFn = () => {
    let {repeatClickDetection} = this.props;
    if(repeatClickDetection){
      if(this.state.isLoding){
        console.log('请勿重复点击');
        return;
      }
      this.setState({
        isLoding: true
      })
    }
    this.props.onClickEv&&this.props.onClickEv(() => {
      this.setState({
        isLoding: false
      })
    });
  };

  render() {
    let {isLoding} = this.state;
    let {txt} = this.props;
    return (
      <View className={`ct_button ${isLoding?'ct_button_loading':''}`} onClick={this.onClickFn}>
        <Text className={`ct_button_icon ${isLoding?'':'ct_button_icon_hide'}`}></Text>
        <Text className='ct_button_txt'>{txt}</Text>
      </View>
    )
  }
}
CtButton.defaultProps={
  txt: '按钮',
  onClickEv: null,
  repeatClickDetection: false // 是否开启重复点击检测
};
export default CtButton;
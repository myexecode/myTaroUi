import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input} from '@tarojs/components'
import CtButton from '../../compponents/ct_button/ct_button' // 按钮

import './form_page.scss'

class FormPage extends Component {

  config = {
    navigationBarTitleText: '表单'
  }

  state = {
    numberV: 0
  };

  // 点击按钮
  onButtonClickEvHandler = (callback) => {
    console.log('表单表单表单');
    setTimeout(() => {
      callback&&callback();
    }, 2000);
  };

  // 数字输入框
  onNumberInputHandler = (e) => {
    console.log(e,'数字输入框');

  };

  render() {
    let {numberV} = this.state;
    return (
      <View className='form_page'>
        <CtButton
          repeatClickDetection
          onClickEv={this.onButtonClickEvHandler}
        />
        
        <View>数字验证</View>
        <Input className='ct_input' type='number' value={numberV} onInput={this.onNumberInputHandler} />
      </View>
    )
  }

}
export default FormPage;
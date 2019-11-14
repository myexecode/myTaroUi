import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CtButton from '../../compponents/ct_button/ct_button' // 按钮

import './form_page.scss'

class FormPage extends Component {

  config = {
    navigationBarTitleText: '表单'
  }

  // 点击按钮
  onButtonClickEvHandler = (callback) => {
    console.log('表单表单表单');
    setTimeout(() => {
      callback&&callback();
    }, 2000);
  };

  render() {
    return (
      <View className='form_page'>
        <CtButton
          repeatClickDetection
          onClickEv={this.onButtonClickEvHandler}
        />
      </View>
    )
  }

}
export default FormPage;
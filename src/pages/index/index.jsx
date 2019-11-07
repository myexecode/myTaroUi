import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, ScrollView } from '@tarojs/components'
import CtModal from '../../compponents/ct_modal/ct_modal'

import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments);
    this.state = {
      modalIsOpen: false
    };
  }

  openHandler = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  };

  thandler = () => {
    console.log('thandler')
  };
  render() {
    let { modalIsOpen } = this.state;
    return (
      <View className='index'>
        <Button onClick={this.openHandler}>打开</Button>

        <CtModal isOpen={modalIsOpen} type='1' onCloseEv={this.openHandler} >
          <View className='box'>dsdfsfds</View>
        </CtModal>
      </View>
    )
  }
}

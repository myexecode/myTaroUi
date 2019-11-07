import Taro, { Component } from '@tarojs/taro'
import { View, Text,Button } from '@tarojs/components'
import CtModal from '../../compponents/ct_modal/ct_modal'

import './modal_page.scss'

class ModalPage extends Component {

  config = {
    navigationBarTitleText: '模态框'
  }

  constructor() {
    super(...arguments);
    this.state = {
      modalIsOpen1: false,
      modalIsOpen2: false,
      modalIsOpen3: false,
      modalIsOpen4: false
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    // console.log('aaa');
    return true;
  }
  
  // 打开或关闭模态框
  onChangeModalHandler = () => {
    // console.log('modal 1');
    this.setState({
      modalIsOpen1: !this.state.modalIsOpen1
    })
  };
  onChangeLayoutHandler = () => {
    // console.log('modal 2');
    this.setState({
      modalIsOpen2: !this.state.modalIsOpen2
    })
  };
  onChangeLeftDrawerHandler = () => {
    // console.log('modal 3');
    this.setState({
      modalIsOpen3: !this.state.modalIsOpen3
    })
  };
  onChangeRightDrawerHandler = () => {
    // console.log('modal 4');
    this.setState({
      modalIsOpen4: !this.state.modalIsOpen4
    })
  };

  render() {
    let {
      modalIsOpen1,
      modalIsOpen2,
      modalIsOpen3,
      modalIsOpen4,
    } = this.state;
    return (
      <View className='modal_page'>

        <Button className='btn' onClick={this.onChangeModalHandler}>modal</Button>
        <Button className='btn' onClick={this.onChangeLayoutHandler}>layout</Button>
        <Button className='btn' onClick={this.onChangeLeftDrawerHandler}>left drawer</Button>
        <Button className='btn' onClick={this.onChangeRightDrawerHandler}>right drawer</Button>

        <CtModal isOpen={modalIsOpen1} onCloseEv={this.onChangeModalHandler} />
        <CtModal isOpen={modalIsOpen2} type='1' onCloseEv={this.onChangeLayoutHandler} />
        <CtModal isOpen={modalIsOpen3} type='2' onCloseEv={this.onChangeLeftDrawerHandler} />
        <CtModal isOpen={modalIsOpen4} type='3' onCloseEv={this.onChangeRightDrawerHandler} />
      </View>
    )
  }

}
export default ModalPage;
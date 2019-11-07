import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './ct_modal.scss'

class CtModal extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      openedNum: 1, // 控制外框的显示和隐藏
      bodyOpenedNum: 1, // 控制内容区和mask的显示和隐藏
      typeArr: ['ctmodal_body_base', 'ctmodal_body_layout', 'ctmodal_body_drawerL', 'ctmodal_body_drawerR']
    };
  }

  componentWillMount() {
    let { isOpen } = this.props;
    // console.log('componentWillMount');
    this.state.openedNum = isOpen ? 2 : 1;
  }

  shouldComponentUpdate(nextProps, nextState){
    // console.log(nextState.openedNum , nextState.openedNum, 'shouldComponentUpdate')
    if(nextProps.isOpen == this.props.isOpen && nextState.openedNum == this.state.openedNum){
      // console.log(nextProps.type,'shouldComponentUpdate false');
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.isOpen ,this.props.isOpen, 'receive');
    if (nextProps.isOpen !== this.props.isOpen) {
      this.changeOpenedNumHandler();
    }
  }

  onClose = () => {
    // console.log(this.props.type, 'close');
    if(!this.props.closeOnClickOverlay){
      return;
    }
    if (this.props.onCloseEv) {
      this.props.onCloseEv();
    } else {
      this.changeOpenedNumHandler();
    }
  };

  // 改变openedNum值
  changeOpenedNumHandler = () => {
    // console.log('改变openedNum值');
    let { openedNum } = this.state;
    openedNum++;
    if (openedNum % 2 == 1) {
      let timer = this.props.timer;
      setTimeout(() => {
        this.setState({ openedNum });
      }, timer);
      this.setState({
        bodyOpenedNum: openedNum
      })
    } else {
      this.setState({
        openedNum,
        bodyOpenedNum: openedNum
      });
    }
  };

  // 阻止默认事件
  catchEvent(e) {
    e.stopPropagation();
  }

  render() {
    let { openedNum, typeArr, bodyOpenedNum } = this.state;
    let { type, timer, mask, bodyBg } = this.props;
    // console.log(type,'render');
    return (
      <View
        className={`ct_modal_base ${openedNum % 2 == 0 ? '' : 'ct_modal_base_close'}`}
        onTouchMove={this.catchEvent}
      >
        {
          mask ?
            <View
              className={`ct_modal_mask ${bodyOpenedNum % 2 == 0 ? 'ct_modal_mask_show' : ''}`}
              style={`transition-duration: ${timer}ms`}
              onClick={this.onClose}
            ></View>
            : null
        }
        <View
          className={`ctmodal_body ${typeArr[type]+''} ${bodyOpenedNum % 2 == 0 ? typeArr[type] + '_show' : ''}`}
          onClick={this.catchEvent}
          style={`transition-duration: ${timer}ms;background: ${bodyBg};`}
        >
          {this.props.children}
        </View>
      </View>
    )
  }

}
CtModal.defaultProps = {
  bodyBg: '#ffffff', // 内容区的背景色
  closeOnClickOverlay: true, // 点击浮层的时候时候是否自动关闭
  mask: true, // 是否需要遮罩
  timer: '350', // 过度动画时间 单位ms 建议不要低于350否则可能会出现事件穿透的问题
  type: 0, // 类型 0-弹框 1-layout 2-抽屉 3-从右侧滑出抽屉
  isOpen: false, // 是否显示模态框
  onCloseEv: null // 触发关闭时的事件
};
export default CtModal;
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './ct_modal.scss'

class CtModal extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      openedNum: 1,
      bodyOpenedNum: 1,
      typeArr: ['ctmodal_body_base', 'ctmodal_body_layout', 'ctmodal_body_drawerL', 'ctmodal_body_drawerR']
    };
  }

  componentWillMount() {
    let { isOpen } = this.props;
    this.state.openedNum = isOpen ? 2 : 1;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== undefined) {
      this.changeOpenedNumHandler();
    }
  }

  onClose = () => {
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
    let { type, timer, mask } = this.props;
    return (
      <View
        className={`ct_modal_base ${openedNum % 2 == 0 ? '' : 'ct_modal_base_close'}`}
        onClick={this.onClose}
        onTouchMove={this.catchEvent}
      >
        {
          mask ?
            <View
              className={`ct_modal_mask ${bodyOpenedNum % 2 == 0 ? 'ct_modal_mask_show' : ''}`}
              style={`transition-duration: ${timer}ms`}
            ></View>
            : null
        }
        <View
          className={`ctmodal_body ${typeArr[type]+''} ${bodyOpenedNum % 2 == 0 ? typeArr[type] + '_show' : ''}`}
          onClick={this.catchEvent}
          style={`transition-duration: ${timer}ms`}
        >
          {this.props.children}
        </View>
      </View>
    )
  }

}
CtModal.defaultProps = {
  closeOnClickOverlay: true, // 点击浮层的时候时候是否自动关闭
  mask: true, // 是否需要遮罩
  timer: '350', // 过度动画时间 单位ms
  type: 0, // 类型 0-弹框 1-layout 2-抽屉 3-从右侧滑出抽屉
  isOpen: false, // 是否显示模态框
  onCloseEv: null // 触发关闭时的事件
};
export default CtModal;
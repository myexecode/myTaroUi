import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'

import './ct_scroll_refresh.scss'

// *: 必须在组件外部加一层外框并且固定宽高
const dampNum = 0.95; // 衰减指数
const transitionExp = 0.3; // 回弹动画的时长(秒)

const refreshTipHeight = 50; // 刷新提示文字或动画的dom高度，初始化的偏移量回取此值的负数

let lastY = 0;  // 存储手指按下时的y轴位置
let rubNum = 1; // 摩擦力

class CtScrollRefresh extends Component {

  state = {
    refreshState: 0, // 刷新状态： 0-初始状态，1,松开刷新，2-正在刷新,
    _refreshTipHeight: refreshTipHeight,
    offsetHeight: 0,  // 
    pullDownTip: ["下拉刷新", "松开刷新", "正在刷新"],
    tstNum: 0  // 真正起作用的回弹动画的时长
  };

  // 触摸开始
  handletouchstart = (event) => {
    if (!this.props.isListenRefresh) {
      return;
    }
    if (this.state.refreshState == 2) {
      console.log('刷新中...')
      return;
    }
    lastY = event.touches[0].clientY;
  };

  // 触摸移动
  handletouchmove = (event) => {
    // console.log(event);
    if (!this.props.isListenRefresh) {
      return;
    }

    if (this.state.refreshState == 2) {
      return;
    }

    let moveY = event.touches[0].clientY;
    let offsetY = moveY - lastY;

    let { downRefreshDistance } = this.props;
    let { offsetHeight, refreshState } = this.state;

    // console.log(offsetY,'===');
    if (offsetY < 0) {
      // 当offsetY小于0时说明是上拉操作，暂不做上拉加载功能
      // console.log("上拉加载...");
      return;
    }

    

    // 当偏移量小于1时不做摩擦处理
    if (offsetY > 1) {
      
      rubNum *= dampNum; // 衰减摩擦力
      console.log(rubNum,'===');
      
      offsetY *= rubNum; // 摩擦偏移量
    }
    
    offsetHeight = offsetHeight + offsetY;
    // console.log(offsetY,offsetHeight,'===');
    this.setState({
      offsetHeight,
      refreshState: offsetHeight > downRefreshDistance ? 1 : refreshState
    });

    // console.log(this.data.offsetHeight)

    lastY = moveY;
  };

  // 触摸结束
  handletouchend = (event) => {
    // console.log(event);
    // console.log(this.data.offsetHeight,'end---');
    if (!this.props.isListenRefresh) {
      return;
    }

    if (this.state.refreshState == 2) {
      return;
    }
    let { offsetHeight } = this.state;
    let { downRefreshDistance } = this.props;

    // 开启回弹动画
    this.setState({
      tstNum: transitionExp
    });

    // 一开始的偏移量默认是-50
    if (offsetHeight > downRefreshDistance) {

      this.setState({
        offsetHeight: refreshTipHeight,
        refreshState: 2
      })

      // 发送正在刷新事件
      this.props.onPullDownRefreshEvent && this.props.onPullDownRefreshEvent();
    } else {
      this.stopPullRefresh();
    }

    rubNum = 1;
  };

  // 触摸取消
  handletouchcancel = (event) => {
    console.log(event);
  };
  // 停止刷新
  stopPullRefresh() {
    this.setState({
      offsetHeight: 0
    }, () => {
      // 关闭回弹动画
      this.setState({
        tstNum: 0,
        refreshState: 0
      });
    })
  }

  render() {

    let { offsetHeight, tstNum, _refreshTipHeight, refreshState } = this.state;

    return (
      <ScrollView scroll-y
        class='ct_scroll_view_wrap'
        onTouchstart={this.handletouchstart}
        onTouchmove={this.handletouchmove}
        onTouchend={this.handletouchend}
        onTouchcancel={this.handletouchcancel}
      >
        <View
          class="scroll_inner"
          style={`transform: translateY(${offsetHeight}px);transition: ${tstNum}s transform;`}
        >
          <View class='pull_down_tip' style={`height: ${_refreshTipHeight}px;top: ${-_refreshTipHeight}px;`}>
            <Text className={`pull_down_tip_icon ${refreshState==2?'pull_down_tip_icon_show':''}`}></Text>
            <Text>{pullDownTip[refreshState]}</Text>
          </View>
          {this.props.children}
        </View>

      </ScrollView>
    )
  }

}
CtScrollRefresh.defaultProps = {
  // 触发下拉刷新的滑动距离(大于0 ，因为组件初始会在y轴偏移 offsetHeight 值，
  // 所以下拉刷新的实际距离是：downRefreshDistance + Math.abs(offsetHeight) )
  downRefreshDistance: 0,
  onPullDownRefreshEvent: null, // 刷新事件监听
  isListenRefresh: true  // 是否启用刷新功能 false 将关闭所有事件监听
};
export default CtScrollRefresh;
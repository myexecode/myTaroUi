import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CtScrollRefresh from '../../compponents/ct_scroll_refresh/ct_scroll_refresh'

import './scroll_refresh.scss'

class ScrollRefresh extends Component {

  config = {
    navigationBarTitleText: '滚动刷新',
    disableScroll: true
  }

  state = {
    list: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
  };

  componentDidMount(){

  }

  onPullDownRefreshEventFn = () => {
    console.log('onPullDownRefreshEventFn');
    setTimeout(() => {
      this.refs.ctScrollRefresh.stopPullRefresh();
    }, 2000);
  };

  render() {
    let {list} = this.state;
    return (
      <View className='scroll_refresh_page'>
        <CtScrollRefresh
          downRefreshDistance={80}
          onPullDownRefreshEvent={this.onPullDownRefreshEventFn}
          ref='ctScrollRefresh'
        >
          {
            list.map((item,index) => {
              return (
                <View className='scroll_refresh_item' key={item.id || index} taroKey={item.id || index}>
                  item - {index}
                </View>
              )
            })
          }
        </CtScrollRefresh>
      </View>
    )
  }

}
export default ScrollRefresh;
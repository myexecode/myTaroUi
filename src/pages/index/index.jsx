import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

// 750 设计图 taro版本 v1.3.12

export default class Index extends Component {

  config = {
    navigationBarTitleText: '750 设计图'
  }

  constructor() {
    super(...arguments);
    this.state = {
      list: [
        {
          name: '模态框',
          path: '/pages/modal_page/modal_page'
        },
        {
          name: '下拉刷新',
          path: '/pages/down_refresh/down_refresh'
        },
        {
          name: '导航栏',
          path: '/pages/navigation_bar/navigation_bar'
        },
        {
          name: '标签栏',
          path: '/pages/tabbar_page/tabbar_page'
        },
        {
          name: '表单',
          path: '/pages/form_page/form_page'
        },
        {
          name: '富文本',
          path: '/pages/xml_parse/xml_parse'
        },
        {
          name: '图形码',
          path: '/pages/graphics_code/graphics_code'
        }
      ]
    };
  }

  componentDidMount() {

  }

  // 跳转到指定页面
  onNavgationHandler(item){
    Taro.navigateTo({url: item.path});
  };


  render() {
    let { list } = this.state;
    return (
      <View className='index'>
        {
          list.length ?
            list.map((item, index) => {
              return (
                <View
                  className='index_item' key={item.id || index} taroKey={item.id || index}
                  onClick={this.onNavgationHandler.bind(this,item)}
                >
                  {item.name}
                </View>
              )
            })
            : null
        }
      </View>
    )
  }
}

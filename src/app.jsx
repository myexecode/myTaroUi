import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/graphics_code/graphics_code', // 图形码 展示页
      'pages/xml_parse/xml_parse', // xml html 富文本解析 展示页
      'pages/form_page/form_page', // 自定义表单 展示页
      'pages/tabbar_page/tabbar_page', // 自定义标签栏 展示页
      'pages/modal_page/modal_page', // 自定义模态框 展示页
      'pages/scroll_refresh/scroll_refresh', // 自定义下拉刷新 展示页
      'pages/navigation_bar/navigation_bar' // 自定义导航栏 展示页
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

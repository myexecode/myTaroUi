import Taro, { Component } from '@tarojs/taro'
import { View, Text, Canvas } from '@tarojs/components'

import './graphics_code.scss'

import BR from '../../utils/bar_code';
import qrApi from '../../utils/qr_code'

class GraphicsCode extends Component {

  config = {
    navigationBarTitleText: '图形码'
  }

  state = {
    qrCodeH: 300
  }

  componentDidMount() {

    let size = this.setCanvasSize();
    // console.log(size, 'size');
    this.setState({
      qrCodeH: size.h
    })

    BR.code128(Taro.createCanvasContext('barCodeCanvasId', this.$scope), '20191012488518725234', size.w, 60);

    qrApi.api.draw('20191012488518725234',Taro.createCanvasContext('qrCodeCanvasId', this.$scope), size.w, size.h);
  }

  // 计算图形尺寸
  setCanvasSize() {
    let size = {};
    try {
      let res = wx.getSystemInfoSync()
      let scale = 750 / 690 // 不同屏幕下canvas的适配比例；设计稿是750宽 690是样式文件中设置的canvas的宽
      let width = res.windowWidth / scale
      let height = width // canvas画布为正方形
      size.w = width
      size.h = height
    } catch (e) {
      console.log("获取设备信息失败" + e);
    }
    return size;
  }

  render() {
    let {qrCodeH} = this.state;
    return (
      <View className='graphics_code'>
        <View className='code_num'>条形码：20191012488518725234</View>
        <Canvas
          className='bar_code_canvas'
          canvasId='barCodeCanvasId'
        />
        <View className='code_num'>二维码：20191012488518725234</View>
        <Canvas
          className='qr_code_canvas'
          canvasId='qrCodeCanvasId'
          style={{height: qrCodeH+'px'}}
        />
      </View>
    )
  }

}
export default GraphicsCode;
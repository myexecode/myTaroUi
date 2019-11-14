import { Block, View, Video, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import TaroParseTmpl from './imports/TaroParseTmpl'

import './ct_parse.scss'

import defaultData from './defaultData'

var WxParse = require('./wxParse.js');

class CtParse extends Taro.Component {

	state = {}

	componentWillMount() {
		let article = this.props.data;

		WxParse.wxParse('article', 'html', article, this, 5);
	}

	config = {
		navigationBarTitleText: 'wxParse信息及基本解析'
	}

	render() {
		let { article } = this.state
		// console.log(article, 'article');
		return (
			<Block>
				<View className="wxParse">
					{article ? <TaroParseTmpl data={{ wxParseData: article.nodes }}></TaroParseTmpl> : null}
				</View>
			</Block>
		)
	}
}
CtParse.defaultProps={
	data: defaultData.txt
};
export default CtParse;

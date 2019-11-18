import Taro from '@tarojs/taro'
// 根据指定时间函数获取日期
const formatTime = (date, type) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  switch (type) {
    case 1:
      return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
    case 2:
      return [year, month, day].map(formatNumber).join('-');
    default:
      return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n
};
// json 转 url字符串参数
const jsonToUrlString = function (obj) {
  let str = '';
  for (let k in obj) {
    if (str === '') {
      str = `?${k}=${obj[k]}`;
    } else {
      str += `&${k}=${obj[k]}`;
    }
  }
  return str;
};
// 简易 对象深度克隆
const simpleDeepCloneObjec = function (obj) {
  let str = JSON.stringify(obj);
  return JSON.parse(str);
};
/*
时间字符串转换
str 目标字符串
type：类型默认'Y-M-D h:m:s', 自定义连接符如：传入('20190817171823''Y年M月D日') 返回2019年08月17日
* */
const timeStrFormat = function (str, type) {
  type = type || 'Y-M-D h:m:s';
  return str.replace(/^(\d{4}).*(\d{2}).*(\d{2}).*(\d{2}).*(\d{2}).*(\d{2})$/, function ($0, $1, $2, $3, $4, $5, $6) {
    let newStr = type.replace(/[YMDhms]/g, function (s) {
      let res = '';
      switch (s) {
        case 'Y':
          res = parseInt($1);
          break;
        case 'M':
          res = parseInt($2);
          break;
        case 'D':
          res = parseInt($3);
          break;
        case 'h':
          res = $4;
          break;
        case 'm':
          res = $5;
          break;
        case 's':
          res = $6;
          break;
        default:
          break;
      }
      return res;
    });
    return newStr;
  });
};
// 本地存储字符串对象 suffix：是否为k值的添加门店码后缀
const setStorageToStrObj = function (k, v) {
  Taro.setStorageSync(k, JSON.stringify(v))
};
// 获取本地存储字符串对象 fail：指定默认返回值, suffix：是否为k值的添加门店码后缀--
const getStorageOfStrObj = function (k, fail) {

  let res = Taro.getStorageSync(k);
  if (res) {
    return JSON.parse(res);
  } else {
    return fail === undefined ? {} : fail;
  }
};
// 请提示
const showToastHandler = function (title) {
  Taro.showToast({
    title,
    icon: 'none'
  });
};
/*
通过秒数计算 日时分秒
	注意：
		1, 依赖toZeroHandler函数,
		2, 目前仅支持到小时
	参数：
		t : [Number]* 秒
		cn : [String] 连接符 (默认 :)
 	返回值：[String]
 * */
const secondFormatHandler = function (t, oType) {
  if (!t) {
    return 0;
  }
  t = Math.floor(t);

  let obj = oType || {
    day: '日',
    hours: '时',
    minutes: '分',
    seconds: '秒'
  };

  let r = Math.floor(t / 86400); // 日
  let h = toZeroHandler(Math.floor(t % 86400 / 3600)); // 时
  let m = toZeroHandler(Math.floor(t % 3600 / 60)); // 分
  let s = toZeroHandler(t % 60); // 秒

  let str = '';
  for (let k in obj) {
    switch (k) {
      case 'day':
        str += r + obj[k];
        break;
      case 'hours':
        str += h + obj[k];
        break;
      case 'minutes':
        str += m + obj[k];
        break;
      case 'seconds':
        str += s + obj[k];
        break;
      default:
        console.error('非法的值---' + k);
        break;
    }
  }

  return str;
};
/*
数字补零函数：
	注意：
	参数：
		num : [Number]* 数字
 	返回值：[String]
 * */
const toZeroHandler = function (num) {
  num = (num <= 9 ? '0' + num : num);
  return num;
};
// 通过正则匹配获取 指定url中的参数
/*
obj {
  url: ,   默认从当前页面的url中获取
  name: , -- 参数名
}
* */
const getUrlParamHandler = function (obj) {
  let url = obj.url || window.location.href;
  url = decodeURIComponent(url);
  let name = obj.name;
  let src = url.substring(url.indexOf("?") + 1);
  let reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)");
  let r = src.match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
};

// 找出数组中与指定数字最接近的元素
const findClosestValueOfArr = function (arr, n, k) {
  let newArr = simpleDeepCloneObjec(arr);
  return newArr.sort(function (a, b) {
    if (k) {
      return Math.abs(a[k] - n) - Math.abs(b[k] - n);
    } else {
      return Math.abs(a - n) - Math.abs(b - n);
    }
  })[0];
};

// 判断是否是iphoneX
const checkIsIpxHandler = function (model) {
  let isIpx = false;
  if (model.indexOf("iPhone10,3") !== -1) {
    isIpx = true;
  } else if (model.indexOf("iPhone10,3") !== -1) {
    isIpx = true;
  } else if (model.indexOf("iPhone10,3") !== -1) {
    isIpx = true;
  } else if (
    model.indexOf("iPhone X") !== -1 ||
    model.indexOf("unknown<iPhone11,2>") !== -1 ||
    model.indexOf("unknown<iPhone11,4>") !== -1 ||
    model.indexOf("unknown<iPhone11,6>") !== -1 ||
    model.indexOf("unknown<iPhone11,8>") !== -1
  ) {
    isIpx = true;
  }
  return isIpx;
};

// 价格/金额 正则验证
const priceNumberVerificationHandler = function ({ num, int = 7, dec = 2 }) {

  let reg = new RegExp('^([1-9][\\d]{0,' + int + '}|0)(\\.[\\d]{0,' + dec + '})?$');
  let res = reg.test(num);
  if (res || num === '') {
    return num;
  } else {
    return false;
  }
};

// 有效的整数验证
const integerCheckHandler = function (num) {
  let reg = /^[1-9]\d*$/;

  return reg.test(num);
};

// loading
const showLoadingHandler = function (msg) {
  Taro.showLoading({
    title: msg,
    mask: true
  });
};

// 手机号验证
const checkPhoneNum = function (phoneNumber) {

  let str = /^1\d{10}$/;

  if (str.test(phoneNumber)) {
    return true
  } else {
    return false
  }
};

// 金额计算
const moneyCalculate = function (num1, num2, type) {
  num1 = Number(num1);
  num2 = Number(num2);
  let res = 0;
  switch (type) {
    case '+':
      res = (num1 + num2).toFixed(2);
      break;
    case '-':
      res = (num1 - num2).toFixed(2);
      break;
    case '*':
      res = (num1 * num2).toFixed(2);
      break;
    case '/':
      res = (num1 / num2).toFixed(2);
      break;
    default:
      console.error(type, 'type236');
  }
  return Number(res);
};

// 获取向后推迟指定天数的日期
const getDelayDayOfdate = function (date, delayTime) {
  date = date || new Date();
  if (delayTime) {
    let m = date.getDate() + delayTime;
    date.setDate(m);
  }

  let res = formatTime(date, 2);
  return res;
}

// 判断两个日期的大小
const compareOfTwoDate = function (d1, d2) {

  d1 = d1.split('-');
  d2 = d2.split('-');

  console.log(d1, d2, 'd1');

  let date = new Date();

  date.setFullYear(d1[0], d1[1], d1[2]);
  let t1 = date.getTime();

  date.setFullYear(d2[0], d2[1], d2[2]);
  let t2 = date.getTime();

  console.log(t1, t2, 't1');

  return t1 <= t2;
}

/*
获取当前日期
	注意：
	参数：
		date : [Object] 日期对象 （默认时当前日期）
 	返回值：[Object] 带有年 月 周（7 表示 周日） 日 时 分 秒 毫秒
 * */
const getDateHandler = function (oDate) {
  let d = oDate || new Date();
  let obj = {
    year: d.getFullYear(), // 年
    month: d.getMonth() + 1, // 月
    week: d.getDay(), // 周 （0 表示 周日）
    day: d.getDate(), // 日
    hour: d.getHours(), // 时
    minute: d.getMinutes(), // 分
    seconds: d.getSeconds(), // 秒
    timestamp: d.getTime() // 毫秒
  };
  obj.date = `${obj.year}-${obj.month}-${obj.day}`;

  return obj;
};

// 等级计算
const gradeCalculation = function (num) {
  let arr = [{n: 1250, t: '钻石'},{n: 250, t: '皇冠'},{n: 50, t: '太阳'},{n: 10, t: '月亮'},{n: 2, t: '星星'}];
  let index = 0;
  let str = '';
  

  while(num > arr[arr.length-1].n){
    console.log(num, index, 'num index');

    let divider = arr[index];
    if(!divider){
      break;
    }
    if (num > divider.n) {
      str += divider.t + '-';
    }

    num = num % divider.n;
    index++;
  }

  return str;
};

export {
  formatTime,
  jsonToUrlString,
  simpleDeepCloneObjec,
  timeStrFormat,
  setStorageToStrObj,
  getStorageOfStrObj,
  showToastHandler,
  secondFormatHandler,
  getUrlParamHandler,
  findClosestValueOfArr,
  checkIsIpxHandler,
  priceNumberVerificationHandler,
  showLoadingHandler,
  checkPhoneNum,
  moneyCalculate,
  integerCheckHandler,
  getDelayDayOfdate,
  compareOfTwoDate,
  getDateHandler,
  gradeCalculation
}

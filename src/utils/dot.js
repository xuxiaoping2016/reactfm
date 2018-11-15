import { dotENV, getPid } from './env';

console.info('dotEnv:', dotENV);

const params = {
  appName: 'saaspath', // 你的软件的名字（调用链使用，选填，默认为hello）
  statType: 'saaspath', // 你的业务的名字（打点使用，选填，默认为world）
  env: dotENV, // 环境变量，根据环境变量自动打点（可选环境变量为：localhost、development、qa、production，不填时为production）
  runtime: true, // 默认开启，关闭以后关闭调用链功能
  anchor: true, // 默认开启，关闭以后关闭打点功能
  retry: 5, // 打点接口不能成功发送时最多尝试x次重发（int，选填，默认是5次）
  rretry: 5, // 调用链接口不能成功发送时最多尝试x次重发（int，选填，默认是5次）
  count: 10, // 调用链数据量阀值，即每次长度超过x就发送（int，选填，默认是10）*鉴于每次调用链记录长度没有太大差别，调用链接口无长度限制，调用链接口稳定，使用次数可以便于业务管理
  len: 1024, // 打点数据量阀值，即每次长度超过x字符就发送（int，选填，默认是1024）*鉴于每次打点的长度不同，打点接口对数据长度有限制，而且不稳定，不根据次数记录，提高稳定性，而且不影响性能
  public: {
    name: 'saaspath',
    type: '打点功能',
  }, // 启动时定义自定义全局变量，每次rprm.rec()打点时都会加入
  frequency: 60000, // 打点自动发送信息时间频率（int，选填，默认是60000，也就是60秒）
  rfrequency: 60000, // 调用链自动发送信息时间频率（int，选填，默认是60000，也就是60秒）
  LZ: true, // 打点是否压缩，默认为是（Boolean，选填，512字符内压缩将导致信息反而变长）
  RLZ: false, // 调用链是否压缩，默认为否（Boolean，选填，512字符内压缩将导致信息反而变长）
  debug: false, // Debug模式，开启以后打印请求生产和预生产环境下不可开启（Boolean，选填）
  geo: false, // 是否开启高精度位置追逐功能（Boolean，选填，如果开启，用户会被提示授权地理位置信息）
};

class DotPoint {
  constructor() {
    this.params = params;
    this.rprm = null;
    this.inited = false;
    this.ua = {};
    this.init(() => {});
  }

  init(fn) {
    const that = this;
    if (that.inited) {
      fn();
    } else {
      that.inited = true;
      that.rprm = window.rprm;
      that.rprm.init(that.params);
      fn();
    }
  }

  dot(rest) {
    const that = this;
    const pid = getPid();
    const { wid = '' } = window;
    that.init(() => {
      that.rprm.rec({ ...rest, ...that.ua, pid, wid });
    });
  }
}

export default new DotPoint();

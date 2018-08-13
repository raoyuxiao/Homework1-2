var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;//初始状态，即手指不在屏幕上
var arrx = [];//动作横坐标
var arry = [];//动作纵坐标
var arrz = [];//手指按下到抬起的一个组合
var canvasw = 0;//画布的宽度
var canvash = 0;//画布的高度
Page({
  data: 
  {
    //canvas宽高
    canvasw: 0,
    canvash: 0,
    //canvas生成的图片路径
    canvasimgsrc: ""
  },
  //画布初始化执行
  startCanvas: function ()
   {
    var that = this;
    //创建canvas
    this.initCanvas();
    //获取系统信息
    wx.getSystemInfo({
      success: function (res)
      {
        canvasw = res.windowWidth - 0;//得到设备的宽度
        canvash = canvasw;
        that.setData({ 'canvasw': canvasw });
        that.setData({ 'canvash': canvash });
      }
    });
  },
  //初始化函数
  initCanvas: function ()
   {
    context = wx.createCanvasContext('canvas');
    context.beginPath()
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
  },
  //事件监听
  canvasIdErrorCallback: function (e)
  {
    console.error(e.detail.errMsg)
  },
  canvasStart: function (event) 
  {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);

  },
  canvasMove: function (event)
   {
    if (isButtonDown)
    {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
    };
     for (var i = 0; i < arrx.length; i++)
     {
      if (arrz[i] == 0)
      {
        context.moveTo(arrx[i], arry[i])
      } 
      else
      {
        context.lineTo(arrx[i], arry[i])
      };
    };
    context.clearRect(0, 0, canvasw, canvash);
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();
    context.draw(false);
  },
  canvasEnd: function (event)
   {
    isButtonDown = false;
   },
  //清除画布
  cleardraw: function () 
  {
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw(true);
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    //画布初始化
    this.startCanvas();
  }
})
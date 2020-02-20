// index.js
Page({
  // 页面的初始数据
  data: {
    result: '',
    info: '',
    poem: '',
  },

  myimg: function() {
    var that = this;

    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有

      success: res => {
        // 返回选定照片的本地文件路径列表
        var tempFilePaths = res.tempFilePaths; // tempFilePath 可以作为 img 标签的 src 属性显示图片
        that.setData({
          result: tempFilePaths,
          // info: '上传成功',
          // poem: tempFilePaths[0]
          poem: '上网不涉密，涉密不上网。',
        });

        // TODO: 上传图片
        wx.uploadFile({
          url: 'localhost:8888/user/uploadimg', // 接口地址
          filePath: tempFilePaths[0],
          name: 'imgfile',
          // header: {}, // 设置请求的 header
          success: res => { // 传输到服务器 
            // TODO: 实现从服务器返回诗句
            console.log(res.data);

            that.setData({
              result: tempFilePaths,
              info: '上传成功',
              poem: tempFilePaths[0]
            });
            // getApp().request({
            //   url: '/index',
            //   method: 'patch',
            //   data: {
            //     result: res.data
            //   },
            //   success: function() {
            //     wx.hideLoading();
            //     that.setData({
            //       result: res.data
            //     });
            //   }
            // });
          },
          fail: function() {
            console.log(res);
          },
          complete: function() {}
        });
      },
      fail: function() {},
      complete: function() {}
    });
  },

  // 生命周期函数 监听页面加载
  onLoad: function(options) {},

  // 生命周期函数 监听页面初次渲染完成
  onReady: function() {}
});

// index.js
Page({
  // 页面的初始数据
  data: {
    result: '', // 上传图片的本地地址
    info: '', // 上传成功信息
    debug: '', // 上传图片的服务器地址
    poem: '' // 返回的诗句
  },

  myimg: function() {
    var that = this;

    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有

      success: function(res) {
        // 返回选定照片的本地文件路径列表
        var tempFilePaths = res.tempFilePaths; // tempFilePath 可以作为 img 标签的 src 属性显示图片
        that.setData({
          result: tempFilePaths[0],
          info: '正在上传...',
          // poem: '上网不涉密，涉密不上网。'
        });

        // TODO: 上传图片
        wx.uploadFile({
          url: 'http://123.57.41.160:8080/upload', // 接口地址（这是测试地址）
          // TODO: 实现阿里云服务器的外网访问入口
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data'
          }, // 设置请求的 header

          success: function(res) {
            var imgPath = res.data;
            // console.log(imgPath);

            that.setData({
              info: '上传成功！', // 上传成功后的提示
              debug: imgPath     // 上传图片的服务器地址
            });

            // TODO: 实现从服务器返回诗句
            wx.request({
              url: 'http://123.57.41.160:8080/generate?url=' + imgPath,
              method: 'GET',
              header: {
                'Content-type': 'application/json'
              },

              success: function(res) {
                var returnJSON = res.data;
                // var returnPoem = returnJSON[0];
                var returnPoem = returnJSON;

                that.setData({
                  poem: returnPoem
                });
              }
            });
          },
          fail: function() {
            // console.log(res);
            that.setData({
              info: '上传失败'
            });
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

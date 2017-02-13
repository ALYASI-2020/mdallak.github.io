;(function(){
    // Debug xcode 日志输出
    function log(msg) {
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("src", "ios-js-log:#iOS#" + msg);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    }

    window.console = {
        log:log
    }
    window.console.info = console.log;
    window.console.warn = console.log;
    window.console.error = console.log;

    //function AppInfo (){
    //    this.adsite = false;
    //    this.itemID = 0;
    //    this.name = '';
    //    this.downloadUrl = '';
    //    this.downloadUrlCRC = 0;
    //    this.bundleId = '';
    //    this.size = '';
    //    this.version = '';
    //    this.shortVersion = '';
    //    this.imageUrl = '';
    //    this.downloadProgress = 0;
    //    this.isOpen = fasle;
    //    this.h5PageId = 0;
    //    this.taskStatus = 0;
    //    this.queueTaskType = 0;
    //    this.queueStatus = 0;
    //}

    //var topicInfo = new Object();
    //topicInfo.itemId = 92;
    //topicInfo.topicType = 0; //0:app专题,1:壁纸专题,2:铃声专题
    //topicInfo.name = 'PP助手推荐装机必备应用';
    //topicInfo.imageUrl = 'http://img2.25pp.com/uploadfile/special/imgrectangular/2015/0130/20150130045833856_640x256.jpg';
    //topicInfo.bannerUrl = 'http://img2.25pp.com/uploadfile/special/imgrectangular/2015/0130/20150130045833856_640x256.jpg';
    //topicInfo.desc = 'PP助手精心挑选了一些常用工具集合，本专辑也会不断更新最好、最全、最新的工具，也请及时关注！';
    //topicInfo.updateTime = 1431315232;
    //topicInfo.resCount = 57;

    //  function GiftInfo (){
    //  this.pid = 0;  //礼包的ID
    //  this.catId = 0; //类型ID值
    //  this.gameId = 0; //游戏ID值
    //  this.gameName = ''; //礼包游戏的名字
    //  this.gameBundleIds = new Array(); //game buid
    //  this.packageName = ''; //礼包的名字
    //  this.subTitle = ''; //礼包的二级标题
    //  this.content = ''; //礼包内容
    //  this.iconUrl = ''; //图标
    //  this.publisTime = 0; //礼包发布时间
    //  this.expireTime = 0; //礼包的过期时间
    //  this.packageCount = 0; //礼包总数
    //  this.packageSurplus = 0; //礼包剩下数量
    //  this.statusType = 0; //礼包的状态:(状态:1-未发布,2-等待领取,3-已领取,4-已使用)注：未登录的这状态值为1,未领取也是1
    //  }

    /**
     * oc端的handler名字
     */
    var TROcHandlers = {
        login:'login',
        getInstalledAppList:'getInstalledAppList',
        installApp:'installApp',
        checkAppIsWaitingToInstall:'checkAppIsWaitingToInstall',
        checkAppIsInstalling:'checkAppIsInstalling',
        cancelInstall:'cancelInstall',
        downloadApp:'downloadApp',
        pauseDownloadApp:'pauseDownloadApp',
        startDownloadApp:'startDownloadApp',
        downloadUpdateApp:'downloadUpdateApp',
        startDownloadUpdateApp:'startDownloadUpdateApp',
        removeDownloadApp:'removeDownloadApp',
        openApp:'openApp',
        showDetail:'showDetail',
        showTopic:'showTopic',
        registerAppUpdateStatus:'registerAppUpdateStatus',
        registerAppOpenStatus:'registerAppOpenStatus',
        registerAppStatus:'registerAppStatus',
        registerAppDownloadFinish:'registerAppDownloadFinish',
        registerAppInstallFinish:'registerAppInstallFinish',
        registerAppDownloadProgress:'registerAppDownloadProgress',
        registerAppInstallProgress:'registerAppInstallProgress',
        registerAppAllStatusAndProgress:'registerAppAllStatusAndProgress',

        getDeviceIdentify:'getDeviceIdentify',
        startShake:'startShake',
  
        //MARK:以下是礼包相关的本地接口
        getGift:'getGift',
        discoverGift:'discoverGift',
        bookGift:'bookGift',
        showGiftDetail:'showGiftDetail',
        showGameGiftList:'showGameGiftList',
        getBookedGifts:'getBookedGifts',
  
        //MARK:以下是插件相关的本地接口
        showPluginDetail:'showPluginDetail',
  
        //MARK:以下是更新页面相关的本地接口
        showUpdateView:'showUpdateView',
  
        //MARK:以下是分享页面相关的本地接口
        shareCommonContent:'shareCommonContent',
        showShareView:'showShareView'
  

    };

    /**
     * Js端Handler名字
     */
    var TRJsHandlers = {
        jsAppUpdateStatusHandler:'jsAppUpdateStatusHandler',
        jsAppOpenStatusHandler:'jsAppOpenStatusHandler',
        jsAppStatusHandler:'jsAppStatusHandler',
        jsAppDownloadStatusHandler:'jsAppDownloadStatusHandler',
        jsAppInstallStatusHandler:'jsAppInstallStatusHandler',
        jsAppDownloadProgressHandler:'jsAppDownloadProgressHandler',
        jsAppInstallProgressHandler:'jsAppInstallProgressHandler',

        // 摇一摇
        jsShakeStatusHandler:'jsShakeStatusHandler',
  
        //MARK:以下是礼包相关的js端Handler
        jsGiftUpdateStatusHandler:'jsGiftUpdateStatusHandler'
    };

    /**
     * TRHtml5Topic桥接WebViewJavascriptBrigde的函数
     * @param callback
     */
    function connectWebViewJavascriptBridge(callback) {
        log(1);
        if (window.WebViewJavascriptBridge) {
            log(2);
            callback(WebViewJavascriptBridge)
        } else {
            log(3);
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    }

    //调用注册WebViewJavascriptBrigde的函数
    connectWebViewJavascriptBridge(function(bridge) {
        var curDate = new Date();
        console.log("当前时间是:"+curDate.toString()+curDate.getMilliseconds().toString());
        bridge.init(function(message, responseCallback) {
            var data = { 'Javascript Responds':message }
            responseCallback(data)
        });

        bridge.registerHandler(TRJsHandlers.jsAppUpdateStatusHandler,jsAppUpdateStatusHandler);
        bridge.registerHandler(TRJsHandlers.jsAppOpenStatusHandler,jsAppOpenStatusHandler);
        bridge.registerHandler(TRJsHandlers.jsAppStatusHandler,jsAppStatusHandler);
        bridge.registerHandler(TRJsHandlers.jsAppDownloadStatusHandler,jsAppDownloadStatusHandler);
        bridge.registerHandler(TRJsHandlers.jsAppInstallStatusHandler,jsAppInstallStatusHandler);
        bridge.registerHandler(TRJsHandlers.jsAppDownloadProgressHandler,jsAppDownloadProgressHandler);
        bridge.registerHandler(TRJsHandlers.jsAppInstallProgressHandler,jsAppInstallProgressHandler);

        //MARK:注册礼包的Handler
        bridge.registerHandler(TRJsHandlers.jsGiftUpdateStatusHandler,jsGiftUpdateStatusHandler);
                                   
        // 摇一摇
        bridge.registerHandler(TRJsHandlers.jsShakeStatusHandler,jsShakeStatusHandler);
                                   
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //以下是app应用专题相关的函数
  
    //以下是js处理native调用的状态handle
    function jsAppUpdateStatusHandler(response){
        console.log('jsAppUpdateStatusHandler'+JSON.stringify(response));
        TRH5Obj.appUpdateStatusHandler(response);
    }

    function jsAppOpenStatusHandler(response){
        console.log('jsAppOpenStatusHandler'+JSON.stringify(response));
        TRH5Obj.appOpenStatusHandler(response);
    }

    function jsAppStatusHandler(response){
        console.log('jsAppStatusHandler'+JSON.stringify(response));
        TRH5Obj.appStatusHandler(response);
    }

    function jsAppDownloadStatusHandler(response){
        console.log('jsAppDownloadStatusHandler'+JSON.stringify(response));
        TRH5Obj.appDownloadStatusHandler(response);
    }

    function jsAppInstallStatusHandler(response){
        console.log('jsAppInstallStatusHandler'+JSON.stringify(response));
        TRH5Obj.appInstallStatusHandler(response);
    }

    function jsAppDownloadProgressHandler(response){
//        console.log('jsAppDownloadProgressHandler'+JSON.stringify(response));
        TRH5Obj.appDownloadProgressHandler(response);
    }

    function jsAppInstallProgressHandler(response){
        console.log('jsAppInstallProgressHandler'+JSON.stringify(response));
        TRH5Obj.appInstallProgressHandler(response);
    }

    /////////////////////////////////////////////////////////////////////////////////////
    //以下是H5页面注册js状态回调方法
    /**
     * 该方法注册app更新状态回调函数
     *
     * @param  handler {func(appInfo)} 更新状态回调函数,在发生回调时候,通过获取AppInfo.isUpdate, AppInfo.isWhiteApp,的值判断是否已经安装了,通过bundleId
     *                        或者itemId识别app,isUpdate是表示是否有更新,isWhiteApp表示是否是白名单,在白名单里的app需要当作已安装处理,不能当更新
     *                        处理
     *                        handler 原型:function(AppInfo);
     *
     */
    function setAppUpdateStatusHandler(handler){
        TRH5Obj.appUpdateStatusHandler = handler;
    }

    /**
     * 该方法注册app是否安装状态回调函数
     *
     * @param  handler {func(appInfo)} 本地是否已经安装状态回调函数,在发生回调时候,通过获取AppInfo.isOpen 的值判断是否已经安装了,通过bundleId
     *                        判断app,该回调中itemId为0的,所以不能使用
     *                        handler 原型:function(AppInfo);
     *
     */
    function setAppOpenStatusHandler(handler){
        TRH5Obj.appOpenStatusHandler = handler;
    }

    /**
     * 该方法注册app的下载状态和安装状态回调函数
     *
     * @param handler {func(appInfo)} app的下载和安装状态回调函数,在下载或者安装状态发生变更的时候,该函数回被回调,
     *                                AppInfo.queueTaskType字段标记任务类型,具体任务如下:
     *                                //队列任务类型
                                        typedef enum
                                        {
                                           TRQueueTaskTypeDownload = 0,  //下载任务
                                           TRQueueTaskTypeInstall, //安装任务
                                           TRQueueTaskTypeUninstall, //该类型目前没有使用,不需要处理
                                           TRQueueTaskTypeArchive, //该类型目前没有使用,不需要处理
                                        } TRQueueTaskType;

     *                                AppInfo.taskStatus字段标记状态,具体的状态如下:
     *                                    //状态
     *                                      typedef enum
     *                                       {
     *                                            TRTaskStatusNone = 0,	//默认状态
     *                                           TRTaskStatusWait,		//等待
     *                                            TRTaskStatusStartRun,	//开始
     *                                            TRTaskStatusRun,		//进行中
     *                                            TRTaskStatusPause,		//暂停
     *                                            TRTaskStatusFinish,		//完成 //暂不使用
     *                                            TRTaskStatusSuccess,	//成功
     *                                            TRTaskStatusFail,		//失败
     *                                        } TRTaskStatus;
     *                                在发生回调的时候,,通过AppInfo.bundleId或者AppInfo.itemId识别app
     */
    function setAppStatusHandler(handler){
        TRH5Obj.appStatusHandler = handler;
    }

    /**
     * 设置下载完成状态的监听回调函数,该函数跟setAppStatusHandler有重复状态回调,不过建议两个都注册
     *
     * @param handler {func(AppInfo)} 下载完成的回调函数,当任务下载完成时候,会回调该方法,通过AppInfo.isDownloadFinish
     *                                 获取是否下载已经完成
     */
    function setAppDownloadFinishHandler(handler){
        TRH5Obj.appDownloadStatusHandler = handler;
    }

    /**
     * 设置安装完成状态的监听回调函数,该函数跟setAppStatusHandler有重复状态回调,不过建议两个都注册
     *
     * @param handler {func(AppInfo)} 下载完成的回调函数,当任务下载完成时候,会回调该方法,通过AppInfo.isInstall
     *                                 获取是否安装已经完成
     */
    function setAppInstallFinishHandler(handler){
        TRH5Obj.appInstallStatusHandler = handler;
    }

    /**
     * 设置下载进度回调函数,该函数在下载过程中会持续的回调进度
     * @param handler {func(AppInfo)} 下载进度回调函数,发生回调时候,通过AppInfo.downloadProgress获取到当前的下载进度
     */
    function setAppDownloadProgressHandler(handler){
        TRH5Obj.appDownloadProgressHandler = handler;
    }

    /**
     * 设置安装进度回调函数,该函数在安装过程中会持续的回调进度
     * @param handler {func(AppInfo)} 安装进度回调函数,发生回调时候,通过AppInfo.installProgress获取到当前的下载进度
     */
    function setAppInstallProgressHandler(handler){
        TRH5Obj.appInstallProgressHandler = handler;
    }

    /////////////////////////////////////////////////////////////////////////////////////
    //以下是提供给H5页面调用的业务接口
    /**
     * 调用native进行登陆
     * @param loginCallback {func(Json)} 登陆回调函数,Json格式如下:
     *                            {"status":0,   //0为成功,其他为失败
                                  "msg":'', //说明信息,成功的时候为空,失败的时候为失败说明
                                  "data":{
                                            "nickName":'用户昵称',
                                            "userId":'用户id',
                                            "token":'token',20分钟的token
                                         }
                                  }
     */
    function login(loginCallback){
        console.log('login');
        WebViewJavascriptBridge.callHandler(TROcHandlers.login,'',loginCallback);
    }

    /**
     * 获取本地的应用列表
     * @param  callback {ArrayLike<AppInfo>} 获取本地应用列表的回调函数,参数为应用数组
     */
    function getInstalledApp(callback){
        console.log('getInstalledApp');
        WebViewJavascriptBridge.callHandler(TROcHandlers.getInstalledAppList,'',callback);
    }

    /**
     * 安装app
     * @param appInfo {AppInfo} 应用信息
     */
    function installApp(appInfo){
        console.log('installApp');
        WebViewJavascriptBridge.callHandler(TROcHandlers.installApp,appInfo);
    }

    /**
     * 检查应用是否正在等待安装中
     * @param appInfo {AppInfo} 应用信息
     * @param callback {func(Json)} 检查结果回调函数,Json格式为:
     *                              {isWaiting:true/fasle}
     */
    function checkAppIsWaitingToInstall(appInfo,callback){
        console.log('checkAppIsWaitingToInstall');
        WebViewJavascriptBridge.callHandler(TROcHandlers.checkAppIsWaitingToInstall,appInfo,callback);
    }

    /**
     * 检查是否安装中
     * @param appInfo {AppInfo} 应用信息
     * @param callback {func(Json)} 检查结果回调函数,Json格式为:
     *                              {isInstalling:true/fasle}
     */
    function checkAppIsInstalling(appInfo,callback){
        console.log('checkAppIsInstalling');
        WebViewJavascriptBridge.callHandler(TROcHandlers.checkAppIsInstalling,appInfo,callback);
    }

    /**
     * 取消安装
     * @param appInfo {AppInfo} 应用信息
     */
    function cancelInstall(appInfo){
        console.log('cancelInstall');
        WebViewJavascriptBridge.callHandler(TROcHandlers.cancelInstall,appInfo);
    }

    /**
     * 下载app
     * @param appInfo {AppInfo} 应用信息
     * @param callback {func(Json)} 添加下载结果回调函数,Json格式如下:
     *                              {"status":0, //0为成功,其他为错误
     *                              "msg":'提示信息',
     *                              "data":{"result":true/fasle}
     *                              }
     */
    function downloadApp(appInfo,callback){
        console.log('downloadApp');
        console.log('appInfo '+JSON.stringify(appInfo));
        WebViewJavascriptBridge.callHandler(TROcHandlers.downloadApp,appInfo,callback);
    }

    /**
     * 暂停下载app
     * @param appInfo {AppInfo} 应用信息
     * @param callback {func(Json)} 暂停下载结果回调函数,Json格式如下:
     *                              {"status":0, //0为成功,其他为错误
     *                              "msg":'提示信息',
     *                              "data":{"result":true/fasle}
     *                              }
     */
    function pauseDownloadApp(appInfo,callback){
        console.log('pauseDownloadApp');
        WebViewJavascriptBridge.callHandler(TROcHandlers.pauseDownloadApp,appInfo,callback);
    }

    /**
     * 继续下载app
     * @param appInfo {AppInfo} 应用信息
     * @param callback {func(Json)} 继续下载结果回调函数,Json格式如下:
     *                              {"status":0, //0为成功,其他为错误
     *                              "msg":'提示信息',
     *                              "data":{"result":true/fasle}
     *                              }
     */
    function startDownloadApp(appInfo,callback){
        console.log('startDownloadApp');
        WebViewJavascriptBridge.callHandler(TROcHandlers.startDownloadApp,appInfo,callback);
    }

    /**
     * 下载app更新
     * @param appInfo {AppInfo} 应用信息
     * @param callback {func(Json)} 下载app更新结果回调函数,Json格式如下:
     *                              {"status":0, //0为成功,其他为错误
     *                              "msg":'提示信息',
     *                              "data":{"result":true/fasle}
     *                              }
     */
    function downloadUpdateApp(appInfo,callback){
        console.log('downloadUpdateApp');
        WebViewJavascriptBridge.callHandler(TROcHandlers.downloadUpdateApp,appInfo,callback);
    }

    /**
     * 暂停下载app更新
     * @param appInfo {AppInfo} 应用信息
     * @param callback {func(Json)} 暂停下载app更新结果回调函数,Json格式如下:
     *                              {"status":0, //0为成功,其他为错误
     *                              "msg":'提示信息',
     *                              "data":{"result":true/fasle}
     *                              }
     */
    function startDownloadUpdateApp(appInfo,callback){
        console.log('startDownloadUpdateApp');
        WebViewJavascriptBridge.callHandler(TROcHandlers.startDownloadUpdateApp,appInfo,callback);
    }

    /**
     * 取消下载任务/更新下载
     * @param appInfo {AppInfo} 应用信息
     * @param callback {func(Json)} 取消下载app更新结果回调函数,Json格式如下:
     *                              {"status":0, //0为成功,其他为错误
     *                              "msg":'提示信息',
     *                              "data":{"result":true/fasle}
     *                              }
     */
    function removeDownloadApp(appInfo,callback){
        console.log('removeDownloadApp');
        WebViewJavascriptBridge.callHandler(TROcHandlers.removeDownloadApp,appInfo,callback);
    }

    /**
     * 打开本地app
     * @param appInfo {AppInfo} 应用信息
     */
    function openApp(appInfo){
        console.log('openApp');
        WebViewJavascriptBridge.callHandler(TROcHandlers.openApp,appInfo);
    }

    /**
     * 显示app详情
     * @param appInfo {AppInfo} 应用信息
     */
    function showDetail(appInfo){
        console.log('showDetail');
        WebViewJavascriptBridge.callHandler(TROcHandlers.showDetail,appInfo);
    }

    /**
     * 在native端显示专题详情
     * @param topic {Topic} 专题详情
     */
    function showTopic(topic){
        console.log('showTopic');
        WebViewJavascriptBridge.callHandler(TROcHandlers.showTopic,topic);
    }
  
    /**
    * 获取iOS设备标识,该方法会通过回调函数返回设备的uuid和idfa
    *
    * @param  {function(identifyJsonString)} callbak为调用获取设备标识的回调函数,
    * 										identifyJsonString参数是一个json格式的字符串通过RSA加密后的字符串,
    * 										具体RSA的秘钥由客户端和后端协商,
    * 										原具体格式为:{"uuid":"xxxuuid","idfa":"xxxidfa"}
    */
    function getDeviceIdentify(callback){
      console.log('getDeviceIdentify');
      WebViewJavascriptBridge.callHandler(TROcHandlers.getDeviceIdentify,'',callback);
    }
  
    /**
     * 监听摇一摇
     * @param data {open:0 关，1 开，默认为1}
     * @param callback {func(Json)} 摇一摇状态回调
     *                              {"status":0, //0 start, 1 cancel, 2 sharked
     *                              }
     */
    function startShake(data,callback) {
        console.log('startShake');
        WebViewJavascriptBridge.callHandler(TROcHandlers.startShake,data,callback);
    }

    //////////////////////////////////////////////////////////////////////////
    //以下是注册app的监听事件

    /**
     * 注册app更新状态
     * @param appInfo {AppInfo} 应用信息
     */
    function observeAppUpdateStatus(appInfo){
        console.log('observeAppUpdateStatus');
        WebViewJavascriptBridge.callHandler(TROcHandlers.registerAppUpdateStatus,appInfo);
    }

    /**
     * 注册app本地是否可以打开状态
     * @param appInfo {AppInfo} 应用信息
     */
    function observeAppOpenStatus(appInfo){
        console.log('observeAppOpenStatus');
        WebViewJavascriptBridge.callHandler(TROcHandlers.registerAppOpenStatus,appInfo);
    }

    /**
     * 注册app下载任务状态或者安装任务状态
     * @param appInfo {AppInfo} 应用信息
     */
    function observeAppStatus(appInfo){
        console.log('observeAppStatus');
        WebViewJavascriptBridge.callHandler(TROcHandlers.registerAppStatus,appInfo);
    }

    /**
     * 注册是否下载完成状态
     * @param appInfo
     */
    function observeAppDownloadFinish(appInfo){
        console.log('observeAppDownloadFinish');
        WebViewJavascriptBridge.callHandler(TROcHandlers.registerAppDownloadFinish,appInfo);
    }

    /**
     * 注册监听是否安装完成状态
     * @param appInfo
     */
    function observeAppInstallFinish(appInfo){
        console.log('observeAppInstallFinish');
        WebViewJavascriptBridge.callHandler(TROcHandlers.registerAppInstallFinish,appInfo);
    }

    /**
     * 注册下载进度
     * @param appInfo
     */
    function observeAppDownloadProgress(appInfo){
        console.log('observeAppDownloadProgress');
        WebViewJavascriptBridge.callHandler(TROcHandlers.registerAppDownloadProgress,appInfo);
    }

    /**
     * 注册安装进度
     * @param appInfo
     */
    function observeAppInstallProgress(appInfo){
        console.log('observeAppInstallProgress');
        WebViewJavascriptBridge.callHandler(TROcHandlers.registerAppInstallProgress,appInfo);
    }

    /**
     * 注册app相关的所有状态
     * @param appInfo
     */
    function observeAppAllStatusAndProgress(appInfo){
        console.log('observeAppAllStatusAndProgress');
        WebViewJavascriptBridge.callHandler(TROcHandlers.registerAppAllStatusAndProgress,appInfo);
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    //以下是礼包相关的js函数

    //以下是js处理native调用的状态handle
    function jsGiftUpdateStatusHandler(response){
        TRH5Obj.giftUpdateStatusHandler(response);
    }
  
    /**
     * 设置礼包领取状态回调函数,该函数在礼包详情页面领取礼包后回调
     * @param handler {func(GiftInfo)}
     */
    function setGiftUpdateStatusHandler(handler){
      TRH5Obj.giftUpdateStatusHandler = handler;
    }
  
    // 摇一摇
    function jsShakeStatusHandler(response) {
        TRH5Obj.shakeStatusHandler(response);
    }
  
    function setShakeStatusHandler(handler) {
        TRH5Obj.shakeStatusHandler = handler;
    }
  
    /**
     *  领取礼包
     *
     *  @param giftInfo {GiftInfo} 礼包对象
     *  @param callback {func(GiftInfo)} 领取结果回调
     */
    function getGiftInfo(giftInfo,callback){
        WebViewJavascriptBridge.callHandler(TROcHandlers.getGift,giftInfo,callback);
    }
  
    /**
     *  礼包淘号
     *
     *  @param giftInfo {GiftInfo} 礼包对象
     *  @param callback {func(GiftInfo)} 淘号结果回调
    */
    function discoverGiftInfo(giftInfo,callback){
        WebViewJavascriptBridge.callHandler(TROcHandlers.discoverGift,giftInfo,callback);
    }
  
    /**
    *  预定礼包
    *
    *  @param giftInfo {GiftInfo} 礼包对象
    *  @param callback {func(GiftInfo)} 淘号结果回调
    */
    function bookGiftInfo(giftInfo,callback){
        WebViewJavascriptBridge.callHandler(TROcHandlers.bookGift,giftInfo,callback);
    }
  
    /**
     * 显示礼包详情
     * @param giftInfo
     */
    function showGiftDetail(giftInfo){
        WebViewJavascriptBridge.callHandler(TROcHandlers.showGiftDetail,giftInfo);
    }
  
  
    /**
     * 显示app的礼包列表
     * @param appInfo
     */
    function showGameGiftList(appInfo){
        WebViewJavascriptBridge.callHandler(TROcHandlers.showGameGiftList,appInfo);
    }

    /**
     * 获取native端所有已经预定的礼包
     * @param callback {func(ArrayLike<GiftInfo>)} 结果回调函数,函数的参数为礼包数组
    */
    function getBookedGifts(callback){
        WebViewJavascriptBridge.callHandler(TROcHandlers.getBookedGifts,giftInfo);
    }

    /**
     * 显示插件详情
     * @param pluginInfo
     */
    function showPluginDetail(pluginInfo){
        WebViewJavascriptBridge.callHandler(TROcHandlers.showPluginDetail,pluginInfo);
    }
  
    /**
    * 显示更新提示框
    */
    function showUpdateView(){
        WebViewJavascriptBridge.callHandler(TROcHandlers.showUpdateView);
    }
  
    /**
    * 显示分享页面
    */
    function showShareView(){
       WebViewJavascriptBridge.callHandler(TROcHandlers.showShareView);
    }
  
    /// 新的分享页面
    function shareCommonContent(shareInfo,callback) {
        WebViewJavascriptBridge.callHandler(TROcHandlers.shareCommonContent,shareInfo,callback);
    }
  
  
    window.TRH5Obj = {
        //MARK:以下为应用专题接口
        setAppUpdateStatusHandler:setAppUpdateStatusHandler,
        setAppOpenStatusHandler:setAppOpenStatusHandler,
        setAppStatusHandler:setAppStatusHandler,
        setAppDownloadFinishHandler:setAppDownloadFinishHandler,
        setAppInstallFinishHandler:setAppInstallFinishHandler,
        setAppDownloadProgressHandler:setAppDownloadProgressHandler,
        setAppInstallProgressHandler:setAppInstallProgressHandler,

        appUpdateStatusHandler:function(response){},
        appOpenStatusHandler:function(response){},
        appStatusHandler:function(response){},
        appDownloadStatusHandler:function(response){},
        appInstallStatusHandler:function(response){},
        appDownloadProgressHandler:function(response){},
        appInstallProgressHandler:function(response){},

        observeAppUpdateStatus:observeAppUpdateStatus,
        observeAppOpenStatus:observeAppOpenStatus,
        observeAppStatus:observeAppStatus,
        observeAppDownloadFinish:observeAppDownloadFinish,
        observeAppInstallFinish:observeAppInstallFinish,
        observeAppDownloadProgress:observeAppDownloadProgress,
        observeAppInstallProgress:observeAppInstallProgress,
        observeAppAllStatusAndProgress:observeAppAllStatusAndProgress,

        login:login,
        getInstalledApp:getInstalledApp,
        downloadApp:downloadApp,
        pauseDownloadApp:pauseDownloadApp,
        startDownloadApp:startDownloadApp,
        downloadUpdateApp:downloadUpdateApp,
        startDownloadUpdateApp:startDownloadUpdateApp,
        removeDownloadApp:removeDownloadApp,
        installApp:installApp,
        checkAppIsWaitingToInstall:checkAppIsWaitingToInstall,
        checkAppIsInstalling:checkAppIsInstalling,
        cancelInstall:cancelInstall,
        openApp:openApp,
        showDetail:showDetail,
        showTopic:showTopic,

        getDeviceIdentify:getDeviceIdentify,
  
        //MARK:以下为礼包相关接口
        setGiftUpdateStatusHandler:setGiftUpdateStatusHandler,
        giftUpdateStatusHandler:function(response){},
        getGiftInfo:getGiftInfo,
        discoverGiftInfo:discoverGiftInfo,
        bookGiftInfo:bookGiftInfo,
        showGiftDetail:showGiftDetail,
        showGameGiftList:showGameGiftList,
        getBookedGifts:getBookedGifts,
  
        //摇一摇
        startShake:startShake,
        setShakeStatusHandler:setShakeStatusHandler,
        shakeStatusHandler:function(response){},
  
        //MARK:以下为插件相关接口
        showPluginDetail:showPluginDetail,
  
        //MARK:以下是更新页面相关的本地接口
        showUpdateView:showUpdateView,
  
        //MARK:以下是分享页面相关的本地接口
        shareCommonContent:shareCommonContent,
        showShareView:showShareView
  
    };

    var readyEvent = document.createEvent('Events');
    readyEvent.initEvent('TRH5Init');
    readyEvent.bridge = TRH5Obj;
    document.dispatchEvent(readyEvent);
}());

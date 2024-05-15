import { NativeModules, Platform, NativeEventEmitter } from 'react-native';
const { HyphenatePluginModule, feedbackModule, feedbackNotificationModule } = NativeModules;
let eventEmitter;
if (Platform.OS === 'ios') {
    eventEmitter = new NativeEventEmitter(feedbackNotificationModule);
}
else {
    eventEmitter = new NativeEventEmitter(HyphenatePluginModule);
}
const handlerMap = new WeakMap();
export default class RNHyphenatePlugin {
    /**
     * 尽量不要直接使用此方法
     * @param action 操作
     * @param args 参数
     */
    static execute(action, ...args) {
        if (Platform.OS === 'android') {
            return HyphenatePluginModule.execute(action, ...args);
        }
        else {
            return Promise.reject('only support android platfrom');
        }
    }
    /**
     * 初始化
     * @param config 配置
     */
    static setup(config) {
        if (Platform.OS === 'android') {
            const { appkey, tenantId, imUser, password, userName } = config;
            return HyphenatePluginModule.execute(RNHyphenatePlugin.Constants.ACTION_SETUP, [appkey, tenantId, imUser, password, userName]);
        }
        else if (Platform.OS === 'ios') {
            return feedbackModule.setUpFeedback(config);
        }
        else {
            return Promise.reject('platform not supported');
        }
    }
    /**
     * 弹出客服界面
     */
    static present() {
        if (Platform.OS === 'android') {
            return HyphenatePluginModule.execute(RNHyphenatePlugin.Constants.ACTION_PRESENT, null);
        }
        else if (Platform.OS === 'ios') {
            return feedbackModule.presentFeedback();
        }
        else {
            return Promise.reject('platform not supported');
        }
    }
    /**
     * 登出，仅ios支持
     */
    static logout() {
        if (Platform.OS === 'ios') {
            return feedbackModule.logoutUser();
        }
        else {
            return Promise.reject('platform not supported');
        }
    }
    /**
     * 查看cpu和内存占用，仅ios支持
     */
    static monitor() {
        if (Platform.OS === 'ios') {
            return feedbackModule.lookCPUAndMemory();
        }
        else {
            return Promise.reject('platform not supported');
        }
    }
    static addListener(eventName, handler) {
        let subscription;
        if (eventEmitter) {
            const wrapper = (...args) => {
                if (eventName === 'feedBackMessagesDidReceive') {
                    const [count] = args;
                    if (count == null || typeof count === 'number') {
                        handler(count);
                    }
                    else {
                        handler(count.count);
                    }
                }
                else {
                    handler(...args);
                }
            };
            subscription = eventEmitter.addListener(eventName, wrapper);
            handlerMap.set(handler, subscription);
        }
        else {
            throw new Error('platform not supported');
        }
        return subscription;
    }
    static removeListener(handler) {
        const subscription = handlerMap.get(handler);
        if (subscription) {
            subscription.remove();
        }
        handlerMap.delete(handler);
    }
    /**
     * 弹出loading层
     */
    static showProgressDialog(msg, options) {
        if (Platform.OS === 'android') {
            const args = [msg];
            if (options != null) {
                args.push(options.canceledOnTouchOutsideEnable, options.cancelable);
            }
            HyphenatePluginModule.showProgressDialog(...args);
        }
        else if (Platform.OS === 'ios') {
            feedbackModule.SVProgressShowLoading(msg);
        }
        else {
            throw new Error('platform not supported');
        }
    }
    /**
     * 关闭loading层
     */
    static dismissProgressDialog() {
        if (Platform.OS === 'android') {
            HyphenatePluginModule.dimissProgressDialog();
        }
        else if (Platform.OS === 'ios') {
            feedbackModule.SVProgressDismiss();
        }
        else {
            throw new Error('platform not supported');
        }
    }
    static showToast(msg, type = 'success') {
        if (Platform.OS === 'android') {
            HyphenatePluginModule.showToast(msg);
        }
        else if (Platform.OS === 'ios') {
            if (type === 'success') {
                feedbackModule.SVProgressSuccess(msg);
            }
            else {
                feedbackModule.SVProgressError(msg);
            }
        }
        else {
            throw new Error('platform not supported');
        }
    }
    /**
     * iOS设置自动关闭时长
     * @param interval 成功或者失败提示的显示时长，默认5s，
     */
    static setDismissInterval(interval) {
        if (Platform.OS === 'ios') {
            feedbackModule.SVProgressHUDMinimumDismissTimeInterval(interval);
        }
    }
    /**
     * iOS关闭客服窗口
     */
    static dismissViewController() {
        if (Platform.OS === 'ios') {
            feedbackModule.dismissViewController();
        }
    }

	static initStringConfig(config,defaultLanguage = 'zh'){
		if (Platform.OS === 'android') {
			HyphenatePluginModule.initStringConfig(config,defaultLanguage);
		}else{
            feedbackModule.setLangSrc(config)

		}
	}
	static initImageConfig(config,defaultLanguage = 'zh'){
		if (Platform.OS === 'android') {
			HyphenatePluginModule.initImageConfig(config,defaultLanguage);
		}else{
            feedbackModule.setImageSrc(config)
		}
	}
	static initColorConfig(config,defaultLanguage = 'zh'){
		if (Platform.OS === 'android') {
			HyphenatePluginModule.initColorConfig(config,defaultLanguage);
		}else{
            feedbackModule.setCss(config)
		}
	}
    /**
     * iOS改变状态栏颜色：传入true，状态栏颜色变为白色，传入false，状态栏颜色变为黑色。
     */
    static setStatusBarLight(isLight){
        feedbackModule.setStatusBarLight(isLight)
    }
}
RNHyphenatePlugin.Constants = {
    ACTION_PRESENT: 'present',
    ACTION_SETUP: 'setup'
};

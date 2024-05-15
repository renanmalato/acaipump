import { EmitterSubscription } from 'react-native';
export interface Config {
    appkey: string;
    imUser: string;
    tenantId?: string;
    userName: string;
    password: string;
    /** ios 推送的证书名 */
    apnsCertName?: string;
    /** ios 是客服的头像地址 */
    serviceHeadImage?: string;
    /** ios 客服第一句欢迎语 */
    welcomeWords?: string;
}
export interface ProgressDialogOptions {
    /**表示点击对话框以外是否取消对话框 */
    canceledOnTouchOutsideEnable: boolean;
    /**按back键是否取消对话框 */
    cancelable: boolean;
}
export default class RNHyphenatePlugin {
    static Constants: {
        ACTION_PRESENT: string;
        ACTION_SETUP: string;
    };
    /**
     * 尽量不要直接使用此方法
     * @param action 操作
     * @param args 参数
     */
    static execute(action: string, ...args: any[]): any;
    /**
     * 初始化
     * @param config 配置
     */
    static setup(config: Config): any;
    /**
     * 弹出客服界面
     */
    static present(): Promise<any>;
    /**
     * 登出，仅ios支持
     */
    static logout(): Promise<any>;
    /**
     * 查看cpu和内存占用，仅ios支持
     */
    static monitor(): Promise<any>;
    static addListener(eventName: 'feedBackMessagesDidReceive' | 'feedBackSendLog', handler: (...args: any[]) => void): EmitterSubscription;
    static removeListener(handler: (...args: any[]) => void): void;
    /**
     * 弹出loading层
     */
    static showProgressDialog(msg: string, options?: ProgressDialogOptions): void;
    /**
     * 关闭loading层
     */
    static dismissProgressDialog(): void;
    static showToast(msg: string, type?: 'success' | 'danger'): void;
    /**
     * iOS设置自动关闭时长
     * @param interval 成功或者失败提示的显示时长，默认5s，
     */
    static setDismissInterval(interval: number): void;
    /**
     * iOS关闭客服窗口
     */
    static dismissViewController(): void;

	static initStringConfig(config:any,defaultLanguage?:string):void

	static initImageConfig(config:any,defaultLanguage?:string):void

	static initColorConfig(config:any,defaultLanguage?:string):void

    /**
     * iOS改变状态栏颜色：传入true，状态栏颜色变为白色，传入false，状态栏颜色变为黑色。
     */
    static setStatusBarLight(isLight: boolean): void;
}

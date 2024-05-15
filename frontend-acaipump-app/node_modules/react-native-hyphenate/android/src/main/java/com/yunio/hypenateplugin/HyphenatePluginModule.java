package com.yunio.hypenateplugin;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.yunio.hypenateplugin.activity.CustomChatActivity;
import com.yunio.hypenateplugin.utils.ProgressDialogUtils;
import com.yunio.hypenateplugin.resource.ResourceConfigHelper;
import com.yunio.videocapture.BaseInfoManager;
import com.yunio.videocapture.utils.ToastUtils;

/**
 * Created by JauZhou on 2018/3/20.
 */

public class HyphenatePluginModule extends ReactContextBaseJavaModule {
    private final static String NAME = "HyphenatePluginModule";
    public static final String ACTION_PRESENT = "present";
    public static final String ACTION_SETUP = "setup";
    public static final String ACTION_REGISTER_MESSAGE_LISTENER = "registerMessageListener";

    public final static String EVENT_MESSAGE_UNREAD = "feedBackMessagesDidReceive";
    public final static String EVENT_SEND_LOG = "feedBackSendLog";

    private ReactApplicationContext mContext;
    private Promise mCurPromise;

    public HyphenatePluginModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void execute(String action, ReadableArray args, Promise promise) {
        Log.d(NAME, "execute action: " + action);
        try {
            boolean result = true;
            if (ACTION_PRESENT.equals(action)) {
                this.mCurPromise = promise;
                onPresent();
            } else if (ACTION_SETUP.equals(action)) {
                this.mCurPromise = promise;
                if (args != null && args.size() >= 5) {
                    mContext.runOnUiQueueThread(new Runnable() {
                        @Override
                        public void run() {
                            BaseInfoManager.init(mContext.getApplicationContext());
                        }
                    });
                    String appKey = args.getString(0);
                    String tenantId = args.getString(1);
                    String imUser = args.getString(2);
                    String password = args.getString(3);
                    String selfUser = args.getString(4);
                    onInit(appKey, tenantId, imUser, password, selfUser);
                    EaseChatHelper.getInstance().registerCordovaMessageListener(mContext);
                }
            } else if (ACTION_REGISTER_MESSAGE_LISTENER.equals(action)) {
                this.mCurPromise = promise;
                //                EaseChatHelper.getInstance().registerCordovaMessageListener(callbackContext);
            } else {
                promise.reject("0", "Invalid Action");
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
            promise.reject("1", e.getMessage());
        }
    }

    private void onPresent() {
        // private static String sEasePassword = "ease_yunio";
        // private static String sEaseAppKey = "heartsquare#heartsquare";
        // public static String sEaseTenantId = "14270";
        // public static String sEaseImUser = "khalil";
        CustomChatActivity.startFeedBackActivity(EaseChatHelper.sEaseSelfUser, mContext);
    }

    private void onInit(String appKey, String tenantId, String imUser, String password,
                        String selfUser) {
        EaseChatHelper.getInstance().init(mContext, appKey, tenantId, imUser, password,
                selfUser);
    }

    private void onInit(String appKey, String tenantId, String imUser, String password,
                        String selfUser, String iconPath, String welcomes) {
        EaseChatHelper.getInstance().init(mContext, appKey, tenantId, imUser, password,
                selfUser, iconPath, welcomes);
    }

    @ReactMethod
    public void initStringConfig(String config, String defaultLanguage) {
        ResourceConfigHelper.getInstance().initStringConfig(config, defaultLanguage);
    }

    @ReactMethod
    public void initImageConfig(String config, String defaultLanguage) {
        ResourceConfigHelper.getInstance().initImageConfig(config, defaultLanguage);
    }

    @ReactMethod
    public void initColorConfig(String config, String defaultLanguage) {
        ResourceConfigHelper.getInstance().initColorConfig(config, defaultLanguage);
    }

    @ReactMethod
    public void showProgressDialog(final String message, final boolean canceledOnTouchOutsideEnable, final boolean cancelable) {
        mContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ProgressDialogUtils.showProgressDialog(mContext.getCurrentActivity(), message, canceledOnTouchOutsideEnable, cancelable);
            }
        });

    }

    @ReactMethod
    public void showProgressDialog(final String message) {
        mContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ProgressDialogUtils.showProgressDialog(mContext.getCurrentActivity(), message);
            }
        });
    }

    @ReactMethod
    public void dimissProgressDialog() {
        mContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ProgressDialogUtils.dismissProgressDialog();
            }
        });

    }

    @ReactMethod
    public void showToast(final String message) {
        mContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                ToastUtils.showToast(message);
            }
        });
    }
}

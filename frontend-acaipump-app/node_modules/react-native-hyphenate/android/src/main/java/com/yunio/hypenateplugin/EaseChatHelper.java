package com.yunio.hypenateplugin;

import android.content.Context;
import android.content.Intent;
import android.text.TextUtils;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.hyphenate.chat.ChatClient;
import com.hyphenate.chat.ChatManager;
import com.hyphenate.chat.Message;
import com.hyphenate.exceptions.HyphenateException;
import com.hyphenate.helpdesk.Error;
import com.hyphenate.helpdesk.callback.Callback;
import com.hyphenate.helpdesk.util.Log;
import com.yunio.easechat.Notifier.NotificationInfoProvider;
import com.yunio.easechat.UIProvider;
import com.yunio.easechat.UIProvider.MessageProfileProvider;
import com.yunio.easechat.activity.ChatActivity;
import com.yunio.easechat.interfaces.IEaseChatLoginState;
import com.yunio.easechat.utils.CommonUtils;
import com.yunio.easechat.utils.LogUtils;
import com.yunio.hypenateplugin.activity.CustomChatActivity;
import com.yunio.hypenateplugin.resource.ResourceConfigHelper;
import com.yunio.hypenateplugin.resource.entity.StringConfig;
import com.yunio.hypenateplugin.utils.NetworkUtils;

import java.util.List;
import java.util.Locale;


public class EaseChatHelper {
    private final static String TAG = "EaseChatHelper";
    // private static String sEasePassword = "ease_yunio";
    // private static String sEaseAppKey = "heartsquare#heartsquare";
    // public static String sEaseTenantId = "14270";
    // public static String sEaseImUser = "khalil";
    public static String sEaseSelfUser;
    private static String sEasePassword;
    private static String sEaseAppKey;
    public static String sEaseTenantId;
    public static String sEaseImUser;

    public static String sIconPath;
    public static String sWelcomes;

    private static EaseChatHelper instance = new EaseChatHelper();

    private ChatManager.MessageListener messageListener;
    private ChatClient.ConnectionListener mConnectionListener;
    private boolean isConnect;

    private boolean isLogining;

    private Intent mLauchIntent;

    private ReactApplicationContext mCallbackContext;

    public static EaseChatHelper getInstance() {
        return instance;
    }

    public void init(Context context) {
        init(context, "heartsquare#heartsquare", "14270", "khalil", "ease_yunio", "13917876491");
    }

    public void init2(Context context) {
        init(context, "1422190821061984#ppickup", "73594", "july", "littleworld1213", "13917876491");
    }

    public void init(Context context, String appKey, String tenantId, String imUser,
                     String password, String selfUser) {
        init(context, appKey, tenantId, imUser, password, selfUser, "", "");
    }

    public void init(Context context, String appKey, String tenantId, String imUser,
                     String password, String selfUser, String iconPath, String welcomes) {
        LogUtils.d(TAG, "appKey: %s, tenantId: %s, imUser: %s, pwd: %s, selfUser: %s", appKey,
                tenantId, imUser, password, selfUser);
        ChatClient.Options options = new ChatClient.Options();
        sEaseAppKey = appKey;
        sEaseTenantId = tenantId;
        sEaseImUser = imUser;
        sEasePassword = password;
        sEaseSelfUser = sEaseTenantId + selfUser;
        sIconPath = iconPath;
        sWelcomes = welcomes;
        options.setAppkey(sEaseAppKey);
        options.setTenantId(sEaseTenantId);

        if (ChatClient.getInstance().init(context, options)) {
            try {
                // 更新过appKey, 这里需要调用更新方法，否则升级后注册帐号会失败
                ChatClient.getInstance().changeAppKey(sEaseAppKey);
            } catch (HyphenateException e) {
                e.printStackTrace();
            }
            ChatClient.getInstance().setDebugMode(true);
            UIProvider.getInstance().init(context);
            setEaseUIProvider(context);
            setGlobalListeners();
        }
    }

    private void setEaseUIProvider(final Context context) {
        UIProvider.getInstance().setMessageProfileProvider(new MessageProfileProvider() {

            @Override
            public boolean isTimeNecessary() {
                return false;
            }

            @Override
            public boolean isShowProgress() {
                return true;
            }
        });

        UIProvider.getInstance().getNotifier()
                .setNotificationInfoProvider(new NotificationInfoProvider() {

                    @Override
                    public String getTitle(Message message) {
                        return null;
                    }

                    @Override
                    public int getSmallIcon(Message message) {
                        return 0;
                    }

                    @Override
                    public Intent getLaunchIntent(Message message) {
                        if (mLauchIntent == null) {
                            mLauchIntent = new Intent(context, CustomChatActivity.class);
                            mLauchIntent.putExtra(ChatActivity.EXTRA_IM,
                                    EaseChatHelper.sEaseImUser);
                        }
                        return mLauchIntent;
                    }

                    @Override
                    public String getLatestText(Message message, int fromUsersNum, int messageNum) {
                        return getDisplayedText(message);
                    }

                    @Override
                    public String getDisplayedText(Message message) {
                        // 设置状态栏的消息提示，可以根据message的类型做相应提示
                        String ticker = CommonUtils.getMessageDigest(message, context);
                        if (message.getType() == Message.Type.TXT) {
                            ticker = ticker.replaceAll("\\[.{2,3}\\]", "[表情]");
                        }
                        String customMessage = context.getString(R.string.custom_message);
                        StringConfig config = ResourceConfigHelper.getInstance().getStringConfig();
                        if (config != null && !TextUtils.isEmpty(config.getCustomMessage())) {
                            customMessage = config.getCustomMessage();
                        }
                        return customMessage + ticker;
                    }

                });
    }

    private void setGlobalListeners() {
        mConnectionListener = new ChatClient.ConnectionListener() {

            @Override
            public void onDisconnected(int errorCode) {
                isConnect = false;
                if (errorCode == Error.USER_NOT_FOUND
                        || errorCode == Error.USER_LOGIN_ANOTHER_DEVICE
                        || errorCode == Error.USER_AUTHENTICATION_FAILED
                        || errorCode == Error.USER_REMOVED) {
                    ChatClient.getInstance().logout(false, null);
                }

            }

            @Override
            public void onConnected() {
                isConnect = true;
            }
        };
        ChatClient.getInstance().addConnectionListener(mConnectionListener);
        // registerMessageListener();
    }

    private void registerMessageListener() {
        messageListener = new ChatManager.MessageListener() {

            @Override
            public void onMessageStatusUpdate() {

            }

            @Override
            public void onMessageSent() {

            }

            @Override
            public void onMessage(List<Message> arg0) {
                Log.d(TAG, arg0.get(0).toString());
            }

            @Override
            public void onCmdMessage(List<Message> arg0) {

            }
        };
        ChatManager.getInstance().addMessageListener(messageListener);
    }

    public boolean isConnected() {
        return isConnect;
    }

    public void registerCordovaMessageListener(ReactApplicationContext callBackContext) {
        this.mCallbackContext = callBackContext;
    }

    /**
     * 发送未读消息数
     */
    public void callbackMessageCount() {
        sendEvent(HyphenatePluginModule.EVENT_MESSAGE_UNREAD, ChatClient.getInstance().chatManager().getUnreadMsgsCount());
    }


    /**
     * 发送日志
     */
    public void callSendLog() {
        sendEvent(HyphenatePluginModule.EVENT_SEND_LOG, null);
    }

    private void sendEvent(String eventName, Object data) {
        if (mCallbackContext != null) {
            mCallbackContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit
                    (eventName, data);
        }
    }

    public void login(final Context context, String userName,
                      final IEaseChatLoginState loginState) {
        if (isLogining) {
            return;
        }
        if (!NetworkUtils.isNetworkAvailable(context)) {
            String networkError = context.getString(R.string.network_error);
            StringConfig config = ResourceConfigHelper.getInstance().getStringConfig();
            if (config != null && !TextUtils.isEmpty(config.getNetworkError())) {
                networkError = config.getNetworkError();
            }
            Toast.makeText(context, networkError, Toast.LENGTH_LONG)
                    .show();
            if (loginState != null) {
                loginState.onLoginFail();
            }
            return;
        }
        if (TextUtils.isEmpty(userName)) {
            if (loginState != null) {
                loginState.onLoginFail();
            }
            isLogining = false;
            return;
        }
        final String realUserName = userName.toLowerCase(Locale.getDefault());
        isLogining = true;
        if (ChatClient.getInstance().isLoggedInBefore()) {
            if (ChatClient.getInstance().getCurrentUserName().equals(realUserName)) {
                isLogining = false;
                if (loginState != null) {
                    loginState.onLoginSuccess();
                }
                return;
            } else {
                logout(new Callback() {

                    @Override
                    public void onSuccess() {
                        createAccount(context, realUserName, loginState);
                    }

                    @Override
                    public void onProgress(int arg0, String arg1) {

                    }

                    @Override
                    public void onError(int arg0, String arg1) {
                        isLogining = false;
                        if (loginState != null) {
                            loginState.onLoginFail();
                        }
                    }
                });
            }
        } else {
            createAccount(context, realUserName, loginState);
        }

    }

    private void createAccount(final Context context, final String userName,
                               final IEaseChatLoginState loginState) {
        ChatClient.getInstance().createAccount(userName, sEasePassword, new Callback() {

            @Override
            public void onSuccess() {
                loginfinal(userName, loginState);
            }

            @Override
            public void onProgress(int arg0, String arg1) {

            }

            @Override
            public void onError(int errorCode, String arg1) {
                Log.d(TAG, errorCode + "----" + arg1);
                if (errorCode == Error.USER_ALREADY_EXIST) {
                    loginfinal(userName, loginState);
                } else {
                    isLogining = false;
                    if (errorCode == Error.NETWORK_ERROR) {
                        // ToastUtils.showToast("网络不可用");
                        Toast.makeText(context, "网络不可用", Toast.LENGTH_LONG).show();
                    } else if (errorCode == Error.USER_ILLEGAL_ARGUMENT) {
                        // ToastUtils.showToast("用户名不合法");
                        Toast.makeText(context, "用户名不合法", Toast.LENGTH_LONG).show();
                    }
                    if (loginState != null) {
                        loginState.onLoginFail();
                    }
                }

            }
        });
    }

    private void loginfinal(String userName, final IEaseChatLoginState loginState) {
        ChatClient.getInstance().login(userName, sEasePassword, new Callback() {

            @Override
            public void onSuccess() {
                isLogining = false;
                if (loginState != null) {
                    loginState.onLoginSuccess();
                }
            }

            @Override
            public void onProgress(int arg0, String arg1) {

            }

            @Override
            public void onError(int arg0, String arg1) {
                isLogining = false;
                Log.d(TAG, arg0 + "----" + arg1);
                if (loginState != null) {
                    loginState.onLoginFail();
                }
            }
        });
    }

    public void logout(Callback callback) {
        ChatClient.getInstance().logout(true, callback);
    }

}

package com.yunio.easechat;

import android.app.Activity;
import android.content.Context;

import com.hyphenate.chat.ChatClient;
import com.hyphenate.chat.ChatManager;
import com.hyphenate.chat.Message;
import com.yunio.easechat.emoji.Emojicon;
import com.yunio.easechat.interfaces.IMessageReceiver;
import com.yunio.easechat.utils.AppUtils;
import com.yunio.easechat.utils.ChatLibMessageHelper;
import com.yunio.easechat.utils.LogUtils;
import com.yunio.hypenateplugin.EaseChatHelper;
import com.yunio.videocapture.BaseInfoManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class UIProvider {
    private static final String TAG = UIProvider.class.getSimpleName();

    /**
     * the global EaseUI instance
     */
    private static UIProvider instance = null;

    /**
     * 用户属性提供者
     */
    private MessageProfileProvider messageProvider;

    private SettingsProvider settingsProvider;

    /**
     * application context
     */
    private Context appContext = null;

    /**
     * the notifier
     */
    private Notifier notifier = null;

    /**
     * 用来记录注册了eventlistener的foreground Activity
     */
    private List<Activity> activityList = Collections.synchronizedList(new ArrayList<Activity>());

    public void pushActivity(Activity activity) {
        if (!activityList.contains(activity)) {
            activityList.add(0, activity);
        }
    }

    public void popActivity(Activity activity) {
        activityList.remove(activity);
    }

    private UIProvider() {
    }

    /**
     * 获取EaseUI单实例对象
     *
     * @return
     */
    public synchronized static UIProvider getInstance() {
        if (instance == null) {
            instance = new UIProvider();
        }
        return instance;
    }

    /**
     * @param context
     */
    public synchronized void init(Context context) {
        appContext = context;
        initNotifier();

        if (settingsProvider == null) {
            settingsProvider = new DefaultSettingsProvider();
        }
        ChatClient.getInstance().chatManager().addMessageListener(new ChatManager.MessageListener() {
            @Override
            public void onMessage(final List<Message> msgs) {
                MessageDeliverManager.getInstance().deliver(msgs);
                LogUtils.d(TAG, " msgs size : " + msgs.size());
                IMessageReceiver receiver = MessageDeliverManager.getInstance().getLastedReceiver();
                boolean isNotificationNecessary = receiver != null && receiver.isNotificationNecessary();
                LogUtils.d(TAG, " isNotificationNecessary : " + isNotificationNecessary);
                boolean isAppRunningForeground = AppUtils.isAppRunningForeground(appContext);
                LogUtils.d(TAG, " isAppRunningForeground : " + isAppRunningForeground);
                BaseInfoManager.getInstance().getMainHandler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        EaseChatHelper.getInstance().callbackMessageCount();
                    }
                }, 500);
                if (isNotificationNecessary || !isAppRunningForeground) {
                    for (Message message : msgs) {
                        if (ChatLibMessageHelper.isDebugMessgae(appContext, message)) {
                            continue;
                        }
                        LogUtils.d(TAG, message.toString());
                        getNotifier().onNewMsg(message);
                    }
                }
            }

            @Override
            public void onCmdMessage(List<Message> msgs) {

            }

            @Override
            public void onMessageStatusUpdate() {

            }

            @Override
            public void onMessageSent() {

            }
        });
    }

    void initNotifier() {
        notifier = createNotifier();
        notifier.init(appContext);
    }

    protected Notifier createNotifier() {
        return new Notifier();
    }

    public Notifier getNotifier() {
        return notifier;
    }

    public boolean hasForegroundActivies() {
        return activityList.size() != 0;
    }

    /**
     * 设置用户属性提供者
     */
    public void setMessageProfileProvider(MessageProfileProvider messageProvider) {
        this.messageProvider = messageProvider;
    }

    public MessageProfileProvider getMessageProfileProvider() {
        return messageProvider;
    }

    public void setSettingsProvider(SettingsProvider settingsProvider) {
        this.settingsProvider = settingsProvider;
    }

    public SettingsProvider getSettingsProvider() {
        return settingsProvider;
    }

    /**
     * 消息框相关设置
     *
     * @author Administrator
     */
    public interface MessageProfileProvider {
        // void setNickAndAvatar(Context context, Message message, ImageView
        // userAvatarView,
        // TextView usernickView);
        boolean isTimeNecessary();

        boolean isShowProgress();
    }

    /**
     * 表情信息提供者
     */
    public interface EmojiconInfoProvider {
        /**
         * 根据唯一识别号返回此表情内容
         */
        Emojicon getEmojiconInfo(String emojiconIdentityCode);

        /**
         * 获取文字表情的映射Map,map的key为表情的emoji文本内容，value为对应的图片资源id或者本地路径(不能为网络地址)
         *
         * @return
         */
        Map<String, Object> getTextEmojiconMapping();
    }

    private EmojiconInfoProvider emojiconInfoProvider;

    /**
     * 获取表情提供者
     *
     * @return
     */
    public EmojiconInfoProvider getEmojiconInfoProvider() {
        return emojiconInfoProvider;
    }

    /**
     * 设置表情信息提供者
     */
    public void setEmojiconInfoProvider(EmojiconInfoProvider emojiconInfoProvider) {
        this.emojiconInfoProvider = emojiconInfoProvider;
    }

    /**
     * 新消息提示设置的提供者
     */
    public interface SettingsProvider {
        boolean isMsgNotifyAllowed(Message message);

        boolean isMsgSoundAllowed(Message message);

        boolean isMsgVibrateAllowed(Message message);

        boolean isSpeakerOpened();
    }

    /**
     * default settings provider
     */
    private class DefaultSettingsProvider implements SettingsProvider {

        @Override
        public boolean isMsgNotifyAllowed(Message message) {
            return true;
        }

        @Override
        public boolean isMsgSoundAllowed(Message message) {
            return true;
        }

        @Override
        public boolean isMsgVibrateAllowed(Message message) {
            return true;
        }

        @Override
        public boolean isSpeakerOpened() {
            return true;
        }

    }

}
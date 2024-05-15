package com.yunio.easechat.view;

import android.content.Context;
import android.view.LayoutInflater;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.hyphenate.chat.Message;
import com.hyphenate.util.DateUtils;
import com.yunio.easechat.UIProvider;
import com.yunio.hypenateplugin.R;
import com.yunio.videocapture.utils.UIUtils;

import java.util.Date;


public abstract class ChatBaseCell extends LinearLayout {
    protected Context context;
    protected TextView mTimeTextView;
    protected Message message;
    //    protected static DisplayImageOptions defaultOptions = (new DisplayImageOptions.Builder())
    //            .cacheInMemory(true).cacheOnDisk(true)
    ////            .displayer(new RoundedBitmapDisplayer(CBCommonManager.getInstance().dip2px(19)))
    //            .showImageOnLoading(R.drawable.user_default)
    //            .showImageForEmptyUri(R.drawable.user_default).showImageOnFail(R.drawable.user_default)
    //            .build();

    protected static final int ImageMaxHeight = UIUtils.dip2px(135);
    protected static final int ImageMinHeight = UIUtils.dip2px(100);

    public interface ChatBaseCellListener {
        void onAvatarButtonPressed(ChatBaseCell cell);

        void onAvatarLongPressed(ChatBaseCell cell);

        void onResendButtonPressed(ChatBaseCell cell);

        void onLongPressed(ChatBaseCell cell);

        /**
         * 消息内容View被点击时回调
         *
         * @param cell
         * @param isLeft
         * @param message
         */
        void onMessageViewClick(ChatBaseCell cell, boolean isLeft, Message message);
    }

    protected ChatBaseCellListener mListener;

    /**
     * 构造函数
     *
     * @param context
     * @param extraObj 该参数会回传给onInitView
     */
    public ChatBaseCell(Context context, Object extraObj) {
        super(context);
        this.context = context;
        initView(extraObj);
    }

    public ChatBaseCell(Context context) {
        this(context, null);
    }

    protected void initView(Object extraObj) {
        LayoutInflater.from(context).inflate(getLayoutResId(), this);
        onInitView();
        mTimeTextView = (TextView) findViewById(R.id.timestamp);
    }

    protected abstract void onInitView();

    protected abstract int getLayoutResId();

    public void setListener(ChatBaseCellListener listener) {
        mListener = listener;
    }

    public void showTime(boolean isShow) {
        if (mTimeTextView == null) {
            return;
        }
        // 设置用户昵称头像，bubble背景等
        UIProvider.MessageProfileProvider provider = UIProvider.getInstance().getMessageProfileProvider();
        if (provider.isTimeNecessary() && isShow) {
            mTimeTextView.setText(DateUtils.getTimestampString(new Date(message.messageTime())));
            mTimeTextView.setVisibility(VISIBLE);
        } else {
            mTimeTextView.setVisibility(GONE);
        }
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public Message getMessage() {
        return message;
    }

    public void setProgress(int percent) {

    }

    public void doAudioAnimation() {

    }

    public boolean hasDestory() {
        return false;
    }

}

package com.yunio.hypenateplugin.view;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.AttributeSet;

import com.hyphenate.chat.ChatClient;
import com.hyphenate.chat.EMImageMessageBody;
import com.hyphenate.chat.Message;
import com.yunio.easechat.utils.LogUtils;
import com.yunio.hypenateplugin.view.roundimage.RoundedImageView;


/**
 * Created by flea4win on 2017/12/27.
 */

public class ChatImageView extends RoundedImageView {
    private Message message;

    public ChatImageView(Context context) {
        super(context);
    }

    public ChatImageView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public ChatImageView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public void setChatImagePath(Message message, int width, int height) {
        this.message = message;
        EMImageMessageBody imgBody = (EMImageMessageBody) message.getBody();
        final String localPath = imgBody.getLocalUrl();
        if (!checkUrl(localPath)) {
            return;
        }
        initImageSize(width, height);
        onRequestExecute();
        loadLocalImage();
    }

    @Override
    public void onResponse(int statusCode, Bitmap bitmap, Object tag) {
        super.onResponse(statusCode, bitmap, tag);
        LogUtils.d(TAG, "statusCode : " + statusCode);
        if (statusCode == SC_NOT_FOUND) {
            LogUtils.d(TAG, "SC_NOT_FOUND : SC_NOT_FOUND");
            ChatClient.getInstance().chatManager().downloadAttachment(message);
        }
    }
}

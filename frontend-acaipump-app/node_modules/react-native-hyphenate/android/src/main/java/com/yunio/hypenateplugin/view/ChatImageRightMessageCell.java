package com.yunio.hypenateplugin.view;

import android.content.Context;

import com.hyphenate.chat.Message;
import com.hyphenate.helpdesk.callback.Callback;
import com.yunio.videocapture.utils.LogUtils;

/**
 * Created by flea4win on 2017/12/27.
 */

public class ChatImageRightMessageCell extends ChatImageBaseMessageCell {
    private final static String TAG = "ChatImageRightMessageCell";

    public ChatImageRightMessageCell(Context context, boolean isLeftCell) {
        super(context, isLeftCell);
    }

    @Override
    public void setMessage(Message message) {
        super.setMessage(message);
        showImage();
    }

    @Override
    protected void setMessageStatusCallback() {
        message.setMessageStatusCallback(new Callback() {
            @Override
            public void onSuccess() {
                LogUtils.d(TAG, " setMessageStatusCallback  onSuccess");
                updateSendStatus();
                updatePercentage(false);
            }

            @Override
            public void onError(int i, String s) {
                LogUtils.d(TAG, " setMessageStatusCallback  onError");
                updateSendStatus();
                updatePercentage(false);
            }

            @Override
            public void onProgress(int i, String s) {
                LogUtils.d(TAG, " setMessageStatusCallback  onProgress");
                updateSendStatus();
                updatePercentage(true);
            }
        });
    }
}

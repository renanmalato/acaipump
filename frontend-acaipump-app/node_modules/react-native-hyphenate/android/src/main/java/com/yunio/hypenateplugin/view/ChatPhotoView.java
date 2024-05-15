package com.yunio.hypenateplugin.view;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.AttributeSet;

import com.hyphenate.chat.ChatClient;
import com.hyphenate.chat.EMImageMessageBody;
import com.hyphenate.chat.Message;
import com.hyphenate.helpdesk.callback.Callback;
import com.yunio.videocapture.BaseInfoManager;
import com.yunio.videocapture.utils.LogUtils;
import com.yunio.videocapture.utils.ViewUtils;
import com.yunio.videocapture.view.PhotoView;

/**
 * Created by flea4win on 2017/12/27.
 */

public class ChatPhotoView extends PhotoView {
    private final static String TAG = "ChatPhotoView";
    private Message message;

    public ChatPhotoView(Context context) {
        super(context);
    }

    public ChatPhotoView(Context context, AttributeSet attr) {
        super(context, attr);
    }

    public ChatPhotoView(Context context, AttributeSet attr, int defStyle) {
        super(context, attr, defStyle);
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
            if (mProgress != null) {
                ViewUtils.setVisibility(mProgress, VISIBLE);
            }
            message.setMessageStatusCallback(new Callback() {
                @Override
                public void onSuccess() {
                    downloadResult(true);
                }

                @Override
                public void onError(int i, String s) {
                    downloadResult(false);
                }

                @Override
                public void onProgress(int i, String s) {

                }
            });
            ChatClient.getInstance().chatManager().downloadAttachment(message);
        }
    }

    private void downloadResult(final boolean success) {
        BaseInfoManager.getInstance().getMainHandler().post(new Runnable() {
            @Override
            public void run() {
                if (mProgress != null) {
                    ViewUtils.setVisibility(mProgress, success ? GONE : VISIBLE);
                }
                if (success) {
                    loadLocalImage();
                }
            }
        });
    }

}

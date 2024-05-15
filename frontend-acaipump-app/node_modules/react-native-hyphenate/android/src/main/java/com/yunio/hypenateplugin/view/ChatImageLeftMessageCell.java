package com.yunio.hypenateplugin.view;

import android.content.Context;

import com.hyphenate.chat.EMFileMessageBody;
import com.hyphenate.chat.EMImageMessageBody;
import com.hyphenate.chat.Message;
import com.hyphenate.helpdesk.callback.Callback;
import com.yunio.videocapture.utils.LogUtils;

/**
 * Created by flea4win on 2017/12/26.
 */

public class ChatImageLeftMessageCell extends ChatImageBaseMessageCell {
    private final static String TAG = "ChatImageLeftMessageCell";

    public ChatImageLeftMessageCell(Context context, boolean isLeftCell) {
        super(context, isLeftCell);
    }

    @Override
    public void setMessage(Message message) {
        super.setMessage(message);

        updatePercentage(false);
        setMessageStatusCallback();
        if (!isDownloading()) {
            showImage();
        }
    }

    @Override
    protected void setMessageStatusCallback() {
        message.setMessageStatusCallback(new Callback() {
            @Override
            public void onSuccess() {
                LogUtils.d(TAG, " image message receive success");
                updatePercentage(false);
                mTvPercentage.post(new Runnable() {
                    @Override
                    public void run() {
                        showImage();
                    }
                });
            }

            @Override
            public void onError(int i, String s) {
                updatePercentage(false);
            }

            @Override
            public void onProgress(int i, String s) {
                LogUtils.d(TAG, " image message receive onProgress : " + i);
                updatePercentage(true);
            }
        });
    }


    protected boolean isDownloading() {
        EMImageMessageBody imageMessageBody = (EMImageMessageBody) message.body();
        return imageMessageBody.thumbnailDownloadStatus() == EMFileMessageBody.EMDownloadStatus.DOWNLOADING ||
                imageMessageBody.thumbnailDownloadStatus() == EMFileMessageBody.EMDownloadStatus.PENDING;
    }
}

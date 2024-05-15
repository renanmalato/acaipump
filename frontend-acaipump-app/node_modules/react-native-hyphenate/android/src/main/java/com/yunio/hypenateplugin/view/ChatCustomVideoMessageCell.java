package com.yunio.hypenateplugin.view;

import android.app.Activity;
import android.content.Context;
import android.text.Html;
import android.view.View;
import android.widget.TextView;

import com.hyphenate.chat.ChatClient;
import com.hyphenate.chat.EMNormalFileMessageBody;
import com.hyphenate.chat.Message;
import com.hyphenate.helpdesk.callback.Callback;
import com.hyphenate.util.FileUtils;
import com.hyphenate.util.TextFormater;
import com.yunio.easechat.utils.LogUtils;
import com.yunio.hypenateplugin.R;

import java.io.File;


/**
 * Created by flea4win on 2017/12/27.
 */

public class ChatCustomVideoMessageCell extends ChatSuperBaseCell {
    private final static String TAG = "ChatCustomVideoMessageCell";
    protected TextView mMessageTextView;

    public ChatCustomVideoMessageCell(Context context, boolean isLeftCell) {
        super(context, isLeftCell);
    }

    @Override
    protected void onInitView() {
        super.onInitView();
        mMessageTextView = (TextView) this.findViewById(R.id.chat_text_message);
        mMessageTextView.setTextIsSelectable(false);
    }

    @Override
    public void setMessage(Message message) {
        super.setMessage(message);
        if (isLeftCell()) {
            EMNormalFileMessageBody messageBody = (EMNormalFileMessageBody) message.getBody();
            if (com.yunio.videocapture.utils.FileUtils.exists(messageBody.getLocalUrl())) {
                mMessageTextView.setText(
                        Html.fromHtml(context.getString(R.string.feedback_receive_video_success)));
            } else {
                mMessageTextView.setText(Html.fromHtml(context.getString(R.string.feedback_receive_video,
                        TextFormater.getDataSize(messageBody.getFileSize()))));
            }
            mMessageTextView.setOnClickListener(new OnClickListener() {
                @Override
                public void onClick(View v) {
                    onVideoClick();
                }
            });
            setMessageReceiveCallBack();
        } else {
            mMessageTextView.setText(R.string.feedback_send_video);
        }
        mMessageTextView.requestLayout();
    }

    private void onVideoClick() {
        EMNormalFileMessageBody messageBody = (EMNormalFileMessageBody) message.getBody();
        String localPath = messageBody.getLocalUrl();
        if (com.yunio.videocapture.utils.FileUtils.exists(localPath)) {
            if (context instanceof Activity) {
                FileUtils.openFile(new File(localPath), (Activity) context);
            }
        } else {
            ChatClient.getInstance().getChat().downloadAttachment(message);
        }
    }

    private void setMessageReceiveCallBack() {
        message.setMessageStatusCallback(new Callback() {
            @Override
            public void onSuccess() {
                mMessageTextView.post(new Runnable() {
                    @Override
                    public void run() {
                        mMessageTextView.setClickable(true);
                        mMessageTextView.setText(
                                Html.fromHtml(context.getString(R.string.feedback_receive_video_success)));
                        mMessageTextView.requestLayout();
                    }
                });
            }

            @Override
            public void onError(int i, String s) {

            }

            @Override
            public void onProgress(final int i, String s) {
                mMessageTextView.post(new Runnable() {
                    @Override
                    public void run() {
                        mMessageTextView.setClickable(false);
                        mMessageTextView.setText(context.getString(R.string.feedback_receiving_video, i));
                        mMessageTextView.requestLayout();
                    }
                });
            }
        });
    }

    @Override
    protected void setMessageStatusCallback() {
        message.setMessageStatusCallback(new Callback() {
            @Override
            public void onSuccess() {
                LogUtils.d(TAG, " setMessageStatusCallback  onSuccess");
                updateSendStatus();
                mMessageTextView.post(new Runnable() {
                    @Override
                    public void run() {
                        mMessageTextView.setText(R.string.feedback_send_video);
                        mMessageTextView.requestLayout();
                    }
                });
            }

            @Override
            public void onError(int i, String s) {
                LogUtils.d(TAG, " setMessageStatusCallback  onError");
                updateSendStatus();
            }

            @Override
            public void onProgress(final int i, String s) {
                LogUtils.d(TAG, " setMessageStatusCallback  onProgress");
                updateSendStatus();
                mMessageTextView.post(new Runnable() {
                    @Override
                    public void run() {
                        mMessageTextView.setText(context.getString(R.string.feedback_sending_video, i));
                        mMessageTextView.requestLayout();
                    }
                });
            }
        });
    }

    @Override
    protected int getContentLayoutResId() {
        return isLeftCell() ? R.layout.chat_left_text_message_cell
                : R.layout.chat_right_text_message_cell;
    }
}

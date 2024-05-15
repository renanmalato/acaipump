package com.yunio.hypenateplugin.view;

import java.io.File;

import com.hyphenate.chat.ChatClient;
import com.hyphenate.chat.EMImageMessageBody;
import com.hyphenate.chat.Message;
import com.hyphenate.helpdesk.callback.Callback;
import com.yunio.easechat.utils.LogUtils;
import com.yunio.hypenateplugin.utils.ViewUtils;
import com.yunio.videocapture.BaseInfoManager;
import com.yunio.videocapture.view.PhotoView;

import android.content.Context;
import android.util.AttributeSet;

public class MyPhotoView extends PhotoView {

	public MyPhotoView(Context context, AttributeSet attr, int defStyle) {
		super(context, attr, defStyle);
	}

	public MyPhotoView(Context context, AttributeSet attr) {
		super(context, attr);
	}

	public MyPhotoView(Context context) {
		super(context);
	}

	public void downloadFeedBackImage(Message message, int width, int height) {
		EMImageMessageBody imgBody = (EMImageMessageBody) message.getBody();
		final String path = imgBody.getLocalUrl();
		if (!checkUrl(path)) {
			return;
		}
		initImageSize(width, height);
		onRequestExecute();
		Callback callBack = new Callback() {

			@Override
			public void onSuccess() {
				hiddenProgress(true);
			}

			@Override
			public void onProgress(int arg0, String arg1) {
				LogUtils.d("onProgress", arg0 + "%");
			}

			@Override
			public void onError(int arg0, String arg1) {
				mStatus = STATUS_LOAD_FAILED;
				File file = new File(path);
				if (file.exists() && file.isFile()) {
					file.delete();
				}
				hiddenProgress(false);
			}
		};
		message.setMessageStatusCallback(callBack);
		ChatClient.getInstance().getChat().downloadAttachment(message);
	}

	private void hiddenProgress(final boolean success) {
		BaseInfoManager.getInstance().getMainHandler().post(new Runnable() {

			@Override
			public void run() {
				ViewUtils.setVisibility(mProgress, GONE);
				if (success) {
					loadLocalImage();
				}
			}
		});

	}
}

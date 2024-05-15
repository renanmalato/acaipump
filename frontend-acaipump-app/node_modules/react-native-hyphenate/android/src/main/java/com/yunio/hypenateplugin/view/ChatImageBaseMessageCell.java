package com.yunio.hypenateplugin.view;

import android.content.Context;
import android.graphics.BitmapFactory;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.hyphenate.chat.EMImageMessageBody;
import com.hyphenate.chat.Message;
import com.yunio.hypenateplugin.R;
import com.yunio.videocapture.utils.BitmapUtils;
import com.yunio.videocapture.utils.FileUtils;
import com.yunio.videocapture.utils.LogUtils;
import com.yunio.videocapture.utils.UIUtils;


/**
 * Created by flea4win on 2017/12/26.
 */

public class ChatImageBaseMessageCell extends ChatSuperBaseCell {
    private final static String TAG = "ChatImageBaseMessageCell";
    private static final double MAX_SCALE = 7.5;
    private static final double MIN_SCALE = 2.5;
    //    private static final double MAX_SCALE = 4;
    //    private static final double MIN_SCALE = 2;
    public static final int THUMB_SMALL_SIZE = (int) (Math.min(UIUtils.getWidthPixels(), UIUtils.getHeightPixels()) /
            MAX_SCALE);
    public static final int THUMB_BIG_SIZE = (int) (Math.min(UIUtils.getWidthPixels(), UIUtils.getHeightPixels()) /
            MIN_SCALE);
    protected ChatImageView mRivImageView;
    protected TextView mTvPercentage;
    protected int[] imageSize;


    public ChatImageBaseMessageCell(Context context, boolean isLeftCell) {
        super(context, isLeftCell);
    }

    @Override
    protected void onInitView() {
        super.onInitView();
        mRivImageView = (ChatImageView) findViewById(R.id.riv_image);
        mSendLoadingView = findViewById(getSendLoadingResId());
        mTvPercentage = (TextView) findViewById(R.id.percentage);
    }

    @Override
    public void setMessage(Message message) {
        super.setMessage(message);
        EMImageMessageBody imageMessageBody = (EMImageMessageBody) message.getBody();
        int width = imageMessageBody.getWidth();
        int height = imageMessageBody.getHeight();
        LogUtils.d(TAG, "width : " + width + " height : " + height);
        imageSize = caculateImageView(true, width, height);
    }

    protected int[] caculateImageView(boolean messageData, int imageWidth, int imageHeight) {
        if (imageWidth > 0 && imageHeight > 0) {
            float widthScale = ((float) imageWidth) / THUMB_SMALL_SIZE;
            float heightScale = ((float) imageHeight) / THUMB_BIG_SIZE;
            int width, height;
            float scale;
            if (widthScale > heightScale) {
                scale = heightScale;
                width = (int) (imageWidth / scale);
                height = THUMB_BIG_SIZE;
            } else {
                scale = widthScale;
                width = THUMB_SMALL_SIZE;
                height = (int) (imageHeight / scale);
            }
            FrameLayout.LayoutParams layoutParams = (FrameLayout.LayoutParams) mRivImageView.getLayoutParams();
            layoutParams.width = width;
            layoutParams.height = height;
            LogUtils.d(TAG, "result width : " + width + " height : " + height);
            return new int[]{width, height};
        } else {
            if (messageData) {//从消息体获取不到宽高,从源文件获取
                return width_height();
            }
        }
        return new int[]{0, 0};
    }

    private int[] width_height() {
        LogUtils.d(TAG, "width_height by file");
        EMImageMessageBody imageMessageBody = (EMImageMessageBody) message.body();
        String localPath = imageMessageBody.getLocalUrl();
        if (FileUtils.exists(localPath)) {
            BitmapFactory.Options options = BitmapUtils.getOptions(localPath);
            int width = options.outWidth;
            int height = options.outHeight;
            int rotate = BitmapUtils.getRotate(localPath);
            LogUtils.d(TAG, "width_height by file rotate : %d ", rotate);
            if (rotate % 180 != 0) {
                int temp = width;
                width = height;
                height = temp;
            }
            LogUtils.d(TAG, "width_height by file width : %d , height : %d", width, height);
            options.inJustDecodeBounds = false;
            return caculateImageView(false, width, height);
        }
        return new int[]{0, 0};
    }

    protected void updatePercentage(final boolean visible) {
        mTvPercentage.post(new Runnable() {
            @Override
            public void run() {
                mTvPercentage.setVisibility(visible ? View.VISIBLE : GONE);
                mSendLoadingView.setVisibility(visible ? View.VISIBLE : GONE);
                mTvPercentage.setText(message.getProgress() + "%");
            }
        });
    }

    @Override
    protected int getContentLayoutResId() {
        return isLeftCell() ? R.layout.chat_left_iamge_message_cell : R.layout.chat_right_image_message_cell;
    }

    protected void showImage() {
        mRivImageView.setChatImagePath(message, imageSize[0], imageSize[1]);
    }

    @Override
    protected boolean isSupportClickEvent() {
        return true;
    }
}

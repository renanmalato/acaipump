package com.yunio.hypenateplugin.view;

import android.content.Context;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.text.TextUtils;
import android.view.View;
import android.widget.TextView;

import com.hyphenate.chat.Message;
import com.yunio.hypenateplugin.R;
import com.yunio.hypenateplugin.resource.ResourceConfigHelper;
import com.yunio.hypenateplugin.resource.entity.ColorConfig;
import com.yunio.hypenateplugin.resource.entity.StringConfig;


public class ChatSplashCell extends ChatSuperBaseCell {
    protected TextView mMessageTextView;

    public ChatSplashCell(Context context, boolean isLeftCell) {
        super(context, isLeftCell);
    }

    @Override
    protected void onInitView() {
        super.onInitView();
        mMessageTextView = (TextView) this.findViewById(R.id.chat_text_message);
    }

    public void setMessage(Message message) {
        super.setMessage(message);
        String settingFeedbackSplash = context.getString(R.string.setting_feedback_splash);
        StringConfig stringConfig = ResourceConfigHelper.getInstance().getStringConfig();
        if (stringConfig != null && !TextUtils.isEmpty(stringConfig.getSettingFeedbackSplash())) {
            settingFeedbackSplash = stringConfig.getSettingFeedbackSplash();
        }
        mMessageTextView.setText(settingFeedbackSplash);
        ColorConfig colorConfig = ResourceConfigHelper.getInstance().getColorConfig();
        if(colorConfig!=null&&!TextUtils.isEmpty(colorConfig.getReceiverTint())){
            mMessageTextView.getBackground().setColorFilter(Color.parseColor(colorConfig.getReceiverTint()), PorterDuff.Mode.SRC_IN);
        }
    }

    @Override
    protected int getContentLayoutResId() {
        return R.layout.chat_left_text_message_cell;
    }

    @Override
    protected View getItemView() {
        return mMessageTextView;
    }
}

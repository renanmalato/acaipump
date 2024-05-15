package com.yunio.hypenateplugin.view;

import android.content.Context;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.text.Spannable;
import android.text.TextUtils;
import android.text.Spannable;
import android.text.util.Linkify;
import android.view.View;
import android.widget.TextView;

import com.hyphenate.chat.EMTextMessageBody;
import com.hyphenate.chat.Message;
import com.yunio.easechat.utils.SmileUtils;
import com.yunio.hypenateplugin.R;
import com.yunio.hypenateplugin.resource.ResourceConfigHelper;
import com.yunio.hypenateplugin.resource.entity.ColorConfig;
import com.yunio.hypenateplugin.utils.SLinkify;


public class ChatTextMessageCell extends ChatSuperBaseCell {
    protected TextView mMessageTextView;

    public ChatTextMessageCell(Context context, boolean isLeftCell) {
        super(context, isLeftCell);
    }

    @Override
    protected void onInitView() {
        super.onInitView();
        mMessageTextView = (TextView) this.findViewById(R.id.chat_text_message);
        ColorConfig config = ResourceConfigHelper.getInstance().getColorConfig();
        if (config != null) {
            if (isLeftCell()) {
                if (!TextUtils.isEmpty(config.getReceiverTint())) {
                    mMessageTextView.getBackground().setColorFilter(Color.parseColor(config.getReceiverTint()), PorterDuff.Mode.SRC_IN);
                }
            } else {
                if (!TextUtils.isEmpty(config.getSenderTint())) {
                    mMessageTextView.getBackground().setColorFilter(Color.parseColor(config.getSenderTint()), PorterDuff.Mode.SRC_IN);
                }
            }
        }
    }

    public void setMessage(Message message) {
        super.setMessage(message);
        EMTextMessageBody txtBody = (EMTextMessageBody) message.getBody();
        Spannable span = SmileUtils.getSmiledText(context, txtBody.getMessage());
        // 设置内容
        mMessageTextView.setText(span, TextView.BufferType.SPANNABLE);
        int mask = Linkify.WEB_URLS;
        if (isLeftCell()) {
            SLinkify.addLinks(mMessageTextView, mask);
        } else {
            SLinkify.addLinks(mMessageTextView, mask, Color.TRANSPARENT);
        }
        mMessageTextView.requestLayout();
    }

    @Override
    protected int getContentLayoutResId() {
        return isLeftCell() ? R.layout.chat_left_text_message_cell
                : R.layout.chat_right_text_message_cell;
    }

    @Override
    protected View getItemView() {
        return mMessageTextView;
    }
}

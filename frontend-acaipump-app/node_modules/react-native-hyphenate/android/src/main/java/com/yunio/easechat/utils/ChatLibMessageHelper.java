package com.yunio.easechat.utils;

import android.content.Context;

import com.hyphenate.chat.EMTextMessageBody;
import com.hyphenate.chat.Message;
import com.hyphenate.helpdesk.model.MessageHelper;
import com.yunio.hypenateplugin.R;

/**
 * Created by JauZhou on 2017/12/29.
 */

public class ChatLibMessageHelper extends MessageHelper {
    public static boolean isDebugMessgae(Context context, Message message) {
        if (message.direct() == Message.Direct.RECEIVE && message.getType() == Message.Type.TXT) {
            if (isOpenDebug(context, message) || isCloseDebug(context, message)
                    || isSendLog(context, message)) {
                return true;
            }
        }
        return false;
    }

    public static boolean isOpenDebug(Context context, Message message) {
        EMTextMessageBody txtBody = (EMTextMessageBody) message.getBody();
        String text = txtBody.getMessage();
        if (context.getString(R.string.ease_chat_open_debug).equals(text)) {
            return true;
        }
        return false;
    }

    public static boolean isCloseDebug(Context context, Message message) {
        EMTextMessageBody txtBody = (EMTextMessageBody) message.getBody();
        String text = txtBody.getMessage();
        if (context.getString(R.string.ease_chat_close_debug).equals(text)) {
            return true;
        }
        return false;
    }

    public static boolean isSendLog(Context context, Message message) {
        EMTextMessageBody txtBody = (EMTextMessageBody) message.getBody();
        String text = txtBody.getMessage();
        if (context.getString(R.string.ease_chat_debug_log).equals(text)) {
            return true;
        }
        return false;
    }

}

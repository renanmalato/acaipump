package com.yunio.hypenateplugin.adapter;

import com.hyphenate.chat.Message;
import com.hyphenate.helpdesk.model.MessageHelper;
import com.yunio.easechat.view.ChatBaseCell;
import com.yunio.easechat_adapter.MessageAdapter;
import com.yunio.hypenateplugin.utils.EaseMessageHelper;
import com.yunio.hypenateplugin.view.ChatCustomVideoMessageCell;
import com.yunio.hypenateplugin.view.ChatImageLeftMessageCell;
import com.yunio.hypenateplugin.view.ChatImageRightMessageCell;
import com.yunio.hypenateplugin.view.ChatSplashCell;
import com.yunio.hypenateplugin.view.ChatTextMessageCell;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;


public class CustomMessageAdapter extends MessageAdapter {
    private final static String TAG = "CustomMessageAdapter";

    public CustomMessageAdapter(Context context, ChatBaseCell.ChatBaseCellListener chatCellListener, int
            loadMessageCount) {
        super(context, chatCellListener, loadMessageCount);
    }


    @Override
    public int getItemViewType(int position) {
        if (position > 0) {
            Message message = getItem(position);
            if (EaseMessageHelper.isVideoFileMessage(message)) {
                return message.direct() == Message.Direct.RECEIVE ? MESSAGE_TYPE_CUSTOM_RECEIVE_VIDEO
                        : MESSAGE_TYPE_CUSTOM_SENT_VIDEO;
            } else if (MessageHelper.getMessageExtType(message) == MessageHelper.ExtMsgType.EvaluationMsg) {
                return message.direct() == Message.Direct.RECEIVE
                        ? MESSAGE_TYPE_CUSTOM_RECEIVE_EVALUATION : MESSAGE_TYPE_CUSTOM_SENT_EVALUATION;
            } else if (EaseMessageHelper.isDebugMessgae(context, message)) {
                return MESSAGE_TYPE_CUSTOM_LOG_STATUS;
            }
        }
        return super.getItemViewType(position);
    }


    private boolean isValidViewType(int viewType) {
        return viewType == MESSAGE_TYPE_SPLASH || viewType == MESSAGE_TYPE_RECV_TXT || viewType == MESSAGE_TYPE_SENT_TXT
                || viewType == MESSAGE_TYPE_RECV_IMAGE || viewType == MESSAGE_TYPE_SENT_IMAGE || viewType ==
                MESSAGE_TYPE_CUSTOM_RECEIVE_VIDEO || viewType == MESSAGE_TYPE_CUSTOM_SENT_VIDEO;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        int viewType = getItemViewType(position);
        if (!isValidViewType(viewType)) {
            // 不作显示
            if (convertView == null) {
                convertView = new View(context);
            }
            convertView.setTag(position);
            return convertView;
        }
        ChatBaseCell cell;
        if (convertView != null) {
            cell = (ChatBaseCell) convertView;
        } else {
            cell = createChatCell(viewType);
        }
        Message message = getItem(position);
        cell.setMessage(message);
        cell.setListener(mChatBaseCellListener);
        cell.showTime(isShowTime(position, message));
        cell.setTag(position);
        return cell;
    }

    private ChatBaseCell createChatCell(int viewType) {
        ChatBaseCell cell = null;
        switch (viewType) {
            case MESSAGE_TYPE_SPLASH:
                cell = new ChatSplashCell(context, true);
                break;
            case MESSAGE_TYPE_RECV_TXT:
                cell = new ChatTextMessageCell(context, true);
                break;
            case MESSAGE_TYPE_SENT_TXT:
                cell = new ChatTextMessageCell(context, false);
                break;
            case MESSAGE_TYPE_RECV_IMAGE:
                cell = new ChatImageLeftMessageCell(context, true);
                break;
            case MESSAGE_TYPE_SENT_IMAGE:
                cell = new ChatImageRightMessageCell(context, false);
                break;
            case MESSAGE_TYPE_CUSTOM_RECEIVE_VIDEO:
                cell = new ChatCustomVideoMessageCell(context, true);
                break;
            case MESSAGE_TYPE_CUSTOM_SENT_VIDEO:
                cell = new ChatCustomVideoMessageCell(context, false);
                break;
        }

        return cell;
    }


}

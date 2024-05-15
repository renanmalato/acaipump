package com.yunio.easechat_adapter;

import android.content.Context;
import android.widget.BaseAdapter;

import com.hyphenate.chat.Message;
import com.hyphenate.helpdesk.model.MessageHelper;
import com.hyphenate.util.DateUtils;
import com.yunio.easechat.Constant;
import com.yunio.easechat.view.ChatBaseCell;

import java.util.HashMap;
import java.util.List;

public abstract class MessageAdapter extends BaseAdapter {
    protected static final int MESSAGE_TYPE_INVALID = -1;
    protected static final int MESSAGE_TYPE_RECV_TXT = 0;
    protected static final int MESSAGE_TYPE_SENT_TXT = 1;
    protected static final int MESSAGE_TYPE_SENT_IMAGE = 2;
    protected static final int MESSAGE_TYPE_RECV_IMAGE = 3;
    private static final int MESSAGE_TYPE_SENT_VOICE = 4;
    private static final int MESSAGE_TYPE_RECV_VOICE = 5;
    private static final int MESSAGE_TYPE_SENT_VIDEO = 6;
    private static final int MESSAGE_TYPE_RECV_VIDEO = 7;
    private static final int MESSAGE_TYPE_SENT_FILE = 8;
    private static final int MESSAGE_TYPE_RECV_FILE = 9;
    private static final int MESSAGE_TYPE_SENT_EXPRESSION = 10;
    private static final int MESSAGE_TYPE_RECV_EXPRESSION = 11;
    private static final int MESSAGE_TYPE_RECV_EVALUATION = 12;
    private static final int MESSAGE_TYPE_RECV_ROBOT_MENU = 13;
    private static final int MESSAGE_TYPE_SENT_TRANSFER_TO_KEFU = 14;
    private static final int MESSAGE_TYPE_RECV_TRANSFER_TO_KEFU = 15;
    protected static final int MESSAGE_TYPE_SPLASH = 16;
    protected static final int MESSAGE_TYPE_CUSTOM_RECEIVE_VIDEO = 17;
    protected static final int MESSAGE_TYPE_CUSTOM_SENT_VIDEO = 18;
    protected static final int MESSAGE_TYPE_CUSTOM_RECEIVE_EVALUATION = 19;
    protected static final int MESSAGE_TYPE_CUSTOM_SENT_EVALUATION = 20;
    protected static final int MESSAGE_TYPE_CUSTOM_LOG_STATUS = 21;

    private static final int MESSAGE_TYPE_COUNT = 23;
    protected List<Message> messageArray;
    protected Context context;
    protected ChatBaseCell.ChatBaseCellListener mChatBaseCellListener;
    private int mLoadMessageCount;

    private HashMap<String, Boolean> hasTimeMap;

    public MessageAdapter(Context context, ChatBaseCell.ChatBaseCellListener chatCellListener,
                          int loadMessageCount) {
        this.context = context;
        this.mChatBaseCellListener = chatCellListener;
        this.mLoadMessageCount = loadMessageCount;
        hasTimeMap = new HashMap<>();
    }

    public void setMessages(List<Message> messageArray) {
        this.messageArray = messageArray;
    }

    @Override
    public int getCount() {
        return messageArray != null ? messageArray.size() + 1 : 1;
    }


    @Override
    public Message getItem(int position) {
        if (position == 0) {
            return null;
        }
        return messageArray.get(position - 1);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public int getViewTypeCount() {
        return MESSAGE_TYPE_COUNT;
    }

    @Override
    public int getItemViewType(int position) {
        if (position == 0) {
            return MESSAGE_TYPE_SPLASH;
        }
        Message message = getItem(position);
        if (message == null) {
            return MESSAGE_TYPE_INVALID;
        }
        if (message.getType() == Message.Type.TXT) {
            if (MessageHelper.getRobotMenu(message) != null) {
                // 机器人 列表菜单
                return MESSAGE_TYPE_RECV_ROBOT_MENU;
            } else if (MessageHelper.getEvalRequest(message) != null) {
                return MESSAGE_TYPE_RECV_EVALUATION;
            } else if (MessageHelper.getToCustomServiceInfo(message) != null) {
                // 转人工消息
                return message.direct() == Message.Direct.RECEIVE
                        ? MESSAGE_TYPE_RECV_TRANSFER_TO_KEFU : MESSAGE_TYPE_SENT_TRANSFER_TO_KEFU;
            }
            if (message.getBooleanAttribute(Constant.MESSAGE_ATTR_IS_BIG_EXPRESSION, false)) {
                return message.direct() == Message.Direct.RECEIVE ? MESSAGE_TYPE_RECV_EXPRESSION
                        : MESSAGE_TYPE_SENT_EXPRESSION;
            }
            return message.direct() == Message.Direct.RECEIVE ? MESSAGE_TYPE_RECV_TXT
                    : MESSAGE_TYPE_SENT_TXT;
        }
        if (message.getType() == Message.Type.IMAGE) {
            return message.direct() == Message.Direct.RECEIVE ? MESSAGE_TYPE_RECV_IMAGE
                    : MESSAGE_TYPE_SENT_IMAGE;
        }
        if (message.getType() == Message.Type.VOICE) {
            return message.direct() == Message.Direct.RECEIVE ? MESSAGE_TYPE_RECV_VOICE
                    : MESSAGE_TYPE_SENT_VOICE;
        }
        if (message.getType() == Message.Type.VIDEO) {
            return message.direct() == Message.Direct.RECEIVE ? MESSAGE_TYPE_RECV_VIDEO
                    : MESSAGE_TYPE_SENT_VIDEO;
        }
        if (message.getType() == Message.Type.FILE) {
            return message.direct() == Message.Direct.RECEIVE ? MESSAGE_TYPE_RECV_FILE
                    : MESSAGE_TYPE_SENT_FILE;
        }

        return MESSAGE_TYPE_INVALID;// invalid
    }

    protected boolean isShowTime(int position, Message message) {
        if (position == 0) {
            return false;
        }
        Boolean hasTime = hasTimeMap.get(message.getMsgId());
        if (hasTime != null && hasTime) {
            return true;
        }
        if (position == 1) {
            hasTimeMap.put(message.getMsgId(), true);
            return true;
        }
        Message pretMessage = getItem(position - 1);
        if (null == pretMessage) {
            return true;
        }
        if (!DateUtils.isCloseEnough(message.getMsgTime(), pretMessage.getMsgTime())) {
            hasTimeMap.put(message.getMsgId(), true);
            return true;
        }
        return false;
    }
}

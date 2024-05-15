package com.yunio.easechat.utils;


import android.text.TextUtils;

import com.hyphenate.chat.Conversation;
import com.hyphenate.chat.Message;
import com.yunio.easechat.interfaces.OnActionListener;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;


/**
 * 消息界面辅助工具， 抽离一些代码
 */

public class MessagePresenter extends AbstractPresenter {
    public static final int FETCH_PREV_PAGE = -1;
    public static final int FETCH_CUR_PAGE = 0;
    public static final int FETCH_SEND_RECEIVE = 1;
    public static final int FETCH_RESEND = 2;
    private static final int MSG_WHAT_FETCH_MESSAGE = 4;

    public static final int ACTION_FETCH_MESSAGE = 1;
    public static final int ACTION_MESSAGE_LONG_CLICK = 2;
    public static final int ACTION_IMAGE_MESSAGE_CLICK = 3;
    private Conversation mConversation;
    private int mPageSize;
    private android.os.Handler mHandler = new android.os.Handler() {
        @Override
        public void handleMessage(android.os.Message msg) {
            super.handleMessage(msg);
            switch (msg.what) {
                case MSG_WHAT_FETCH_MESSAGE:
                    SortedData datas = (SortedData) msg.obj;
                    int action = datas.getInt();
                    boolean canLoadMore = datas.getBoolean();
                    List<Message> messageArray = datas.getObject();
                    messageArray = mConversation.getAllMessages();
                    Collections.sort(messageArray, new Comparator<Message>() {
                        @Override
                        public int compare(Message lhs, Message rhs) {
                            return (int) (lhs.getMsgTime() - rhs.getMsgTime());
                        }
                    });

                    notifyListener(ACTION_FETCH_MESSAGE, action, canLoadMore, messageArray);
                    break;
            }
        }
    };

    public MessagePresenter(OnActionListener actionListener, int pageSize) {
        super(actionListener);
        this.mPageSize = pageSize;
    }

    public void setConversation(Conversation conversation) {
        this.mConversation = conversation;
    }

    @Override
    public void onAction(int action, SortedData datas) {

    }

    public void fetchMOreMessageFromDB(List<Message> messageArray) {
        String lastMessageID = "";
        if (!ListUtils.isEmpty(messageArray)) {
            Message lastMessage = messageArray.get(0);
            lastMessageID = lastMessage.messageId();
        }
        if (!TextUtils.isEmpty(lastMessageID)) {
            mConversation.loadMessages(lastMessageID, mPageSize);
        }
        fetchMessageFromDB(FETCH_PREV_PAGE, messageArray);
    }


    public void fetchMessageFromDB(int action, List<Message> messageArray) {
        // 把此会话的未读数置为0
        mConversation.markAllMessagesAsRead();
        int msgCount = mConversation.getMsgCount();
        int msgAllCount = mConversation.getAllMsgCount();
        boolean canLoadMore = msgAllCount > msgCount;
        mHandler.removeMessages(MSG_WHAT_FETCH_MESSAGE);
        SortedData sortedData = createSortedData(action, canLoadMore, messageArray);
        android.os.Message message = mHandler.obtainMessage(MSG_WHAT_FETCH_MESSAGE, sortedData);
        long delayTime = 100;
        if (action == FETCH_CUR_PAGE) {
            delayTime = 0;
        }
        mHandler.sendMessageDelayed(message, delayTime);
    }

    public void handleImageMessageClick(int cellPosition, List<Message> messageArray) {
        ArrayList<Message> imageMessageList = new ArrayList<>();
        int realPosition = cellPosition - 1;
        int selectedPosition = 0;
        for (int i = 0; i < messageArray.size(); i++) {
            Message message = messageArray.get(i);
            if (message.getType() == Message.Type.IMAGE) {
                imageMessageList.add(message);
                if (i < realPosition) {
                    selectedPosition++;
                }
            }
        }
        notifyListener(ACTION_IMAGE_MESSAGE_CLICK, imageMessageList, selectedPosition);
    }

}

package com.yunio.easechat.view;

import android.content.Context;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.ListView;
import android.widget.RelativeLayout;

import com.hyphenate.chat.ChatClient;
import com.hyphenate.chat.Conversation;
import com.hyphenate.chat.Message;
import com.yunio.easechat_adapter.MessageAdapter;
import com.yunio.hypenateplugin.R;

public class MessageList extends RelativeLayout {
    private final static String TAG = "MessageList";
    protected ListView listView;
    protected SwipeRefreshLayout swipeRefreshLayout;
    protected Context context;

    protected Conversation conversation;
    protected String toChatUsername;
    protected MessageAdapter messageAdapter;

    public MessageList(Context context, AttributeSet attrs, int defStyle) {
        this(context, attrs);
    }

    public MessageList(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public MessageList(Context context) {
        super(context);
        init(context);
    }

    private void init(Context context) {
        this.context = context;
        LayoutInflater.from(context).inflate(R.layout.ease_chat_message_list,
                this);
        swipeRefreshLayout = (SwipeRefreshLayout) findViewById(
                R.id.chat_swipe_layout);
        listView = (ListView) findViewById(R.id.list);
    }

    public void init(String toChatUsername, MessageAdapter adapter) {
        this.toChatUsername = toChatUsername;
        conversation = ChatClient.getInstance().getChat()
                .getConversation(toChatUsername);
        // messageAdapter = new MessageAdapter(context, toChatUsername,
        // listView);
        messageAdapter = adapter;
        // messageAdapter.setShowAvatar(showAvatar);
        // messageAdapter.setShowUserNick(showUserNick);
        // messageAdapter.setMyBubbleBg(myBubbleBg);
        // messageAdapter.setOtherBuddleBg(otherBuddleBg);
        // 设置adapter显示消息
        listView.setAdapter(messageAdapter);

//        refreshSelectLast();
    }

//    /**
//     * 刷新列表
//     */
//    public void refresh() {
//        if (messageAdapter != null) {
//            messageAdapter.refresh();
//        }
//    }

//    /**
//     * 刷新列表，并且跳至最后一个item
//     */
//    public void refreshSelectLast() {
//        if (messageAdapter != null) {
//            LogUtils.d(TAG, "adpter identify hashCode --" + messageAdapter.hashCode());
//            messageAdapter.refreshSelectLast();
//        }
//    }

//    /**
//     * 刷新页面,并跳至给定position
//     *
//     * @param position
//     */
//    public void refreshSeekTo(int position) {
//        if (messageAdapter != null) {
//            messageAdapter.refreshSeekTo(position);
//        }
//    }

    /**
     * 获取listview
     *
     * @return
     */
    public ListView getListView() {
        return listView;
    }

    /**
     * 获取SwipeRefreshLayout
     *
     * @return
     */
    public SwipeRefreshLayout getSwipeRefreshLayout() {
        return swipeRefreshLayout;
    }

    public Message getItem(int position) {
        return messageAdapter.getItem(position);
    }

    /**
//     * 设置list item里控件的点击事件
//     *
//     * @param listener
//     */
//    public void setItemClickListener(MessageListItemClickListener listener) {
//        if (messageAdapter != null) {
//            messageAdapter.setItemClickListener(listener);
//        }
//    }

    public interface MessageListItemClickListener {
        void onResendClick(Message message);

        boolean onBubbleClick(Message message);

        void onBubbleLongClick(Message message);

        void onUserAvatarClick(String username);
    }

}

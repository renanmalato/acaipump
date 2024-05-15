package com.yunio.easechat;

import com.hyphenate.chat.Message;
import com.yunio.easechat.interfaces.IMessageReceiver;

import java.util.LinkedList;
import java.util.List;

public class MessageDeliverManager {
    private static MessageDeliverManager instance;

    private List<IMessageReceiver> receivers;

    private boolean isShowConversation;

    public static synchronized MessageDeliverManager getInstance() {
        if (instance == null) {
            instance = new MessageDeliverManager();
        }
        return instance;
    }

    public void registerReceiver(IMessageReceiver receiver) {
        if (receivers == null) {
            receivers = new LinkedList<>();
        }
        if (!receivers.contains(receiver)) {
            receivers.add(receiver);
        }
    }

    public void unRegisterReceiver(IMessageReceiver receiver) {
        if (receivers != null && !receivers.isEmpty()) {
            if (receivers.contains(receiver)) {
                receivers.remove(receiver);
            }
        }
    }

    public void deliver(List<Message> messages) {
        if (receivers != null) {
            for (IMessageReceiver receiver : receivers) {
                receiver.receiverMessages(messages);
            }
        }
    }

    public IMessageReceiver getLastedReceiver() {
        IMessageReceiver receiver = null;
        if (receivers != null && !receivers.isEmpty()) {
            receiver = receivers.get(receivers.size() - 1);
        }
        return receiver;
    }

    public void setShowConversation(boolean isShowConversation) {
        this.isShowConversation = isShowConversation;
    }

    public boolean isShowConversation() {
        return isShowConversation;
    }
}

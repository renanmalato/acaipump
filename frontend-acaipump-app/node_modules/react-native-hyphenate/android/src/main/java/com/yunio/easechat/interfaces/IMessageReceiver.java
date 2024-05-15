package com.yunio.easechat.interfaces;

import com.hyphenate.chat.Message;

import java.util.List;

public interface IMessageReceiver {
    public void receiverMessages(List<Message> messages);

    public boolean isNotificationNecessary();
}

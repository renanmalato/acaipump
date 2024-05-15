package com.yunio.hypenateplugin.resource.entity;

import com.google.gson.annotations.SerializedName;

public class ImageConfig  implements IConfig{
    @SerializedName("sender_bg")
    private String senderBg;
    @SerializedName("receiver_bg")
    private String receiverBg;

    public String getSenderBg() {
        return senderBg;
    }

    public void setSenderBg(String senderBg) {
        this.senderBg = senderBg;
    }

    public String getReceiverBg() {
        return receiverBg;
    }

    public void setReceiverBg(String receiverBg) {
        this.receiverBg = receiverBg;
    }
}

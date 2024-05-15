package com.yunio.hypenateplugin.resource.entity;

import com.google.gson.annotations.SerializedName;

public class ColorConfig implements IConfig {
    @SerializedName("send_enable")
    private String sendEnable;
    @SerializedName("send_unable")
    private String sendUnable;
    @SerializedName("text_enable")
    private String textEnable;
    @SerializedName("text_unable")
    private String textUnable;
    @SerializedName("sender_tint")
    private String senderTint;
    @SerializedName("receiver_tint")
    private String receiverTint;

    public String getSendEnable() {
        return sendEnable;
    }

    public void setSendEnable(String sendEnable) {
        this.sendEnable = sendEnable;
    }

    public String getSendUnable() {
        return sendUnable;
    }

    public void setSendUnable(String sendUnable) {
        this.sendUnable = sendUnable;
    }

    public String getTextEnable() {
        return textEnable;
    }

    public void setTextEnable(String textEnable) {
        this.textEnable = textEnable;
    }

    public String getTextUnable() {
        return textUnable;
    }

    public void setTextUnable(String textUnable) {
        this.textUnable = textUnable;
    }

    public String getSenderTint() {
        return senderTint;
    }

    public void setSenderTint(String senderTint) {
        this.senderTint = senderTint;
    }

    public String getReceiverTint() {
        return receiverTint;
    }

    public void setReceiverTint(String receiverTint) {
        this.receiverTint = receiverTint;
    }
}

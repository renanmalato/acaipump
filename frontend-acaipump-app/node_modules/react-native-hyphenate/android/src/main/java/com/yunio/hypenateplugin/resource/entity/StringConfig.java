package com.yunio.hypenateplugin.resource.entity;

import com.google.gson.annotations.SerializedName;

public class StringConfig implements IConfig {

    @SerializedName("feedback_system_login")
    private String feedbackSystemLogin;
    private String send;
    @SerializedName("setting_feedback")
    private String settingFeedback;
    @SerializedName("storage_error")
    private String storageError;
    @SerializedName("setting_feedback_splash")
    private String settingFeedbackSplash;
    @SerializedName("all_photo")
    private String allPhoto;
    @SerializedName("custom_message")
    private String customMessage;
    private String camera;
    @SerializedName("send_log")
    private String sendLog;
    @SerializedName("network_error")
    private String networkError;
    @SerializedName("send_hint")
    private String sendHint;

    public String getFeedbackSystemLogin() {
        return feedbackSystemLogin;
    }

    public void setFeedbackSystemLogin(String feedbackSystemLogin) {
        this.feedbackSystemLogin = feedbackSystemLogin;
    }

    public String getSend() {
        return send;
    }

    public void setSend(String send) {
        this.send = send;
    }

    public String getSettingFeedback() {
        return settingFeedback;
    }

    public void setSettingFeedback(String settingFeedback) {
        this.settingFeedback = settingFeedback;
    }

    public String getStorageError() {
        return storageError;
    }

    public void setStorageError(String storageError) {
        this.storageError = storageError;
    }

    public String getSettingFeedbackSplash() {
        return settingFeedbackSplash;
    }

    public void setSettingFeedbackSplash(String settingFeedbackSplash) {
        this.settingFeedbackSplash = settingFeedbackSplash;
    }

    public String getAllPhoto() {
        return allPhoto;
    }

    public void setAllPhoto(String allPhoto) {
        this.allPhoto = allPhoto;
    }

    public String getCustomMessage() {
        return customMessage;
    }

    public void setCustomMessage(String customMessage) {
        this.customMessage = customMessage;
    }

    public String getCamera() {
        return camera;
    }

    public void setCamera(String camera) {
        this.camera = camera;
    }

    public String getSendLog() {
        return sendLog;
    }

    public void setSendLog(String sendLog) {
        this.sendLog = sendLog;
    }

    public String getNetworkError() {
        return networkError;
    }

    public void setNetworkError(String networkError) {
        this.networkError = networkError;
    }

    public String getSendHint() {
        return sendHint;
    }

    public void setSendHint(String sendHint) {
        this.sendHint = sendHint;
    }
}

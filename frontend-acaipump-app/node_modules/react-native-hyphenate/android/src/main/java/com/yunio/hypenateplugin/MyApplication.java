package com.yunio.hypenateplugin;

import android.app.Application;

import com.yunio.videocapture.BaseInfoManager;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        BaseInfoManager.init(this);
        EaseChatHelper.getInstance().init(this);
    }
}

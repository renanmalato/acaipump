package com.yunio.hypenateplugin.utils;

import com.yunio.videocapture.BaseInfoManager;

import android.app.Activity;
import android.os.Bundle;
import android.view.Window;

public class BaseActivity extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		BaseInfoManager.init(getApplicationContext());
		requestWindowFeature(Window.FEATURE_NO_TITLE);
	}

}

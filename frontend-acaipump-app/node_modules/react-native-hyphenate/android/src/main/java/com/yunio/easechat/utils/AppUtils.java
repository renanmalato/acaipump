package com.yunio.easechat.utils;

import android.app.ActivityManager;
import android.app.ActivityManager.RunningAppProcessInfo;
import android.content.Context;
import android.content.pm.PackageManager;

import java.util.List;

public class AppUtils {
    private final static String TAG = "AppUtils";

    public static boolean isAppRunningForeground(Context context) {
        ActivityManager manager = (ActivityManager) context
                .getSystemService(Context.ACTIVITY_SERVICE);
        List<RunningAppProcessInfo> appInfos = manager.getRunningAppProcesses();
        if (appInfos == null) {
            return false;
        }
        for (RunningAppProcessInfo processInfo : appInfos) {
            LogUtils.d(TAG, "processName : " + processInfo.processName + ", importance : "
                    + processInfo.importance);
            if (processInfo.processName.equals(context.getPackageName())) {
                if (processInfo.importance == RunningAppProcessInfo.IMPORTANCE_FOREGROUND) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    public static String getAppName(Context appContext) {
        PackageManager packageManager = appContext.getPackageManager();
        String appname = (String) packageManager
                .getApplicationLabel(appContext.getApplicationInfo());
        return appname;
    }
}

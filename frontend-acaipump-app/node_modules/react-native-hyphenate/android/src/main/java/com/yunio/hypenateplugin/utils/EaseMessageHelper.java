package com.yunio.hypenateplugin.utils;

import android.content.Context;

import com.hyphenate.chat.EMNormalFileMessageBody;
import com.hyphenate.chat.Message;
import com.yunio.easechat.utils.ChatLibMessageHelper;

public class EaseMessageHelper extends ChatLibMessageHelper {
    private final static String TAG = "EaseMessageHelper";

    public static boolean isVideoFileMessage(Message message) {
        if (message.getType() == Message.Type.FILE) {
            EMNormalFileMessageBody fileMessageBody = (EMNormalFileMessageBody) message.getBody();
            String filePath = fileMessageBody.getLocalUrl();
            if (com.yunio.videocapture.utils.FileUtils.isVideo(filePath)) {
                return true;
            }
        }
        return false;
    }

    public static void sendLogFile(Context context, String toChatUsername) throws Exception {
        //        String logFile = LogcatHelper.getInstance(context).getLogFilePath();
        //        String dataLog = EaseChatHelper.getDatabaseFilePath(context);
        //        LogUtils.d(TAG, "logFile -- " + logFile);
        //        LogUtils.d(TAG, "dataLog -- " + dataLog);
        //        Message logMessage = Message.createFileSendMessage(logFile, toChatUsername);
        //        Message databaseMessage = Message.createFileSendMessage(dataLog, toChatUsername);
        //        ChatClient.getInstance().getChat().sendMessage(logMessage, new Callback() {
        //
        //            @Override
        //            public void onSuccess() {
        //                LogUtils.e(TAG, "logMessage success");
        //                // BaseInfoManager.getInstance().getMainHandler().post(new
        //                // Runnable() {
        //                //
        //                // @Override
        //                // public void run() {
        //                // ToastUtils.showToast("发送成功");
        //                // }
        //                // });
        //            }
        //
        //            @Override
        //            public void onProgress(int arg0, String arg1) {
        //                LogUtils.d(TAG, "logMessage progress %d", arg0);
        //            }
        //
        //            @Override
        //            public void onError(int arg0, String arg1) {
        //
        //            }
        //        });
        //        ChatClient.getInstance().getChat().sendMessage(databaseMessage, new Callback() {
        //
        //            @Override
        //            public void onSuccess() {
        //                LogUtils.e(TAG, "databaseMessage success");
        //            }
        //
        //            @Override
        //            public void onProgress(int arg0, String arg1) {
        //                LogUtils.d(TAG, "databaseMessage progress %d", arg0);
        //            }
        //
        //            @Override
        //            public void onError(int arg0, String arg1) {
        //
        //            }
        //        });
    }


}

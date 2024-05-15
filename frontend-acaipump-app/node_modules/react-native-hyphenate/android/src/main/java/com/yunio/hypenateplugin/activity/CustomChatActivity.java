package com.yunio.hypenateplugin.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.StateListDrawable;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.TextView.OnEditorActionListener;

import com.facebook.react.bridge.ReactApplicationContext;
import com.hyphenate.chat.Message;
import com.hyphenate.helpdesk.model.VisitorInfo;
import com.yunio.easechat.activity.ChatActivity;
import com.yunio.easechat.interfaces.IEaseChatLoginState;
import com.yunio.easechat.utils.MessagePresenter;
import com.yunio.easechat.utils.SortedData;
import com.yunio.easechat_adapter.MessageAdapter;
import com.yunio.hypenateplugin.EaseChatHelper;
import com.yunio.hypenateplugin.R;
import com.yunio.hypenateplugin.adapter.CustomMessageAdapter;
import com.yunio.hypenateplugin.resource.ResourceConfigHelper;
import com.yunio.hypenateplugin.resource.entity.ColorConfig;
import com.yunio.hypenateplugin.resource.entity.StringConfig;
import com.yunio.hypenateplugin.utils.ProgressDialogUtils;
import com.yunio.hypenateplugin.utils.ViewUtils;
import com.yunio.videocapture.utils.LogUtils;
import com.yunio.videocapture.utils.PhotoUtils;
import com.yunio.videocapture.utils.UIUtils;

import java.util.ArrayList;

public class CustomChatActivity extends ChatActivity
        implements OnClickListener, TextWatcher, OnEditorActionListener {
    public final static int REQUEST_IMAGE_CAPTURE = 1001;
    private ImageView mIvPhoto;
    private EditText mEtInput;
    private TextView mTvSend;
    private String mImagePath;

    private VisitorInfo visitorInfo;


    public static void startFeedBackActivity(String userName, final ReactApplicationContext context) {
        Activity activity = context.getCurrentActivity();
        if (activity != null) {
            String feedbackSystemLoading = context.getString(R.string.feedback_system_login);
            StringConfig config = ResourceConfigHelper.getInstance().getStringConfig();
            if (config != null && !TextUtils.isEmpty(config.getFeedbackSystemLogin())) {
                feedbackSystemLoading = config.getFeedbackSystemLogin();
            }
            ProgressDialogUtils.showProgressDialog(activity, feedbackSystemLoading);
        }
        EaseChatHelper.getInstance().login(context, userName, new IEaseChatLoginState() {

            @Override
            public void onLoginSuccess() {
                ProgressDialogUtils.dismissProgressDialog();
                Intent intent = new Intent(context, CustomChatActivity.class);
                intent.putExtra(EXTRA_IM, EaseChatHelper.sEaseImUser);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intent);
            }

            @Override
            public void onLoginFail() {
                ProgressDialogUtils.dismissProgressDialog();
            }
        });

    }

    public static void startFeedBackActivity(String userName, final Context activity) {
        if (activity != null) {
            String feedbackSystemLoading = activity.getString(R.string.feedback_system_login);
            StringConfig config = ResourceConfigHelper.getInstance().getStringConfig();
            if (config != null && !TextUtils.isEmpty(config.getFeedbackSystemLogin())) {
                feedbackSystemLoading = config.getFeedbackSystemLogin();
            }
            ProgressDialogUtils.showProgressDialog(activity, feedbackSystemLoading);
        }
        EaseChatHelper.getInstance().login(activity, userName, new IEaseChatLoginState() {

            @Override
            public void onLoginSuccess() {
                ProgressDialogUtils.dismissProgressDialog();
                Intent intent = new Intent(activity, CustomChatActivity.class);
                intent.putExtra(EXTRA_IM, EaseChatHelper.sEaseImUser);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                activity.startActivity(intent);
            }

            @Override
            public void onLoginFail() {
                ProgressDialogUtils.dismissProgressDialog();
            }
        });

    }


    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initTitleBar();
        mIvPhoto = (ImageView) findViewById(R.id.iv_photo);
        mEtInput = (EditText) findViewById(R.id.et_input);
        mTvSend = (TextView) findViewById(R.id.tv_send);
        ColorConfig colorConfig = ResourceConfigHelper.getInstance().getColorConfig();
        if (colorConfig != null) {
            int enableColor = Color.BLACK;
            if (!TextUtils.isEmpty(colorConfig.getSendEnable())) {
                enableColor = Color.parseColor(colorConfig.getSendEnable());
            }
            int unableColor = Color.parseColor("#d7d7d7");
            if (!TextUtils.isEmpty(colorConfig.getSendUnable())) {
                unableColor = Color.parseColor(colorConfig.getSendUnable());
            }
            StateListDrawable mStateListDrawable = new StateListDrawable();
            GradientDrawable enableDrawable = new GradientDrawable();
            enableDrawable.setCornerRadius(UIUtils.dip2px(5));
            enableDrawable.setColor(enableColor);

            GradientDrawable unableDrawable = new GradientDrawable();
            unableDrawable.setCornerRadius(UIUtils.dip2px(5));
            unableDrawable.setColor(unableColor);
            mStateListDrawable.addState(new int[]{android.R.attr.state_enabled}, enableDrawable);
            mStateListDrawable.addState(new int[]{-android.R.attr.state_enabled}, unableDrawable);
            mTvSend.setBackground(mStateListDrawable);
        }
        TextView tvSendLog = findViewById(R.id.btn_send_log);
        String sendLog = getString(R.string.send_log);
        String send = getString(R.string.send);
        String sendHint = getString(R.string.send_hint);
        StringConfig stringConfig = ResourceConfigHelper.getInstance().getStringConfig();
        if (stringConfig != null) {
            if (!TextUtils.isEmpty(stringConfig.getSendLog())) {
                sendLog = stringConfig.getSendLog();
            }
            if (!TextUtils.isEmpty(stringConfig.getSend())) {
                send = stringConfig.getSend();
            }
            if (!TextUtils.isEmpty(stringConfig.getSendHint())) {
                sendHint = stringConfig.getSendHint();
            }
        }
        tvSendLog.setText(sendLog);
        mTvSend.setText(send);
        mEtInput.setHint(sendHint);
        tvSendLog.setOnClickListener(this);
        mEtInput.addTextChangedListener(this);
        mEtInput.setOnEditorActionListener(this);
        mIvPhoto.setOnClickListener(this);
        mTvSend.setOnClickListener(this);
        mTvSend.setEnabled(false);
    }

    @Override
    protected MessageAdapter createAdapter() {
        return new CustomMessageAdapter(this, new onChatBaseCellListener(), LoadMessageCount) {
            @Override
            public View getView(int position, View convertView, ViewGroup parent) {
                if (position > 0) {
                    Message message = getItem(position);
                    messageIDToPosition.put(message.getMsgId(), position);
                }
                return super.getView(position, convertView, parent);
            }
        };
    }

    @Override
    public void onActionResult(int action, SortedData datas) {
        super.onActionResult(action, datas);
        switch (action) {
            case MessagePresenter.ACTION_IMAGE_MESSAGE_CLICK:
                ArrayList<Message> imageMessageList = datas.getObject();
                int selectedPosition = datas.getInt();
                LogUtils.d(TAG, " selectedPosition : " + selectedPosition);
                FeedBackScaleActivity.startActivity(this, selectedPosition, imageMessageList);
                break;
        }
    }

    private void initTitleBar() {
        TextView tvTitle = (TextView) findViewById(R.id.tv_title_bar);
        String settingFeedback = getString(R.string.setting_feedback);
        StringConfig config = ResourceConfigHelper.getInstance().getStringConfig();
        if (config != null && !TextUtils.isEmpty(config.getSettingFeedback())) {
            settingFeedback = config.getSettingFeedback();
        }
        tvTitle.setText(settingFeedback);
        TextView tvLeftTitile = (TextView) findViewById(R.id.btn_left_title_bar);
        ViewUtils.setPaddingDrawable(tvLeftTitile, R.drawable.back_dark, Gravity.LEFT);
        tvLeftTitile.setOnClickListener(this);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode != Activity.RESULT_OK) {
            return;
        }
        if (requestCode == SelectMediaActivity.REQUEST_MEDIA_EXPLORE) {
            String path = data.getStringExtra(SelectMediaActivity.KEY_PATH);
            if (SelectMediaActivity.CAMERA.equals(path)) {
                takePhoto();
            } else {
                path = PhotoUtils.compress(path, false);
                sendImageMessage(path);
            }
        } else if (requestCode == REQUEST_IMAGE_CAPTURE) {
            mImagePath = PhotoUtils.compress(mImagePath, true);
            sendImageMessage(mImagePath);
        }
    }


    private void takePhoto() {
        mImagePath = PhotoUtils.generateFileName(this);
        if (TextUtils.isEmpty(mImagePath)) {
            return;
        }
        PhotoUtils.startTakePhoto(this, REQUEST_IMAGE_CAPTURE, mImagePath);
    }

    @Override
    protected int getLayoutResId() {
        return R.layout.activity_ease_feedback;
    }


    @Override
    public void onClick(View v) {
        int viewId = v.getId();
        if (viewId == R.id.btn_left_title_bar) {
            finish();
        } else if (viewId == R.id.iv_photo) {
            SelectMediaActivity.startActivity(this);
        } else if (viewId == R.id.tv_send) {
            sendTextMessage();
        } else if (viewId == R.id.btn_send_log) {
            EaseChatHelper.getInstance().callSendLog();
        }
    }

    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {

    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {

    }

    private StateListDrawable mStateListDrawable;

    @Override
    public void afterTextChanged(Editable s) {
        boolean isEmpty = s.toString().isEmpty();
        mTvSend.setEnabled(!isEmpty);
        ColorConfig config = ResourceConfigHelper.getInstance().getColorConfig();
        int textEnable = Color.parseColor("#ffffff");
        int textUnable = Color.parseColor("#a1a2a5");
        if (config != null) {
            if (!TextUtils.isEmpty(config.getTextEnable())) {
                textEnable = Color.parseColor(config.getTextEnable());
            }
            if (!TextUtils.isEmpty(config.getTextUnable())) {
                textUnable = Color.parseColor(config.getTextUnable());
            }
        }

        mTvSend.setTextColor(isEmpty ? textUnable : textEnable);
    }

    @Override
    public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
        if (actionId == EditorInfo.IME_ACTION_SEND) {
            sendTextMessage();
            return true;
        }
        return false;
    }

    private void sendTextMessage() {
        String replyMsg = mEtInput.getText().toString().trim();
        if (TextUtils.isEmpty(replyMsg)) {
            return;
        }
        mEtInput.getText().clear();
        mTvSend.setEnabled(false);
        sendTextMessage(replyMsg);
    }

    @Override
    protected void attachMessageAttrs(Message message) {
        // if (visitorInfo == null) {
        // visitorInfo = ContentFactory.createVisitorInfo(null);
        // visitorInfo.name(
        // UserManager.getInstance().getUserInfo().getFullName());
        // visitorInfo.nickName(
        // UserManager.getInstance().getUserInfo().getFullName());
        // visitorInfo
        // .phone(UserManager.getInstance().getUserInfo().getMobile());
        // visitorInfo.companyName(getString(R.string.app_name));
        // visitorInfo.description(
        // android.os.Build.BRAND + " " + android.os.Build.MODEL
        // + " android " + android.os.Build.VERSION.RELEASE
        // + " " + Utils.getVersionName());
        // }
        // message.addContent(visitorInfo);
    }


}

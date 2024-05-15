package com.yunio.hypenateplugin.view;

import android.content.Context;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.hyphenate.chat.Message;
import com.hyphenate.helpdesk.callback.Callback;
import com.yunio.easechat.utils.LogUtils;
import com.yunio.easechat.view.ChatBaseCell;
import com.yunio.hypenateplugin.EaseChatHelper;
import com.yunio.hypenateplugin.R;
import com.yunio.hypenateplugin.utils.FileUtils;
import com.yunio.hypenateplugin.view.roundimage.RoundedImageView;
import com.yunio.videocapture.BaseInfoManager;
import com.yunio.videocapture.utils.UIUtils;


/**
 * 将左右两侧聊天单元基本功能包含进来，由子类控制是否左侧单元 左边包括用户昵称显示，右侧包括重新发送按钮
 *
 * @author PeterZhang
 */
public abstract class ChatSuperBaseCell extends ChatBaseCell {
  private final static String TAG = "ChatSuperBaseCell";
  private boolean mIsLeftCell;
  private LinearLayout mLayoutContainer;
  // 左边单元
  private RoundedImageView mIvAvatar;
  // 右边单元
  protected View mResendButton;
  protected View mSendLoadingView;

  // item cell的内容view
  private View mContentView;

  public ChatSuperBaseCell(Context context, boolean isLeftCell) {
    super(context, isLeftCell);
  }

  @Override
  protected void initView(Object extraObj) {
    if (extraObj instanceof Boolean) {
      this.mIsLeftCell = (Boolean) extraObj;
    }
    super.initView(extraObj);
    View itemView = getItemView();
    if (itemView != null) {
      registerListener(itemView);
    }
  }

  private void registerListener(View itemView) {
    if (isSupportLongClickEvent()) {
      itemView.setOnLongClickListener(new OnLongClickListener() {

        @Override
        public boolean onLongClick(View view) {
          mListener.onLongPressed(ChatSuperBaseCell.this);
          return true;
        }
      });
    }

    if (isSupportClickEvent()) {
      itemView.setOnClickListener(new OnClickListener() {
        @Override
        public void onClick(View v) {
          mListener.onMessageViewClick(ChatSuperBaseCell.this, isLeftCell(), message);
        }
      });
    }
  }

  protected abstract int getContentLayoutResId();

  /**
   * loading 的view id
   *
   * @return
   */
  protected int getSendLoadingResId() {
    return R.id.chat_send_loading_progress;
  }

  @Override
  protected void onInitView() {
    ViewGroup vContentParent = (ViewGroup) findViewById(R.id.ll_content_parent);
    mContentView = LayoutInflater.from(context).inflate(getContentLayoutResId(), null);
    vContentParent.addView(mContentView);
    mIvAvatar = (RoundedImageView) findViewById(R.id.chat_left_image_avatar);
    if (mIsLeftCell) {
      //            initAvatarListener();
      if (mIvAvatar != null) {
        if (!TextUtils.isEmpty(EaseChatHelper.sIconPath)) {
          if (FileUtils.exists(EaseChatHelper.sIconPath)) {
            mIvAvatar.setImagePath(EaseChatHelper.sIconPath);
            return;
          }
        }
        mIvAvatar.setImageResource(context.getApplicationInfo().icon);
      }
    } else {
      mResendButton = this.findViewById(R.id.chat_resend_btn);
      mResendButton.setOnClickListener(new OnClickListener() {
        public void onClick(View v) {
          mListener.onResendButtonPressed(ChatSuperBaseCell.this);
        }
      });
      mSendLoadingView = findViewById(getSendLoadingResId());
    }
  }

  protected View getItemView() {
    return mContentView;
  }

  @Override
  public void setMessage(Message message) {
    super.setMessage(message);
    if (mIsLeftCell) {
      loadAndShowAvatar();
      return;
    }
    updateSendStatus();
    setMessageStatusCallback();
  }

  protected void setMessageStatusCallback() {
    message.setMessageStatusCallback(new Callback() {
      @Override
      public void onSuccess() {
        LogUtils.d(TAG, " setMessageStatusCallback  onSuccess");
        updateSendStatus();
      }

      @Override
      public void onError(int i, String s) {
        LogUtils.d(TAG, " setMessageStatusCallback  onError");
        updateSendStatus();
      }

      @Override
      public void onProgress(int i, String s) {
        LogUtils.d(TAG, " setMessageStatusCallback  onProgress");
        updateSendStatus();
      }
    });
  }


  protected void updateSendStatus() {
    mContentView.post(new Runnable() {
      @Override
      public void run() {
        // 右侧聊天单元，有重发按钮
        switch (message.status()) {
          case CREATE:
          case INPROGRESS:
            updateResendViewState(true, false);
            break;
          case FAIL:
            updateResendViewState(false, true);
            break;
          case SUCCESS:
            updateResendViewState(false, false);
            break;
        }
      }
    });

  }

  /**
   * 更新发送状态的view
   *
   * @param showLoading
   * @param showFailed
   */
  public void updateResendViewState(boolean showLoading, boolean showFailed) {
    boolean isNeedUploadMarginLeft = isNeedUpdateMarginLeft();
    if (isNeedUploadMarginLeft) {
      if (mLayoutContainer == null) {
        mLayoutContainer = (LinearLayout) findViewById(R.id.layout_container);
      }
      LayoutParams params = (LayoutParams) mLayoutContainer.getLayoutParams();
      if (showFailed) {
        params.leftMargin = UIUtils.dip2px(31);
      } else if (showLoading) {
        params.leftMargin = UIUtils.dip2px(38);
      } else {
        params.leftMargin = UIUtils.dip2px(62);
      }
    }
    if (showLoading) {
      if (mSendLoadingView != null) {
        mSendLoadingView.setVisibility(View.VISIBLE);
      }
      if (mResendButton != null) {
        mResendButton.setVisibility(isNeedUploadMarginLeft ? GONE : INVISIBLE);
      }
    } else {
      if (mSendLoadingView != null) {
        mSendLoadingView.setVisibility(View.GONE);
      }
      if (mResendButton != null) {
        mResendButton.setVisibility(showFailed ? VISIBLE : (isNeedUploadMarginLeft ? GONE : INVISIBLE));
      }
    }
  }

  /**
   * 是否需要更新离左边的边距
   *
   * @return
   */
  protected boolean isNeedUpdateMarginLeft() {
    return true;
  }

  @Override
  protected final int getLayoutResId() {
    return mIsLeftCell ? R.layout.chat_left_base_cell : R.layout.chat_right_base_cell;
  }

  public boolean isLeftCell() {
    return mIsLeftCell;
  }

  protected boolean isSupportClickEvent() {
    return false;
  }

  protected boolean isSupportLongClickEvent() {
    return false;
  }

  public ImageView getAvatarView() {
    return mIvAvatar;
  }

  @Override
  public boolean hasDestory() {
    return !mIsLeftCell;
  }

  protected void loadAndShowAvatar() {

  }

}

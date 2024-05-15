package com.yunio.easechat.activity;

import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.text.TextUtils;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.AbsListView;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ProgressBar;

import com.hyphenate.chat.ChatClient;
import com.hyphenate.chat.ChatManager;
import com.hyphenate.chat.ChatManager.MessageListener;
import com.hyphenate.chat.Conversation;
import com.hyphenate.chat.Message;
import com.hyphenate.helpdesk.callback.Callback;
import com.yunio.easechat.MessageDeliverManager;
import com.yunio.easechat.UIProvider;
import com.yunio.easechat.interfaces.OnActionListener;
import com.yunio.easechat.utils.CommonUtils;
import com.yunio.easechat.utils.MessagePresenter;
import com.yunio.easechat.utils.SortedData;
import com.yunio.easechat.view.AlertDialog;
import com.yunio.easechat.view.ChatBaseCell;
import com.yunio.easechat_adapter.MessageAdapter;
import com.yunio.hypenateplugin.EaseChatHelper;
import com.yunio.hypenateplugin.R;
import com.yunio.hypenateplugin.utils.BaseActivity;
import com.yunio.videocapture.utils.LogUtils;
import com.yunio.videocapture.utils.StatusBarUtils;
import com.yunio.videocapture.utils.ToastUtils;
import com.yunio.videocapture.utils.UIUtils;
import com.yunio.videocapture.utils.WindowUtils;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import static com.yunio.easechat.utils.MessagePresenter.FETCH_CUR_PAGE;


public abstract class ChatActivity extends BaseActivity implements OnActionListener, MessageListener {
  protected final static String TAG = "ChatActivity";
  public final static String EXTRA_IM = "im_user";
  protected final int LoadMessageCount = 50;
  protected String toChatUsername;
  protected ListView mListView;

  private View mHeadHeightView;
  private ProgressBar mHeadProgressBar;
  private int mListVieOirgnalHeight;
  private int mListVieCurrentHeight;

  protected MessageAdapter mMessageAdapter;

  protected List<Message> messageArray;
  protected Conversation mConversation;
  protected boolean canLoadMore = false;
  protected int currentCount;

  protected HashMap<String, Integer> messageIDToPosition = new HashMap<>();
  protected MessagePresenter mMessagePresenter;
  protected boolean mIsResend = false;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(getLayoutResId());
    StatusBarUtils.setTranslucent(this, true);
    StatusBarUtils.setColor(this, Color.parseColor("#ffffff"), true);
    StatusBarUtils.setStyle(this, "dark-content");
    View contentView = this.findViewById(android.R.id.content);
    contentView.setPadding(0, WindowUtils.getStatusBarHeight(this), 0, 0);
    toChatUsername = getIntent().getStringExtra(EXTRA_IM);
    try {
      ChatClient.getInstance().chatManager().bindChat(toChatUsername);
    } catch (Exception e) {
      e.printStackTrace();
    }
    // 获取当前conversation对象
    ChatManager.getInstance().addMessageListener(this);
    onInitListView();
    onConversationInit();
  }

  @Override
  public void onActionResult(int action, SortedData datas) {
    LogUtils.d(TAG, "onActionResult action: %d", action);
    switch (action) {
      case MessagePresenter.ACTION_FETCH_MESSAGE:
        int childAction = datas.getInt();
        canLoadMore = datas.getBoolean();
        messageArray = datas.getObject();
        handleMessageArrived(childAction, canLoadMore);
        break;
    }
  }


  private void handleMessageArrived(int action, boolean canLoadMore) {
    LogUtils.d(TAG, "onActionResult childAction : " + action + " canLoadMore : " + canLoadMore);
    if (action != MessagePresenter.FETCH_SEND_RECEIVE) {
      if (canLoadMore) {
        FrameLayout.LayoutParams params = (FrameLayout.LayoutParams) mHeadHeightView
          .getLayoutParams();
        params.height = UIUtils.dip2px(30);
        mHeadHeightView.setLayoutParams(params);
        mHeadProgressBar.setVisibility(View.VISIBLE);
      } else {
        FrameLayout.LayoutParams params = (FrameLayout.LayoutParams) mHeadHeightView
          .getLayoutParams();
        params.height = UIUtils.dip2px(10);
        mHeadHeightView.setLayoutParams(params);
        mHeadProgressBar.setVisibility(View.GONE);
      }
    }
    mMessageAdapter.setMessages(messageArray);
    mMessageAdapter.notifyDataSetChanged();
    if (action == MessagePresenter.FETCH_SEND_RECEIVE) {
      mListView.smoothScrollToPosition(ListView.FOCUS_DOWN);
    } else if (action == MessagePresenter.FETCH_PREV_PAGE) {
      int firstItem = mListView.getFirstVisiblePosition();
      View convertView = mListView.getChildAt(0);
      mListView.setSelectionFromTop(
        messageArray.size() - currentCount + 1 + firstItem,
        convertView.getHeight() + convertView.getTop());
    } else if (action == MessagePresenter.FETCH_CUR_PAGE) {
      mListView.setSelection(ListView.FOCUS_DOWN);
    }
  }

  @Override
  protected void onResume() {
    super.onResume();
    MessageDeliverManager.getInstance().setShowConversation(true);
    UIProvider.getInstance().getNotifier().reset();
  }

  @Override
  protected void onDestroy() {
    ChatManager.getInstance().removeMessageListener(this);
    MessageDeliverManager.getInstance().setShowConversation(false);
    ChatClient.getInstance().chatManager().unbindChat();
    super.onDestroy();
  }

  protected void onConversationInit() {
    mConversation = ChatClient.getInstance().chatManager().getConversation(toChatUsername);
    if (mConversation != null) {
      mMessagePresenter = new MessagePresenter(this, LoadMessageCount);
      mMessagePresenter.setConversation(mConversation);
      mConversation.markAllMessagesAsRead();
      EaseChatHelper.getInstance().callbackMessageCount();
      messageArray = mConversation.getAllMessages();
      fetchMessage(FETCH_CUR_PAGE);
    }
  }

  protected void onInitListView() {
    mListView = (ListView) findViewById(getListViewResId());
    View headView = LinearLayout.inflate(this, R.layout.chat_loading_head, null);
    mListView.addHeaderView(headView);
    mHeadHeightView = headView.findViewById(R.id.chat_loading_head_height);
    mHeadProgressBar = (ProgressBar) headView.findViewById(R.id.chat_loading_head_progress);
    mMessageAdapter = createAdapter();
    mMessageAdapter.setMessages(messageArray);
    mListView.setAdapter(mMessageAdapter);
    mListView.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
      @Override
      public void onGlobalLayout() {
        if (mListVieOirgnalHeight == 0 && mListView.getHeight() > 0) {
          mListVieOirgnalHeight = mListView.getHeight();
        }
        if (mListVieCurrentHeight != mListView.getHeight()) {
          if (mListVieCurrentHeight > mListView.getHeight()) {
            scrollToBottom();
          }
          mListVieCurrentHeight = mListView.getHeight();
        }
      }
    });
    mListView.setOnScrollListener(new AbsListView.OnScrollListener() {
      @Override
      public void onScrollStateChanged(AbsListView view, int scrollState) {

      }

      @Override
      public void onScroll(AbsListView view, int firstVisibleItem, int visibleItemCount, int totalItemCount) {
        if (firstVisibleItem == 0 && canLoadMore) {
          canLoadMore = false;
          mListView.postDelayed(new Runnable() {
            public void run() {
              currentCount = messageArray.size();
              mMessagePresenter.fetchMOreMessageFromDB(messageArray);
            }
          }, 500);
        }
      }
    });
    mListView.setOnTouchListener(new View.OnTouchListener() {
      @Override
      public boolean onTouch(View v, MotionEvent event) {
        if (event.getAction() == MotionEvent.ACTION_UP) {
          CommonUtils.hideIME(ChatActivity.this, mListView);
        }
        return false;
      }
    });
  }


  protected void fetchMessage(int action) {
    mMessagePresenter.fetchMessageFromDB(action, messageArray);
  }

  @Override
  public void onMessage(List<Message> list) {
    fetchMessage(MessagePresenter.FETCH_SEND_RECEIVE);
  }

  @Override
  public void onCmdMessage(List<Message> list) {

  }

  @Override
  public void onMessageStatusUpdate() {

  }

  @Override
  public void onMessageSent() {
    fetchMessage(mIsResend ? MessagePresenter.FETCH_RESEND : MessagePresenter.FETCH_SEND_RECEIVE);
    mIsResend = false;
  }


  protected void scrollToBottom() {
    new Handler().postDelayed(new Runnable() {
      public void run() {
        mListView.setSelectionFromTop(messageArray.size(), -99999);
      }
    }, 100);
  }

  protected abstract MessageAdapter createAdapter();

  public class onChatBaseCellListener implements ChatBaseCell.ChatBaseCellListener {
    @Override
    public void onAvatarButtonPressed(ChatBaseCell cell) {

    }

    @Override
    public void onAvatarLongPressed(ChatBaseCell cell) {

    }

    @Override
    public void onResendButtonPressed(final ChatBaseCell cell) {
      new AlertDialog(ChatActivity.this, R.string.resend, R.string.confirm_resend, null,
        new AlertDialog.AlertDialogUser() {
          @Override
          public void onResult(boolean confirmed, Bundle bundle) {
            if (!confirmed) {
              return;
            }
            mIsResend = true;
            int position = (int) cell.getTag();
            Message message = mMessageAdapter.getItem(position);
            ChatClient.getInstance().getChat().reSendMessage(message);
          }
        }, true).show();
    }

    @Override
    public void onLongPressed(ChatBaseCell cell) {

    }

    @Override
    public void onMessageViewClick(ChatBaseCell cell, boolean isLeft, Message message) {
      if (message.getType() == Message.Type.IMAGE) {
        mMessagePresenter.handleImageMessageClick((Integer) cell.getTag(), messageArray);
      }
    }
  }


  // 发送消息方法
  // =============================================
  protected void sendTextMessage(String content) {
    if (content != null && content.length() > 1500) {
      ToastUtils.showToast(R.string.message_content_beyond_limit);
      return;
    }
    Message message = Message.createTxtSendMessage(content, toChatUsername);
    attachMessageAttrs(message);
    sendMessageFinal(message);
  }

  protected void sendVoiceMessage(String filePath, int length) {
    Message message = Message.createVoiceSendMessage(filePath, length, toChatUsername);
    attachMessageAttrs(message);
    sendMessageFinal(message);
  }

  protected void sendImageMessage(String imagePath) {
    if (TextUtils.isEmpty(imagePath)) {
      return;
    }
    File imageFile = new File(imagePath);
    if (!imageFile.exists()) {
      return;
    }

    Message message = Message.createImageSendMessage(imagePath, false, toChatUsername);
    attachMessageAttrs(message);
    sendMessageFinal(message);
  }

  protected void sendFileMessage(String filePath) {
    Message message = Message.createFileSendMessage(filePath, toChatUsername);
    attachMessageAttrs(message);
    LogUtils.d(TAG, message.toString());
    sendMessageFinal(message);
  }

  private void sendMessageFinal(Message message) {
    ChatClient.getInstance().getChat().sendMessage(message, new Callback() {

      @Override
      public void onSuccess() {
        LogUtils.d(TAG, "---------send message onSuccess-----------");
      }

      @Override
      public void onProgress(int arg0, String arg1) {
        LogUtils.d(TAG, "---------send message onProgress -----------" + arg0);
      }

      @Override
      public void onError(int arg0, String arg1) {
        LogUtils.d(TAG, "---------send message onError-----------");
        mListView.post(new Runnable() {//保证发送失败更新一下界面
          @Override
          public void run() {
            if (mMessageAdapter != null) {
              mMessageAdapter.notifyDataSetChanged();
            }
          }
        });

      }
    });
  }

  protected void attachMessageAttrs(Message message) {

  }


  protected abstract int getLayoutResId();

  protected int getListViewResId() {
    return R.id.lv_message;
  }

}

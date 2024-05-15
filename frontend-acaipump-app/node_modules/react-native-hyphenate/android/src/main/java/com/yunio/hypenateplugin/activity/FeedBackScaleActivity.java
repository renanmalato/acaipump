package com.yunio.hypenateplugin.activity;

import android.app.Activity;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ProgressBar;

import com.hyphenate.chat.Message;
import com.yunio.hypenateplugin.R;
import com.yunio.hypenateplugin.view.ChatPhotoView;
import com.yunio.videocapture.activity.ScaleImageBaseActivity;
import com.yunio.videocapture.utils.UIUtils;

import java.util.ArrayList;
import java.util.List;

public class FeedBackScaleActivity extends ScaleImageBaseActivity<Message>
        implements OnClickListener {

    public static void startActivity(Activity activity, int position,
                                     ArrayList<Message> messages) {
        Intent intent = new Intent(activity, FeedBackScaleActivity.class);
        intent.putExtra(EXTRA_MEDIAS, messages);
        intent.putExtra(EXTRA_POSITION, position);
        activity.startActivity(intent);
    }

    @Override
    protected int getLayoutResId() {
        return R.layout.activity_feedback_image_scale;
    }

    @Override
    public void updateItemView(Message media, View itemView) {
        ChatPhotoView imageViewTouch = (ChatPhotoView) itemView
                .findViewById(R.id.iv_avater);
        ProgressBar progressBar = (ProgressBar) itemView
                .findViewById(R.id.pb_progress);
        imageViewTouch.setProgress(progressBar);
        imageViewTouch.setChatImagePath(media, UIUtils.getWidthPixels() / 2, UIUtils.getHeightPixels() / 2);
    }


    @Override
    protected void onInitUI() {
        findViewById(R.id.title_left_img).setOnClickListener(this);
        super.onInitUI();
    }

    @Override
    protected void initAdapter() {
        super.initAdapter();
        onPageSelected(position);
    }

    @Override
    public List<Message> getMedias(Intent intent) {
        return intent.getParcelableArrayListExtra(EXTRA_MEDIAS);
    }

    @Override
    protected View onCreateItemView(LayoutInflater inflater, Message media, int position) {
        View view = inflater.inflate(R.layout.view_my_avater_zoom, null);
        view.setTag(position);
        return view;
    }


    @Override
    public void onClick(View v) {
        int id = v.getId();
        if (id == R.id.title_left_img) {
            finish();
        }
    }

}

package com.yunio.hypenateplugin.activity;

import com.yunio.hypenateplugin.R;
import com.yunio.videocapture.activity.SelectImageBaseActivity;
import com.yunio.videocapture.entity.Folder.Media;

import android.app.Activity;
import android.content.Intent;
import android.view.View;
import android.view.View.OnClickListener;

public class SelectMediaActivity extends SelectImageBaseActivity {
    public final static String CAMERA = "camera";
    public final static String KEY_PATH = "path";
    public final static int REQUEST_MEDIA_EXPLORE = 1005;

    public static void startActivity(Activity activity) {
        Intent intent = new Intent(activity, SelectMediaActivity.class);
        activity.startActivityForResult(intent, REQUEST_MEDIA_EXPLORE);
    }

    @Override
    protected int getLayoutResId() {
        return R.layout.activity_select_avatar;
    }

    @Override
    protected void updateImageItem(View convertView, boolean isImage,
                                   int position, Media media) {
        final String path = isImage ? media.getPath() : CAMERA;
        convertView.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.putExtra(KEY_PATH, path);
                setResult(Activity.RESULT_OK, intent);
                finish();
            }
        });
    }

    @Override
    protected boolean showCamera() {
        return true;
    }

    @Override
    public boolean isSelectAvatar() {
        return true;
    }
}

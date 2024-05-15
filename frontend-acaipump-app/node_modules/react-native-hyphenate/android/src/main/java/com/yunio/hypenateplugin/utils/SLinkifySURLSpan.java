package com.yunio.hypenateplugin.utils;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Parcel;
import android.provider.Browser;
import android.text.TextPaint;
import android.text.style.URLSpan;
import android.view.View;


public class SLinkifySURLSpan extends URLSpan {
    public static final int DEFAULT_LINK_COLOR = Color.BLUE;
    private int mLinkColor = DEFAULT_LINK_COLOR;

    public SLinkifySURLSpan(String url) {
        super(url);
    }

    public SLinkifySURLSpan(String url, int linkColor) {
        super(url);
        mLinkColor = linkColor;
    }

    public SLinkifySURLSpan(Parcel src) {
        super(src);
    }

    @Override
    public void onClick(View widget) {
        Uri uri = Uri.parse(SLinkifyCharUtil.fillUrlScheme(getURL()));
        Context context = widget.getContext();
        if (uri.getScheme().contains("tel")) {
//            handlePhoneUri(context, uri);
        } else {
            startLinkUri(context, uri);
        }
    }

    private void startLinkUri(Context context, Uri uri) {
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.putExtra(Browser.EXTRA_APPLICATION_ID, context.getPackageName());
        context.startActivity(intent);
    }

    @Override
    public void updateDrawState(TextPaint ds) {
        if (mLinkColor != Color.TRANSPARENT) {
            ds.setColor(mLinkColor);
        }
        ds.setUnderlineText(true);
    }





}

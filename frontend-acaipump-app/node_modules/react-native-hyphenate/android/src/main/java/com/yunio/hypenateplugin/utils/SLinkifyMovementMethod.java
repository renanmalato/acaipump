package com.yunio.hypenateplugin.utils;

import android.text.Spannable;
import android.text.method.LinkMovementMethod;
import android.view.MotionEvent;
import android.view.ViewConfiguration;
import android.widget.TextView;

/**
 * 解决点击链接与长按事件的冲突
 * 
 * @author PeterZhang
 *
 */
public class SLinkifyMovementMethod extends LinkMovementMethod {
    private long mLastActionDownTime;

    private static final int CLICK_DELAY = ViewConfiguration.getLongPressTimeout();
    private static SLinkifyMovementMethod sInstance;

    public static SLinkifyMovementMethod getInstance() {
        if (null == sInstance) {
            sInstance = new SLinkifyMovementMethod();
        }
        return sInstance;
    }

    @Override
    public boolean onTouchEvent(TextView widget, Spannable buffer, MotionEvent event) {
        int action = event.getAction();

        if (action == MotionEvent.ACTION_UP) {
            if (System.currentTimeMillis() - mLastActionDownTime >= CLICK_DELAY) {
                // 拦截长按事件
                return true;
            }
        } else if (action == MotionEvent.ACTION_DOWN) {
            mLastActionDownTime = System.currentTimeMillis();
        }

        // if (action == MotionEvent.ACTION_UP || action ==
        // MotionEvent.ACTION_DOWN) {
        // int x = (int) event.getX();
        // int y = (int) event.getY();
        //
        // x -= widget.getTotalPaddingLeft();
        // y -= widget.getTotalPaddingTop();
        //
        // x += widget.getScrollX();
        // y += widget.getScrollY();
        //
        // Layout layout = widget.getLayout();
        // int line = layout.getLineForVertical(y);
        // int off = layout.getOffsetForHorizontal(line, x);
        //
        // ClickableSpan[] link = buffer.getSpans(off, off,
        // ClickableSpan.class);
        //
        // if (link.length != 0) {
        // if (action == MotionEvent.ACTION_UP) {
        // if (System.currentTimeMillis() - lastClickTime < CLICK_DELAY) {
        // link[0].onClick(widget);
        // }
        // } else if (action == MotionEvent.ACTION_DOWN) {
        // Selection.setSelection(buffer, buffer.getSpanStart(link[0]),
        // buffer.getSpanEnd(link[0]));
        // lastClickTime = System.currentTimeMillis();
        // }
        //
        // return true;
        // } else {
        // Selection.removeSelection(buffer);
        // }
        // }
        return super.onTouchEvent(widget, buffer, event);
    }

}

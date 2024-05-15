package com.yunio.easechat.utils;


import com.bumptech.glide.util.Util;
import com.yunio.easechat.interfaces.IPresenter;
import com.yunio.easechat.interfaces.OnActionListener;
import com.yunio.videocapture.BaseInfoManager;

/**
 * Created by PeterZhang on 2017/12/11.
 */

public abstract class AbstractPresenter implements IPresenter {
    private OnActionListener mActionListener;

    public AbstractPresenter(OnActionListener actionListener) {
        this.mActionListener = actionListener;
    }

    public void onAction(int action, Object... datas) {
        SortedData sortedData = createSortedData(datas);
        onAction(action, datas);
    }

    protected abstract void onAction(int action, SortedData datas);

    protected void notifyListener(final int action, Object... datas) {
        final SortedData sortedData = createSortedData(datas);
        if (Util.isOnMainThread()) {
            mActionListener.onActionResult(action, sortedData);
        } else {
            BaseInfoManager.getInstance().getMainHandler().post(new Runnable() {
                @Override
                public void run() {
                    mActionListener.onActionResult(action, sortedData);
                }
            });
        }
    }

    protected SortedData createSortedData(Object... datas) {
        SortedData sortedData = null;
        if (datas != null) {
            sortedData = new SortedData();
            for (Object o : datas) {
                sortedData.putObject(o);
            }
        }
        return sortedData;
    }
}

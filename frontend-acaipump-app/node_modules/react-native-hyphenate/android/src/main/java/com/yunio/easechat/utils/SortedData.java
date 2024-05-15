package com.yunio.easechat.utils;

import java.util.ArrayList;

/**
 * Created by PeterZhang on 2017/12/11.
 */

public class SortedData {
    private ArrayList mDatas;
    private int mIndex;

    public SortedData() {
        mDatas = new ArrayList();
        rewind();
    }

    public boolean getBoolean() {
        return getObject();
    }

    public byte getByte() {
        return getObject();
    }

    public char getChar(String key) {
        return getObject();
    }


    public short getShort(String key) {
        return getObject();
    }

    public int getInt() {
        return getObject();
    }


    public long getLong(String key) {
        return getObject();
    }

    public float getFloat(String key) {
        return getObject();
    }

    public double getDouble(String key) {
        return getObject();
    }


    public String getString() {
        return getObject();
    }

    public CharSequence getCharSequence() {
        return getObject();
    }

    public <T> T getObject() {
        return (T) mDatas.get(mIndex++);
    }

    public void putObject(Object obj) {
        mDatas.add(obj);
    }

    public void rewind() {
        mIndex = 0;
    }
}

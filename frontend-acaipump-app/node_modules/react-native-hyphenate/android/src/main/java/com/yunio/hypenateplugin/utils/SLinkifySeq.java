package com.yunio.hypenateplugin.utils;

public class SLinkifySeq {
    public SLinkifySeq(int pos, int val) {
        position = pos;
        this.value = val;
    }

    /**
     * this start position in a string
     */
    public int position;

    /**
     * datatype phone?web?email
     */
    public int value;
}

package com.yunio.hypenateplugin.utils;

public class SLinkSpec {
    public SLinkSpec(String curl, int cstart, int cend) {
        this.url = curl;
        this.start = cstart;
        this.end = cend;
    }

    String url;
    int start;
    int end;
}

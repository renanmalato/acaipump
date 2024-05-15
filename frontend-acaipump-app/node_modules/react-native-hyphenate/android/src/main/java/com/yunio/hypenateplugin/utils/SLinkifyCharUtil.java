package com.yunio.hypenateplugin.utils;

import android.text.TextUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SLinkifyCharUtil {

    public final static int CHAR_NUMBRIC = 0;
    public final static int CHAR_LOWERCASE = 1;
    public final static int CHAR_UPPERCASE = 2;
    public final static int CHAR_CHINESE = 3;
    public final static int CHAR_SPECIAL = 4;

    private final static String[] urlSchemes = new String[] { "http:", "https:", "tel:",
            "mailto:" };

    public final static Boolean isLetter(CharSequence cs) {
        // CharSequence[] css = { "a", "b", "c", "d", "e" };
        return false;
    }

    public final static boolean vd(String str) {

        char[] chars = str.toCharArray();
        boolean isGB2312 = false;
        for (int i = 0; i < chars.length; i++) {
            byte[] bytes = ("" + chars[i]).getBytes();
            if (bytes.length == 2) {
                int[] ints = new int[2];
                ints[0] = bytes[0] & 0xff;
                ints[1] = bytes[1] & 0xff;
                if (ints[0] >= 0x81 && ints[0] <= 0xFE && ints[1] >= 0x40 && ints[1] <= 0xFE) {
                    isGB2312 = true;
                    break;
                }
            }
        }
        return isGB2312;
    }

    public static int whatChar(char c) {
        if (c >= 0 && c <= 9) {
            return CHAR_NUMBRIC;
        } else if ((c >= 'a' && c <= 'z')) {
            return CHAR_LOWERCASE;
        } else if ((c >= 'A' && c <= 'Z')) {
            return CHAR_UPPERCASE;
        } else if (Character.isLetter(c)) {
            return CHAR_CHINESE;
        } else {
            return CHAR_SPECIAL;
        }
    }

    public boolean isNumeric(String str) {
        Pattern pattern = Pattern.compile("[0-9]*");
        Matcher isNum = pattern.matcher(str);
        if (!isNum.matches()) {
            return false;
        }
        return true;
    }

    public static boolean isUrlHasScheme(String url) {
        if (TextUtils.isEmpty(url)) {
            return false;
        }

        for (String scheme : urlSchemes) {
            if (url.startsWith(scheme)) {
                return true;
            }
        }
        return false;
    }

    public static String fillUrlScheme(String url) {
        if (isUrlHasScheme(url)) {
            return url;
        }
        return urlSchemes[0].concat("//").concat(url);
    }

}

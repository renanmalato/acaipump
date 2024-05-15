package com.yunio.hypenateplugin.utils;

import android.text.Spannable;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.method.MovementMethod;
import android.text.util.Linkify;
import android.text.util.Linkify.MatchFilter;
import android.text.util.Linkify.TransformFilter;
import android.util.Patterns;
import android.webkit.WebView;
import android.widget.TextView;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SLinkify {

    private static final String TAG = "SLinkify";
    // public static final String GOOD_IRI_CHAR =
    // "a-zA-Z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF";
    public static final String GOOD_IRI_CHAR = "a-zA-Z0-9";
    public static final String TOP_LEVEL_DOMAIN_STR_FOR_WEB_URL = "(?:"
            + "(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])" + "|(?:biz|b[abdefghijmnorstvwyz])"
            + "|(?:cat|com|coop|c[acdfghiklmnoruvxyz])" + "|d[ejkmoz]" + "|(?:edu|e[cegrstu])"
            + "|f[ijkmor]" + "|(?:gov|g[abdefghilmnpqrstuwy])" + "|h[kmnrtu]"
            + "|(?:info|int|i[delmnoqrst])" + "|(?:jobs|j[emop])" + "|k[eghimnprwyz]"
            + "|l[abcikrstuvy]" + "|(?:mil|mobi|museum|m[acdeghklmnopqrstuvwxyz])"
            + "|(?:name|net|n[acefgilopruz])" + "|(?:org|om)" + "|(?:pro|p[aefghklmnrstwy])" + "|qa"
            + "|r[eosuw]" + "|s[abcdeghijklmnortuvyz]" + "|(?:tel|travel|t[cdfghjklmnoprtvwz])"
            + "|u[agksyz]" + "|v[aceginu]" + "|w[fs]"
            + "|(?:\u03b4\u03bf\u03ba\u03b9\u03bc\u03ae|\u0438\u0441\u043f\u044b\u0442\u0430\u043d\u0438\u0435|\u0440\u0444|\u0441\u0440\u0431|\u05d8\u05e2\u05e1\u05d8|\u0622\u0632\u0645\u0627\u06cc\u0634\u06cc|\u0625\u062e\u062a\u0628\u0627\u0631|\u0627\u0644\u0627\u0631\u062f\u0646|\u0627\u0644\u062c\u0632\u0627\u0626\u0631|\u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629|\u0627\u0644\u0645\u063a\u0631\u0628|\u0627\u0645\u0627\u0631\u0627\u062a|\u0628\u06be\u0627\u0631\u062a|\u062a\u0648\u0646\u0633|\u0633\u0648\u0631\u064a\u0629|\u0641\u0644\u0633\u0637\u064a\u0646|\u0642\u0637\u0631|\u0645\u0635\u0631|\u092a\u0930\u0940\u0915\u094d\u0937\u093e|\u092d\u093e\u0930\u0924|\u09ad\u09be\u09b0\u09a4|\u0a2d\u0a3e\u0a30\u0a24|\u0aad\u0abe\u0ab0\u0aa4|\u0b87\u0ba8\u0bcd\u0ba4\u0bbf\u0baf\u0bbe|\u0b87\u0bb2\u0b99\u0bcd\u0b95\u0bc8|\u0b9a\u0bbf\u0b99\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0bc2\u0bb0\u0bcd|\u0baa\u0bb0\u0bbf\u0b9f\u0bcd\u0b9a\u0bc8|\u0c2d\u0c3e\u0c30\u0c24\u0c4d|\u0dbd\u0d82\u0d9a\u0dcf|\u0e44\u0e17\u0e22|\u30c6\u30b9\u30c8|\u4e2d\u56fd|\u4e2d\u570b|\u53f0\u6e7e|\u53f0\u7063|\u65b0\u52a0\u5761|\u6d4b\u8bd5|\u6e2c\u8a66|\u9999\u6e2f|\ud14c\uc2a4\ud2b8|\ud55c\uad6d|xn\\-\\-0zwm56d|xn\\-\\-11b5bs3a9aj6g|xn\\-\\-3e0b707e|xn\\-\\-45brj9c|xn\\-\\-80akhbyknj4f|xn\\-\\-90a3ac|xn\\-\\-9t4b11yi5a|xn\\-\\-clchc0ea0b2g2a9gcd|xn\\-\\-deba0ad|xn\\-\\-fiqs8s|xn\\-\\-fiqz9s|xn\\-\\-fpcrj9c3d|xn\\-\\-fzc2c9e2c|xn\\-\\-g6w251d|xn\\-\\-gecrj9c|xn\\-\\-h2brj9c|xn\\-\\-hgbk6aj7f53bba|xn\\-\\-hlcj6aya9esc7a|xn\\-\\-j6w193g|xn\\-\\-jxalpdlp|xn\\-\\-kgbechtv|xn\\-\\-kprw13d|xn\\-\\-kpry57d|xn\\-\\-lgbbat1ad8j|xn\\-\\-mgbaam7a8h|xn\\-\\-mgbayh7gpa|xn\\-\\-mgbbh1a71e|xn\\-\\-mgbc0a9azcg|xn\\-\\-mgberp4a5d4ar|xn\\-\\-o3cw4h|xn\\-\\-ogbpf8fl|xn\\-\\-p1ai|xn\\-\\-pgbs0dh|xn\\-\\-s9brj9c|xn\\-\\-wgbh1c|xn\\-\\-wgbl6a|xn\\-\\-xkc2al3hye2a|xn\\-\\-xkc2dl3a5ee0h|xn\\-\\-yfro4i67o|xn\\-\\-ygbi2ammx|xn\\-\\-zckzah|xxx)"
            + "|y[et]" + "|z[amw]))";

    private final static String PATTERN_STRING = "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)"
            + "\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_"
            + "\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?"
            + "((?:(?:[" + GOOD_IRI_CHAR + "][" + GOOD_IRI_CHAR + "\\-]{0,64}\\.)+" // named
                                                                                    // host
            + TOP_LEVEL_DOMAIN_STR_FOR_WEB_URL + "|(?:(?:25[0-5]|2[0-4]" // or
                                                                         // ip
                                                                         // address
            + "[0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]"
            + "|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1]"
            + "[0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}"
            + "|[1-9][0-9]|[0-9])))" + "(?:\\:\\d{1,5})?)" // plus option port
            // number
            + "(\\/(?:(?:[" + GOOD_IRI_CHAR + "\\;\\/\\?\\:\\@\\&\\=\\#\\~" // plus
            // option
            // query
            // params
            + "\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?";

    // + "(?:\\b|$)"

    // private final static String PATTERN_STRING =
    // "((http|https|Http|Https|rtsp|Rtsp):\\/\\/)?([0-9a-zA-Z\\-\\_]+\\.){1,2}[0-9a-zA-Z]{2,3}(\\/[0-9a-zA-Z\\_\\+\\=\\-\\.%]*\\+)*(\\/?\\?[0-9a-zA-Z-\\+\\=&%]*)?";

    public static final Pattern WEB_URL = Pattern.compile(PATTERN_STRING);
    // public static final int WEB_ID = 10;

    private interface SMatchFilter extends MatchFilter {
    }

    /**
     * Filters out web URL matches that occur after an at-sign (@). This is to
     * prevent turning the domain name in an email address into a web link.
     */
    public static final SMatchFilter sUrlMatchFilter = new SMatchFilter() {
        public boolean acceptMatch(CharSequence s, int start, int end) {
            // DevUtils.showLog("url", "sUrlMatchFilter------->" +
            // s.toString());
            if (start == 0) {
                return true;
            }
            if (s.charAt(start - 1) == '@') {
                // DevUtils.showLog("url",
                // "sUrlMatchFilter------->1111111111111111");
                return false;
            }
            return true;
        }
    };
    /**
     * Filters out URL matches that don't have enough digits to be a phone
     * number.
     */
    public static final MatchFilter phoneNumberMatchFilter = new MatchFilter() {
        public final boolean acceptMatch(CharSequence s, int start, int end) {
            int digitCount = 0;
            for (int i = start; i < end; i++) {
                if (Character.isDigit(s.charAt(i))) {
                    digitCount++;
                }
            }
            // 10086 <===>86055012345678
            if ((digitCount >= 5) && (digitCount <= 14)) {
                if ((s.length() > end)) {
                    if (s.charAt(end) != '@') return true;
                } else return true;
            }
            return false;
        }
    };

    public static final ArrayList<String> getLinkifyList(CharSequence source, int linkitype) {
        ArrayList<SLinkSpec> links = new ArrayList<SLinkSpec>();
        switch (linkitype) {
        case Linkify.PHONE_NUMBERS:
            links = getPhoneNumList(source);
            break;
        case Linkify.WEB_URLS:
            links = getWebList(source);
            break;
        case Linkify.EMAIL_ADDRESSES:
            links = getMailList(source);
            break;

        default:
            break;
        }
        if (links == null) {
            return null;
        } else {
            ArrayList<String> retsult = new ArrayList<String>();
            for (SLinkSpec spec : links)
                retsult.add(spec.url);
            links.clear();
            links = null;

            return retsult;
        }
    }

    public static ArrayList<SLinkifySeq> getLinkifySequence(CharSequence source) {
        ArrayList<SLinkifySeq> list = new ArrayList<SLinkifySeq>();
        insert(list, source, Linkify.PHONE_NUMBERS);
        insert(list, source, Linkify.WEB_URLS);
        insert(list, source, Linkify.EMAIL_ADDRESSES);
        return list;
    }

    private static void insert(ArrayList<SLinkifySeq> list, CharSequence source, int linkiftype) {
        SLinkSpec spec = getFirstLinkify(source, linkiftype);
        seq(list, spec, linkiftype);
    }

    private static void seq(ArrayList<SLinkifySeq> list, SLinkSpec spec, int type) {
        if (spec == null) return;
        SLinkifySeq item = new SLinkifySeq(spec.start, type);
        if (list.size() == 0) {
            list.add(item);
        } else {
            for (int i = 0; i < list.size(); i++) {
                if (list.get(i).position > item.position) {
                    list.add(i, item);
                    break;
                } else if (i == (list.size() - 1)) {
                    // DevUtils.showLog("SLinkify.seq;============= url = "
                    // + spec.url + "; item.position = " + spec.start
                    // + "; list.get(i).position = "
                    // + list.get(i).position);
                    list.add(item);
                    break;
                }
            }
        }
    }

    private static final SLinkSpec getFirstLinkify(CharSequence source, int linkitype) {
        ArrayList<SLinkSpec> links = new ArrayList<SLinkSpec>();
        switch (linkitype) {
        case Linkify.PHONE_NUMBERS:
            links = getPhoneNumList(source);
            break;
        case Linkify.WEB_URLS:
            links = getWebList(source);
            break;
        case Linkify.EMAIL_ADDRESSES:
            links = getMailList(source);
            break;
        default:
            break;
        }
        if (links == null) {
            return null;
        } else {
            SLinkSpec retsult = links.get(0);
            links.clear();
            links = null;
            return retsult;
        }
    }

    private static final ArrayList<SLinkSpec> getPhoneNumList(CharSequence source) {
        return link(source, Patterns.PHONE, new String[] { "" }, phoneNumberMatchFilter,
                Linkify.sPhoneNumberTransformFilter);
    }

    private static final ArrayList<SLinkSpec> getWebList(CharSequence source) {
        // DevUtils.showLog("url", "LinkifyUtils.getWebList");
        return link(source, WEB_URL, new String[] { "" }, sUrlMatchFilter, null);
    }

    private static final ArrayList<SLinkSpec> getMailList(CharSequence source) {
        return link(source, Patterns.EMAIL_ADDRESS, new String[] { "" }, null, null);
    }

    public static final Boolean hasPhone(CharSequence source) {
        return hasLink(source, Patterns.PHONE, phoneNumberMatchFilter);
    }

    /**
     * hasweb
     * 
     * @param source
     * @return
     */
    public static final Boolean hasWeb(CharSequence source) {
        return hasLink(source, WEB_URL, Linkify.sUrlMatchFilter);
    }

    public static final Boolean hasMail(CharSequence source) {
        return hasLink(source, Patterns.EMAIL_ADDRESS, null);
    }

    private static final Boolean hasLink(CharSequence source, Pattern pattern,
                                         MatchFilter matchFilter) {
        Spannable text = Spannable.Factory.getInstance().newSpannable(source);
        SLinkifySURLSpan[] old = text.getSpans(0, text.length(), SLinkifySURLSpan.class);
        for (int i = old.length - 1; i >= 0; i--) {
            text.removeSpan(old[i]);
        }
        Matcher m = pattern.matcher(text);
        while (m.find()) {
            if (matchFilter != null) {
                if (matchFilter.acceptMatch(source, m.start(), m.end())) {
                    return true;
                } else return false;
            } else return true;
        }
        return false;
    }

    private static final ArrayList<SLinkSpec> link(CharSequence source, Pattern pattern,
                                                   String[] schemes, MatchFilter matchFilter, TransformFilter transformFilter) {
        Spannable text = Spannable.Factory.getInstance().newSpannable(source);
        ArrayList<SLinkSpec> links = new ArrayList<SLinkSpec>();
        SLinkifySURLSpan[] old = text.getSpans(0, text.length(), SLinkifySURLSpan.class);
        for (int i = old.length - 1; i >= 0; i--) {
            text.removeSpan(old[i]);
        }
        gatherLinks(links, text, pattern, schemes, matchFilter, transformFilter);
        pruneOverlaps(links);
        if (links.size() == 0) {
            return null;
        }
        return links;
    }

    public static final void linkAll(CharSequence source) {
        Spannable text = Spannable.Factory.getInstance().newSpannable(source);
        ArrayList<SLinkSpec> links = new ArrayList<SLinkSpec>();
        SLinkifySURLSpan[] old = text.getSpans(0, text.length(), SLinkifySURLSpan.class);
        for (int i = old.length - 1; i >= 0; i--) {
            text.removeSpan(old[i]);
        }

        // web
        gatherLinks(links, text, WEB_URL, new String[] { "http://", "https://", "rtsp://" },
                Linkify.sUrlMatchFilter, null);

        // email
        gatherLinks(links, text, Patterns.EMAIL_ADDRESS, new String[] { "mailto:" }, null, null);

        // phone
        gatherLinks(links, text, Patterns.PHONE, new String[] { "tel:" },
                Linkify.sPhoneNumberMatchFilter, Linkify.sPhoneNumberTransformFilter);

        // gps
        gatherMapLinks(links, text);
        pruneOverlaps(links);
        if (links.size() == 0) {
            return;
        }
        for (SLinkSpec link : links) {
            applyLink(link.url, link.start, link.end, text);
        }
        links.clear();
        links = null;
    }

    private static final void applyLink(String url, int start, int end, Spannable text) {
        applyLink(url, start, end, text, SLinkifySURLSpan.DEFAULT_LINK_COLOR);
    }

    private static final void applyLink(String url, int start, int end, Spannable text,
                                        int linkColor) {
        SLinkifySURLSpan span = new SLinkifySURLSpan(url, linkColor);

        text.setSpan(span, start, end, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
    }

    private static final String makeUrl(String url, String[] prefixes, Matcher m,
                                        TransformFilter filter) {
        if (filter != null) {
            url = filter.transformUrl(m, url);
        }

        boolean hasPrefix = false;

        for (int i = 0; i < prefixes.length; i++) {
            if (url.regionMatches(true, 0, prefixes[i], 0, prefixes[i].length())) {
                hasPrefix = true;
                // Fix capitalization if necessary
                if (!url.regionMatches(false, 0, prefixes[i], 0, prefixes[i].length())) {
                    url = prefixes[i] + url.substring(prefixes[i].length());
                }
                break;
            }
        }

        if (!hasPrefix) {
            url = prefixes[0] + url;
        }
        return url;
    }

    private static final void gatherLinks(ArrayList<SLinkSpec> links, Spannable s, Pattern pattern,
                                          String[] schemes, MatchFilter matchFilter, TransformFilter transformFilter) {
        Matcher m = pattern.matcher(s);
        while (m.find()) {
            int start = m.start();
            int end = m.end();
            if (matchFilter == null || matchFilter.acceptMatch(s, start, end)) {
                String url = makeUrl(m.group(0), schemes, m, transformFilter);
                if (matchFilter instanceof SMatchFilter) {
                    while (SLinkifyCharUtil.whatChar(url.subSequence(0, 1).toString()
                            .charAt(0)) == SLinkifyCharUtil.CHAR_CHINESE) {
                        // DevUtils.showLog("SLinkify.gatherWebLinks char = "
                        // + url.substring(0, 1));
                        url = url.substring(1, url.length());
                        start++;
                    }

                }
                links.add(new SLinkSpec(url, start, end));
            }
        }
    }

    private static final void gatherMapLinks(ArrayList<SLinkSpec> links, Spannable s) {
        String string = s.toString();
        String address;
        int base = 0;

        while ((address = WebView.findAddress(string)) != null) {
            int start = string.indexOf(address);

            if (start < 0) {
                break;
            }

            int length = address.length();
            int end = start + length;
            string = string.substring(end);
            base += end;

            String encodedAddress = null;
            try {
                encodedAddress = URLEncoder.encode(address, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                continue;
            }

            SLinkSpec spec = new SLinkSpec("geo:0,0?q=" + encodedAddress, base + start, base + end);
            links.add(spec);
        }
    }

    private static final void addLinkMovementMethod(TextView t) {
        MovementMethod m = t.getMovementMethod();
        if ((m == null) || !(m instanceof SLinkifyMovementMethod)) {
            if (t.getLinksClickable()) {
                t.setMovementMethod(SLinkifyMovementMethod.getInstance());
            }
        }
    }

    /**
     * remove sth invalid
     * 
     * @param links
     */
    private static final void pruneOverlaps(ArrayList<SLinkSpec> links) {
        Comparator<SLinkSpec> c = new Comparator<SLinkSpec>() {
            public final int compare(SLinkSpec a, SLinkSpec b) {
                if (a.start < b.start) {
                    return -1;
                }

                if (a.start > b.start) {
                    return 1;
                }

                if (a.end < b.end) {
                    return 1;
                }

                if (a.end > b.end) {
                    return -1;
                }

                return 0;
            }

            public final boolean equals(Object o) {
                return false;
            }
        };

        Collections.sort(links, c);

        int len = links.size();
        int i = 0;

        while (i < len - 1) {
            SLinkSpec a = links.get(i);
            SLinkSpec b = links.get(i + 1);
            int remove = -1;

            if ((a.start <= b.start) && (a.end > b.start)) {
                if (b.end <= a.end) {
                    remove = i + 1;
                } else if ((a.end - a.start) > (b.end - b.start)) {
                    remove = i + 1;
                } else if ((a.end - a.start) < (b.end - b.start)) {
                    remove = i;
                }

                if (remove != -1) {
                    links.remove(remove);
                    len--;
                    continue;
                }

            }

            i++;
        }
    }

    public static final boolean addLinks(TextView text, int mask) {
        return addLinks(text, mask, SLinkifySURLSpan.DEFAULT_LINK_COLOR);
    }

    public static final boolean addLinks(TextView text, int mask, int linkColor) {
        if (mask == 0) {
            return false;
        }

        CharSequence t = text.getText();

        if (t instanceof Spannable) {
            if (addLinks((Spannable) t, mask, linkColor)) {
                addLinkMovementMethod(text);
                return true;
            }
            return false;
        } else {
            SpannableString s = SpannableString.valueOf(t);
            if (addLinks(s, mask, linkColor)) {
                addLinkMovementMethod(text);
                text.setText(s);

                return true;
            }

            return false;
        }

    }

    /**
     * Scans the text of the provided Spannable and turns all occurrences of the
     * link types indicated in the mask into clickable links. If the mask is
     * nonzero, it also removes any existing URLSpans attached to the Spannable,
     * to avoid problems if you call it repeatedly on the same text.
     */
    public static final boolean addLinks(Spannable text, int mask, int linkColor) {
        if (mask == 0) {
            return false;
        }
        SLinkifySURLSpan[] old = text.getSpans(0, text.length(), SLinkifySURLSpan.class);

        for (int i = old.length - 1; i >= 0; i--) {
            text.removeSpan(old[i]);
        }

        ArrayList<SLinkSpec> links = new ArrayList<SLinkSpec>();

        if ((mask & Linkify.WEB_URLS) != 0) {
            gatherLinks(links, text, WEB_URL, new String[] { "" }, sUrlMatchFilter, null);
        }
        if ((mask & Linkify.PHONE_NUMBERS) != 0) {
            gatherLinks(links, text, Patterns.PHONE, new String[] { "tel:" },
                    Linkify.sPhoneNumberMatchFilter, Linkify.sPhoneNumberTransformFilter);
        }
        if ((mask & Linkify.EMAIL_ADDRESSES) != 0) {
            gatherLinks(links, text, Patterns.EMAIL_ADDRESS, new String[] { "mailto:" }, null,
                    null);
        }

        pruneOverlaps(links);

        if (links.size() == 0) {
            return false;
        }

        for (SLinkSpec link : links) {
            applyLink(link.url, link.start, link.end, text, linkColor);
        }

        return true;
    }

    public static final void addLinks(TextView tv) {
        Pattern mPattern = Pattern.compile(PATTERN_STRING);
        String scheme = "www.baidu.com";
        Linkify.addLinks(tv, mPattern, scheme);
    }
}

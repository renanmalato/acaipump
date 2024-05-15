package com.yunio.easechat.utils;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * Created by PeterZhang on 2015/6/8.
 */
public class ListUtils {
    public static <E> List<E> cloneList(List<E> list) {
        if (list instanceof ArrayList) {
            return (List<E>) ((ArrayList) list).clone();
        }
        if (list instanceof LinkedList) {
            return (List<E>) ((LinkedList) list).clone();
        }
        return null;
    }

    public static boolean isEmpty(List list) {
        return list == null || list.isEmpty();
    }

    public static int size(List list) {
        return list != null ? list.size() : 0;
    }

    public static <KEY, T> List<T> checkToInitMapList(Map<KEY, List<T>> map, KEY key) {
        List<T> list = map.get(key);
        if (list == null) {
            list = new ArrayList<T>();
            map.put(key, list);
        }
        return list;
    }
}

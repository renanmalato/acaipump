package com.yunio.hypenateplugin.utils;

import java.io.File;
import java.io.FileInputStream;
import java.security.MessageDigest;
import java.text.DecimalFormat;
import java.util.Locale;

import com.yunio.easechat.utils.LogUtils;

import android.content.Context;
import android.os.Environment;
import android.text.TextUtils;
import android.webkit.MimeTypeMap;


public class FileUtils {
    public static final String TAG = "FileUtils";
    private static final String MIME_TYPE_WILD = "*/*";
    private static final char[] DIGITS = "0123456789abcdef".toCharArray();

    private static String sApplicationDir;

    public static String getAppDir(Context context) {
        if (!mediaMounted()) {
            LogUtils.e(TAG, "no media mounted!");
            return null;
        }
        if (sApplicationDir == null) {
            File fileDir = context.getExternalFilesDir("");
            if (fileDir == null || !fileDir.exists()) {
                return null;
            }
            sApplicationDir = parent(fileDir);
        }
        return sApplicationDir;
    }

    public static File getImageDir(Context context) {
        String appDir = getAppDir(context);
        if (appDir != null) {
            return mkdir(appDir + File.separator + "image");
        }
        return null;
    }

    public static File getTempDir(Context context) {
        String appDir = getAppDir(context);
        if (appDir != null) {
            return mkdir(appDir + File.separator + "tmp");
        }
        return null;
    }

    public static File getCacheDir(Context context) {
        String appDir = getAppDir(context);
        if (appDir != null) {
            return mkdir(appDir + File.separator + "cache");
        }
        return null;
    }

    public static boolean mediaMounted() {
        String state = Environment.getExternalStorageState();
        LogUtils.d(TAG, "external storage state " + state);
        if (state.equals(Environment.MEDIA_MOUNTED)) {
            return true;
        } else {
            return false;
        }
    }

    public static String parent(File file) {
        if (file == null) {
            return null;
        } else {
            return file.getParent();
        }
    }

    public static File mkdir(String absPath) {
        File file = new File(absPath);
        if (!file.exists()) {
            file.mkdirs();
        }
        return file;
    }

    public static boolean exists(String filePath) {
        if (TextUtils.isEmpty(filePath)) {
            return false;
        }
        File file = new File(filePath);
        return file.exists();
    }

    public static boolean delete(String absPath) {
        if (TextUtils.isEmpty(absPath)) {
            return false;
        }

        File file = new File(absPath);
        return delete(file);
    }

    public static boolean delete(File file) {
        if (!file.exists()) {
            return true;
        }

        if (file.isFile()) {
            return file.delete();
        }

        boolean result = true;
        File[] files = file.listFiles();
        if (files == null) {
            result &= file.delete();
            return result;
        }
        for (File f : files) {
            if (f != null) {
                result &= delete(f);
            }
        }
        if (result) {
            result = file.delete();
        }

        return result;
    }

    public static long size(String absPath) {
        if (absPath == null) {
            return 0;
        }
        File file = new File(absPath);
        return file.length();
    }

    /**
     * @param 字节数 (以byte为单位)
     * @return 格式化后的字节数
     * @author thinkpad
     */
    public static String formatByteSize(long bytes) {
        String sizes = null;
        if (0 <= bytes && bytes < 1024 * 1024) {
            DecimalFormat dfk = new DecimalFormat("0");
            sizes = dfk.format(bytes / 1024f) + "KB";
        } else {
            DecimalFormat dfm = new DecimalFormat("0.00");
            sizes = dfm.format(bytes / 1024f / 1024f) + "MB";
        }
        return sizes;
    }

    public static String randomFileName(Context context) {
        int i = 0;
        String filePath = getCacheDir(context) + File.separator + System.currentTimeMillis();
        while (new File(filePath).exists()) {
            filePath += (i++);
        }
        return filePath;
    }

    public static boolean renameFileName(String srcFileName, String targetFileName) {
        File file = new File(srcFileName);
        return file.exists() ? file.renameTo(new File(targetFileName)) : false;
    }

    public static String getMimeType(File file) {
        if (file == null) {
            return MIME_TYPE_WILD;
        }
        return getMimeType(file.getName());
    }

    public static String getMimeType(String fileName) {
        if (TextUtils.isEmpty(fileName)) {
            return MIME_TYPE_WILD;
        }
        String extension = getExtension(fileName);
        MimeTypeMap map = MimeTypeMap.getSingleton();
        String type = map.getMimeTypeFromExtension(extension);
        if (TextUtils.isEmpty(type)) {
            return fileName.endsWith(".webp") ? "image/webp" : MIME_TYPE_WILD;
        }
        return type;
    }

    public static String getExtension(String fileName) {
        if (TextUtils.isEmpty(fileName)) {
            return "";
        }

        int index = fileName.lastIndexOf('.');
        if (index < 0 || index >= fileName.length()) {
            return "";
        }
        return fileName.substring(index + 1).toLowerCase(Locale.getDefault());
    }

    public static String getFileMD5(String filePath) {
        MessageDigest digest = null;
        FileInputStream in = null;
        byte buffer[] = new byte[1024 * 16];
        int read;
        try {
            digest = MessageDigest.getInstance("MD5");
            in = new FileInputStream(new File(filePath));
            while ((read = in.read(buffer)) != -1) {
                digest.update(buffer, 0, read);
            }
            in.close();
        } catch (Exception e) {
            return "";
        }
        byte[] digests = digest.digest();
        return bytes2hex(digests);
    }

    private static String bytes2hex(byte[] bytes) {
        int len = bytes.length;
        char[] str = new char[len * 2];
        for (int idx = 0; idx < len; ++idx) {
            byte tmpByte = bytes[idx];
            int lowIndex = (idx << 1);
            str[lowIndex] = DIGITS[tmpByte >>> 4 & 0xf];
            str[lowIndex + 1] = DIGITS[tmpByte & 0xf];
        }
        return new String(str);
    }


}

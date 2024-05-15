package com.yunio.hypenateplugin.utils;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import com.yunio.easechat.utils.LogUtils;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.Bitmap.Config;
import android.graphics.BitmapFactory.Options;
import android.media.ExifInterface;
import android.text.TextUtils;

public class BitmapUtils {
    private final static String TAG = "BitmapUtils";

    public static Options getOptions(String filePath) {
        Options options = createDecodeBoundsOptions();
        BitmapFactory.decodeFile(filePath, options);
        return options;
    }

    /**
     * 创建用于获取图片宽高的options
     * 
     * @return
     */
    private static Options createDecodeBoundsOptions() {
        Options options = new Options();
        options.inPreferredConfig = Config.ALPHA_8;
        options.inJustDecodeBounds = true;
        return options;
    }

    /**
     * 根据已取得的图片实际宽高计算缩放到目标宽高的缩放倍数
     * 
     * @param options
     * @param desireWidth
     * @param desireHeight
     */
    private static void calcSizeOptions(Options options, int desireWidth, int desireHeight) {
        if (desireWidth <= 0 || desireHeight <= 0) {
            options.inSampleSize = 1;
        } else {
            options.inSampleSize = findBestSampleSize(options.outWidth, options.outHeight,
                    desireWidth, desireHeight);
        }
        options.inJustDecodeBounds = false;
    }

    /**
     * Returns the largest power-of-two divisor for use in downscaling a bitmap
     * that will not result in the scaling past the desired dimensions.
     * 
     * @param actualWidth
     *            Actual width of the bitmap
     * @param actualHeight
     *            Actual height of the bitmap
     * @param desiredWidth
     *            Desired width of the bitmap
     * @param desiredHeight
     *            Desired height of the bitmap
     */
    static int findBestSampleSize(int actualWidth, int actualHeight, int desiredWidth,
            int desiredHeight) {
        double wr = (double) actualWidth / desiredWidth;
        double hr = (double) actualHeight / desiredHeight;
        double ratio = Math.min(wr, hr);
        float n = 1.0f;
        while ((n * 2) <= ratio) {
            n *= 2;
        }

        return (int) n;
    }

    public static Bitmap getBitmap(String absPath, int width, int height) {
        if (width <= 0 && height <= 0 || !FileUtils.exists(absPath)) {
            LogUtils.e(TAG, "invalid parameters absPath " + absPath + " width " + width + " height "
                    + height);
            return null;
        }

        LogUtils.d(TAG, "decode bitmap " + absPath + " width " + width + " height " + height);
        Bitmap bitmap = null;
        Options options = getOptions(absPath);
        calcSizeOptions(options, width, height);
        LogUtils.d(TAG, "decode bitmap inSampleSize=%d, %dx%d", options.inSampleSize,
                options.outWidth, options.outHeight);
        bitmap = BitmapFactory.decodeFile(absPath, options);
        if (bitmap == null) {
            return null;
        }
        LogUtils.d(TAG, "decode bitmap size=%dx%d", bitmap.getWidth(), bitmap.getHeight());

        float ratioW = ((float) width) / bitmap.getWidth();
        float ratioH = ((float) height) / bitmap.getHeight();
        float ratio = Math.min(ratioW, ratioH);
        if (ratio > 1 || ratio <= 0) {
            ratio = 1;
        }

        LogUtils.d(TAG, "decode bitmap final=" + width + "x" + height + " ratio=" + ratio);

        Matrix matrix = new Matrix();
        matrix.postScale(ratio, ratio);

        int rotate = getRotate(absPath);
        if (rotate > 0) {
            matrix.setRotate(rotate);
        }

        Bitmap rotated = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(),
                matrix, true);

        if (rotated == null) {
            return bitmap;
        }
        LogUtils.d(TAG, "decode bitmap final=%d x %d", rotated.getWidth(), rotated.getHeight());
        return rotated;
    }

    public static int getRotate(String absPath) {
        if (!FileUtils.exists(absPath)) {
            LogUtils.e(TAG, "invalid file path");
            return 0;
        }

        ExifInterface exifInterface = null;
        try {
            exifInterface = new ExifInterface(absPath);
        } catch (IOException e) {
            e.printStackTrace();
            return 0;
        }

        int orientation = exifInterface.getAttributeInt(ExifInterface.TAG_ORIENTATION,
                ExifInterface.ORIENTATION_UNDEFINED);
        int rotate = 0;
        switch (orientation) {
        case ExifInterface.ORIENTATION_ROTATE_90:
            rotate = 90;
            break;
        case ExifInterface.ORIENTATION_ROTATE_180:
            rotate = 180;
            break;
        case ExifInterface.ORIENTATION_ROTATE_270:
            rotate = 270;
            break;
        default:
            break;
        }
        LogUtils.e(TAG, "image rotate " + rotate);
        return rotate;
    }

    /**
     * <pre>
     * &#64;time Apr 3, 2014
     * 
     * &#64;param srcPath
     *            path of local file
     * &#64;param destPath
     *            dest path when is compressed
     * &#64;param maxFileSize
     *            max size of dest file to compress
     * &#64;param destWidth
     *            max width of the compressed dest file.if is -1, height of dest
     *            file will be scaled with the ratio of maxHeight and height
     * &#64;param destHeight
     *            max height of the compressed dest file. if is -1, height of
     *            dest file will be scaled with the ratio of maxWidth and width
     * &#64;param maxMinSize
     *            max size of min from(destWidth, destHeight)
     * &#64;param maxLargeSize
     *            max size of max from(destWidth, destHeight)
     * &#64;param override
     *            if destPath is already exists file, if override, it will
     *            override it.if not do nothing
     * &#64;throws it's invalid and do nothing when both maxWidth and maxHeight is -1
     * </pre>
     */
    public final static boolean compress(String srcPath, String destPath, int maxMinSize,
            int maxLargeSize, long maxFileSize, boolean override) {
        if (maxMinSize <= 0 || maxFileSize <= 0 || TextUtils.isEmpty(srcPath)) {
            return false;
        }
        File srcFile = new File(srcPath);
        if (!srcFile.exists()) {
            return false;
        }
        if (FileUtils.exists(destPath)) {
            if (!override) {
                return false;
            }
            FileUtils.delete(destPath);
        }
        final long srcFileSize = srcFile.length();

        // read image with and height
        Options options = getOptions(srcPath);
        final int srcWidth = options.outWidth;
        final int srcHeight = options.outHeight;

        // the min size is maxMin
        float destRatio = 1.0f;
        float minSize = 0;
        float maxSize = 0;
        if (srcWidth > srcHeight) {
            minSize = srcHeight;
            maxSize = srcWidth;
        } else {
            minSize = srcWidth;
            maxSize = srcHeight;
        }
        if (minSize > maxMinSize) {
            destRatio = ((float) maxMinSize) / minSize;
        }
        if (maxSize > maxLargeSize) {
            destRatio = Math.min((float) maxLargeSize / maxSize, destRatio);
        }
        int destWidth = (int) (srcWidth * destRatio);
        int destHeight = (int) (srcHeight * destRatio);

        // read bitmap from sdcard
        Bitmap bitmap = getBitmap(srcPath, destWidth, destHeight);
        if (bitmap == null) {
            return false;
        }

        destWidth = bitmap.getWidth();
        destHeight = bitmap.getHeight();
        File outputFile = new File(destPath);
        FileOutputStream out = null;
        try {
            // calculate quality
            float ratio = ((float) (srcWidth * srcHeight)) / (destWidth * destHeight);
            long losssLessSize = (long) (srcFileSize / ratio);
            int quality = 0;
            if (maxFileSize >= losssLessSize) {
                quality = 100;
            } else {
                quality = (int) Math.floor(100.00 * maxFileSize / losssLessSize);
            }
            if (quality <= 0) {
                quality = 1;
            } else if (quality > 100) {
                quality = 100;
            }

            long start = System.currentTimeMillis();
            long curSize = 0;
            int ceilQuality = quality > 70 ? 100 : quality + 30;
            int floorQuality = quality < 30 ? 0 : quality - 30;
            boolean running = true;
            while (running) {
                if (out != null) {
                    out.close();
                }
                out = new FileOutputStream(outputFile);
                BufferedOutputStream stream = new BufferedOutputStream(out);
                bitmap.compress(CompressFormat.JPEG, quality, stream);
                stream.flush();
                stream.close();
                curSize = FileUtils.size(destPath);
                if (curSize - maxFileSize <= 5 * 1024) {
                    running = false;
                } else if (Math.abs(ceilQuality - floorQuality) <= 1) {
                    running = false;
                } else {
                    if (curSize < maxFileSize) {
                        floorQuality = quality;
                    } else {
                        ceilQuality = quality;
                    }
                }
                quality = (ceilQuality + floorQuality) / 2;
            }
            long duration = System.currentTimeMillis() - start;
            if (LogUtils.isDebug()) {
                LogUtils.d(TAG,
                        "compress-dest-file-size " + srcFileSize + "|" + maxFileSize + " ratio="
                                + ratio + " quality=" + quality + " duration=" + duration + " size:"
                                + destWidth + "x" + destHeight + "|" + srcWidth + "x" + srcHeight
                                + " " + srcPath);
            }
            return true;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (OutOfMemoryError e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (out != null) {
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        FileUtils.delete(destPath);

        return false;

    }
}

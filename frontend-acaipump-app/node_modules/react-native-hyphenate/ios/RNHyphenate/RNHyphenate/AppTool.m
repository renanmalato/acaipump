//
//  AppTool.m
//  HyphenatePluginDemo
//
//  Created by Youssef on 2017/1/6.
//  Copyright © 2017年 yunio. All rights reserved.
//

#import "AppTool.h"
#import "Reachability.h"
#import "SVProgressHUD.h"
#import "SaveModel.h"
#import "UIColor+Hex.h"

@implementation AppTool
+ (void)setSVPWithBlackType {
    [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeBlack];
}

+ (void)setSVPWithDefaultType {
    [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeNone];
}

+ (UIImage *)circleImage:(UIImage *)image Radius:(CGFloat)radius Size:(CGSize)size {
    CGRect rect = CGRectMake(0, 0, size.width, size.height);
    UIGraphicsBeginImageContextWithOptions(size, NO, 0);
    CGContextRef context = UIGraphicsGetCurrentContext();
    UIBezierPath * path = [[UIBezierPath alloc] init];
    if (size.height == size.width) {
        if (radius == size.width/2) {
            path = [UIBezierPath bezierPathWithArcCenter:CGPointMake(size.width/2, size.height/2) radius:radius startAngle:0 endAngle:2.0*M_PI clockwise:YES];
        }else {
            path = [UIBezierPath bezierPathWithRoundedRect:rect cornerRadius:radius];
        }
    }else {
        path = [UIBezierPath bezierPathWithRoundedRect:rect cornerRadius:radius];
    }
    CGContextAddPath(context, path.CGPath);
    CGContextClip(context);
    [image drawInRect:rect];
    
    UIImage * uncompressedImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    if (uncompressedImage) {
        return uncompressedImage;
    }else {
        return nil;
    }
}

+ (UIViewController *)getCurrentViewController {
    UIViewController * result = [[UIViewController alloc] init];
    
    UIWindow * window = [UIApplication sharedApplication].keyWindow;
    if (window.windowLevel != UIWindowLevelNormal) {
        NSArray * windows = [UIApplication sharedApplication].windows;
        for (UIWindow * temp in windows) {
            if (temp.windowLevel == UIWindowLevelNormal) {
                window = temp;
                break;
            }
        }
    }
    
    UIViewController * appRootVC = window.rootViewController;
    if (appRootVC) {
        UIView * frontView = window.subviews.firstObject;
        if (frontView) {
            id nextResponder = frontView.nextResponder;
            if ([appRootVC presentedViewController]) {
                nextResponder = appRootVC.presentedViewController;
            }
            if ([nextResponder isKindOfClass:[UITabBarController class]]) {
                UITabBarController * tabbar = (UITabBarController *)nextResponder;
                UINavigationController * nav = (UINavigationController *)tabbar.viewControllers[tabbar.selectedIndex];
                result = nav.childViewControllers.lastObject;
            }else if ([nextResponder isKindOfClass:[UINavigationController class]]) {
                UINavigationController * nav = (UINavigationController *)nextResponder;
                result = nav.childViewControllers.lastObject;
            }else {
                if (![nextResponder isKindOfClass:[UIView class]]) {
                    result = nextResponder;
                } else {
                    result = appRootVC;
                }
            }
        }
    }
    
    return result;
}

+ (int)getSystemVersion {
    NSArray * numbers = [[UIDevice currentDevice].systemVersion componentsSeparatedByString:@"."];
    NSString * version = [NSString stringWithFormat:@"%@", numbers.firstObject];
    return version.intValue;
}

//判断网络状态
+ (BOOL)hasInternet {
    if ([[Reachability reachabilityForInternetConnection] currentReachabilityStatus] == NotReachable) {
        UIAlertView * alert = [[UIAlertView alloc] initWithTitle:@"您的网络连接已断开" message:nil delegate:self cancelButtonTitle:@"确定" otherButtonTitles: nil];
        [alert show];
        return NO;
    }else {
        return YES;
    }
}

+ (NSString *)FBlocalizedString:(NSString *)key AndComment:(NSString *)comment {
    NSString * language = [[NSUserDefaults standardUserDefaults] objectForKey:LANGUAGE];
    if (language) {
        //如果直接传了多语言字典，那么直接用传进来的字典
        NSDictionary * dic = [[SaveModel shared] getLanguageDictionary];
        if ([dic allKeys].count > 0) {
            NSDictionary * langDic = dic[language];
            if (langDic) {
                return langDic[key];
            }
        }
        
        //如果没有，那么使用默认的string文件
        NSString *path = @"";
        if ([language containsString:@"zh"]) {
            path = [FEEDBACKBUNDLE pathForResource:@"zh-Hans" ofType:@"lproj"];
        } else if ([language containsString:@"en"]) {
            path = [FEEDBACKBUNDLE pathForResource:@"en" ofType:@"lproj"];
        }
        NSString *labelString = [[NSBundle bundleWithPath:path] localizedStringForKey:key value:nil table:@"FeedbackPlist"];
        return labelString;
    } else {
        return NSLocalizedStringWithDefaultValue(key, @"FeedbackPlist", FEEDBACKBUNDLE, @"", comment);
    }
}

+ (UIImage *)getImageWithName:(NSString *)name {
    NSString * language = [[NSUserDefaults standardUserDefaults] objectForKey:LANGUAGE];
    if (language) {
        NSDictionary * imageDic = [[SaveModel shared] getImageDictionary][language];
        NSString * imagePath = [[NSBundle mainBundle] pathForResource:imageDic[name] ofType:@""];
        UIImage * image = [UIImage imageWithContentsOfFile:imagePath];
        if (image) {
            return image;
        }
    }
    return [UIImage imageNamed:name inBundle:FEEDBACKBUNDLE compatibleWithTraitCollection:nil];
}

+ (UIColor *)colorWithKey:(NSString *)key {
    NSString * language = [[NSUserDefaults standardUserDefaults] objectForKey:LANGUAGE];
    if (language) {
        NSDictionary * cssDic = [[SaveModel shared] getColorDictionary][language];
        NSString * css = cssDic[key];
        return [UIColor colorWithCSS:css];
    }
    return [UIColor clearColor];
}

@end

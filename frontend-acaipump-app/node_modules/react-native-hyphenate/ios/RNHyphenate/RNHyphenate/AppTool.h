//
//  AppTool.h
//  HyphenatePluginDemo
//
//  Created by Youssef on 2017/1/6.
//  Copyright © 2017年 yunio. All rights reserved.
//

#import <UIKit/UIKit.h>

#define FEEDBACKBUNDLE_PATH   [[NSBundle mainBundle] pathForResource:@"FeedbackBundle" ofType:@"bundle"]
#define FEEDBACKBUNDLE        [NSBundle bundleWithPath: FEEDBACKBUNDLE_PATH]
#define LANGUAGE              @"language"

@interface AppTool : NSObject
+ (UIImage *)circleImage:(UIImage *)image Radius:(CGFloat)radius Size:(CGSize)size;

+ (UIViewController *)getCurrentViewController;

+ (int)getSystemVersion;

+ (BOOL)hasInternet;

+ (NSString *)FBlocalizedString:(NSString *)key AndComment:(NSString *)comment;

+ (UIImage *)getImageWithName:(NSString *)resource;

+ (UIColor *)colorWithKey:(NSString *)key;

+ (void)setSVPWithBlackType;
+ (void)setSVPWithDefaultType;
@end

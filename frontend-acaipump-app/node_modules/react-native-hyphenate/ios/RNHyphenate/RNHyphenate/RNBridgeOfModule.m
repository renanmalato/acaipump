//
//  RNFeedback.m
//  HelloWorld
//
//  Created by Youssef on 2018/3/15.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNBridgeOfModule.h"
#import "AppTool.h"
#import "GetMemoryAndCPU.h"
#import "MyHyphenate.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>
#import "SVProgressHUD.h"
#import "SaveModel.h"
#import "UIColor+Hex.h"

@implementation RNBridgeOfModule
RCT_EXPORT_MODULE(feedbackModule);

RCT_EXPORT_METHOD(setUpFeedback:(NSDictionary *)dict) {
    NSString * appkey = dict[@"appkey"];
    NSString * imUser = dict[@"imUser"];
    NSString * userName = dict[@"userName"];
    NSString * password = dict[@"password"];
    NSString * apnsCertName = dict[@"apnsCertName"];
    NSString * serviceHeadImage = dict[@"headImagePath"];
    NSString * welcomeWords = dict[@"welcomeWords"];
    BOOL automessage = dict[@"auto"];

    dispatch_async(dispatch_get_main_queue(), ^{
        if (!serviceHeadImage || !welcomeWords) {
            [MyHyphenate setupWithAppKey:appkey imUser:imUser userName:userName Password:password ApnsCertName:apnsCertName AutoMessage:automessage];
        } else {
            [MyHyphenate setupWithAppKey:appkey imUser:imUser userName:userName Password:password ApnsCertName:apnsCertName ServiceHeadImagePath:serviceHeadImage andWelcomeWords:welcomeWords AutoMessage:automessage];
        }
    });
}

RCT_EXPORT_METHOD(setStatusBarLight:(BOOL)src) {
    [[SaveModel shared] setStatusBarLight:src];
}

RCT_EXPORT_METHOD(setLangSrc:(NSDictionary *)src) {
    [[SaveModel shared] setLanguageDictionary:src];
}

RCT_EXPORT_METHOD(setCss:(NSDictionary *)src) {
    [[SaveModel shared] setColorDictionary:src];
}

RCT_EXPORT_METHOD(setImageSrc:(NSDictionary *)src) {
    [[SaveModel shared] setImageDictionary:src];
}

RCT_EXPORT_METHOD(presentFeedback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL isHavePresent = [[NSUserDefaults standardUserDefaults] boolForKey:@"have_present"];
        if (!isHavePresent) {
            [MyHyphenate present:[AppTool getCurrentViewController]];
            [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"have_present"];
        }
    });
}

RCT_EXPORT_METHOD(logoutUser) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [MyHyphenate logoutUser];
  });
}

RCT_EXPORT_METHOD(lookCPUAndMemory) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [[GetMemoryAndCPU shared] start];
  });
}

RCT_EXPORT_METHOD(SVProgressHUDMinimumDismissTimeInterval:(float)time) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [SVProgressHUD setMinimumDismissTimeInterval:time];
    });
}

RCT_EXPORT_METHOD(SVProgressShowLoading:(NSString *)str) {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [SVProgressHUD showWithStatus:str];
        [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeBlack];
    });
}

RCT_EXPORT_METHOD(SVProgressDismiss) {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [SVProgressHUD dismiss];
    });
}

RCT_EXPORT_METHOD(SVProgressSuccess:(NSString *)str) {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [SVProgressHUD showSuccessWithStatus:str];
        [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeBlack];
    });
}

RCT_EXPORT_METHOD(SVProgressError:(NSString *)str) {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [SVProgressHUD showErrorWithStatus:str];
        [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeBlack];
    });
}

RCT_EXPORT_METHOD(dismissViewController) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[NSNotificationCenter defaultCenter] postNotificationName:@"dismissViewController" object:nil];
    });
}

RCT_EXPORT_METHOD(hideKeyboard) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[[UIApplication sharedApplication] keyWindow] endEditing:YES];
    });
}

RCT_EXPORT_METHOD(sendText:(NSString *)str) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[SaveModel shared] setTextWord:str];
    });
}

@end

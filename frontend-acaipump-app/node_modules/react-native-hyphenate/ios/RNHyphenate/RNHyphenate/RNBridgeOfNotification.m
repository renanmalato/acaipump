//
//  RNBridgeOfNotification.m
//  HelloWorld
//
//  Created by Youssef on 2018/3/16.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNBridgeOfNotification.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>
#import "MyHyphenate.h"

@implementation RNBridgeOfNotification
RCT_EXPORT_MODULE(feedbackNotificationModule);

- (void)startObserving {
    [NSNotificationCenter.defaultCenter addObserver:self selector:@selector(messagesDidReceive) name:MessagesDidReceive object:nil];
    [NSNotificationCenter.defaultCenter addObserver:self selector:@selector(sendLog) name:SendLog object:nil];
}

- (void)stopObserving {
    [NSNotificationCenter.defaultCenter removeObserver:self name:SendLog object:nil];
    [NSNotificationCenter.defaultCenter removeObserver:self name:MessagesDidReceive object:nil];
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"feedBackMessagesDidReceive", @"feedBackSendLog"];
}

- (void)messagesDidReceive {
    [self sendEventWithName:@"feedBackMessagesDidReceive" body:@{@"count": [NSNumber numberWithInt:[MyHyphenate getUnreadMessageCount]]}];
}

- (void)sendLog {
    [self sendEventWithName:@"feedBackSendLog" body:@{}];
}

@end


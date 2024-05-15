//
//  MyHy.m
//  myPlugin
//
//  Created by Zoey on 2017/12/26.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "MyHyphenate.h"
#import "AppTool.h"
#import "FeedbackViewController.h"
#import "SaveModel.h"

static MyHyphenate * instance = nil;

@implementation MyHyphenate

+ (instancetype)shared {
    static dispatch_once_t once;
    dispatch_once(&once, ^{
        if (instance == nil) {
            instance = [super alloc];
            instance = [instance init];
            [MyHyphenate startDelegate:instance];
            [[NSUserDefaults standardUserDefaults] setBool:NO forKey:@"have_present"];
        }
    });
    return instance;
}

+ (id)allocWithZone:(struct _NSZone *)zone{
    static dispatch_once_t once;
    dispatch_once(&once, ^{
        instance = [super allocWithZone:zone];
    });
    return instance;
}

- (id)copyWithZone:(NSZone *)zone{
    return self;
}

+ (void)startDelegate:(MyHyphenate *)my {
    [[EMClient sharedClient] addDelegate:my delegateQueue:dispatch_get_main_queue()];
    [[[EMClient sharedClient] chatManager] addDelegate:my delegateQueue:dispatch_get_main_queue()];
    [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationDidEnterBackgroundNotification object:nil queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
        [[EMClient sharedClient] applicationDidEnterBackground:[UIApplication sharedApplication]];
    }];
    [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationWillEnterForegroundNotification object:nil queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
        [[EMClient sharedClient] applicationWillEnterForeground:[UIApplication sharedApplication]];
    }];
}

+ (void)setupWithAppKey:(NSString *)appkey imUser:(NSString *)imUser userName:(NSString *)userName Password:(NSString *)password ApnsCertName:(NSString *)certName AutoMessage:(BOOL)autoMessage {
    NSLog(@"SetupWithAppKey (Hyphenate)");

    [[SaveModel shared] saveModelWithImUser:imUser userName:userName Password:password];
    [self setupEMMessageWithAppKey:appkey imUser:imUser userName:userName Password:password ApnsCertName:certName autoMessage:autoMessage];
}

+ (void)setupWithAppKey:(NSString *)appkey imUser:(NSString *)imUser userName:(NSString *)userName Password:(NSString *)password ApnsCertName:(NSString *)certName ServiceHeadImagePath:(NSString *)path andWelcomeWords:(NSString *)words AutoMessage:(BOOL)autoMessage {
    [self setupWithAppKey:appkey imUser:imUser userName:userName Password:password ApnsCertName:certName AutoMessage:autoMessage];
    [[NSUserDefaults standardUserDefaults] setObject:path forKey:HeadImagePath];
    [[NSUserDefaults standardUserDefaults] setObject:words forKey:WelcomeWords];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

+ (void)present:(UIViewController *)vc {
    NSLog(@"FeedbackViewController (Hyphenate) present");
    UINavigationController * nv = [[UINavigationController alloc] initWithRootViewController:[[FeedbackViewController alloc] init]];
    nv.modalPresentationStyle = UIModalPresentationFullScreen;
    [vc presentViewController:nv animated:YES completion:nil];
}

+ (void)setupEMMessageWithAppKey:(NSString *)appkey imUser:(NSString *)imUser userName:(NSString *)userName Password:(NSString *)password ApnsCertName:(NSString *)certName autoMessage:(BOOL)autoMessage {
    EMOptions *options = [EMOptions optionsWithAppkey:appkey];
    options.apnsCertName = certName;
    EMError * error = [[EMClient sharedClient] initializeSDKWithOptions:options];
    if (error) {
        NSLog(@"initializeSDKWithOptions Error  %@, %u", error.errorDescription, error.code);
    }
    [MyHyphenate shared];
    [self registerUser:userName Password:password autoMessage:autoMessage];
}

//环信注册User
+ (void)registerUser:(NSString *)name Password:(NSString *)word autoMessage:(BOOL)autoMessage {
    NSString * userName = name;
    NSString * password = word;
    NSString * nickName = name;
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
        if ([EMClient sharedClient].currentUsername && [[EMClient sharedClient].currentUsername isEqualToString:userName]) {
            NSLog(@"EMMessage CurrentUsername: %@", [EMClient sharedClient].currentUsername);
        }else {
            EMError * error = [[EMClient sharedClient] loginWithUsername:userName password:password];
            if (error) {
                NSLog(@"EMMessage First Login ErrorCode:%u  Description: %@", error.code, error.errorDescription);
                EMError * errors = [[EMClient sharedClient] registerWithUsername:userName password:password];
                if (errors) {
                    NSLog(@"EMMessage Register ErrorCode:%u  Description: %@", errors.code, errors.errorDescription);
                }else {
                    //判断是否需要发送首条消息
                    if (autoMessage) {
                        [[NSUserDefaults standardUserDefaults] setObject:@"新用户创建客服消息" forKey:InitMessage];
                        [[NSUserDefaults standardUserDefaults] synchronize];
                    } else {
                        [[NSUserDefaults standardUserDefaults] removeObjectForKey:InitMessage];
                        [[NSUserDefaults standardUserDefaults] synchronize];
                    }
                    EMError * errorss = [[EMClient sharedClient] loginWithUsername:userName password:password];
                    if (errorss) {
                        NSLog(@"EMMessage Login ErrorCode:%u  Description: %@", errorss.code, errorss.errorDescription);
                    }else {
                        [self loginSuccess];
                        //设置推送的APNS属性，需要在登陆成功之后设置
                        [self setEMPushOptionsWithNickName:nickName];
                    }
                }
            }else {
                [self loginSuccess];
                //设置推送的APNS属性，需要在登陆成功之后设置
                [self setEMPushOptionsWithNickName:nickName];
            }
        }
    });
}

//获取当前会话
+ (EMConversation *)getCurrentConversation:(BOOL)markAllAsRead {
    EMConversation * conversation = [[[EMClient sharedClient] chatManager] getConversation:[[SaveModel shared] getImUser] type:EMConversationTypeChat createIfNotExist:YES];
    if (markAllAsRead) {
        EMError * error = [[EMError alloc] init];
        [conversation markAllMessagesAsRead:&error];
        if (error != nil) {
            NSLog(@"EMMarkAllMessagesAsReadError %u   %@", error.code, error.errorDescription);
        }
    }
    return conversation;
}
//登陆成功后绑定DeviceToken
+ (void)loginSuccess {
    NSLog(@"EMMessage LoginSuccess");
    [[NSUserDefaults standardUserDefaults] setObject:[NSString stringWithFormat:@"%d", [self getCurrentConversation: NO].unreadMessagesCount] forKey:UnreadFeedBackMessageCount];
    [[NSUserDefaults standardUserDefaults] synchronize];
    [[NSNotificationCenter defaultCenter] postNotificationName:@"EMMessageLoginSuccess" object:nil];
    [[SaveModel shared] setEMLoginSuccess];
    [[EMClient sharedClient] options].isAutoLogin = NO;
    NSData * deviceToken = [[NSUserDefaults standardUserDefaults] objectForKey:@"DeviceToken"];
    EMError * error = [[EMClient sharedClient] bindDeviceToken:deviceToken];
    if (error) {
        NSLog(@"EMMessage BindDeviceTokenError: %u %@", error.code, error.errorDescription);
    }else {
        NSLog(@"EMMessage BindDeviceToken Success");
    }
    //如果需要自动发送消息
    NSString * message = [[NSUserDefaults standardUserDefaults] objectForKey:InitMessage];
    if (message) {
        NSString * hsVersion = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
        NSString * osVersion = [UIDevice currentDevice].systemVersion;
        NSMutableDictionary * info = [[NSMutableDictionary alloc] init];
        [info setObject:@"iOS客户端" forKey:@"companyName"];
        [info setObject:[NSString stringWithFormat:@"系统版本:%@ 客户端版本:%@", osVersion, hsVersion] forKey:@"description"];
        NSDictionary * visitor = @{@"visitor":info};
        NSDictionary * weichat = @{@"weichat":visitor};
        
        EMTextMessageBody * body = [[EMTextMessageBody alloc] initWithText:message];
        NSString * from = [EMClient sharedClient].currentUsername;
        EMMessage * message = [[EMMessage alloc] initWithConversationID:[[SaveModel shared] getImUser] from:from to:[[SaveModel shared] getImUser] body:body ext:weichat];
        message.chatType = EMChatTypeChat;
        [[[EMClient sharedClient] chatManager] sendMessage:message progress:^(int progress) {
            
        } completion:^(EMMessage *message, EMError *error) {
            if (error != nil) {
                NSLog(@"EMSendTextMessageError: %u   %@", error.code, error.errorDescription);
            }
            dispatch_async(dispatch_get_main_queue(), ^{
                [[NSUserDefaults standardUserDefaults] removeObjectForKey:InitMessage];
                [[NSUserDefaults standardUserDefaults] synchronize];
                EMConversation * conversation = [MyHyphenate getCurrentConversation: YES];
                EMError * error = [[EMError alloc] init];
                [conversation deleteMessageWithId:message.messageId error:&error];
                if (error != nil) {
                    NSLog(@"EMSDeleteMessageError %u   %@", error.code, error.errorDescription);
                }
            });
        }];
    }
}
//上传推送设置
+ (void)setEMPushOptionsWithNickName:(NSString *)nickName {
    EMPushOptions *options = [[EMClient sharedClient] pushOptions];
    options.noDisturbStatus = EMPushNoDisturbStatusClose;
    options.displayName = nickName;
    options.displayStyle = EMPushDisplayStyleMessageSummary;
    [[EMClient sharedClient] updatePushNotificationOptionsToServerWithCompletion:^(EMError *aError) {
        if (aError) {
            NSLog(@"EMMessage UpdatePushOptionsToServer Error: %u %@", aError.code, aError.errorDescription);
        }else {
            NSLog(@"EMMessage UpdatePushOptionsToServer Success");
        }
    }];
}
//登出环信账号
+ (void)logoutUser {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
        EMError * errors = [[EMClient sharedClient] logout:YES];
        if (errors) {
            NSLog(@"EMMessage Logout ErrorCode:%u  Description: %@", errors.code, errors.errorDescription);
        }else {
            [[SaveModel shared] deleteEMLoginSuccess];
            [[NSUserDefaults standardUserDefaults] setObject:@"0" forKey:UnreadFeedBackMessageCount];
            [[NSUserDefaults standardUserDefaults] synchronize];
            NSLog(@"EMMessage Logout Success");
        }
    });
}
//环信连接服务器的状态变化时会接收到该回调
- (void)connectionStateDidChange:(EMConnectionState)aConnectionState {
    if (aConnectionState == EMConnectionConnected) {
        NSLog(@"EMMessage ConnectionConnected");
    }else {
        NSLog(@"EMMessage ConnectionDisconnected");
    }
}
//环信自动登录完成回调
- (void)autoLoginDidCompleteWithError:(EMError *)aError {
    if (aError == nil) {
        NSLog(@"EMMessage AutoLogin Success");
        [MyHyphenate loginSuccess];
        //设置推送的APNS属性，需要在登陆成功之后设置
        [MyHyphenate setEMPushOptionsWithNickName:[EMClient sharedClient].currentUsername];
    }else {
        NSLog(@"EMMessage AutoLogin Error %@", aError.description);
        [MyHyphenate registerUser:[[SaveModel shared] getUserName] Password:[[SaveModel shared] getPassword] autoMessage:false];
    }
}
//环信账号在其他设备登录
- (void)userAccountDidLoginFromOtherDevice {
    [[SaveModel shared] deleteEMLoginSuccess];
    NSLog(@"EMMessage AccountDidLoginFromOtherDevice");
}
//环信收到新消息时的回调,收到消息后更改未读消息数,并且发送通知
- (void)messagesDidReceive:(NSArray *)aMessages {
    EMConversation * conversation = [MyHyphenate getCurrentConversation: NO];
    [[NSUserDefaults standardUserDefaults] setObject:[NSString stringWithFormat:@"%d", conversation.unreadMessagesCount] forKey:UnreadFeedBackMessageCount];
    [[NSUserDefaults standardUserDefaults] synchronize];
    [self performSelectorOnMainThread:@selector(postNoti) withObject:nil waitUntilDone:YES];
    
    for(EMMessage *message in aMessages){
        if (message.body.type == EMMessageBodyTypeText) {
            if ([self checkoutIsEmpty:((EMTextMessageBody *)message.body).text]) {
                return ;
            }
        }
        BOOL needShowNotification = (message.chatType == EMChatTypeChat) ?  YES: NO;
        if (needShowNotification) {
#if !TARGET_IPHONE_SIMULATOR
            UIApplicationState state = [[UIApplication sharedApplication] applicationState];
            switch (state) {
                case UIApplicationStateActive:
                    [FeedbackViewController playSoundAndVibration];
                    break;
                case UIApplicationStateInactive:
                    [FeedbackViewController playSoundAndVibration];
                    break;
                case UIApplicationStateBackground:
                    [FeedbackViewController showNotificationWithMessage:message];
                    break;
                default:
                    break;
            }
#endif
        }
    }
}

- (BOOL)checkoutIsEmpty:(NSString *)content {
    NSCharacterSet *set = [NSCharacterSet whitespaceAndNewlineCharacterSet];
    NSString *trimedString = [content stringByTrimmingCharactersInSet:set];
    return [trimedString isEqualToString: @""];
}

- (void)postNoti {
    [[NSNotificationCenter defaultCenter] postNotificationName:MessagesDidReceive object:nil];
}

//获取环信未读消息数量
+ (int)getUnreadMessageCount {
    NSString * count = [[NSUserDefaults standardUserDefaults] objectForKey:UnreadFeedBackMessageCount];
    return count.intValue;
}

@end

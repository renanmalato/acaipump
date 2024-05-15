//
//  SaveModel.m
//  HyphenatePluginDemo
//
//  Created by Youssef on 2017/1/9.
//  Copyright © 2017年 yunio. All rights reserved.
//

#import "SaveModel.h"

static SaveModel * instance = nil;

@interface SaveModel ()
@property (nonatomic, copy) NSString * userName;
@property (nonatomic, copy) NSString * password;
@property (nonatomic, copy) NSString * imUser;
@property (nonatomic, copy) NSString * emLoginSuccess;
@property (nonatomic, strong) NSDate * lastPlaySoundDate;
@property (nonatomic, copy) NSString * bundleName;

@property (nonatomic) BOOL statusBarLight;

@property (nonatomic, copy) NSDictionary * langDic;
@property (nonatomic, copy) NSDictionary * imgDic;
@property (nonatomic, copy) NSDictionary * colorDic;

@property (nonatomic, copy) NSString * word;
@end

@implementation SaveModel

+ (instancetype)shared {
    static dispatch_once_t once;
    dispatch_once(&once, ^{
        if (instance == nil) {
            instance = [super alloc];
            instance = [instance init];
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

- (void)saveModelWithImUser:(NSString *)imUser userName:(NSString *)userName Password:(NSString *)password {
    _userName = userName;
    _imUser = imUser;
    _password = password;
}

- (NSString *)getPassword {
    return _password;
}

- (NSString *)getImUser {
    return _imUser;
}

- (NSString *)getUserName {
    return _userName;
}

- (NSString *)getEMLoginSuccess {
    return _emLoginSuccess;
}

- (void)setEMLoginSuccess {
    _emLoginSuccess = @"EMLoginSuccess";
}

- (void)deleteEMLoginSuccess {
    _emLoginSuccess = nil;
}

- (void)setLastPlaySoundDate:(NSDate *)date {
    _lastPlaySoundDate = date;
}

- (NSDate *)getLastPlaySoundDate {
    if (_lastPlaySoundDate) {
        return _lastPlaySoundDate;
    }else {
        _lastPlaySoundDate = [NSDate dateWithTimeIntervalSinceNow:0];
        return [NSDate dateWithTimeIntervalSinceNow:0];
    }
}

- (void)setBundleName:(NSString *)name {
    _bundleName = name;
}

- (NSBundle *)getBundle {
    NSString * path = [[NSBundle mainBundle] pathForResource:@"FeedbackBundle" ofType:@"bundle"];
    if (_bundleName.length > 0) {
        path = [[NSBundle mainBundle] pathForResource:_bundleName ofType:@"bundle"];
        NSBundle * bundle = [NSBundle bundleWithPath:path];
        return bundle;
    }
    NSBundle * bundle = [NSBundle bundleWithPath:path];
    return bundle;
}

- (void)setColorDictionary:(NSDictionary *)dic {
    _colorDic = [NSDictionary dictionaryWithDictionary:dic];
}

- (NSDictionary *)getColorDictionary {
    return _colorDic;
}

- (void)setImageDictionary:(NSDictionary *)dic {
    _imgDic = [NSDictionary dictionaryWithDictionary:dic];
}

- (NSDictionary *)getImageDictionary {
    return _imgDic;
}

- (void)setLanguageDictionary:(NSDictionary *)dic {
    _langDic = [NSDictionary dictionaryWithDictionary:dic];
}

- (NSDictionary *)getLanguageDictionary {
    return _langDic;
}

- (void)setStatusBarLight:(BOOL)src {
    _statusBarLight = src;
}

- (BOOL)getStatusBarLight {
    return _statusBarLight;
}

- (void)setTextWord:(NSString *)str {
    _word = str;
}

- (NSString *)getTextWord {
    if (_word) {
        return _word;
    }
    return @"";
}

@end

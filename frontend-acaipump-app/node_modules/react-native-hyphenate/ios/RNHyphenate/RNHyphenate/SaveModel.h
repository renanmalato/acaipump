//
//  SaveModel.h
//  HyphenatePluginDemo
//
//  Created by Youssef on 2017/1/9.
//  Copyright © 2017年 yunio. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface SaveModel : NSObject
+ (instancetype)shared;

- (void)saveModelWithImUser:(NSString *)imUser userName:(NSString *)userName Password:(NSString *)password;

- (NSString *)getImUser;
- (NSString *)getUserName;
- (NSString *)getPassword;
- (NSDate *)getLastPlaySoundDate;
- (void)setLastPlaySoundDate:(NSDate *)date;

- (void)setColorDictionary:(NSDictionary *)dic;
- (NSDictionary *)getColorDictionary;

- (void)setImageDictionary:(NSDictionary *)dic;
- (NSDictionary *)getImageDictionary;

- (void)setLanguageDictionary:(NSDictionary *)dic;
- (NSDictionary *)getLanguageDictionary;

- (void)setStatusBarLight:(BOOL)src;
- (BOOL)getStatusBarLight;

- (NSString *)getEMLoginSuccess;
- (void)setEMLoginSuccess;
- (void)deleteEMLoginSuccess;

- (void)setTextWord:(NSString *)str;
- (NSString *)getTextWord;
@end

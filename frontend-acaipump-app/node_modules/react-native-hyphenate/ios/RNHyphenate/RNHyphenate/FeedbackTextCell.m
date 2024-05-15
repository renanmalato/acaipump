//
//  FeedbackTextCell.m
//  heartsquareapp
//
//  Created by Youssef on 2017/1/5.
//  Copyright © 2017年 HeartSquare. All rights reserved.
//

#import "FeedbackTextCell.h"

@interface FeedbackTextCell ()
@property(nonatomic, strong) UIButton * urlButton;
@property(nonatomic, copy) NSURL * url;
@end

@implementation FeedbackTextCell

- (void)adjustHeightWithMessage:(EMMessage *)message {
    EMTextMessageBody * body = (EMTextMessageBody *)message.body;
    if (body.text.length > 0 || [body.text isEqual:@" "]) {
        [self fecthRectWithText:body.text andMessage:message];
        [self judgeURLInText:body.text];
    }
}

- (void)judgeURLInText:(NSString *)text {
    NSError * error = nil;
    NSDataDetector * detector = [NSDataDetector dataDetectorWithTypes:NSTextCheckingTypeLink error:&error];
    if (error) {
        NSLog(@"JudgeURLInText Error %@", error);
        [self cleanup];
    }else {
        [detector enumerateMatchesInString:text options:kNilOptions range:NSMakeRange(0, text.length) usingBlock:^(NSTextCheckingResult * _Nullable result, NSMatchingFlags flags, BOOL * _Nonnull stop) {
            if (result.URL) {
                NSLog(@"%@", result.URL);
                NSMutableAttributedString * str = nil;
                if (self.contentLabel.attributedText) {
                    str = [[NSMutableAttributedString alloc] initWithAttributedString:self.contentLabel.attributedText];
                }else {
                    str = [[NSMutableAttributedString alloc] initWithString:text];
                }
                
                [str addAttribute:NSForegroundColorAttributeName value:[UIColor colorWithRed:12.0/255.0 green:150.0/255.0 blue:244.0/255.0 alpha:1] range:result.range];
                [str addAttribute:NSUnderlineStyleAttributeName value:@1 range:result.range];
                self.contentLabel.attributedText = str;
                _url = result.URL;
                _urlButton = [UIButton buttonWithType:UIButtonTypeCustom];
                _urlButton.frame = self.contentLabel.frame;
                [_urlButton addTarget:self action:@selector(onURLTap:) forControlEvents:UIControlEventTouchUpInside];
                [self.cellBackImage addSubview:_urlButton];
            } else {
                [self cleanup];
            }
        }];
    }
}

- (void)cleanup {
    if (_urlButton) {
        [_urlButton removeFromSuperview];
        _urlButton = nil;
    }
    _url = nil;
}

- (void)onURLTap:(UIButton *)button {
    if (self.textCellDelegate && _url) {
        [self.textCellDelegate openURL:self url:_url];
    }
}

@end

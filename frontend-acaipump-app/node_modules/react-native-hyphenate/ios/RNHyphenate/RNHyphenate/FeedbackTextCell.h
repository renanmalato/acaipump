//
//  FeedbackTextCell.h
//  heartsquareapp
//
//  Created by Youssef on 2017/1/5.
//  Copyright © 2017年 HeartSquare. All rights reserved.
//

#import "FeedbackCell.h"

@protocol FeedbackTextCellDelegate <NSObject>
- (void)openURL:(FeedbackCell *)cell url:(NSURL *)url;
@end

@interface FeedbackTextCell : FeedbackCell
@property (nonatomic, weak) id<FeedbackTextCellDelegate> textCellDelegate;
@end

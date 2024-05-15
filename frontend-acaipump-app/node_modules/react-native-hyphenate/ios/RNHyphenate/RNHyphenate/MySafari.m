//
//  MySafari.m
//  RNHyphenate
//
//  Created by Youssef on 2019/3/25.
//  Copyright © 2019 Web. All rights reserved.
//

#import "MySafari.h"

@implementation MySafari
- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault animated:YES];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent animated:YES];
}
@end

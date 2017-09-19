import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { RichSwipeComponent } from './rich-swipe.component'
import { SwipeSlideComponent } from './swipe-slide.component'
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'vertical',
    slidesPerView: 'auto',
    speed: 800,
    // effect: 'cube',
    // effect: 'fade',
    effect: 'flip',
    keyboardControl: true,
    nextButton: '.swiper-button-next',
};

@NgModule({
    imports: [
        CommonModule,
        SwiperModule.forChild()
    ],
    exports: [
        RichSwipeComponent,
        SwipeSlideComponent,        
    ],
    declarations: [
        RichSwipeComponent,
        SwipeSlideComponent,
    ],
    providers: [
    ],
    entryComponents: [
    ]
})
export class EasyUIRichSwipeModule { }

export { RichSwipeComponent } from './rich-swipe.component'
export { SwipeSlideComponent } from './swipe-slide.component'
export { SwiperConfigInterface } from 'ngx-swiper-wrapper';
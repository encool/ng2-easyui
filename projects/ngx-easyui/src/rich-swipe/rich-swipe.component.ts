import { Component, OnInit, QueryList, AfterViewInit, ViewChildren, ContentChildren, Output, EventEmitter } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { SwipeSlideComponent } from './swipe-slide.component'
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'vertical',
    slidesPerView: 'auto',
    speed: 800,
    // effect: 'cube',
    // effect: 'fade',
    effect: 'flip',
    // keyboardControl: true,
    // nextButton: '.swiper-button-next',
    // onSlideChangeStart: (value) => {
    //     debugger
    // }
};

@Component({
    selector: 'rich-swipe',
    template: `
  <swiper [(index)]="index" (indexChange)="onIndexChange($event)" 
    (init)="onSwipeInit($event)"
    (swiperTransitionEnd)="swiperTransitionEnd($event)"
    (swiperTransitionStart)="swiperTransitionStart($event)"
    (slideChangeStart)="slideChangeStart($event)"
    (slideChangeEnd)="slideChangeEnd($event)">
        <ng-content></ng-content>    
  </swiper>
  `,
    //   <div class="swiper-button-next"></div>
    animations: [
        trigger('flyLeftIn', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)' }),
                animate(800)
            ])
        ]),
        trigger('flyUpIn', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(100%)' }),
                animate(800)
            ])
        ])
    ]
})
export class RichSwipeComponent implements OnInit, AfterViewInit {
    index: number
    inOutStatus: string
    show: boolean
    constructor() {
        this.inOutStatus = "-1"
        this.show = false
    }

    @ContentChildren(SwipeSlideComponent) slides: QueryList<SwipeSlideComponent>;

    ngOnInit() {

    }

    ngAfterViewInit() {
        // debugger
    }

    @Output() indexChange = new EventEmitter<number>();
    onIndexChange($event) {
        let index = $event
        // let SwipeSlideComponent = this.getSlideByIndex(index)
        this.indexChange.emit(index)
    }

    onSwipeInit($event) {
        // debugger
        let onActiveSlide: SwipeSlideComponent = this.getSlideByIndex(0)
        if (onActiveSlide) {
            setTimeout(() => {
                onActiveSlide.isShow = true
                this.show = true
                this.inOutStatus = 'in'
                this.log("onSwipeInit---end")
            })
        }

    }

    slideChangeStart($event) {
        // debugger
        let realIndex = $event[0].realIndex
        let swipeDirection = $event[0].swipeDirection
        // let preIndex = $event[0].previousIndex
        let preIndex
        if (swipeDirection == 'next') {
            preIndex = realIndex - 1
        } else {
            preIndex = realIndex + 1
        }
        let onActiveSlide: SwipeSlideComponent = this.getSlideByIndex(realIndex)
        let preActiveSlide: SwipeSlideComponent = this.getSlideByIndex(preIndex)

        setTimeout(() => {
            preActiveSlide.isShow = false
            preActiveSlide.animationStart = false
            preActiveSlide.animationEnt = true

            onActiveSlide.isShow = true
            onActiveSlide.animationStart = true
            onActiveSlide.animationEnt = false

            this.show = true
            this.inOutStatus = 'in'
            this.log("swiperTransitionEnd---end")
        }, 800);
    }
    slideChangeEnd($event){
        // debugger
    }
    //动画开始
    swiperTransitionStart($event) {
        // debugger
        // setTimeout(() => {
        // this.show = false
        // this.inOutStatus = 'out'
        // this.log("swiperTransitionStart---end")
        // });
    }

    //动画结束
    swiperTransitionEnd($event) {
        // debugger
        let realIndex = $event[0].realIndex
        let preIndex = $event[0].previousIndex
        let onActiveSlide: SwipeSlideComponent = this.getSlideByIndex(realIndex)
        let preActiveSlide: SwipeSlideComponent = this.getSlideByIndex(preIndex)

        setTimeout(() => {
            preActiveSlide.isShow = false
            preActiveSlide.animationStart = false
            preActiveSlide.animationEnt = true

            onActiveSlide.isShow = true
            onActiveSlide.animationStart = true
            onActiveSlide.animationEnt = false

            this.show = true
            this.inOutStatus = 'in'
            this.log("swiperTransitionEnd---end")
        });
    }

    getSlideByIndex(targetIndex): SwipeSlideComponent {
        return this.slides.find((item: SwipeSlideComponent, index: number, array: SwipeSlideComponent[]) => {
            return targetIndex == index
        })
    }

    log(tag) {
        console.log(tag)
        console.log("inOutStatus", this.inOutStatus)
        console.log("show", this.show)
    }
}
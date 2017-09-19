import { Component, Input } from '@angular/core';

@Component({
    selector: 'swiper-slide',
    template: `
    <div class="swiper-slide">
        <ng-content></ng-content>
    </div>
    `,
})
export class SwipeSlideComponent {

    @Input() index: number
    id: string
    isShow: boolean = false
    animationStart: boolean = false
    animationEnt: boolean = true
}

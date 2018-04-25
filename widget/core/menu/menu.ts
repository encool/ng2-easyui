export class Menu {

    constructor(public id: string, public i: string,
        public t: string, public l: string, public isSelected?: boolean, public c?: Array<Menu>,
        public o?: string, public e?: string, ) {

    }
}
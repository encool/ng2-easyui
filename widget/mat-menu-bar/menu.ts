export interface Menu {
    id: string
    /**
     * icon
     */
    i: string
    /**
     * title
     */
    t: string
    /**
     * link
     */
    l: string
    isSelected?: boolean
    /**
     * children
     */
    c?: Array<Menu>,
    o?: string
    e?: string
}
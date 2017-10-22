export interface Menu {
    id: string
    /**
     * icon
     */
    icon: string
    /**
     * title
     */
    title: string
    /**
     * link
     */
    link: string
    active?: boolean
    /**
     * children
     */
    children?: Array<Menu>,

    parent?: string
}
export class QueryOperate {
    advanced: boolean = false
    name: string
    operate: string
    private constructor(name: string, operate: string, advanced: boolean) {
        this.name = name
        this.advanced = advanced
        this.operate = operate
    }

    static nomal: QueryOperate = new QueryOperate("nomal", "nomal", false)	//非高级查询
    static eq: QueryOperate = new QueryOperate("eq", "=", true)	//=	equal
    static cn: QueryOperate = new QueryOperate("cn", "LIKE", true)	//LIKE '%data%'	

    // ne	!=	not equal
    // lt	<	less than
    // le	<=	less equal
    // gt	>	greater than
    // ge	>=	greater equal
    // nu	IS NULL	null
    // nn	IS NOT NULL	not null
    // bw	LIKE 'data%'	
    // bn	NOT LIKE 'data%'	
    // ew	LIKE '%data'	
    // en	NOT LIKE '%data'	
    // nc	NOT LIKE '%data%'	
    // in	IN (data)	data可为对象、数组、List集合
    // ni	NOT IN (data)	data可为对象、数组、List集合   
}

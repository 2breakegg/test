
class EventFunctions{
    // public functions:Function[];
    public functions:{[key:string]:Function};
    public counter:number;
    constructor(){
        this.counter=0;
        this.functions={};
    };
    add(fun:Function):string{ // 添加需要执行的函数
        let key:string = fun.name+this.counter;
        this.functions[key]=fun;
        return key;
    };

    del(key:string):boolean{ // 通过键名,删除已添加的函数, 删除成功返回ture,失败false
        if(this.functions[key] === undefined)
            return false;
        return delete this.functions[key];
    };

    runAll(){
        let keys:string[] = Object.keys(this.functions);
        keys.map((key)=>{this.run(key)});
    };
    run(key:string){
        this.functions[key]();
    };
}

export default EventFunctions;
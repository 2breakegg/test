let a=[11,22,33,44,55];

a.map((val,key)=>{
    a.splice(key,1);
    console.log(key,val);

    // if(val%2){
    //     a.push(key);
    // }
    // a.splice(key,1);
})

console.log(a);
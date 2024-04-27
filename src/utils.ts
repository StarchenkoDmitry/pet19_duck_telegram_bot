async function delay(msTime:number = 1000): Promise<void> {
    return new Promise((res,_)=>{
        setTimeout(()=>{
            res();
        },msTime);
    });
}

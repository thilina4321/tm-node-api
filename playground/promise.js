const doWorkPromise = new Promise((res,rej)=>{
    setTimeout(()=>{
        res('Do it succesfully')
    }, 200)
})

doWorkPromise.then((result)=>{
    console.log('success' +result);
}).catch((error)=>{
    console.log('error '+error);
})
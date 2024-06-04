const transferRules:{[key:string]:string[]} = {
    TODO:['INPROGRESS','TESTING'],
    INPROGRESS:['TODO','TESTING'],
    TESTING:['TODO','INPROGRESS','COMPLETED'],
    COMPLETED:['TODO','INPROGRESS','TESTING','COMPLETED'],
}

export const checkValidity = (source:string,target:string) =>{
    if(source in transferRules){
        const res = transferRules[source].includes(target);
        console.log("My validity res",source,target,res); 
        return res;
    }else{
        console.log('Invalid source data');
        return false;
    }
}
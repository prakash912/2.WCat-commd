#!/usr/bin/env node
let fs=require("fs");

//input 
let inputArr=process.argv.slice(2);
//make option= (-s,-b,-n) and file array
let optionArr=[];
let fileArr=[];
// for identifing options
for(let i=0;i<inputArr.length;i++){
    let firstChar=inputArr[i].charAt(0);
    if(firstChar=="-"){
        optionArr.push(inputArr[i]);
    }else{
        fileArr.push(inputArr[i]);
    }
}

//edge case-1.-n & -b both present 

let bothPresent=optionArr.includes("-n") && optionArr.includes("-b");
if(bothPresent==true){
    console.log("enter either -n or -b");
    return ;
}

//edge case-2. check file exist or not 
for(let i=0; i<fileArr.length;i++){
    let isPresent=fs.existsSync(fileArr[i]);
    if(isPresent==false){
        console.log(`file ${fileArr[i]} is not present`);
        return ;
    }
}

//read
let content="";
for(let i=0;i<fileArr.length;i++){
    let bufferContent =fs.readFileSync(fileArr[i]);
    content += bufferContent+"\r\n";
}

let contentArr=content.split("\r\n");

// -s
let isSPresent=optionArr.includes("-s");
if(isSPresent==true)
{
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    let tempArr=[];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i] !=null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr=tempArr;
}
console.log("''''''''''''''''''''''''''''");

//if -n

let isNPresent=optionArr.includes("-n");
if(isNPresent==true){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=`${i+1} ${contentArr[i]}`;
    }
}


// if -b

let counter=1;
let isBPresent=optionArr.includes("-b");
if(isBPresent==true){
    for(let i=0;i<contentArr.length;i++){
       if(contentArr[i] !=""){
           contentArr[i]=`${counter} ${contentArr[i]}`;
           counter++;
       }
    }
}
console.log(contentArr.join("\n"));

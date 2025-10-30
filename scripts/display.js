let path=(new URLSearchParams(window.location.search)).get("path");
if(path==null)path=[""];
else{
    path=path.split('/');
}
console.log(path);
console.log("lan2:")
console.log(GithubDrive);
let dir=GithubDrive.content;
if(path[0]!="")
for(let i=0;i<path.length;i++){
    dir=dir[path[i]];
}
let files=Object.keys(dir);
console.log("content of dir:")
console.log(files);

for(let i=0;i<files.length;i++){
    let temp=dir[files[i]];
    console.log(`file:${i}`);
    let bt=document.createElement("button");
    let a=document.createElement("a");
    if(temp.type=="blob"){
        fetch(GithubDrive.download_url(temp.path))
            .then(b=>b.blob())
            .then(b=>{
                a.href=URL.createObjectURL(b);
            })
        a.download=files[i];
    }
    else{
        // console.log("url");
        a.href=(window.location.href.split('?')[0])+`?path=${temp.path}`;
    }
    a.textContent=files[i];
    a.className="file";
    Container.appendChild(a);
}
document.body.appendChild(Container);
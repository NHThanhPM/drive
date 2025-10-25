let url;
const domain="http://127.0.0.1:5500/index.html";
let owner;
let repo;
const fdiv=document.createElement("div");
function download(url,name){
    fetch(url)
    .then(r => r.blob())
    .then(f =>{
        const a=document.createElement("a");
        a.href=URL.createObjectURL(f);
        a.download=name;
        a.click();
    })
}
var dir=Array();
function add(File){
    // console.log(File);
    const bt=document.createElement("button");
    bt.className="file";
    if(File.type=="file"){
        bt.onclick=()=>download(File.download_url,File.name);
    }
    else{
        bt.onclick=()=>window.location.href=domain+"?path="+File.path+"&owner="+owner+"&repo="+repo;
    }
    bt.type="button";
    const tmp=document.createElement("img");
    tmp.src="image/icon/folder.svg";
    // bt.appendChild(tmp);
    // console.log(bt.innerText);
    // console.log(tmp.textContent());
    bt.appendChild(tmp);
    bt.innerHTML+=File.name;
    // const tmp=document.createElement("div");
    // tmp.appendChild(bt);
    fdiv.appendChild(document.createElement("br"));
    fdiv.appendChild(bt);
}
function main(){
    document.body.append(fdiv);
    // fdiv.style.width="100%";
    // fdiv.style.height="100%";
    const params=new URLSearchParams(window.location.search);
    owner=params.get("owner");
    repo=params.get("repo");
    url="https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+params.get("path");
    console.log(url);
    fetch(url)
        .then(r=>r.json())
        .then(j=>{
            if(Array.isArray(j)){
                for(i=0;i<j.length;i++){
                    add(j[i]);
                }
            }
            else if(j.type=="file"){
                add(j);
            }
        })
}
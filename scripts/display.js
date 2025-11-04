//display repository infomation
/** global shareValue */
console.log("final content:");
console.log(GithubDrive.content);
let GhDr=GithubDrive;
//display owner
{
    let tmp=document.getElementById("owner-if");
    tmp.innerText=GhDr.RepoInfo.owner+":";
    tmp.href=`https://github.com/${GhDr.RepoInfo.owner}`;
}
//display repo
{
    let tmp=document.getElementById("repo-if");
    tmp.innerText=GhDr.RepoInfo.repo;
    tmp.href=`https://github.com/${GhDr.RepoInfo.owner}/${GhDr.RepoInfo.repo}`;
}
//display branch
{
    let tmp=document.getElementById("branch-if");
    tmp.innerText=`(${GhDr.RepoInfo.branch})`;
    tmp.href=`https://github.com/${GhDr.RepoInfo.owner}/${GhDr.RepoInfo.repo}/tree/${GhDr.RepoInfo.branch}`;
}
let Container=document.getElementById("Files");
//wait for content loaded
while(!ContentLoaded);
console.log("final content:");
console.log(GithubDrive.content);
function IconFile(File_name,type){
    console.log(`${File_name},${type}`);
    const icon=document.createElement("img");
    if(type=="tree"){
        icon.src="image/icon/folder.svg";
    }
    else{
        switch (File_name.split('.').at(-1)) {
            case "cpp":
            case "CPP":
                icon.src="image/icon/cpp.svg";
                break
        
            default:
                icon.src="image/icon/file.svg";
                break;
        }
    }
    icon.className="icon";
    // icon.height="100%";
    // icon.width="100%";
    return icon;
}
let dir=GhDr.contentl;
let files=Object.keys(dir);
Container.appendChild(document.createElement("hr"));
for(let i=0;i<files.length;i++){
    let temp=dir[files[i]];
    console.log(`file:${i}`);
    console.warn("file:");
    console.warn(temp);
    let bt=document.createElement("button");
    let a=document.createElement("a");
    if(temp.type=="tree"){
        a.href=(window.location.href.split('?')[0]);
        a.href+=`?path=${temp.path}&owner=${GithubDrive.owner}&repo=${GithubDrive.repo}&branch=${GithubDrive.branch}`;
    }
    else{
        // console.info(temp);
        fetch(GithubDrive.download_url(temp["path"]))
            .then(b=>b.blob())
            .then(b=>{
                a.href=URL.createObjectURL(b);
            })
        a.download=files[i];
        // console.log("url");
    }
    a.appendChild(IconFile(files[i],dir[files[i]].type));
    a.innerHTML+=files[i];
    a.className="file";
    Container.appendChild(a);
    Container.appendChild(document.createElement("hr"));
}
document.body.appendChild(Container);

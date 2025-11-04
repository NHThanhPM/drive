//. GET https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1
let parameters=new URLSearchParams(window.location.search);
let pif=parameters.get("path");
let path=pif.split('/');;
class drive {
    RepoInfo={
        owner: "",
        repo:"",
        branch:"",
    };
    content={};
    lenght;
    constructor(params) {
        // path= params.get("path").split('/');
        if(path.length<3)return;
        this.RepoInfo.owner = path[0];
        this.RepoInfo.repo = path[1];
        this.RepoInfo.branch = path[2];
        if(this.RepoInfo.branch in ["",null,undefined]){
            console.debug("set default branch");
            this.RepoInfo.branch="main";
        }
        this.lenght=this.RepoInfo.owner.length+this.RepoInfo.repo.length+this.RepoInfo.branch.length+3;
        console.log(`Drive info:${this.RepoInfo.owner},${this.RepoInfo.repo},${this.RepoInfo.branch}`);
    }
    GetTree() {
        return fetch(`https://api.github.com/repos/${this.RepoInfo.owner}/${this.RepoInfo.repo}/git/trees/${this.RepoInfo.branch}?recursive=1`);
    }
    download_url= path=>{
        return `https://raw.githubusercontent.com/${this.RepoInfo.owner}/${this.RepoInfo.repo}/${this.RepoInfo.branch}/${pif.substring(this.lenght)}`;
    };
}
function GetInfoFromSession(){
    let tmp=sessionStorage.getItem("drive_info");
    if(tmp==null || tmp==undefined)return null;
    return JSON.parse(tmp);
}
function ConvertListToTree(list){
    let tree={};
    for(let i=0;i<list.length;i++){
        let item=list[i];
        let parts=item.path.split('/');
        let current=tree;
        for(let j=0;j<parts.length-1;j++){
            if(current[parts[j]]==undefined){
                current[parts[j]]={};
            }
            current=current[parts[j]];
        }
        current[parts[parts.length-1]]=item;
    }
    return tree;
}
let GithubDrive=new drive(parameters);
if(GithubDrive.RepoInfo==GetInfoFromSession()){
    console.log("Load drive info from session storage");
    GithubDrive.content=JSON.parse(sessionStorage.getItem("drive_content"));
}
else{
    sessionStorage.setItem("drive_info",JSON.stringify(GithubDrive.RepoInfo));
    console.log("Fetch drive info from github api");
    GithubDrive.GetTree()
    .then(response=>response.json())
    .then(data=>{
        console.log("Fetched data:");
        console.log("convert list to tree");
        GithubDrive.content=ConvertListToTree(data.tree);
        console.log(GithubDrive.content);
        sessionStorage.setItem("drive_content",JSON.stringify(GithubDrive.content));
        // window.location.reload();
    })
}
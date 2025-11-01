//GET https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1
class drive {
    owner;
    repo;
    branch;
    content={};
    constructor(params) {
        this.owner = params.get("owner");
        this.repo = params.get("repo");
        this.branch = params.get("branch");
        if(this.branch==null){
            console.debug("set default branch");
            this.branch="main";
        }
        console.log(`dir: ${this.owner}>${this.repo}>${this.branch}`)
    }
    GetTree() {
        return fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/trees/${this.branch}?recursive=1`);
    }
    download_url= path=>{
        return `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/${path}`;
    };
}
var GithubDrive=sessionStorage.getItem("drive");
if(GithubDrive!=undefined){
    GithubDrive=JSON.parse(GithubDrive);
}
console.log("kgkkhjk:")
console.log(GithubDrive);
// function debug(){
//     const temp=new drive(new URLSearchParams(window.location.search));
//     temp.GetTree()
//         .then(j => j.json())
//         .then(r=>console.log(r))
// }
// debug()
let Container=document.getElementById("Files");
// Container.id="Files";
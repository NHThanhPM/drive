function load(){
    // GithubDrive=new drive(GithubDrive);
    console.log("loaded from session");
    GithubDrive.download_url= path=>{
        return `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/${path}`;
    };
    console.log(GithubDrive.content);
};
function add(){
    const ds=document.createElement("script");
    ds.src="scripts/display.js";
    document.body.appendChild(ds);
}
if(GithubDrive==null){
console.log("convert to dir")
//get info from url
GithubDrive=new drive(new URLSearchParams(window.location.search));
//
/** global shareValue */
GithubDrive.GetTree()
    .then(j=>j.json())
    .then(j=>{
        console.log("rs:")
        console.log(j);
        return j.tree;
    })
    .then(tree=>{
        console.log("tree");
        console.log(tree);
        console.log(tree.length);
        // GithubDrive.content={};
        console.log("running");
        for(let i=0;i<tree.length;i++){
            let tmp=GithubDrive.content;
            let path=tree[i].path.split('/');
            // console.log(path);
            let j=0;
            for(j=0;j<path.length-1;j++){
                if(tmp[path[j]]==undefined){
                    tmp[path[j]]={};
                }
                tmp=tmp[path[j]];
                // console.log(j);
            }
            // console.log(`${j},${i}`);
            // console.log(tree[i]);
            tmp[path[j]]=tree[i];
        }
        console.log("running");
        sessionStorage.setItem("drive",JSON.stringify(GithubDrive));
        // console.log(sessionStorage.getItem("drive"));
        // console.log(GithubDrive.content);
        // GithubDrive=JSON.parse(sessionStorage.getItem("drive"));
        // load();
        // console.log("running");
        add();
    })
    // console.log("running");
}
else
{
    load();
    add();
}
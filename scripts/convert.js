if(GithubDrive==null){
console.log("convert to dir")
GithubDrive =new drive(new URLSearchParams(window.location.search));
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
        GithubDrive.content={};
        for(let i=0;i<tree.length;i++){
            let tmp=GithubDrive.content;
            let path=tree[i].path.split('/');
            console.log(path);
            let j=0;
            for(j=0;j<path.length-1;j++){
                if(tmp[path[j]]==undefined){
                    tmp[path[j]]={};
                }
                tmp=tmp[path[j]];
                // console.log(j);
            }
            console.log(`${j},${i}`);
            console.log(tree[i]);
            tmp[path[j]]=new Object(tree[i]);
        }
        sessionStorage.setItem("drive",JSON.stringify(GithubDrive));
        // console.log(sessionStorage.getItem("drive"));
    })
}
console.log("loaded from session");
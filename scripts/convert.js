if(GithubDrive!=null)exit(0);
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
        console.log(tree);
        for(let i=0;i<t.lenght;t++){
            let tmp=GithubDrive.content;
            let path=tree[i].path.split('/');
        }
    })
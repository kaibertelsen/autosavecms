
async function callapi(collectionId,itemId,bodystring,type,db,fid){

// fra memberstack
let token = MemberStack.getToken();

//PATCH
if(type == "PATCH"){
    if(db=="webflow"){
    //webflow
    let response2 = await fetch(`https://webflow-woad.vercel.app/api/item?collectionId=${collectionId}&itemId=${itemId}&token=${token}`, {
     method: "PATCH",
     body: bodystring,
     headers: {
    'Content-Type': 'application/json'
    }
    });
    let data2 = await response2.json();
    apireturn (data2,fid);
    }else if(db=="airtable"){
    //airtable


   }
//POST
}else if (type=="POST"){





   }

}
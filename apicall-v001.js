
async function callapi(collectionId,itemId,fieldnames,fieldvalues,type,db,fid){
    let token = MemberStack.getToken();
       let bodystring="{";
       for (let i = 0; i < fieldnames.length; i++) {
   if(Array.isArray(fieldvalues[i])){
     //om det er et arrayfelt
     let subitem = "";
     var subitemarray = fieldvalues[i];
     for (let i = 0; i < subitemarray.length; i++) {
         //loope gjennom alle subitem
         subitem = subitem+'"'+subitemarray[i]+'"'+',';
     }
     subitem = subitem.slice(0, -1)

   bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+"["+subitem+"]"+",";
   }else{
  //om det er et vanlig felt
        bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+'"'+fieldvalues[i]+'"'+",";
   }
       }
       bodystring = bodystring.slice(0, -1)
       bodystring = bodystring+"}";
       console.log(bodystring);

//PATCH
if(type == "PATCH"){
let response2 = await fetch(`https://webflow-woad.vercel.app/api/item?collectionId=${collectionId}&itemId=${itemId}&token=${token}`, {
   method: "PATCH",
   body: bodystring,
   headers: {
       'Content-Type': 'application/json'
   }
 });

 let data2 = await response2.json();
 apireturn (data2,fid);
   }else if (type=="POST"){

   }

}
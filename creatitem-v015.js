function creatItem (classname){
// finne alle elementer med create class
var fieldnamesarray = [];
var fieldvaluearray = [];

var els = document.getElementsByClassName(classname);
for(var i = 0; i < els.length; i++)
{
  const element = els[i];
  if (element.tagName.toLowerCase() === 'input') {
    //input field 

    if (!element.value==""){
    //om feltene ikke er tomme
    fieldnamesarray.push(element.name);
    fieldvaluearray.push(element.value);
  }

  }else if (element.tagName.toLowerCase() === 'select'){
    var array = element.value.split(",");
    //sjekke om det er en array
    if(array.length >1){
      // er mer en et element
    fieldnamesarray.push(element.name);
    fieldvaluearray.push(array);
    }else{
      // er ikke array
      fieldnamesarray.push(element.name);
      fieldvaluearray.push(element.value);
    }


  }


}

//send array til body
let bodystring = makecreatebodystring(fieldnamesarray,fieldvaluearray);
// kalle på api
//kallet på api webflow funksjonen 
callapi(baseId,collectionId,"",bodystring,"POST","webflow","201");
}

function apireturnnew (data,fid){
  let bodystring = makeupdatebodystring(data);
  callapi(baseId,collectionId,data._id,bodystring,"PATCH","webflow",fid);
}

function makeupdatebodystring(data){
  // lag bodystrin for å oppdatere webflowid
  let bodystring="{"+'"name"'+":"+'"'+data.name+'"'+","+'"webflowid:"'+'"'+data._id+'"'+"}";
  return (bodystring);
  }

function makecreatebodystring(fieldnames,fieldvalues){
  // lag bodystrin for apicall
  let bodystring="{";
  for (let i = 0; i < fieldnames.length; i++) {
    //for hver enhet i fieldnames
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
     }else if(fieldvalues[i]=="true"){
    //om det er et booleanfelt
          bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+true+",";
     }else if (fieldvalues[i]=="false"){
    //om det er et booleanfelt
    bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+false+",";
     }else{
     // vanlig tekstfelt
    bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+'"'+fieldvalues[i]+'"'+",";
     }
         }
    //fjerner siste ","	   
  bodystring = bodystring.slice(0, -1)
  bodystring = bodystring+"}";
  console.log(bodystring);
  return (bodystring);
  }
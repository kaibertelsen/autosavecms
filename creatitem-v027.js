function creatItem (db,classname,rdata){
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
      // er mer en et element er det webflowid og aitrableid
      const element = els[i];
      if(singelselectwebair.includes(element.name)){
        // dette består av webflowid og airtableid
        fieldnamesarray.push(element.name);
        if(db=="webflow"){
        fieldvaluearray.push(array[0]);
        }else if (db=="airtable"){
          var airarray = [];
          airarray.push(array[1]);
          fieldvaluearray.push(airarray);
        }
      }else{
        //dette er ikke sinelselect 
        fieldvaluearray.push(array);
      }
      
    
    }else{
      // er ikke array
      fieldnamesarray.push(element.name);
      fieldvaluearray.push(element.value);
    }


  }


}




// kalle på api
if(db=="webflow"){
  if(rdata){
  //dette er returdata og skal addes på en airtableid
  fieldnamesarray.push("airtableid");
  fieldvaluearray.push(rdata.id);

  let bodystring = makecreatebodystring(fieldnamesarray,fieldvaluearray);
  //kallet på api webflow funksjonen 
  callapi("",collectionId,rdata.fields.webflowid,bodystring,"PATCH",db,"203");


  }else{
  //send array til body før opprettelse
  let bodystring = makecreatebodystring(fieldnamesarray,fieldvaluearray);
  //kallet på api webflow funksjonen 
  callapi("",collectionId,"",bodystring,"POST",db,"201");
  }
}else if (db=="airtable"){
  // legge til webflowid
      fieldnamesarray.push("webflowid");
      fieldvaluearray.push(rdata._id);
  //legge til slug
      fieldnamesarray.push("slug");
      fieldvaluearray.push(rdata.slug);
  //erstatte logo string til webflow lagring
  if(rdata.logo){
    //logo eksisterer erstatt innhold
    var index = fieldnamesarray.indexOf("logo");
    fieldvaluearray[index] = rdata.logo.url;
  }

//send array til body
let bodystring = makecreatebodystring(fieldnamesarray,fieldvaluearray);
  // legge til 
  callapi(airtablebaseId,airtabletableId,"",bodystring,"POST",db,"202");
}
}

function apireturnnew (data,fid){
  //retur fra opprettelsen av webflow item
  let bodystring = makeupdatebodystring(data);
  callapi("",collectionId,data._id,bodystring,"PATCH","webflow",fid);
}

function makeupdatebodystring(data){
  // lag bodystrin for å oppdatere webflowid
  let bodystring="{"+'"name"'+":"+'"'+data.name+'"'+","+'"webflowid"'+":"+'"'+data._id+'"'+"}";
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
  return (bodystring);
  }

function datatoairtable(data){




}


function emtyinput (classname){
  // finne alle elementer med create class
  var els = document.getElementsByClassName(classname);
  for(var i = 0; i < els.length; i++)
  {
    const element = els[i];
    if (element.tagName.toLowerCase() === 'input') {
      //input field 
      element.value = "";
  
    }else if (element.tagName.toLowerCase() === 'select'){
    // sett den til første option
    element.options[0].selected = true;
    }
  
  
  }
}
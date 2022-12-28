//Autosave funksjon for webflow
// disse variablene må settes Inside headertag
/*
var autosavefield = [];    //array for navne på felter //keys
var autosavevalue = [];    //array for verdien i felter //value
let typingTimer;                //timer identifier
let doneTypingInterval = 3000;  //tiden det tar fra en slutter å skrive til autosave blir aktivert
let collectionId = "collectionId from cms";
let itemId = "itemId from cms";
*/
var issaving = false;

//tømmer array save oppstart og etter mottatt response
arrayready();


//tømmer array og setter navn som er obligatorisk
function arrayready(){
autosavefield = [];
autosavevalue = [];
//setter leverandørnavn-nr som opprinnelig
console.log("array tømmes");
setnamevalue()
}


//starte counter 
function startcounter(){
    clearTimeout(typingTimer);
    if (autosavefield.length>0){
    typingTimer = setTimeout(counterdone, doneTypingInterval);
    }
    
  }

  //Kjøres når counter er ferdig
function counterdone() {
    console.log("Autosave:/n","field:",autosavefield,"value:",autosavevalue);

	let bodystring = makebodystring(autosavefield,autosavevalue);
	issaving = true;
	let = baseId="";
	//kallet på api webflow funksjonen 
    callapi(baseId,collectionId,itemId,bodystring,"PATCH","webflow","101");
	
	//synliggjør elementer
    document.getElementById("autosave").style.display="Block"
    document.getElementById("autosavedone").style.display="none"
}


function makebodystring(fieldnames,fieldvalues){
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


function setsave(){
	//synliggjør elementer
	document.getElementById("autosave").style.display="none"
    document.getElementById("autosavedone").style.display="Block"
    //setter tidspunkt for lagring
	d = new Date();
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
	document.getElementById("autosavetime").innerHTML = datetext;
}




function replacevalueelementwebtoair(fieldname){
	if(autosavefield.includes(fieldname)){
	//finne field index i array
	var index = autosavefield.indexOf(fieldname);
	let elementid = autosavevalue[index];

	//Finne element
	const element = document.getElementById(elementid);

	var array = [];
	//hente data-airtable
	let airtableid = element.dataset.airtable;
	array.push(airtableid);
	autosavevalue[index] = array;
	}
	
}

function replacearraywebtoair(fieldname){
	//bytte webflowid arrai med airtableidarrai
	
	if(autosavefield.includes(fieldname)){
	//finne field index i array
	var airtablearay = [];
	var index = autosavefield.indexOf(fieldname);
	var currentarray = autosavevalue[index];
	for (let i = 0; i < currentarray.length; i++) {
		//finne elementet
		let elementid = currentarray[i];
		const element = document.getElementById(elementid);
		let airtableid = element.dataset.airtable;
		//hente airtableid
	    airtablearay.push(airtableid);
	}
	
	autosavevalue[index] = airtablearay;
	}
	
}


function replaceobjectreturn(fieldname,replacevalue){

	if(autosavefield.includes(fieldname)){
		//oppdatere value i riktig index
		var index = autosavefield.indexOf(fieldname);
		autosavevalue[index] = replacevalue;
	}

	console.log(autosavefield,autosavevalue);


}




function isinsavealert(text){
	alert("Vent et øyeblikk, server lagrer tidligere instillinger");
	}



document.getElementById("backbutton").onclick = function(event){
// kontrolere at det ikke er noe som må lagres først
if (autosavefield.length>1){
//lagre først
 let text = "Lagre de siste instillingene før du går tilbake?";
  if (confirm(text) == true) {
    text = "Lagrer!";
    counterdone()
  } else {
    text = "Går tilbake!";
    history.back();
  }
}else{
history.back();
}
}

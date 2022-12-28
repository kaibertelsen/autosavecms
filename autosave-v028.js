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

//Trigger når en er ferdig å skrive og trykker enter evt. utenfor feltet.
$('textarea'). change(function(){
	if(!issaving){
if (this.parentElement.classList.contains("autosave")){
	if(!autosavefield.includes(this.name)){
	//om den ikke inneholder det tidligere
	autosavefield.push(this.name);
	autosavevalue.push(this.value);
	}else{
	//oppdatere value i riktig index
	var index = autosavefield.indexOf(this.name);
	autosavevalue[index] = this.value;
	}
	startcounter();
	}
	
}else{

	isinsavealert();

}
});

//Trigger når et hidden field forandrer innhold
$('input[type=hidden]').change(function(){
	if(!issaving){
if (this.parentElement.classList.contains("autosavetext")){
	if(!autosavefield.includes(this.name)){
	//om den ikke inneholder det tidligere
	autosavefield.push(this.name);
	autosavevalue.push(this.value);
	}else{
	//oppdatere value i riktig index
	var index = autosavefield.indexOf(this.name);
	autosavevalue[index] = this.value;
	}
	startcounter();
	}
	
}else{
	isinsavealert();
}
});

//Trigger når en radiobox endres
$('input[type=radio]').change(function(){
	if(!issaving){
if (this.parentElement.classList.contains("autosave")){
	if(!autosavefield.includes(this.name)){
	//om den ikke inneholder det tidligere
	autosavefield.push(this.name);
	autosavevalue.push(this.value);
	}else{
	//oppdatere value i riktig index
	var index = autosavefield.indexOf(this.name);
	autosavevalue[index] = this.value;
	}
	startcounter();
	}
	
}else{
	isinsavealert();
}
});

//Trigger når en select box endres
$('select'). change(function(){
	if(!issaving){
if (this.classList.contains("autosave")){
	if(!autosavefield.includes(this.name)){
	//om den ikke inneholder det tidligere
	autosavefield.push(this.name);
	autosavevalue.push(this.value);
	}else{
	//oppdatere value i riktig index
	var index = autosavefield.indexOf(this.name);
	autosavevalue[index] = this.value;
	}
	startcounter();
	}
	
}else{
	isinsavealert();
}
});

//Trigger når en taster inn i et textfelt
$('input'). keyup(function(){
	if(!issaving){
	if (this.classList.contains("autosave")){
	if(!autosavefield.includes(this.name)){
	//om den ikke inneholder det tidligere
	autosavefield.push(this.name);
	autosavevalue.push(this.value);
	}else{
	//oppdatere value i riktig index
	var index = autosavefield.indexOf(this.name);
	autosavevalue[index] = this.value;
	}
	startcounter();
	}
	
}else{
	isinsavealert();
}
});

//her kan en sende array til et felt
function arrayautosave(fieldname,array){
	if(!issaving){
if(!autosavefield.includes(fieldname)){
	//om den ikke inneholder det tidligere
	autosavefield.push(fieldname);
	autosavevalue.push(array);
	}else{
	//oppdatere value i riktig index
	var index = autosavefield.indexOf(fieldname);
	autosavevalue[index] = array;
	}
  startcounter();
   }else{
	isinsavealert();
  }
}

// Trigges fra en chechbox 
function boxselect(elementid){
	if(!issaving){
const element = document.getElementById(elementid);
	if (element.parentElement.parentElement.classList.contains("autosave")){
     	let value = "false";
     
        if (element.checked ==true){
	value = "true";
        }
     
	if(!autosavefield.includes(element.name)){
      //om den ikke inneholder det tidligere
	autosavevalue.push(value);
	autosavefield.push(element.name);
	}else{
      //oppdatere value i riktig index
	var index = autosavefield.indexOf(element.name);
	autosavevalue[index] = value;
      }
      
	startcounter();
  	}
}else{
	isinsavealert();
}
}
//trigges når en fil er lastet opp elementene må ha "uploadcare" class på seg
// get widget reference
const widget = uploadcare.Widget("[role=uploadcare-uploader]");
const widget2 = uploadcare.Widget("[role=uploadcare-uploader2]");
widget.onUploadComplete(fileInfo => {
  autosaveuploadcareelements();
});

widget2.onUploadComplete(fileInfo => {
	autosaveuploadcareelements();
  });

function autosaveuploadcareelements(){
	if(!issaving){
	// alle elementer som har class="uploadcare"
	$('.uploadcare').each(function(){
	if (!this.value==""){
	//hvis verdien ikke eksisterer hopp over dette objectet
	if(!autosavefield.includes(this.name)){
		//om den ikke inneholder det tidligere
		autosavefield.push(this.name);
		autosavevalue.push(this.value);
		}else{
		//oppdatere value i riktig index
		var index = autosavefield.indexOf(this.name);
		autosavevalue[index] = this.value;
		}
	  startcounter();
	}
	
	});
	}else{
	isinsavealert();
	}
	
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


//funksjonene som trigges etter retur fra api
function apireturn(data,id){
	
	if (id=="101"){
	issaving = false;
	//synligjør elementer
	setsave();
	returdata(data,id);

	//fikse felt før henting i airtable
	replacevalueelementwebtoair("output");
	replaceobjectreturn("logo",data.logo.url);
	//oppdaterer airtable base
	let bodystring = makebodystring(autosavefield,autosavevalue);
	callapi(airtablebaseId,airtabletableId,airtablerecordId,bodystring,"PATCH","airtable","102");
	}else if (id=="102"){
	//etter lagret i airtable
	console.log("lagret i airtable","data:",data);	
	// tømmer array klar for neste autosave
    arrayready();
	}



}

function replacevalueelementwebtoair(fieldname){
	if(autosavefield.includes(fieldname)){
	//finne field index i array
	var index = autosavefield.indexOf(fieldname);
	let elementid = autosavevalue[index];

	//Finne element
	const element = document.getElementById(elementid);

	//hente data-airtable
	let airtableid = element.dataset.airtable;
	autosavevalue[index] = airtableid;
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

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

//tømmer array save oppstart og etter mottatt response
arrayready();

//tømmer array og setter navn som er obligatorisk
function arrayready(){
autosavefield = [];
autosavevalue = [];
//setter leverandørnavn-nr som opprinnelig
setnamevalue();
}

//Trigger når en er ferdig å skrive og trykker enter evt. utenfor feltet.
$('textarea'). change(function(){
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
	}
	startcounter();
});

//Trigger når et hidden field forandrer innhold
$('input[type=hidden]').change(function(){
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
	}
	startcounter();
});

//Trigger når en radiobox endres
$('input[type=radio]').change(function(){
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
	}
	startcounter();
});

//Trigger når en select box endres
$('select'). change(function(){
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
	}
	startcounter();
});

//Trigger når en taster inn i et textfelt
$('input'). keyup(function(){
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
	}
	startcounter();
});

//her kan en sende array til et felt
function arrayautosave(fieldname,array){
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
}

// Trigges fra en chechbox 
function boxselect(elementid){
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
  
}

//starte counter 
function startcounter(){
    clearTimeout(typingTimer);
    if (autosavefield.length>0){
    typingTimer = setTimeout(counterdone, doneTypingInterval);
    }
    console.log(autosavefield,autosavevalue);
  }

  //Kjøres når counter er ferdig
function counterdone() {
    console.log("Autosave:/n","field:",autosavefield,"value:",autosavevalue);

	//kallet på api funksjonen 
    callapi(collectionId,itemId,autosavefield,autosavevalue,"PATCH","webflow","239");
	//synliggjør elementer
    document.getElementById("autosave").style.display="Block"
    document.getElementById("autosavedone").style.display="none"
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
	//synligjør elementer
	setsave();
	// tømmer array klar for neste autosave
    arrayready();
    returdata(data,id)

}


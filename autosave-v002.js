//Autosave funksjon for webflow

//tømmer array ave oppstart og etter mottatt response
arrayready();

function arrayready(){
autosavefield = [];
autosavevalue = [];
//setter leverandørnavn-nr som opprinnelig
autosavefield.push("name");
autosavevalue.push("{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}");
}

/////////input to autosave

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
//innkommende array
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

function startcounter(){
//starte counter 
    clearTimeout(typingTimer);
    if (autosavefield.length>0){
    typingTimer = setTimeout(counterdone, doneTypingInterval);
    }
    console.log(autosavefield,autosavevalue);
  }

function counterdone() {
    //autosave
    console.log("Autosave:/n","field:",autosavefield,"value:",autosavevalue);

    callapi(collectionId,itemId,autosavefield,autosavevalue,"PATCH","webflow","239");
    document.getElementById("autosave").style.display="Block"
    document.getElementById("autosavedone").style.display="none"
}

function setsave(){
	document.getElementById("autosave").style.display="none"
  document.getElementById("autosavedone").style.display="Block"
  d = new Date();
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
	document.getElementById("autosavetime").innerHTML = datetext;
}



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
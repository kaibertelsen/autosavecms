function loadarrays (classname){
// finne alle elementer med create class
var fieldnamesarray = [];
var fieldvaluearray = [];

var els = document.getElementsByClassName(classname);
for(var i = 0; i < els.length; i++)
{
  const element = els[i];
  if (element.tagName.toLowerCase() === 'input') {
    //input field 
    
    fieldnamesarray.push(element.name);
    fieldvaluearray.push(element.value);

  }else if (element.tagName.toLowerCase() === 'select'){
    
    //sjekke om det er en array
    if(Array.isArray(element.value)){
      // er array

    }else{
      // er ikke array
      fieldnamesarray.push(element.name);
      fieldvaluearray.push(element.value);

    }


  }


}

console.log("Names:",fieldnamesarray,"Value:",fieldvaluearray);
}


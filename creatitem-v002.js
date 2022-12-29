function loadarrays (classname){
// finne alle elementer med create class
var els = document.getElementsByClassName(classname);
for(var i = 0; i < els.length; i++)
{
  console.log(els[i],"Value:",els[i].value);
}
}


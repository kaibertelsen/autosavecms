function loadarrays (){
// finne alle elementer med create class
var els = document.getElementsByClassName("create");
for(var i = 0; i < els.length; i++)
{
  console.log(els[i],"Value:",els[i].value);
}
}


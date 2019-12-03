window.onload = start;

function start(){
  drawTree(50,250,5);
  getData();
}

function drawLine(startX, startY, length, vertical){
  var ctx = document.getElementById("tree").getContext("2d");
  ctx.moveTo(startX,startY);
  if(vertical){
      ctx.lineTo(startX,startY + length);
  }
  else{
    ctx.lineTo(startX + length,startY);
  }
  ctx.stroke();
}

function findBranchwidth(level){
  var width;
  if(level == 1){
    return 20;
  }
  else {
    width = 25*Math.pow(2,(level-2));
    return width;
  }
}

function drawTree(startX,startY,level){
  if(level == 0){
    drawLine(startX,startY,30,false);
    return;
  }
  else {
    var widthBranch;
    widthBranch = findBranchwidth(level);

    drawLine(startX,startY,30,false);
    drawLine(startX+30,startY-(widthBranch/2),widthBranch,true);
    drawTree(startX+30,startY-(widthBranch/2),level-1);
    drawTree(startX+30,startY+(widthBranch/2),level-1);
  }
}

function getData(){
  var Url = "https://www.paleobiodb.org/data1.2/taxa/single.json?name=Dascillidae&show=attr";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', Url, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  function processRequest(e){
    if (xhr.readyState == 4 && xhr.status == 200) {
    //alert(xhr.responseText);
    var response1 = JSON.parse(xhr.responseText);
    document.getElementById("occurrence_no").innerHTML = response1.records[0].oid;
    document.getElementById("record_type").innerHTML = response1.records[0].rnk;
    document.getElementById("reid_no").innerHTML = response1.records[0].nam;
    }
  }
}

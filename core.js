
var arrayImage = ["https://kde.link/test/0.png","https://kde.link/test/1.png", "https://kde.link/test/2.png","https://kde.link/test/3.png","https://kde.link/test/4.png", "https://kde.link/test/5.png",  "https://kde.link/test/6.png", "https://kde.link/test/7.png","https://kde.link/test/8.png", "https://kde.link/test/9.png"];

function makeRequest (method, url, done) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = function () {
    done(null, xhr.response);
  };
  xhr.onerror = function () {
    done(xhr.response);
  };
  xhr.send();
}

makeRequest('GET', 'http://kde.link/test/get_field_size.php', function (err, datums) {
  if (err) { throw err; }
  var da = JSON.parse(datums);
  this.creteTable(da)
});

function creteTable(data) {
  
  var array = [];
  var table = document.createElement('table');

for (var i = 0; i < data.height; i++) {
    var tr = document.createElement('tr');   

   for (var j = 0; j < data.width; j++) {
   
        var td2 = document.createElement('td');
        td2.style.backgroundImage = "url('images/maps.png')";
        td2.setAttribute("umageurl", "url("+arrayImage[j]+")");
        td2.addEventListener("click", handler)
        array.push(td2)
        tr.appendChild(td2);
   }
    table.appendChild(tr);
}

  document.body.appendChild(table);
}

var arrayEvent = [];

function handler(c) {
       
    if (arrayEvent.length == 1) {
        var ev = arrayEvent[0];
         c.srcElement.style.backgroundImage = c.srcElement.getAttribute('umageurl')

        if (ev.srcElement.style.backgroundImage == c.srcElement.style.backgroundImage) {
              c.srcElement.style.transform = "perspective(50px) rotateY(180deg)";
              c.srcElement.style.transitionDuration = "0.2s";
              arrayEvent.length = 0
              c.target.removeEventListener("click", handler, false);
              ev.target.removeEventListener("click", handler, false);
             
            setTimeout(function() {
              ev.srcElement.style.backgroundImage = "url('images/done.png')";
              c.srcElement.style.backgroundImage = "url('images/done.png')";
             }, 400);  
              
        } else {
          
            c.srcElement.style.transform = "perspective(50px) rotateY(180deg)";
            c.srcElement.style.transitionDuration = "0.15s";
            ev.target.addEventListener("click", handler);
            arrayEvent.length = 0;
         
            setTimeout(function() {
              ev.srcElement.style.backgroundImage = "url('images/maps.png')";
              c.srcElement.style.backgroundImage = "url('images/maps.png')";
              c.srcElement.style.transform = "";
              ev.srcElement.style.transitionDuration = "";
             }, 400);
        }

    } else {
     
          c.srcElement.style.transform = "perspective(50px) rotateY(180deg)";
          c.srcElement.style.transitionDuration = "0.2s";
          c.target.removeEventListener("click", handler, false);
          arrayEvent.push(c);
          c.srcElement.style.backgroundImage = c.srcElement.getAttribute('umageurl')
     
    } 
  }





//establish xml connection
function loadXMLDoc(page, Id){
    console.log("establish XML conection");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (this.readyState==4 && this.status==200){
            if (page==1){
                displayImage(this);
            }else{
                displayJourneyById(this,Id);
            }
        }
    };
    xmlhttp.open("GET","/Xml/journey.xml",false);
    xmlhttp.send();
}
// genrate photo link format
function generatePhotoFormat(imagurl, title, id){
    var imgId ="id="+id;
    var aTag = "<a href='/Html/journey.html'><img src='";
    var altTag = "' " + imgId + " alt='";
    var closeTag="'></a>";
    console.log("testing: "+aTag+imagurl.trim()+altTag+title.trim()+closeTag);
    return (aTag+imagurl.trim()+altTag+title.trim()+closeTag);
}

//show photo for photo gallery
function displayImage(xmlhttp){
    var xmlDoc = xmlhttp.responseXML;
    console.log("testing xmldoc from showImage()"+xmlDoc);
    var journeyList = xmlDoc.getElementsByTagName("journey");
    console.log("testing journeyList"+journeyList);
    var div="";

    for (var i=0;i<journeyList.length;i++){
        var journeyId = journeyList[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
        var imageurl = journeyList[i].getElementsByTagName("imageurl")[0].childNodes[0].nodeValue;
        var title = journeyList[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;

        //invoke method genarte photo link
        var image =generatePhotoFormat(imageurl,title,journeyId);
        
        //create HTML elements to used for display XML data
        var img = image;
        var divDesc = "<div class='desc'>"+title+"</div>";

        div +=img+divDesc+"<br>";
    }
    //display loaded XML data into coresspnding Html id : gallery
    document.getElementById("gallery").innerHTML=div;
}

//show journey according to the selected image
function displayJourneyById(xmlhttp, Id){//id

    var xmlDoc=xmlhttp.responseXML;
    console.log("testing xmldoc"+xmlDoc);
    x=xmlDoc.getElementsByTagName("journey");
    console.log("testing x value"+x);
    if(Id == null){
        id=1;
    }
    var imageurl=x[Id].getElementsByTagName("imageurl")[0].childNodes[0].nodeValue;
    var title=x[Id].getElementsByTagName("title")[0].childNodes[0].nodeValue;

    //invoke method genarte photo link
    var image=generatePhotoFormat(imageurl,title);

    var date=x[Id].getElementsByTagName("datetime")[0].childNodes[0].nodeValue;
    var city=x[Id].getElementsByTagName("city")[0].childNodes[0].nodeValue;
    var journeyId=x[Id].getElementsByTagName("id")[0].childNodes[0].nodeValue;
    var bloger=x[Id].getElementsByTagName("bloger")[0].childNodes[0].nodeValue;
    var detail=x[Id].getElementsByTagName("detail")[0].childNodes[0].nodeValue;

    console.log("testing data"+ date + city + id + bloger + title + image + detail);

    //load info from XNL into corresponding HTML ids
    document.getElementById("imageurl").innerHTML=image;
    document.getElementById("title").innerHTML=title;
    document.getElementById("city").innerHTML=city;
    document.getElementById("id").innerHTML=journeyId;
    document.getElementById("bloger").innerHTML=bloger;
    document.getElementById("datetime").innerHTML=setDateFormat(date);
    document.getElementById("detail").innerHTML=detail;
}

//convert date sting into date format
function setDateFormat(dateV){
    console.log("this is the current date" + dateV);
    return new Date(dateV).toLocaleString();
}

//show current date at Footer section
function showCurrentdate(){
    var date = new Date().toLocaleDateString;
    return (date);
}
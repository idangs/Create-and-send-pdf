var imgData;
var imageDatai;
var imageDataii;
var imageDataiii;
var personPresent="";

personPresent=singleMaintenance['personPresent'] 
before = singleMaintenance['beforeMaintenancePhoto']
after =  singleMaintenance['afterMaintenancePhoto']


function convertFunction(url, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}

$( document ).ready(function() {
  var imageUrl = '/static/uploads/' + personPresent;
  var imageUrli = '/static/uploads/' +before;
var imageUrlii = '/static/uploads/' + after;
var imageUrliii = '/static/images/smartpaani.png';


  convertFunction(imageUrl, function(base64Img) {
    
imgData = base64Img;


});

  convertFunction(imageUrli, function(base64Imgi) {
    
imgDatai = base64Imgi;


});

  convertFunction(imageUrlii, function(base64Imgii) {
    
imgDataii = base64Imgii;


});


  convertFunction(imageUrliii, function(base64Imgiii) {
    
imgDataiii = base64Imgiii;


});
   });




var all_data;

var doc = new jsPDF();
 var specialElementHandlers = {
        '#editor': function (element,renderer) {
            return true;
        }
    };

    

 $('#save').on('click', function(){
  $(this).button('loading').delay(500).queue(function(){


  // var $this = $(this);
  // $this.button('loading');

 $('#save').button('loading');

    var margin = {
         top: 12,
         left: 12,
         right: 12,
         bottom: 12,
       };


 $('#save').button('loading');

   
        
       
        doc.addImage(imgDataiii,'JPEG',0,0,40,30);
        
        doc.fromHTML($('#forPrint').get(0), 15, 15,{
          'width': 170,'elementHandlers': specialElementHandlers
        },function (bla){
          doc.addPage();
          doc.setFontSize(15);
          doc.text(12, 15, "Person Present:");
          
          doc.addImage(imgData,'JPEG',12,20,75,75);
          

          doc.text(12, 110, "Before Maintenance:");
          
          doc.addImage(imgDatai,'JPEG',12,115,75,75);
          
          doc.text(12, 202, "After Maintenance:");
          
          doc.addImage(imgDataii,'JPEG',12,205,75,75);
          
          



          append = ((all_data['clientId']).toString() + '.pdf');
          
        doc.save(append);
    },margin);
        // alert('this is xxxxxx'+JSON.stringify(x));
        
        // alert("client info"+all_data['clientId']);
     


$('#save').button('reset');

    }); 
      });   


$('#send').click(function () {
    send_email();
    });

function get_allData(x){
    all_data=x
    // alert("I got it ---"+JSON.stringify(x));
}

function send_email(){

   var formData = new FormData($('#fileSend')[0]);

 $.ajax({
              url: '/send_email',
              type: 'POST',
              
              success: function(data) {
               alert(JSON.stringify(data));
               },
               error: function() {
               alert("error");                  

               },
               data: formData,
               cache: false,
               contentType: false,
               processData: false,

               },'json');

}
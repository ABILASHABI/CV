
  
  
      $(function(){
          $("#input-id").on('change', function(event) {
              var file = event.target.files[0];
              if(file.size>=2*1024*1024) {
                  alert("JPG images of maximum 2MB");
                  $("#form-id").get(0).reset(); //the tricky part is to "empty" the input file here I reset the form.
                  return;
              }
  
              if(!file.type.match('image/jp.*')) {
                  alert("only JPG images");
                  $("#form-id").get(0).reset(); //the tricky part is to "empty" the input file here I reset the form.
                  return;
              }
  
              var fileReader = new FileReader();
              fileReader.onload = function(e) {
                  var int32View = new Uint8Array(e.target.result);
                  //verify the magic number
                  // for JPG is 0xFF 0xD8 0xFF 0xE0 (see https://en.wikipedia.org/wiki/List_of_file_signatures)
                  if(int32View.length>4 && int32View[0]==0xFF && int32View[1]==0xD8 && int32View[2]==0xFF && int32View[3]==0xE0) {
                      alert("ok!");
                  } else {
                    alert("only valid JPG images");
                    $("#form-id").get(0).reset(); //the tricky part is to "empty" the input file here I reset the form.
                    return;
                }
            };
            fileReader.readAsArrayBuffer(file);
        });
    });
var memoria = 0;
$("#slc-metodo").on('change', function(){
  c.destroy();
  f.destroy();
  d.destroy();
  switch($("#slc-metodo").val()){
    case "1":
      // TO-DO
      memoria=f;
    break;
    case "2":
      // TO-DO
      memoria = d;
    break;
    case "3":
      // TO-DO

    break;
    case "4":
      // TO-DO
      memoria=c
    break;
    case "5":
      // TO-DO

    break;
    default:
      console.log('Ningun método fue seleccionado');
  }
});


function format(n){
  if(n>=1024){
    return (n/1024) + " GB";
  }else{
    return n+" MB";
  }
}

$(document).ready(function(){     
      $("#txt-cmd").keypress(function(e) {
        if(e.which == 13) {
          obtenerDatos();
        }
      });
});

function obtenerDatos()
{
    var valor = $("#txt-cmd").val();
    $("#consola").html(valor);
}
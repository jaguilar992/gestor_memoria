// Todos los tamaños se manejan en MB
class fijo{
  constructor(n){
    this.memoria=n; /* n es el tamaño en MB*/
    this.particiones = [];
  }

  set(n){
    if (this.particiones.length==0){
      this.memoria = n;
      this.particionar();
      this.refrescar();
    }
  }

  destroy(){
    this.particiones = [];
    this.refrescar();
  }

  reset(){
    var principal = {tamano:this.memoria, proceso: null, ocupado: 0}
    this.particiones = [];
    this.particiones.push(principal);
    this.refrescar();
  }

  particionar() { /* size es el tamaño (MB) del proceso que entra*/
    var valor = this.memoria / 8 ;
    for (var i=0; i<8; i++){
      this.particiones.push({tamano: valor, proceso: null, ocupado: 0});
    }
  }

  cargar(etiqueta, size){
    for(var i=0; i<this.particiones.length; i++){
      if(this.particiones[i].proceso==null && size<=this.particiones[i].tamano){
        this.particiones[i].proceso=etiqueta;
        this.particiones[i].ocupado=size;
        this.refrescar();
        return true;
      }
    }
    this.refrescar();
    return false;
  }

  liberar(etiqueta){
    for (var i = 0; i<this.particiones.length; i++) {
      if (this.particiones[i].proceso==etiqueta){
        this.particiones[i].proceso=null;
        this.particiones[i].ocupado=0;
        break;
      }
    }
    this.refrescar();
  }

  //Impresion
  refrescar(){
    var id='#div-memoria';
    $(id).html('');
    for (var p of this.particiones){
      var el = 
      "<div class='libre' style='width: "+(p.tamano / this.memoria)*100+"%'>";
        if(p.proceso!=null){
          el += 
          "<div class='ocupado' style='width: "+(p.ocupado / p.tamano) *100+"%'>"+
            "<p>"+p.proceso+"</p><p>"+format(p.ocupado)+"</p>"+
          "</div>";
        }else{
          el += 
            "<p>"+format(p.tamano)+"</p>";
        }
      el+=
      "</div>";
      $(id).append(el);
    }
  }
}

var f = new fijo(1024);
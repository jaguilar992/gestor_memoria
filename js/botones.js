function Memoria(){
    var opc = document.getElementById("slc-metodo").value;
    switch(opc){
      case "1":
        f.set(prompt('Ingresar Tamaño de la memoria:',''));
        break;
      case "2":
        d.set(prompt('Ingresar Tamaño de la memoria:',''));
        break;
      case "3":
        din.set(prompt('Ingresar Tamaño de la memoria:',''));
        break;
      case "4":
        c.set(prompt('Ingresar Tamaño de la memoria:',''));
        break;
      case "5":
        p.particionar(prompt('Ingrese Tamaño de las particiones:',''));
        p.refrescar();
        break;
    }
    
  }
  
  function Proceso(){
    var opc = document.getElementById("slc-metodo").value;
    var np = prompt('Ingresar nombre del proceso:','');
    var tp = prompt('Ingresar tamaño del proceso:','');
    switch(opc){
      case "1":
        f.cargar(np,tp);
        break;
      case "2":
        d.cargar(np,tp);
        break;
      case "3":
        din.cargar(np,tp);
        break;
      case "4":
        c.cargar(np,tp);
        break;
      case "5":
        p.cargar(np,tp);
        break;
    }
    
  }
  
  function Liberar(){
    var opc = document.getElementById("slc-metodo").value;
    switch(opc){
      case "1":
        f.liberar(prompt('Ingresar nombre del proceso:',''));
        break;
      case "2":
        d.liberar(prompt('Ingresar nombre del proceso:',''));
        break;
      case "3":
        din.liberar(prompt('Ingresar nombre del proceso:',''));
        break;
      case "4":
        c.liberar(prompt('Ingresar nombre del proceso:',''));
        break;
      case "5":
        p.liberar(prompt('Ingresar nombre del proceso:',''));
        break;
    }
  }
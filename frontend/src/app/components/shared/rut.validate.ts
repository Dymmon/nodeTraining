export function validate(rut: String, dv: String){
    let suma = 0, num = 2;
    try {
      while(rut){
          const temp = rut.slice(-1);
          rut = rut.substring(0, rut.length - 1);
          if(num > 7){
              num = 2;
          }
          suma += parseInt(temp) * num;
          num++;
      }
      let sumString = (11 - suma%11).toString();
      if(sumString == "10"){
        sumString = "k"
      }
      if(sumString == dv){
          return 1;
      }
      return 0; 
  } catch (error) {
      return 0;
  }
   
}
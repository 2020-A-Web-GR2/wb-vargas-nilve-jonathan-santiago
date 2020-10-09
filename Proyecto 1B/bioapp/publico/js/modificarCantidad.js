
function aumentarCantidad(index) {

  let cantidad = document.getElementById(Number(index))
  let valorDefault = Number(cantidad.textContent)

  if(valorDefault === 12){
    alert('Maximo 12 productos')
    cantidad.innerHTML = 12
    return cantidadValor = 12


  }else{
    cantidad.innerHTML = valorDefault + 1
    return cantidadValor = valorDefault + 1

  }
}

function disminuirCantidad(index) {

  let cantidad = document.getElementById(Number(index))
  let valorDefault = Number(cantidad.textContent)

  if(valorDefault === 1){
    alert('Minimo 1 producto')
    cantidad.innerHTML = 1

  }else{
    cantidad.innerHTML = valorDefault - 1
  }

}
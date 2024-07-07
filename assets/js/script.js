const btnCalcular = document.querySelector("#calcular");

const obtenerInformacion = async (selectValue) => {
  const data = await fetch(`https://mindicador.cl/api/${selectValue}`);
  const respuesta = await data.json();
  return respuesta;
};

const crearGrafico = async (series) =>{
  const data = series.map((serie) => serie.valor);
  const fechas= series.map((serie)=> serie.fecha);
  const ctx = document.getElementById("myChart");
  console.log(ctx)
  new Chart(ctx, {
    type:"line",
    data: {
      labels:fechas,
      datasets:[
        {
          label: "# of Votes",
          data:data,
          borderWidth: 1,
        }
      ]
    }
  })
}

btnCalcular.addEventListener("click", async () => {
  let grafico = Chart.getChart("myChart");
  if (grafico !== undefined) {
    grafico.destroy();
  }

  const inputValue = document.querySelector("#monto").value;
  const selectValue = document.querySelector("#moneda").value;
  const respuet = await obtenerInformacion(selectValue);
  let cambio = respuet.serie[0].valor * inputValue;
  crearGrafico(respuet.serie);
  document.querySelector("#resultado").innerHTML = cambio;
});

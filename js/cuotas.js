const monto = document.getElementById ('monto');
const periodos = document.getElementById ('periodos');
const interes = document.getElementById ('interes');
const btnCalcularf = document.getElementById ('btnCalcularf');
const btnCalcularv = document.getElementById ('btnCalcularv');
const alerta = document.getElementById ('alert-error');
const llenarTabla= document.querySelector('#lista-tabla tbody');

//BOTON CUOTAS FIJAS
btnCalcularf.addEventListener('click', () => {
    if (monto.value === '' || interes.value === '')
    {
        alerta.hidden = false;
        setTimeout (() => {
            alerta.hidden= true;
        }, 3000);
    } 
    else{
        calcularTablaf(monto.value, interes.value, periodos.value);
    }
});

function calcularTablaf(monto, interes, periodos) {

    while(llenarTabla.firstChild) {
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

   
    let amortizacion=0, pagoInteres=0, periodo=0, cuota=0;
    //cuota = monto * (interes / (1-(1+interes)^-periodos));
    cuota = monto * (Math.pow(1+interes/100, periodos)*interes/100)/(Math.pow(1+interes/100, periodos)-1);
    
    for (let i = 1; i <= periodos; i++) {
        pagoInteres = parseFloat(monto * (interes / 100));
        amortizacion= cuota - pagoInteres;
        monto = parseFloat(monto - amortizacion);

        periodo++


        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${periodo}</td>
            <td>$ ${monto.toFixed(2)}</td>
            <td>$ ${cuota.toFixed(2)}</td>
            <td>$ ${pagoInteres.toFixed(2)}</td>
            <td>$ ${amortizacion.toFixed(2)}</td>
                    
        `;
        llenarTabla.appendChild(row);
        
    }
}

//BOTON CUOTAS VARIABLES
btnCalcularv.addEventListener('click', () => {
    if (monto.value === '' || interes.value === '')
    {
        alerta.hidden = false;
        setTimeout (() => {
            alerta.hidden= true;
        }, 3000);
    } 
    else{
        calcularTablav(monto.value, interes.value, periodos.value);
    }
});

function calcularTablav(monto, interes, periodos) {

    while(llenarTabla.firstChild) {
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

   
    let amortizacion, pagoInteres, cuota, periodo;
    amortizacion = monto / periodos;
    periodo= 0;
    for (let i = 1; i <= periodos; i++) {
        pagoInteres = monto * (interes / 100);
        cuota = amortizacion + pagoInteres;
        monto = monto - amortizacion;
        periodo++


        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${periodo}</td>
            <td>$ ${monto.toFixed(2)}</td>
            <td>$ ${cuota.toFixed(2)}</td>
            <td>$ ${pagoInteres.toFixed(2)}</td>
            <td>$ ${amortizacion.toFixed(2)}</td>
                    
        `;
        llenarTabla.appendChild(row);
        
    }
}

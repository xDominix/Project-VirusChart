let currChart = undefined;
show();

function show() 
{
    let alpha = Number(document.getElementById("alpha").value);
    let beta = Number(document.getElementById("beta").value);
    let I0 = Number(document.getElementById("I0").value);
    let N = Number(document.getElementById("N").value);
    let dT = Number(document.getElementById("dT").value);
    let maxTime = Number(document.getElementById("maxTime").value);

    if (dT <=0) return;

    let Is = [],Ss = [],Rs = [],ts = [];
    let I = I0,S = N,R = 0;

    for (let t = 0; t <= maxTime; t += dT) 
    {
        S += -beta * S * I / N * dT; //dS
        I += beta * S * I / N * dT - alpha * I * dT; //dI
        R += alpha * I * dT; //dR
        Ss.push(S);
        Is.push(I);
        Rs.push(R);
        ts.push(Number(t.toFixed(1)));
    }
    drawChart(Ss,Is,Rs,ts,N);
}

function drawChart(S,I,R,t,ymax) {
    if (currChart!= undefined) { currChart.destroy(); }
    currChart = new Chart(document.getElementById('chart').getContext('2d'), {
        type: 'line',
        data: {
            labels: t,
            datasets: [
            {
                label: 'Zdrowi (S)',
                data: S,
                borderColor: ['rgb(150, 255, 136)'],
                fill: false,
            },
            {
                label: 'Zainfekowani (I)',
                data: I,
                borderColor: ['rgb(255, 122, 122)'],
                fill: false,
            },
            {
                label: 'Wyleczeni (R)',
                data: R,
                borderColor: ['rgb(136, 227, 255)'],
                fill: false,
            }]
        },
        options: { 
            title: {display:true,text:"WYKRES POPULACJI OD CZASU"},
            scales: 
            {
                xAxes: [{  scaleLabel: { display: true,  labelString: 'Czas'  }  }],
                yAxes: [{ ticks: { beginAtZero: true, max: ymax }, scaleLabel: { display: true, labelString: 'Populacja'  } }]
            },
        }
    });
}
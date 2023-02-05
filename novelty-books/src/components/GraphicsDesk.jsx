import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';


//dona
ChartJS.register(ArcElement, Tooltip, Legend);

//barra
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

//linea
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const genders = ['Fantasy', 'Sci-Fiction', 'Horror']

export default function GraphicsDesk({ listOrders, listUsers, listBooks }) {

    const dataDoughnut = {
        labels: ['Fantasy', 'Sci-Fiction', 'Horror'],
        datasets: [
            {
                label: '# of Sell',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Books Sell',
            },
        },
    };

    const dataBar = {
        labels: ["Fantasy", "Sci-Fiction", "Horror"],
        datasets: [
            {
                label: 'Dataset 1',
                data: genders.map(() => Math.random() * 10 + 1),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: genders.map(() => Math.random() * 10 + 1),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const optionsLine = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'sell for time',
          },
        },
      };

      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

      const dataLine = {
        labels: months,
        datasets: [
          {
            label: 'Dataset 1',
            data: months.map(() => Math.random() * 10 + 1),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: months.map(() => Math.random() * 10 + 1),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return (
        <>
            <div>
                <section>
                    <h3>Contenedor de graficos</h3>
                    <figure>
                        <h5>Grafico de dona</h5>
                        <Doughnut data={dataDoughnut} />
                    </figure>
                    <figure>
                        <h5>Grafico de barra</h5>
                        <Bar options={optionsBar} data={dataBar} />
                    </figure>
                    <figure>
                        <h5>Grafico de linea</h5>
                        <Line options={optionsLine} data={dataLine} />
                    </figure>
                </section>
            </div>
        </>
    )
}
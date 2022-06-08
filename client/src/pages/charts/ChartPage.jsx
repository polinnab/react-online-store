import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function FirstChart() {
    const data = {
        labels: ['Red', 'Pink', 'Blue', 'Purple'],
        datasets: [
          {
            label: '# of Votes',
            data: [10, 15, 75, 30],
            backgroundColor: [
              '#BE53C9',
              '#E666AA',
              '#3982F7',
              '#7E50DE',
            ],
            borderColor: [
              '#BE53C9',
              '#E666AA',
              '#3982F7',
              '#7E50DE',
            ],
            borderWidth: 1,
          },
        ],
    };

    return(
        <div style={{width: '600px', height: 'auto', border: '1px solid', borderRadius: '7px', padding: '20px'}}>
            <h4>Activity by Operator</h4>
            <p>May 6 - June 4, 2022</p>
            <div style={{position: 'relative', width: '280px', height: 'auto'}}>
                <div style={{position: 'absolute', width: '100%', height: '16%', top: '0', left: '0', backgroundColor: 'white'}}></div>
                <Pie data={data} />
            </div>
        </div>

    )
}

function ChartPage() {

    return(
        <div>
            Chart ChartPage
            <br/>
            <FirstChart />
        </div>
    )
}

export default ChartPage
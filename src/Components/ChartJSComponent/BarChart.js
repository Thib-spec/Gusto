import { Bar } from 'react-chartjs-2';
import React from 'react'

const data = {
  labels: ['Jan', 'Mar', 'May', 'July', 'Oct'],
  datasets: [
    {
      label: 'Sales',
      data: [400, 1000, 4000, 800, 1500],
      backgroundColor: ["darkblue", "grey", "darkblue", "grey","darkblue"],
      borderColor: ["grey", "darkblue", "grey", "darkblue","grey"],
      borderWidth: 10,
    },
  ],
};

const options = {
    
    maintainAspectRatio: false,
  scales: {
    y:{
      ticks:{
        beginAtZero: true,
        
      },
      
    },
  },
};

function BarChart() {
  return (
    <div className="App">
      <h2>Sales</h2>
      <Bar data={data} options={options} height={400}
        width={600}/>
    </div>
  );
}

export default BarChart;
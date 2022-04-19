import { PieChart, Pie,Cell,Tooltip} from 'recharts';
const DoughnutChart = (props) => {
    const data = [
        { name: 'DC', lectures: parseInt(props.studentData.DC) },
        { name: 'HMI', lectures: parseInt(props.studentData.HMI) },
        { name: 'PM', lectures: parseInt(props.studentData.PM) },
        { name: 'NLP', lectures: parseInt(props.studentData.NLP)}
    ];
    const Name=["DC","HMI","PM","NLP"]
    return (
        <>
        <PieChart width={300} height={300}>
            <Pie data={data}  dataKey="lectures" outerRadius={150} fill="green"/>
            <Tooltip />
        </PieChart>
        </>
    );
}

export default DoughnutChart;
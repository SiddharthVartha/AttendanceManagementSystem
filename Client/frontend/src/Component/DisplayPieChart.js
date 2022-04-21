import { PieChart, Pie,Cell,Tooltip} from 'recharts';
const DisplayPieChart = (props) => {
    const data = [
        { name: 'DC', lectures: parseInt(props.studentData.DC) },
        { name: 'HMI', lectures: parseInt(props.studentData.HMI) },
        { name: 'PM', lectures: parseInt(props.studentData.PM) },
        { name: 'NLP', lectures: parseInt(props.studentData.NLP)},
        {name:'ABSENT',lectures:parseInt(props.absent)}
    ];
    const Name=["DC","HMI","PM","NLP","ABSENT"]
    return (
        <>
        <PieChart width={300} height={300}>
            <Pie data={data}  dataKey="lectures" label={Name} outerRadius={150} fill="green"/>
            <Tooltip />
        </PieChart>
        </>
    );
}

export default DisplayPieChart;
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { pickColor } from '../helper/color';
import PopulationData from '../types/population-data';
import { getPrefectures } from './api/get_ prefectures';
import { getPopulationData } from './api/get_population_data';

function MyApp({ Component, pageProps }: AppProps) {
  const API_KEY = process.env.API_KEY;

  const [prefectures, setPrefectures] = useState([]);
  useEffect(() => {
    getPrefectures(API_KEY).then((res: any) => {
      setPrefectures(res.data.result);
    });
  }, []);

  const list = prefectures.map((prefecture: any) => (
    <span key={prefecture.prefCode}>
      <label htmlFor={`pref-${prefecture.prefCode}`}>{prefecture.prefName}</label>
      <input
        onChange={() => changeHandle(prefecture.prefCode, prefecture.prefName)}
        value={prefecture.prefCode}
        type='checkbox'
        id={`pref-${prefecture.prefCode}`}
      />
    </span>
  ));

  const [line_list, setLineList] = useState();

  const data = [
    { name: 1960 },
    { name: 1970 },
    { name: 1980 },
    { name: 1990 },
    { name: 2000 },
    { name: 2010 },
    { name: 2020 },
  ];
  const [chartData, setChartData] = useState(data);

  const [check_list, setCheckList]: [Array<number>, Function] = useState([]);
  const [check_name_list, setCheckNameList]: [Array<string>, Function] = useState([]);

  const changeHandle = (code: number, name: string) => {
    if (!check_list.includes(code)) {
      const copy_check_list = check_list;
      copy_check_list.push(code);
      setCheckList(copy_check_list);

      const copy_check_name_list = check_name_list;
      copy_check_name_list.push(name);
      setCheckNameList(copy_check_name_list);

      getPopulationData(API_KEY, code).then((res) => {
        const copy_chartData = chartData;
        res.forEach((item: number, index: number) => {
          copy_chartData[index][name] = item;
        });
        setChartData(copy_chartData);

        const new_line_list = check_name_list.map((item, i) => (
          <Line type='monotone' key={item} dataKey={item} stroke={pickColor(i)} />
        ));
        setLineList(new_line_list);
      });
    } else {
      const index = check_list.indexOf(code);
      const copy_check_list = check_list;
      copy_check_list.splice(index, 1);
      setCheckList(copy_check_list);

      const name_index = check_name_list.indexOf(name);
      const copy_check_name_list = check_name_list;
      copy_check_name_list.splice(name_index, 1);
      setCheckNameList(copy_check_name_list);

      let copy_chartData = chartData;

      copy_chartData.forEach((obj) => {
        delete obj[name];
      });

      setChartData(copy_chartData);

      const new_line_list = check_name_list.map((item, i) => (
        <Line type='monotone' key={item} dataKey={item} stroke={pickColor(i)} />
      ));
      setLineList(new_line_list);
    }
  };

  return (
    <div>
      <div>{list}</div>
      <LineChart width={600} height={300} data={chartData}>
        <Legend align='right' layout='vertical' verticalAlign='top' />
        <CartesianGrid stroke='#ccc' />
        {line_list}
        <XAxis dataKey='name' />
        <YAxis />
      </LineChart>
    </div>
  );
}
export default MyApp;

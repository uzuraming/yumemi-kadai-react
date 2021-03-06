import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import CustomLegend, { CustomLegendList } from '../components/CustomLegend';
import Header from '../components/Header';
import { pickColor } from '../helper/color';
import { PopulationData } from '../types/population-data';
import { Prefecture } from '../types/prefecture';
import { getPrefectures } from './api/get_ prefectures';
import { getPopulationData } from './api/get_population_data';

function Home() {
  const API_KEY = process.env.API_KEY;

  const [custom_legend_list, setCustomLegendList] = useState<CustomLegendList>([]);

  const [prefectures, setPrefectures] = useState<undefined | Array<Prefecture>>();
  useEffect(() => {
    if (typeof API_KEY == 'string') {
      getPrefectures(API_KEY)
        .then((res: any) => {
          setPrefectures(res.data.result);
        })
        .catch((error) => {
          alert('エラーが発生しました');
          console.log(error);
        });
    } else {
      alert('エラーが発生しました');
    }
  }, []);

  let list: Array<undefined | JSX.Element> = [];
  if (typeof prefectures !== 'undefined') {
    list = prefectures.map((prefecture: Prefecture) => (
      <span key={prefecture.prefCode} className='checkbox-item'>
        <input
          onChange={() => changeHandle(prefecture.prefCode, prefecture.prefName)}
          value={prefecture.prefCode}
          type='checkbox'
          id={`pref-${prefecture.prefCode}`}
        />
        <label className='checkbox' htmlFor={`pref-${prefecture.prefCode}`}>
          {prefecture.prefName}
        </label>
      </span>
    ));
  }

  const [line_list, setLineList] = useState<undefined | Array<JSX.Element>>();

  const data: PopulationData = [
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

  const changeHandle = (code: number, name: string): void => {
    if (!check_list.includes(code)) {
      const copy_check_list = check_list;
      copy_check_list.push(code);
      setCheckList(copy_check_list);

      const copy_check_name_list = check_name_list;
      copy_check_name_list.push(name);
      setCheckNameList(copy_check_name_list);
      if (typeof API_KEY == 'string') {
        getPopulationData(API_KEY, code)
          .then((res) => {
            const copy_chartData = chartData;
            res.forEach((item: number, index: number) => {
              copy_chartData[index][name] = item;
            });
            setChartData(copy_chartData);

            const new_line_list = check_name_list.map((item, i) => (
              <Line type='monotone' key={item} dataKey={item} stroke={pickColor(i)} />
            ));
            setLineList(new_line_list);

            const copy_custom_legend_list = check_name_list.map((item, i) => {
              return { name: item, color: pickColor(i) };
            });
            setCustomLegendList(copy_custom_legend_list);
          })
          .catch((error) => {
            alert('エラーが発生しました');
            console.log(error);
          });
      } else {
        alert('エラーが発生しました');
      }
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

      const copy_custom_legend_list = check_name_list.map((item, i) => {
        return { name: item, color: pickColor(i) };
      });
      setCustomLegendList(copy_custom_legend_list);
    }
  };
  return (
    <div>
      <Header />
      <div className='container'>
        <div className='card grid' id='card'>
          <div className='check-box-wrapper'>{list}</div>
          <div>
            <div className='graph-grid'>
              <ResponsiveContainer width='80%' aspect={1.1414}>
                <LineChart
                  data={chartData}
                  margin={{
                    top: 30,
                    right: 15,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid stroke='#ccc' />
                  {line_list}
                  <XAxis dataKey='name' minTickGap={-100}>
                    <Label value='年度' offset={0} position='insideBottomRight' />
                  </XAxis>
                  <YAxis domain={[0, 5000000]}>
                    <Label value='人口数' position='top' />
                  </YAxis>
                </LineChart>
              </ResponsiveContainer>
              <div className='custom-legend-wrapper'>
                <CustomLegend custom_legend_list={custom_legend_list} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;

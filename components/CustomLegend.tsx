export type CustomLegendList = Array<{
  name: string;
  color: string;
}>;

interface CustomLegendProps {
  custom_legend_list: CustomLegendList;
}

export default function CustomLegend(props: CustomLegendProps) {
  const style = {
    color: props.custom_legend_list,
  };
  return (
    <ul className='legend-list-wraper'>
      {props.custom_legend_list.map((item, index) => {
        const style = {
          color: item.color,
        };
        return (
          <li className='legend-list' key={`legend-${index}`} style={style}>
            <svg width='10' height='10' viewBox='0 0 32 32' version='1.1'>
              <path
                strokeWidth='4'
                fill='none'
                stroke={item.color}
                d='M0,16h10.666666666666666
          A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
          H32M21.333333333333332,16
          A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16'
              ></path>
            </svg>
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

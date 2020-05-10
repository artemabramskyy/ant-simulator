const generate = ({ width, height, color }) => (
  `<div style='
    width:${width}px;
    height:${height}px;
    display:block;
    color:${color};
  '></div>`
);

export default { generate };

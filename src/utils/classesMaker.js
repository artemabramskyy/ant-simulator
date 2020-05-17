import configs from '~/configs';

const generateClasses = ({ column,
  line,
  antPosition,
  antVision,
  honeyPosition }) => {
  const _antClass = value => (value ? 'ant' : '');
  const _antVisionClass = value => (value ? 'antVision' : '');
  const _honeyClass = value => (value ? 'honey' : '');

  const _isAnt = antPosition.y === column && antPosition.x === line;
  const _isAntVision = Object.keys(antVision).find(av => antVision[av].y === column && antVision[av].x === line);
  const _isHoney = honeyPosition.y === column && honeyPosition.x === line;

  return `
    cell
    ${_antClass(_isAnt)}
    ${configs.env.state === 'dev' ? _antVisionClass(_isAntVision) : ''}
    ${_honeyClass(_isHoney)}
  `;
};

export default { generateClasses };

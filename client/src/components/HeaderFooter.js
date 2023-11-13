import './../App.css';

// Rendering header and footer components depending what the prop is.
export default function HeaderFooter(props) {
  const headerFooter = props.props;

  return (
    <div>
      {
        headerFooter === 'header' ?
        <div className='HeaderFooter'>
          <h1>SIMPLE CHAT</h1>
        </div>
        :
        <div className='HeaderFooter' style={{height: '30px'}}>
          <a href='http://www.github.com/bgh304' target='_blank' rel='noreferrer'>Bgh304 Github</a>
        </div>
      }
    </div>
  )
}
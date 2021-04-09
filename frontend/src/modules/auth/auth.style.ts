import { createUseStyles } from 'react-jss';

export default createUseStyles({
    root:{
        float: 'none',
    textAlign: 'center',
    width:'600px',
    boxShadow: ' 0 8px 16px 0 rgba(0,0,0,0.2)',
    marginTop:'100px',
    marginBottom:'100px'
    ,
    '& .error':{
        border: '2px solid #FF6565',

    },
    '& .error-message':{
        color: '#FF6565',
        padding: '.5em .2em',
        height: '1em',
        position: 'absolute',
        fontSize: '.8em',
    },
    '& #error':{
        border: '2px solid #FF6565',

    },
    '& #error-message':{
        color: '#FF6565',
        padding: '.5em .2em',
        height: '1em',
        position: 'absolute',
        fontSize: '.8em',
    }

}});

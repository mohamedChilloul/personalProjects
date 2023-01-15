const formStyles = () => {
    return ({
        root: {
            '& .MuiTextField-root': {
              margin:'',
            },
          },
          paper: {
            padding: '5px',
          },
          form: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
          fileInput: {
            width: '97%',
            margin: '10px 0',
          },
          buttonSubmit: {
            marginBottom: 10,
          },
          textField : {
            margin : '3px'
          }
    })
}

export default formStyles
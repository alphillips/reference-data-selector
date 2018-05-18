import React from 'react';

import AutoComplete from './AutoComplete/AutoComplete'
// import './ref-data-selector.css'

class RefDataSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      options: [],
      text:props.value,
      inputText:'',
      display:true
    }
    this.linkStyle = {
      maxWidth: props.maxWidth || "100%"
    }
    this.host = process.env.API_HOST || ''
    if(props.url) {
        this.urlPrefix = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + props.url
    } else {
      this.urlPrefix = this.host + '/api/refdata/'
    }
  }


  componentDidMount() {

    if(!this.props.noCache){
      if(window.refDataSelectorCache &&
         window.refDataSelectorCache[this.props.type]){
          let data = window.refDataSelectorCache[this.props.type]
          this.setState({
            options: data
          })
          if(data.length === 1){
            this.onChange(data[0].label, data)
            this.setState({
              inputText: data[0].label
            })
          }
          if(data.length === 0){
            this.setState({
              display: false
            })
          }
          if(this.state.text){
            let text = data.find((item) =>  item.value.toLowerCase() === this.state.text.toLowerCase())
            if(text && text.label){
              this.setState({
                inputText: text.label
              })
            }
          }
          return
      }
    }

    fetch(this.urlPrefix + this.props.type, { credentials: 'same-origin' }).then(
      response => {
        if (response.status === 200) {
          response.text().then(data => {
            let parsedData = JSON.parse(data)
            this.setState({
              options: parsedData
            })
            if(parsedData.length === 1){
              this.onChange(parsedData[0].label, parsedData)
              this.setState({
                inputText: parsedData[0].label
              })
            }
            if(parsedData.length === 0){
              this.setState({
                display: false
              })
            }
            if(this.state.text){
              let text = parsedData.find((item) =>  item.value.toLowerCase() === this.state.text.toLowerCase())
              if(text && text.label){
                this.setState({
                  inputText: text.label
                })
              }
            }
            if(!this.props.noCache){
              if(!window.refDataSelectorCache){
                window.refDataSelectorCache = []
              }
              window.refDataSelectorCache[this.props.type] = JSON.parse(data)
            }
          });
        }
      }
    )
  }


  componentWillReceiveProps(nextProps) {

    let textValue = nextProps.value

    if(!this.props.noCache){
      if(window.refDataSelectorCache &&
         window.refDataSelectorCache[this.props.type]){
          let data = window.refDataSelectorCache[this.props.type]
          this.setState({
            options: data
          })

          if(textValue){
            let text = data.find((item) =>  item.value.toLowerCase() === textValue.toLowerCase())
            if(text && text.label){
              this.setState({
                inputText: text.label
              })
            }
          } else {
            this.setState({inputText: ''})
          }
          return
      }

    }

    fetch(this.urlPrefix + this.props.type, { credentials: 'same-origin' }).then(
      response => {
        if (response.status === 200) {
          response.text().then(data => {
            let parsedData = JSON.parse(data)
            this.setState({
              options: parsedData
            })

            if(textValue){
              let text = parsedData.find((item) =>  item.value.toLowerCase() === textValue.toLowerCase())

              if(text && text.label){
                this.setState({
                  inputText: text.label
                })
              }
            }
            if(!this.props.noCache){
              if(!window.refDataSelectorCache){
                window.refDataSelectorCache = []
              }
              window.refDataSelectorCache[this.props.type] = JSON.parse(data)
            }
          });
        }
      }
    )
  }

  onChangeOld = (val) => {
    var value = val ? val.value : null
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  onChange = (val, src) => {
    let code = src.find((item) =>  item.label.toLowerCase() === val.toLowerCase())
    if(code){
      if (this.props.onChange) {
        this.props.onChange(code.value, src)
      }
    } else {
      if(val.trim().length === 0){
        if (this.props.onChange) {
          this.props.onChange('')
        }
      }
    }
  }

  onNewRequest = (val) => {
    var value = val.value
    if (this.props.onChange) {
      this.props.onChange(value)
    }
    this.setState({
      inputText: val.label
    })
  }

  onTextChange = (event) => {
    let value = event.target.value
    this.onChange(value, this.state.options)
  }

  render() {
    const { id, label, value, error, placeholder, ref } = this.props;

    const errorClass = error ? 'hasError' : '';

    const dataSourceConfig = {
      text: 'label',
      value: 'value',
    }

    const style = {
      'width': '100%',
      fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
      'color':'#313131',
    }

    const labelStyle = {
      'width': '100%',
      fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
      'color':'#999',
    }

    const containerStyle = {
      display:(this.state.display ? 'block' : 'none'),
      maxWidth: this.props.maxWidth || "100%"
    }

    return (
      <div className={"text-group ref-data-selector " + errorClass} style={containerStyle}>


        <AutoComplete
            id={id}
            ref={id}
            floatingLabelText={label}
            openOnFocus={true}
            dataSource={this.state.options}
            onUpdateInput={this.onChange}
            dataSourceConfig={dataSourceConfig}
            filter={AutoComplete.caseInsensitiveFilter}
            onNewRequest={this.onNewRequest}
            style={style}
            textFieldStyle={style}
            floatingLabelStyle={labelStyle}
            fullWidth={true}
            searchText={this.state.inputText}
            menuStyle = {{maxHeight:"600px",overflowY:'auto'}}
            onKeyUp={this.onTextChange}
            maxSearchResults={100}
          />

          {/*
          <label htmlFor={id}>{label}</label>
          <Select
            name="form-field-name"
            options={this.state.options}
            onChange={this.onChange}
            value={value}
            placeholder={placeholder}
            inputProps={{ id: id, className: 'hideError' }}
          />
          <span role="alert" aria-live="polite" className={errorClass}>{error}</span>
          */}
      </div>
    )
  }
}

export default RefDataSelector

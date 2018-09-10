import React from 'react';

import AutoComplete from './AutoComplete/AutoComplete'
// import './ref-data-selector.css'
import Help from '@react-ag-components/help'

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
    this.refreshData()
  }

  refreshData = () => {
    let options = null
    if(this.props.noCache) {
      if(window.refDataSelectorCache &&
         window.refDataSelectorCache[this.props.type]){
           options=window.refDataSelectorCache[this.props.type]
       } else {
         options = this.fetchData()
           window.refDataSelectorCache[this.props.type] = options
       }
    } else {
      options = this.fetchData()
    }
    this.setState({options})
  }

fetchData = () => {
  let options = null
  fetch(this.urlPrefix + this.props.type, { credentials: 'same-origin' }).then(
    response => {
      if (response.status === 200) {
        response.text().then(data => {
          options = JSON.parse(data)
          this.setState({
            options
          })
        }
      }
    })
    return options
}

  componentWillReceiveProps(nextProps) {
    this.refreshData()
  }

  onChangeOld = (val) => {
    var value = val ? val.value : null
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  onChange = (inputText, options) => {
    let code = options.find((item) =>  item.label.toLowerCase() === inputText.toLowerCase())
    if(code){
      if (this.props.onChange) {
        this.props.onChange(code.value, options, code)
      }
      this.setState({
        inputText: code.label
      })
    } else {
      if(inputText.trim().length === 0){
        if (this.props.onChange) {
          this.props.onChange('')
        }
      }
      this.setState({inputText: ''})
    }

    if(options.length === 1){
      this.onChange(options[0].label, options)
      this.setState({
        inputText: options[0].label
      })
    }
    if(options.length === 0){
      this.setState({
        display: false
      })
      if (this.props.onChange) {
        this.props.onChange('')
      }
    }
    let text = data.find((item) =>  item.value.toLowerCase() === inputText.toLowerCase())
    if(text && text.label){
      this.setState({
        inputText: text.label
      })
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

    let inputContainerStyle = {}
    let helpContainerStyle = {
      display:'none'
    }
    let className= ''

    if(this.props.helpText){
      className = 'input-with-help'
      inputContainerStyle = {
        width: '90%'
      }

      helpContainerStyle = {
        marginTop: '40px'
      }

    }

    const autoCompleteStyle = {...style, ...inputContainerStyle}

    return (
      <div className={"text-group ref-data-selector " + errorClass + ' ' + className} style={containerStyle}>


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
            style={autoCompleteStyle}
            textFieldStyle={style}
            floatingLabelStyle={labelStyle}
            fullWidth={true}
            searchText={this.state.inputText}
            menuStyle = {{maxHeight:"600px",overflowY:'auto'}}
            onKeyUp={this.onTextChange}
            maxSearchResults={100}
            title={this.props.title || ''}
          />

          {this.props.helpText &&
            <Help
              text={this.props.helpText}
              style={helpContainerStyle}
            />
          }
      </div>
    )
  }
}

export default RefDataSelector

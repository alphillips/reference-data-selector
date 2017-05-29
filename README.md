# reference-data-selector

Typeahead field to look up reference data.

Specify the ref type to look up a reference data group.

For example to look up countries from the `country` data group, pass in the type of `country`

```
<ReferenceDataSelector
    type="country"
    ...
```    

> Note this only works if it deployed under the same domain as the reference data service.

> Or use a proxy. 

## Usage

### Install
```
npm i @react-ag-components/reference-data-selector --save
```
### Use in your project
```
import ReferenceDataSelector from '@react-ag-components/reference-data-selector'
```

```
<ReferenceDataSelector
  id="country-selector"
  label="Country you wish to export to"
  placeholder="Select country"
  type="country"
  onChange={this.onChange('country')}
  value={this.state.country}
/>
```

### Properties


## Contributing

Get the repository
```
git clone https://github.com/alphillips/reference-data-selector.git
```

Update dependencies
```
npm install
```

Run the project
```
npm start
```

### Deploy to npm
#### Build
`npm run build -- --copy-files`

#### Publish
`npm publish --access public`

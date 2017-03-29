import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import formState from './form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { observer } from 'mobx-react';


function shouldBeEqualTo(target) {
  return ({ field, form }) => {
    const fieldsAreEquals = (form.$(target).value === field.value);
    console.log(form.$(target).value);
    console.log(field.value);
    return [fieldsAreEquals, `'${field.label}' should be === '${form.$(target).label}'`];
  };
}

class App extends Component {
  add = () => {
    const newKey = formState.$('legalEntitiesInfo').add();

    formState.$(`legalEntitiesInfo[${newKey}].leaveBeginAt`).set('validate', [
      shouldBeEqualTo(`legalEntitiesInfo[${newKey}].leaveEndAt`),
    ]);

    formState.$(`legalEntitiesInfo[${newKey}].leaveBeginAt`).set('related', [
      `legalEntitiesInfo[${newKey}].leaveEndAt`,
    ]);

    formState.$(`legalEntitiesInfo[${newKey}].leaveEndAt`).set('related', [
      `legalEntitiesInfo[${newKey}].leaveBeginAt`,
    ]);

    console.log(formState.$(`legalEntitiesInfo[${newKey}].leaveBeginAt`).validators);
    console.log(formState.$(`legalEntitiesInfo[${newKey}].leaveBeginAt`).related);
  }

  render() {
    return (
      <form>
        {formState.$('legalEntitiesInfo').map(entity => (
          <div key={`a${entity.key}`}>
            <TextField style={{ marginRight: 8 }} {...entity.$('leaveBeginAt').bind()} floatingLabelFixed={true} />
            <TextField {...entity.$('leaveEndAt').bind()} />
          </div>
        ))}

        <RaisedButton style={{ marginRight: 8 }} label="add more" onClick={this.add} />
        <RaisedButton label="submit" onClick={formState.onSubmit}/>
      </form>
    );
  }
}

export default observer(App);

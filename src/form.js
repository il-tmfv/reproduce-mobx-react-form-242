import MobxReactForm from 'mobx-react-form';

class form extends MobxReactForm {
  onSuccess(form) {
    console.log('Form Values!', form.values());
  }

  onError(form) {
    console.log('All form errors', form.errors());
  }

  bindings() {
    return {
      MaterialTextField: {
        id: 'id',
        name: 'name',
        type: 'type',
        value: 'value',
        label: 'floatingLabelText',
        placeholder: 'hintText',
        disabled: 'disabled',
        error: 'errorText',
        onChange: 'onChange',
        onFocus: 'onFocus',
        onBlur: 'onBlur',
      },
    };
  }
}

const bindings = {
  'legalEntitiesInfo[].leaveBeginAt': 'MaterialTextField',
  'legalEntitiesInfo[].leaveEndAt': 'MaterialTextField',
};

const fields = ['legalEntitiesInfo', 'legalEntitiesInfo[].leaveBeginAt', 'legalEntitiesInfo[].leaveEndAt'];

const labels = {
  'legalEntitiesInfo[].leaveBeginAt': 'Start',
  'legalEntitiesInfo[].leaveEndAt': 'End',
};

export default new form({ fields, labels, bindings });

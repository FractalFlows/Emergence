export default function setFieldWithReduxForm({ field, value, form }){
  browser.execute((field, value, form) => {
    const store = require('/imports/client/store').default

    store.dispatch({
      type: '@@redux-form/CHANGE',
      meta: {
        form,
        field,
        touch: false,
        persistentSubmitErrors: false
      },
      payload: value,
    })
  }, field, value, form)
}

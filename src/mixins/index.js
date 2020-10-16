export const formulir = {
    props: {
      name: {
        type: String,
        required: true,
        default: 'tanpa-nama'
      },
      label: {
        type: String,
        required: true,
        default: ''
      },
      value: {
        type: [String, Number],
        default: ''
      }
    }
  }
  
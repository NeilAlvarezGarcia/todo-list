import { InputPropsBase, TextInput } from './TextInput';

export function DatePicker(props: InputPropsBase) {
  return <TextInput type='date' {...props} />;
}

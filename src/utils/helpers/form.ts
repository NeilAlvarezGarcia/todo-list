import randomstring from 'randomstring';

function validateFormData(formData: any) {
  return Object.values(formData).every((val) => Boolean(val));
}
function generateRandomId(length = 12) {
  return randomstring.generate({
    length,
    charset: 'numeric',
  });
}

export { validateFormData, generateRandomId };

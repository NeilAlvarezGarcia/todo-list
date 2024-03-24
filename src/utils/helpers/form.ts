import randomstring from 'randomstring';

function generateRandomId(length = 12) {
  return randomstring.generate({
    length,
    charset: 'numeric',
  });
}

export { generateRandomId };

import { Error } from 'mongoose';

type ErrorMessagesLT = {
  title: string,
  description: string,
  price: string,
  weight: string,
  img: string,
  composition: string,
};

const itemValidationErrorMessagesLT: ErrorMessagesLT = {
  price: 'Trūksta prekės kainos',
  description: 'Trūksta prekės aprašymo',
  title: 'Trūksta prekės pavadinimo',
  weight: 'Trūksta prekės svorio',
  img: 'Trūksta prekės nuotraukos',
  composition: 'Trūksta sudėties',
};

const isErrorMessageLT = (property: string)
  : property is keyof ErrorMessagesLT => property in itemValidationErrorMessagesLT;

export const formatItemValidationError = (validationError: Error.ValidationError) => {
  const errorArray = Object.entries(validationError.errors);
  for (let i = 0; i < errorArray.length; i += 1) {
    const [property] = errorArray[i];
    if (isErrorMessageLT(property)) {
      return itemValidationErrorMessagesLT[property];
    }
  }

  return 'Trūksta duomenų';
};

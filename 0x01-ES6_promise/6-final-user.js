import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

// Create and export the handleProfileSignup function
export default function handleProfileSignup(firstName, lastName, fileName) {
  // Call the imported functions and handle their promises
  const signUpPromise = signUpUser(firstName, lastName);
  const uploadPhotoPromise = uploadPhoto(fileName);

  // Return an array with the status and value of each promise once they are all settled
  return Promise.allSettled([signUpPromise, uploadPhotoPromise])
    .then((results) => results.map((result) => ({
      status: result.status,
      value: result.status === 'fulfilled' ? result.value : result.reason,
    })));
}

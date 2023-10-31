import { fetch } from '../../Utils';

export const getFeedbackCompanyReviewsAPI = async ({ apiInstance = null }): Promise<any> => {
  return await fetch('feedbackCompany/reviews', {
    apiInstance,
    method: 'GET',
  });
};

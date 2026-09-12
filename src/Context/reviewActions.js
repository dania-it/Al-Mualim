import {
  getReviews,
  postReview,
} from "../api/index";

export const fetchReviews = async (
  workerId,
  reviewsList,
  setReviewsList
) => {
  try {
    const list =
      await getReviews(workerId);

    setReviewsList((prev) => ({
      ...prev,
      [workerId]:
        Array.isArray(list)
          ? list
          : [],
    }));

    return list;
  } catch {
    return (
      reviewsList[workerId] || []
    );
  }
};
export const addReview = async (
  workerId,
  reviewData,
  reviewsList,
  setReviewsList,
  setJobsList
) => {
  const data =
    await postReview(
      workerId,
      reviewData
    );

  const newReview =
    data.review;

  setReviewsList((prev) => ({
    ...prev,
    [workerId]: [
      newReview,
      ...(prev[workerId] || []),
    ],
  }));

  setJobsList((prev) =>
    prev.map((worker) => {
      if (
        String(worker.id) !==
        String(workerId)
      ) {
        return worker;
      }

      const allReviews = [
        newReview,
        ...(reviewsList[
          workerId
        ] || []),
      ];

      const avg =
        allReviews.reduce(
          (sum, review) =>
            sum +
            Number(
              review.stars || 0
            ),
          0
        ) /
        allReviews.length;

      return {
        ...worker,

        rating: parseFloat(
          avg.toFixed(1)
        ),

        reviewsCount:
          allReviews.length,
      };
    })
  );

  return newReview;
};
export const getReviewStats = (
  workerId,
  fallbackWorker,
  reviewsList
) => {
  const list =
    reviewsList[workerId] || [];

  if (list.length > 0) {
    const avg =
      list.reduce(
        (sum, review) =>
          sum +
          Number(
            review.stars || 0
          ),
        0
      ) / list.length;

    return {
      count: list.length,

      rating: parseFloat(
        avg.toFixed(1)
      ),
    };
  }

  return {
    count:
      fallbackWorker?.reviewsCount ||
      0,

    rating:
      fallbackWorker?.rating ||
      0,
  };
};
package com.web.br.gamelogged.review.dto;

import java.util.List;



public class GameReviewsResponseDTO {

    private List<ReviewResponse> reviews;
    private ReviewResponse userReview;

    public GameReviewsResponseDTO() {
    }

    public List<ReviewResponse> getReviews() {
        return reviews;
    }

    public void setReviews(List<ReviewResponse> reviews) {
        this.reviews = reviews;
    }

    public ReviewResponse getUserReview() {
        return userReview;
    }

    public void setUserReview(ReviewResponse userReview) {
        this.userReview = userReview;
    }
}

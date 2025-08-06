import { gql } from '@apollo/client';

export const CREATE_PROD_REVIEWS = gql`
  mutation CreateProdReviews($productReviewInput: productReviewInput!) {
    Create_prod_Reviews(productReviewInput: $productReviewInput) {
      name
    }
  }
`;


export const GET_ALL_PROD_REVIEWS = gql`
  query GetAllProdReviews {
    get_All_prod_Reviews {
      id
      name
      starRating
      ReviewsDescription
      reviewDate
      posterImageUrl
      productsImage
      status
        EcomereceProducts {
            id
            name
        }
    }
  }
`;

export const UPDATE_PROD_REVIEWS = gql`
  mutation UpdateProdReviews($UpdateproductReviewInput: UpdateproductReviewInput!) {
    update_prod_Reviews(UpdateproductReviewInput: $UpdateproductReviewInput) {
      id
      name
 
    }
  }
`;

export const DELETE_PROD_REVIEW = gql`
  mutation DeleteProdReview($id: Int!) {
    Delete_prod_Review(id: $id) {
      id
      name
    }
  }
`;



// Questoins
export const CREATE_PRODUCT_QUESTION = gql`
  mutation CreateProductQuestion($productQuestionInput: productQuestionInput!) {
    Create_prod_Questions(productQuestionInput: $productQuestionInput) {
      id
      question
      productId
      createdAt
      
    }
  }
`;



export const GET_ALL_PRODUCT_QUESTIONS = gql`
  query GetAllProductQuestions {
    get_All_prod_Questions {
 id
            name
            email
            question
            productId
            status
            replies
            createdAt
            updatedAt
            EcomereceProducts {
            id
            name
        }
      
    }
  }
`;

export const UPDATE_PRODUCT_QUESTION = gql`
  mutation UpdateProductQuestion($UpdateproductQuestionInput: UpdateproductQuestionInput!) {
    update_prod_Questions(UpdateproductQuestionInput: $UpdateproductQuestionInput) {
      id
      question
      productId
      createdAt
      
    }
  }
`;


export const DELETE_PRODUCT_QUESTION = gql`
  mutation DeleteProductQuestion($id: Int!) {
    Delete_prod_Questions(id: $id) {
      id
    }
  }
`;


// contact us

export const CONTACT_US_EMAIL_MUTATION = gql`
  mutation ContactEmail($contactUsEmail: contactUsEmailInput!) {
    Contact_email(contactUsEmail: $contactUsEmail) {
      message
    }
  }
`;


// ChartsData


export const APPOINTMENTS_ORDERS = gql`
query MONTHLY_COUNT {
    MONTHLY_COUNT {
        appointments
        orders
    }
}`

export const WEEKLY_STATS = gql`
query WEEKLY_STATS {
    WEEKLY_STATS {
      date
        Appointments
        Orders
        day
    }
}

    
`

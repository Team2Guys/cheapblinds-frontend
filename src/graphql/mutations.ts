import { gql } from '@apollo/client';


export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(createCategoryInput: $input) {
      id
      name
      description
      posterImageUrl
      Canonical_Tag
      Meta_Description
      Meta_Title
      last_editedBy
      custom_url
    }
  }
`;



export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $input) {
      id
      name
      description
      posterImageUrl
      Canonical_Tag
      Meta_Description
      Meta_Title
      last_editedBy
      custom_url
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($id: Int!) {
    RemoveCategory(id: $id) {
      id
    }
  }
`;


export const CREATE_SUBCATEGORY = gql`
  mutation CreateSubCategory($input: CreateSubcategoryInput!) {
    createSubCategory(createSubcategoryInput: $input) {
      id
    }
  }
`;

export const UPDATE_SUBCATEGORY = gql`
  mutation UpdateSubCategory($input: UpdateSubcategoryInput!) {
    update_subCategory(updateSubcategoryInput: $input) {
      id
    }
  }
`;


export const REMOVE_SUBCATEGORY = gql`
  mutation RemoveSubCategory($id: Int!) {
    Removesubcategory(id: $id) {
      id
    }
  }
`;
export const REMOVE_INNER_SUBCATEGORY = gql`
  mutation RemovesInnerubcategory($id: Int!) {
    RemovesInnerubcategory(id: $id) {
      id
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: Int!) {
    RemoveProducts(id: $id) {
      id
    }
  }
`;




export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($input: UpdateProductInput!) {
  update_product(updateProductInput: $input) {
    id
    name
  }
}
`;

export const CREATE_PRODUCT = gql`
mutation CreateProduct($input: CreateProductInput!) {
  create_product(createProductInput: $input) {
    id
    name
  }
}
`;


;




export const CONTACT_US_EMAIL_MUTATION = gql`
  mutation ContactEmail($contactUsEmail: contactUsEmailInput!) {
    Contact_email(contactUsEmail: $contactUsEmail) {
      message
    }
  }
`;


export const INITIATE_PAYMENT = gql`
mutation CreateSalesProduct($createSalesProductInput: CreateOrderInput!) {
  createSalesProduct(createSalesProductInput: $createSalesProductInput) {
    paymentKey
  }
}`



export const POST_PAYMENT_STATUS = gql`
mutation PostPaymentStatus($postpaymentStatus: PaymentQueryDto!) {
  postpaymentStatus(postpaymentStatus: $postpaymentStatus) {
firstName
      lastName
      email
      country
      city
      address
      note
      phone
      emirate
      orderId
      transactionDate
      shipmentFee
      totalPrice
      pay_methodType
      paymethod_sub_type
      checkout
      paymentStatus
      isRefund
      success
      pending
      checkoutDate
      shippingMethod
      products {
            id
            name
            price
            discountPrice
            colors
            sizes
            variant
            stock
            quantity
            totalPrice
            image
            dimension
        }
  }
}
`;


export const ADD_REVIEW = gql`
mutation AddReview($createGeneralInput:CreateGeneralInput!){
Create_reviews(createGeneralInput: $createGeneralInput){
name
}

}`


export const UPDATE_REVIEW = gql`
  mutation update_Reviews($updateGeneralInput: UpdateGeneralInput!) {
    update_Reviews(updateGeneralInput: $updateGeneralInput) {
      id
    }
  }
`;



export const REMOVE_REVIEW = gql`
  mutation Delete_Review($id: Int!) {
    Delete_Review(id: $id) {
   name
    }
  }
`;



export const CREATE_APPOINTMENT = gql`
mutation CreateAppointments($createAppointments: createAppointments!) 
{ Create_Appointments(createAppointments: $createAppointments){
  id
   phoneNumber 
  email
   name
   location
   whatsApp 
  subCategories 
  }
  }
  
  `;



// RedirectUrls 

export const ADD_REDIRECTURLS = gql`
   mutation CreateRedirectURL($CreatedRedirecturls: CreatedRedirecturls!) {
    createRedirecturls(CreatedRedirecturls: $CreatedRedirecturls) {
      id
  
    }
  }
`;

export const UPDATE_REDIRECTURLS = gql`
 mutation UpdateRedirectURL($UpdateRedirecturls: UpdateRedirecturls!) {
    updateRedirecturls(UpdateRedirecturls: $UpdateRedirecturls) {
    id}

}`


// InnerSubCategories

export const CREATE_INNER_SUBCATEGORY = gql`
  mutation CreateInnerSubcategory($input: CreateInnerSubcategoryInput!) {
    CreateInnerSubcategoryInput(CreateInnerSubcategoryInput: $input) {
      id
      name
      subCategoryId
      # Add any other fields you need from the response
    }
  }
`;



export const UPDATE_INNER_SUBCATEGORY = gql`
  mutation UpdateInnerSubcategory($input: UpdateInnerSubcategoryInput!) {
    update_Innersubcategories(UpdateInnerSubcategoryInput: $input) {
      id
      name
      subCategoryId
    }
  }
`;




// Delet Admins

export const REMOVE_ADMIN = gql`
  mutation RemoveAdmin($id: Int!) {
    removeAdmin(id: $id) {
    fullname
    }
  }
`;


export const FIND_ONE_REDIRECT_URL = gql`
  mutation findOneRedirecturls($url: String!) {
    findOneRedirecturls(url: $url) {
        url
        redirectedUrl
    }
  }
`;

export const CREATE_PROD_REVIEWS = gql`
  mutation CreateProductReview($CreateProductReview: CreateProductReviewInput!) {
    createProductReview(CreateProductReview: $CreateProductReview) {
      id
    }
  }
`;

export const UPDATE_PROD_REVIEWS = gql`
  mutation UpdateProductReview($UpdateProductReview: UpdateProductReviewInput!) {
    updateProductReview(UpdateProductReview: $UpdateProductReview) {
      id
    }
  }
`;
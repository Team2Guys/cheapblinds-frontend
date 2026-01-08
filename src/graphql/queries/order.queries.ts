import { gql } from "@apollo/client";

export const GET_ORDER_LIST_QUERY = gql`
  query GetOrderList {
    orderList {
      id
      userId
      firstName
      lastName
      email
      phone
      country
      state
      city
      address
      totalAmount
      shippingCost
      paymentStatus
      orderStatus
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORDER_BY_ID_QUERY = gql`
  query GetOrderById($id: ID!) {
    orderById(id: $id) {
      id
      userId
      firstName
      lastName
      email
      phone
      country
      state
      city
      address
      totalAmount
      shippingCost
      notes
      orderItems
      lastEditedBy
      paymentStatus
      orderStatus
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORDERS_BY_USER_ID_QUERY = gql`
  query GetOrdersByUserId($id: ID!) {
    orderListByUserId(id: $id) {
      id
      userId
      firstName
      lastName
      email
      phone
      country
      state
      city
      address
      totalAmount
      shippingCost
      notes
      orderItems
      lastEditedBy
      paymentStatus
      orderStatus
      createdAt
      updatedAt
    }
  }
`;

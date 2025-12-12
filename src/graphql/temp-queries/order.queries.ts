import { gql } from "@apollo/client";

export const GET_ORDER_LIST = gql`
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

export const GET_ORDER_BY_ID = gql`
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
      items
      lastEditedBy
      paymentStatus
      orderStatus
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORDERS_BY_USER_ID = gql`
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
      items
      lastEditedBy
      paymentStatus
      orderStatus
      createdAt
      updatedAt
    }
  }
`;
